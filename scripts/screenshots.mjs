// Render each TRMNL layout to a PNG for the repo README.
//
// Strategy: drive `trmnlp serve` (Sinatra dev server on :4567) — it owns the
// canonical render path that the picker UI uses. Hitting it directly means we
// get the same HTML (including the design-system scoping classes via
// `?screen_classes=...`) that you see in the dev-server iframe. Screenshotting
// the static `_build/` HTML produced by `trmnlp build` does NOT match: that
// output is missing the `<div class="trmnl">` wrapper and any screen-class
// scoping, so it renders with a gray background and no model-specific sizing.
//
// Usage (from repo root):
//   npm install
//   npx playwright install chromium    # one time
//   npm run screenshots                # auto-starts trmnlp serve if not running

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out  = resolve(here, '..', 'docs', 'screenshots');
await mkdir(out, { recursive: true });

// Match the TRMNL X / 16 Grays (4-bit) / Landscape / Light Mode defaults that
// the dev-server picker uses — the picker composes these into a `screen_classes`
// query string that the design system scopes its CSS to. Class meanings:
//   screen         base
//   screen--4bit   16 Grays (4-bit) palette
//   screen--v2     TRMNL X device
//   screen--lg     TRMNL X size bucket
//   screen--1x     scale (picker always passes 1x; the iframe handles scaling)
// To target a different device, look up the model in
// https://usetrmnl.com/api/models and substitute its `css.classes.device` and
// `css.classes.size`. Layout iframe sizing comes from the picker's screen
// dimensions for that model — TRMNL X uses 1040x780 in the dev-server iframe.
const SCREEN_CLASSES = 'screen screen--4bit screen--v2 screen--lg screen--1x';
const VIEWPORT = { width: 1040, height: 780 };
const SERVER_URL = 'http://localhost:4567';

const layouts = ['full', 'half_horizontal', 'half_vertical', 'quadrant'];

// Probe trmnlp serve; spawn it if missing. We need the dev server because
// the design system's CSS is scoped to the screen classes the dev server
// applies, and the framework JS (data-value-fit) depends on the same scoping.
async function isServerUp() {
  try {
    const r = await fetch(SERVER_URL, { signal: AbortSignal.timeout(500) });
    return r.ok;
  } catch {
    return false;
  }
}

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isServerUp()) return;
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('trmnlp serve did not become ready');
}

let serverProc;
if (!(await isServerUp())) {
  console.log('starting trmnlp serve…');
  serverProc = spawn('trmnlp', ['serve'], {
    cwd: resolve(here, '..'),
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  serverProc.on('error', err => console.error('trmnlp spawn failed:', err));
  await waitForServer();
}

const browser = await chromium.launch();
try {
  for (const name of layouts) {
    const ctx = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,  // 2x for crisp README rendering on high-DPI screens.
    });
    const page = await ctx.newPage();
    const url = `${SERVER_URL}/render/${name}.html?screen_classes=${encodeURIComponent(SCREEN_CLASSES)}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait for web fonts (Inter via @font-face) AND for TRMNL's plugins.js to
    // run its `data-value-fit` auto-shrink — without this the `value--mega`
    // times overflow before they get resized.
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1500);
    const file = `${out}/${name}.png`;
    // Screenshot the `.view` element (not the whole page) so half/quadrant
    // layouts get tight crops. On the device those layouts only occupy a
    // portion of the screen with the rest going to other plugins in the
    // playlist — for README purposes the dead space just adds noise.
    await page.locator('.view').screenshot({ path: file });
    console.log(`wrote ${file}`);
    await ctx.close();
  }
} finally {
  await browser.close();
  if (serverProc) serverProc.kill('SIGTERM');
}
