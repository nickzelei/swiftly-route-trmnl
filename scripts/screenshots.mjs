// Render each TRMNL layout to a PNG for the repo README, across the device/
// orientation matrix required before publishing (see
// docs/TODO-responsive-layouts.md).
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
const outRoot = resolve(here, '..', 'docs', 'screenshots');
const SERVER_URL = 'http://localhost:4567';

const layouts = ['full', 'half_horizontal', 'half_vertical', 'quadrant'];

// Device/orientation matrix. Class names and CSS pixel dimensions come
// straight from https://usetrmnl.com/api/models (`css.classes`) — the
// dev-server picker composes the same `device`/`size` classes into the
// `screen_classes` query string, and its bit-depth palette class comes from
// each model's `bit_depth` (TRMNL X is 4-bit, OG Plus is 2-bit). `outDir:
// null` writes to docs/screenshots/ directly, keeping the existing filenames
// (and README links) for the TRMNL X landscape shots stable.
//
// Orientation is not a separate device/model — the picker just adds a
// `screen--portrait` class, which swaps the framework's `--screen-w`/
// `--screen-h` CSS custom properties (see plugins.css's `.screen--portrait`
// rule). The viewport passed to Playwright must be swapped to match, since
// nothing else resizes the browser window for us.
const DEVICES = [
  {
    key: 'trmnl-x-landscape',
    label: 'TRMNL X — landscape',
    outDir: null,
    screenClasses: 'screen screen--4bit screen--v2 screen--lg screen--1x',
    viewport: { width: 1040, height: 780 },
  },
  {
    key: 'trmnl-x-portrait',
    label: 'TRMNL X — portrait',
    outDir: 'portrait',
    screenClasses: 'screen screen--4bit screen--v2 screen--lg screen--portrait screen--1x',
    viewport: { width: 780, height: 1040 },
  },
  {
    key: 'og-plus-landscape',
    label: 'TRMNL OG Plus — landscape',
    outDir: 'og-plus',
    screenClasses: 'screen screen--2bit screen--ogv2 screen--md screen--1x',
    viewport: { width: 800, height: 480 },
  },
];

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
  for (const device of DEVICES) {
    const out = device.outDir ? resolve(outRoot, device.outDir) : outRoot;
    await mkdir(out, { recursive: true });

    for (const name of layouts) {
      const ctx = await browser.newContext({
        viewport: device.viewport,
        deviceScaleFactor: 2, // 2x for crisp README rendering on high-DPI screens.
      });
      const page = await ctx.newPage();
      const url = `${SERVER_URL}/render/${name}.html?screen_classes=${encodeURIComponent(device.screenClasses)}`;
      // 'load' rather than 'networkidle': the page keeps a Google Fonts
      // preconnect alive that never goes fully idle, which made
      // 'networkidle' flaky (intermittent 30s timeouts) once this script
      // started spinning up many browser contexts back to back for the
      // device matrix. The explicit font/timeout waits below cover the
      // same "has everything actually rendered" concern.
      await page.goto(url, { waitUntil: 'load' });
      // Wait for web fonts (Inter via @font-face) AND for TRMNL's plugins.js
      // to run its `data-value-fit` auto-shrink — without this the
      // `value--mega` times overflow before they get resized.
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(1500);
      const file = `${out}/${name}.png`;
      // Screenshot the `.view` element (not the whole page) so half/quadrant
      // layouts get tight crops. On the device those layouts only occupy a
      // portion of the screen with the rest going to other plugins in the
      // playlist — for README purposes the dead space just adds noise.
      await page.locator('.view').screenshot({ path: file });
      console.log(`wrote ${file} (${device.label})`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  if (serverProc) serverProc.kill('SIGTERM');
}
