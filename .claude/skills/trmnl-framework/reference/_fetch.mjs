#!/usr/bin/env node
// Refresh the bundled TRMNL Framework docs from the canonical source.
// Run from anywhere: node _fetch.mjs
//
// Overwrites every reference/*.md (except this script and _fetch.sh, which
// is kept only as a historical note — see its header comment). The docs
// site no longer serves raw `<slug>.md` files (they 404 as of Framework
// 3.2), so this scrapes each page's rendered HTML from `<main
// id="main-content">` and converts it to markdown instead. There is no
// upstream changelog, so re-run this to pick up framework changes.
//
// Node builtins only (global fetch, no deps) — matches the rest of this
// repo's tooling conventions.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_VERSION = "3.2";
const BASE = `https://trmnl.com/framework/docs/${DOCS_VERSION}`;
const OUT_DIR = path.dirname(fileURLToPath(import.meta.url));

// Groups mirror SKILL.md's reference index. Slugs are page names from the
// site's own nav (scraped from a live page's sidebar links), not guessed.
const GROUPS = {
  arrangement: ["size", "spacing", "gap", "flex", "grid", "aspect_ratio"],
  responsive: ["responsive", "responsive_test", "visibility"],
  styling: [
    "background",
    "border",
    "rounded",
    "outline",
    "image",
    "image_stroke",
    "scale",
    "colors",
    "color_palettes",
    "tokens",
    "inverse",
  ],
  typography: [
    "font_family",
    "font_weight",
    "font_glyphs",
    "text_size",
    "text_scale",
    "text_alignment",
    "text_color",
    "text_stroke",
  ],
  modulations: [
    "overflow",
    "table_overflow",
    "clamp",
    "format_value",
    "fit_value",
    "content_limiter",
    "pixel_perfect",
    "framework_runtime",
  ],
  foundation: ["structure", "screen", "view", "layout", "title_bar", "columns", "mashup"],
  elements: ["title", "value", "label", "description", "divider"],
  components: ["rich_text", "item", "table", "chart", "progress"],
  // New in 3.2: opt-in theming system (see SKILL.md's "themes" row).
  themes: ["themes", "theme_authoring", "theme_slots"],
  // New in 3.2: the TRMNLPaint JS API for reading the live CSS paint contract.
  paint: ["paint_api", "paint_colors", "paint_borders", "paint_typography", "paint_charts"],
  guides: ["v3_overview", "v3_upgrade_guide", "v3_enhancement_guide", "trmnl_x_guide"],
};

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

// Removes every `<tagName ...attrPattern...>...</tagName>` block, tracking
// nested same-tag depth so it doesn't stop at the first inner close tag.
// Used to drop non-content chrome that isn't flat/inline:
//  - `.trmnl-example` divs: the live-rendered preview markup that sits
//    beside (not inside) each documented <pre><code> sample.
//  - `role="tooltip"` spans: hidden hover-preview cards the site attaches
//    to inline cross-reference links (e.g. "Content Limiter" mid-sentence),
//    which duplicate that page's own title+description text inline.
function stripBalancedTag(html, tagName, attrPattern) {
  const openRe = new RegExp(`<${tagName}\\b[^>]*${attrPattern}[^>]*>`, "g");
  const tagRe = new RegExp(`<${tagName}\\b[^>]*>|</${tagName}>`, "g");
  let result = "";
  let last = 0;
  let m;
  while ((m = openRe.exec(html))) {
    if (m.index < last) continue;
    result += html.slice(last, m.index);
    let depth = 1;
    tagRe.lastIndex = openRe.lastIndex;
    let mm;
    let end = html.length;
    while ((mm = tagRe.exec(html))) {
      depth += mm[0].startsWith("</") ? -1 : 1;
      if (depth === 0) {
        end = tagRe.lastIndex;
        break;
      }
    }
    last = end;
    openRe.lastIndex = end;
  }
  result += html.slice(last);
  return result;
}

function stripTags(html) {
  // Collapses internal whitespace too: this runs on text that may already
  // be sealed inside a stash placeholder (e.g. a whole <li>), so the later
  // top-level whitespace cleanup never gets a chance to see it.
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function resolveHref(href) {
  return href.startsWith("/") ? `https://trmnl.com${href}` : href;
}

function convertInline(html) {
  return html
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) =>
      `[${stripTags(text)}](${resolveHref(href)})`)
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/g, (_, t) => `**${stripTags(t)}**`)
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/g, (_, t) => `*${stripTags(t)}*`)
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (_, t) => `\`${stripTags(t)}\``);
}

function convertTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((rowMatch) => {
    const cells = [...rowMatch[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((cellMatch) =>
      stripTags(convertInline(cellMatch[1])).replace(/\s+/g, " "));
    return cells;
  });
  if (rows.length === 0) return "";
  const header = rows[0];
  const body = rows.slice(1);
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ];
  return `\n${lines.join("\n")}\n`;
}

