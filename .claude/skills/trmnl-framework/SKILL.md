---
name: trmnl-framework
description: Use when writing or editing TRMNL e-ink plugin Liquid templates (src/*.liquid) — markup structure, CSS classes, layout, typography, colors, and components from the TRMNL Framework 3.2.
---

# TRMNL Framework 3.2

## Overview

The TRMNL Framework is the CSS library that styles e-ink plugin screens. This
repo's Liquid templates (`src/*.liquid`) are plain HTML that uses
framework classes only — there is no custom CSS. To style a template
correctly you compose framework classes; you do not write CSS.

Full docs for every utility are bundled in `reference/` (mirrored from
trmnl.com/framework/docs/3.2). **Read the relevant reference file before
using classes you are unsure about** — class names follow strict conventions
and inventing them silently fails.

## When to use

- Editing or creating any `src/*.liquid` template
- Choosing layout, spacing, typography, color, or component classes
- Debugging why a template renders wrong on the e-ink display

## How to use this skill

1. Identify what you're doing (layout? a component? text styling?).
2. Open the matching file in `reference/` (table below) and read that section.
3. Compose the documented classes — don't guess class names.

## Reference index

| I need to… | Read `reference/…` |
|---|---|
| Set width/height, padding/margin, gaps, flex, grid, aspect ratio | `arrangement.md` |
| Show/hide per layout, responsive utilities | `responsive.md` |
| Background, border, rounded, outline, images, scale, **colors**, tokens | `styling.md` |
| Fonts, weight, glyphs/icons, text size/alignment/color/stroke | `typography.md` |
| Overflow, clamp, value formatting/fitting, content limiting, pixel-perfect | `modulations.md` |
| The required div hierarchy: screen/view/layout/title bar/columns/mashup | `foundation.md` |
| `title`, `value`, `label`, `description`, `divider` | `elements.md` |
| `rich_text`, `item`, `table`, `chart`, `progress` | `components.md` |
| Themes (opt-in screen restyling), theme authoring, theme slots | `themes.md` |
| The `TRMNLPaint` JS API (read live paint/colors/borders/typography from the CSS cascade), adaptive charts | `paint.md` |
| v3 overview, upgrade notes (3.0/3.1 → 3.2), what's new per version | `guides.md` |

## Required markup skeleton

The platform supplies `screen`/`mashup`/`view`. A plugin template provides the
`layout` and an optional `title_bar` as siblings:

```html
<div class="layout">
  <!-- content: columns, grid, flex, elements, components -->
</div>
<div class="title_bar">
  <img class="image" src="…" />
  <span class="title">…</span>
  <span class="instance">…</span>
</div>
```

Exactly one `layout` per view. Deviating from this hierarchy breaks rendering.
See `reference/foundation.md` for layout alignment modifiers (`layout--row`,
`layout--col`, `--center`, `--stretch`, etc.) and the four view sizes
(`full`, `half_horizontal`, `half_vertical`, `quadrant`) — this repo has one
template per size.

## Class naming convention

Modifiers use a double dash: `base--modifier` (e.g. `value--large`,
`label--small`, `text--gray-50`, `w--12`). Stacking modifiers means multiple
classes: `class="value value--large value--tnums"`. Grayscale is `gray-10`
through `gray-75`; chromatic is `bg--red`, `text--blue-40`, etc.; semantic is
`bg--primary`, `text--success`. See `reference/styling.md`.

## Common mistakes

- **Inventing class names.** If it's not in `reference/`, it doesn't exist.
  Unknown classes render as unstyled, not as an error.
- **Custom CSS or inline styles.** Compose framework classes instead.
- **Skipping the structure.** Content must live inside `layout`; `title_bar`
  is a sibling of `layout`, not a child.
- **Forgetting e-ink limits.** The display is 1-bit/2-bit grayscale by
  default — favor grayscale tokens and high contrast; check `colors` and
  `guides.md` for palette behavior.
- **Long values overflowing.** Use the `modulations.md` utilities (clamp,
  fit value, content limiter) rather than hand-trimming in Liquid.

## Version

Framework 3.2 (v3), fully backward-compatible with 3.0/3.1 — every 3.2
feature (themes, `TRMNLPaint`, adaptive charts/icons) is opt-in, so existing
markup in this repo needs no changes. Docs in `reference/` are a point-in-time
mirror; the canonical source is https://trmnl.com/framework/docs/3.2/.

Re-run `node reference/_fetch.mjs` to refresh the mirror (Node builtins only,
no deps — matches this repo's tooling conventions). It scrapes each doc
page's rendered HTML and converts it to markdown, because the docs site no
longer serves raw `<slug>.md` files (that endpoint 404s as of 3.2 — the
former fetch approach, preserved in git history, curled them directly). There
is no upstream changelog, so re-run this periodically to pick up framework
changes; check `guides.md`'s upgrade guide afterward for anything
version-relevant.
