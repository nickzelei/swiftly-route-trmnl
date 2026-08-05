// Render each TRMNL layout to a PNG for the repo README, across the
// TRMNL X (landscape/portrait) / TRMNL OG Plus device-orientation matrix.
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
// each model's `bit_depth` (TRMNL X is 4-bit, OG Plus is 2-bit). Every combo
// writes to docs/screenshots/<outDir>/ — nested by device then orientation —
// so the directory listing alone says what each PNG is a picture of.
//
// Orientation is not a separate device/model — the picker just adds a
// `screen--portrait` class, which swaps the framework's `--screen-w`/
// `--screen-h` CSS custom properties (see plugins.css's `.screen--portrait`
// rule). The viewport passed to Playwright must be swapped to match, since
// nothing else resizes the browser window for us.
const TRMNL_X_LANDSCAPE_VIEWPORT = { width: 1040, height: 780 };

const DEVICES = [
  {
    label: 'TRMNL X — landscape',
    outDir: 'trmnl-x/landscape',
    screenClasses: 'screen screen--4bit screen--v2 screen--lg screen--1x',
    viewport: TRMNL_X_LANDSCAPE_VIEWPORT,
  },
  {
    label: 'TRMNL X — portrait',
    outDir: 'trmnl-x/portrait',
    screenClasses: 'screen screen--4bit screen--v2 screen--lg screen--portrait screen--1x',
    // Portrait swaps --screen-w/--screen-h (see comment above), so the
    // viewport is the landscape one with width/height swapped, not a
    // separately maintained literal.
    viewport: { width: TRMNL_X_LANDSCAPE_VIEWPORT.height, height: TRMNL_X_LANDSCAPE_VIEWPORT.width },
  },
  {
    label: 'TRMNL OG Plus — landscape',
    outDir: 'og-plus/landscape',
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

// Runs `worker` over `items` with at most `limit` in flight at once — plain
// Promise.all across all 12 device/layout combos was fine correctness-wise,
// but spinning up that many browser contexts simultaneously risks flakiness
// under CPU/memory pressure on the runner, so cap concurrency instead.
async function withConcurrency(items, limit, worker) {
  const queue = [...items];
  async function runNext() {
    while (queue.length > 0) {
      const item = queue.shift();
      await worker(item);
    }
  }
  await Promise.all(Array.from({ length: limit }, runNext));
}

async function screenshotOne(browser, device, name) {
  const out = resolve(outRoot, device.outDir);
  const ctx = await browser.newContext({
    viewport: device.viewport,
    deviceScaleFactor: 2, // 2x for crisp README rendering on high-DPI screens.
  });
  const page = await ctx.newPage();
  const url = `${SERVER_URL}/render/${name}.html?screen_classes=${encodeURIComponent(device.screenClasses)}`;
  try {
    // 'load' rather than 'networkidle': the page keeps a Google Fonts
    // preconnect alive that never goes fully idle, which made 'networkidle'
    // flaky (intermittent 30s timeouts) once this script started spinning up
    // many browser contexts back to back for the device matrix. The explicit
    // font/timeout waits below cover the same "has everything actually
    // rendered" concern.
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
  } finally {
    await ctx.close();
  }
}

const browser = await chromium.launch();
try {
  const outDirs = [...new Set(DEVICES.map(device => device.outDir))];
  await Promise.all(outDirs.map(outDir => mkdir(resolve(outRoot, outDir), { recursive: true })));

  const jobs = DEVICES.flatMap(device => layouts.map(name => ({ device, name })));
  // 4 in flight at a time: each device/layout combo is an independent
  // browser context, so this cuts the sequential ~24s+ wall-clock time on
  // the full 3-device x 4-layout matrix roughly 4x without launching all 12
  // contexts at once.
  await withConcurrency(jobs, 4, ({ device, name }) => screenshotOne(browser, device, name));
} finally {
  await browser.close();
  if (serverProc) serverProc.kill('SIGTERM');
}