// The Previous/Next footer nav wraps each card's title in an <h2>, which
// would otherwise get promoted to a spurious mid-document heading. Convert
// it to the same "Previous\n\n[Title desc](url)" shape as the old raw-.md
// mirror used, before the general heading pass ever sees those <h2>s.
function convertPageNav(navHtml) {
  const body = navHtml.replace(/^<nav[^>]*>/, "").replace(/<\/nav>$/, "");
  const cardRe =
    /<a[^>]*href="([^"]*)"[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>(?:[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>)?[\s\S]*?<\/a>/g;
  const cards = [...body.matchAll(cardRe)];
  const fmt = (card) => {
    const title = stripTags(card[2]);
    const desc = card[3] ? stripTags(card[3]) : "";
    return `[${[title, desc].filter(Boolean).join(" ")}](${resolveHref(card[1])})`;
  };
  const lines = [];
  if (cards.length === 2) {
    lines.push("Previous", "", fmt(cards[0]), "", "Next", "", fmt(cards[1]));
  } else if (cards.length === 1) {
    const label = /\bPrevious\b/.test(body.slice(0, cards[0].index)) ? "Previous" : "Next";
    lines.push(label, "", fmt(cards[0]));
  }
  return `\n\n${lines.join("\n")}\n`;
}

function htmlToMarkdown(html) {
  // Placeholder-based passes: each stage replaces matched HTML with a
  // token so later, coarser passes (block tags -> newlines, tag-stripping)
  // don't re-mangle already-converted content.
  const placeholders = [];
  const stash = (s) => {
    placeholders.push(s);
    return `STASHTOKEN${placeholders.length - 1}ENDSTASH`;
  };

  let out = html;

  out = stripBalancedTag(out, "div", 'class="[^"]*\\btrmnl-example\\b[^"]*"');
  out = out.replace(/<script[\s\S]*?<\/script>/g, "");
  out = out.replace(/<button[\s\S]*?<\/button>/g, "");

  // Hidden hover-preview cards attached to inline cross-reference links —
  // drop the tooltip, keep the visible trigger <a> outside it.
  out = stripBalancedTag(out, "span", 'role="tooltip"');

  // The "#" permalink anchor TRMNL injects as a sibling right before each
  // heading tag (not nested inside it) — drop it before the heading pass.
  out = out.replace(/<a[^>]*\bclass="[^"]*\bframework-heading-anchor\b[^"]*"[^>]*>[\s\S]*?<\/a>/g, "");

  // Fenced code blocks — stashed before the whitespace collapse below so
  // their internal indentation/line breaks survive intact.
  out = out.replace(
    /<pre[^>]*>\s*<code[^>]*class="[^"]*language-([\w-]+)[^"]*"[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g,
    (_, lang, code) => stash(`\n\`\`\`${lang}\n${decodeEntities(code).trim()}\n\`\`\`\n`),
  );

  // The source is pretty-printed HTML: inline elements (links, spans) each
  // sit on their own physical line. HTML collapses that to whitespace when
  // rendered; collapse it here too, or sentences fragment across markdown
  // lines. From this point on, every line break in the output comes from
  // an explicit \n this converter inserts, not from source formatting.
  out = out.replace(/\s+/g, " ");

  // Previous/Next footer nav: convert before the general heading pass so
  // its <h2> card titles don't become spurious mid-document headings.
  out = out.replace(
    /<nav[^>]*aria-label="Framework page navigation"[^>]*>[\s\S]*?<\/nav>/g,
    (m) => stash(convertPageNav(m)),
  );

  // Tables.
  out = out.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (_, body) => stash(convertTable(body)));

  // Headings.
  out = out.replace(
    /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g,
    (_, level, text) => stash(`\n${"#".repeat(Number(level))} ${stripTags(text)}\n`),
  );

  // Lists.
  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_, t) => stash(`\n- ${stripTags(convertInline(t))}`));
  out = out.replace(/<\/?(?:ul|ol)[^>]*>/g, "\n");

  // Inline formatting outside of already-stashed blocks.
  out = convertInline(out);

  // Remaining block-level tags become paragraph breaks.
  out = out.replace(/<\/(?:p|div|section)>/g, "\n\n");
  out = out.replace(/<[^>]+>/g, "");

  // Clean up now, while stashed blocks are still opaque tokens — this must
  // run before restoring them, or it would eat the deliberate indentation
  // and spacing inside fenced code samples.
  out = out
    .split("\n")
    .map((l) => l.trimStart())
    .join("\n")
    .replace(/ {2,}/g, " ")
    .replace(/ \n/g, "\n");

  // Restore stashed blocks.
  out = out.replace(/STASHTOKEN(\d+)ENDSTASH/g, (_, i) => placeholders[Number(i)]);

  out = decodeEntities(out);
  out = out.replace(/\n{3,}/g, "\n\n").trim();
  return out;
}

async function fetchPage(slug) {
  const url = `${BASE}/${slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  const html = await res.text();
  const start = html.indexOf('<main id="main-content"');
  const end = html.indexOf("</main>", start);
  if (start === -1 || end === -1) throw new Error(`${url}: <main id="main-content"> not found`);
  const mainOpenEnd = html.indexOf(">", start) + 1;
  const md = htmlToMarkdown(html.slice(mainOpenEnd, end));
  return { url, md };
}

async function fetchGroup(outName, slugs) {
  const parts = [];
  for (const slug of slugs) {
    console.log(`>>> ${outName}.md / ${slug}`);
    const { url, md } = await fetchPage(slug);
    parts.push(
      `<!-- ============================================================\n     source: ${url}\n     ============================================================ -->\n\n${md}\n`,
    );
  }
  await writeFile(path.join(OUT_DIR, `${outName}.md`), parts.join("\n"));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [outName, slugs] of Object.entries(GROUPS)) {
    await fetchGroup(outName, slugs);
  }
}

export { fetchPage, htmlToMarkdown };
