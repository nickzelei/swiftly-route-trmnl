# Responsive layouts across TRMNL devices — resolved

## Status: done, pre-publication blocker cleared

The public-registry automated review reported that no `lg:` or `portrait:`
classes were present and asked for TRMNL X landscape/portrait verification.
This session did the visual pass and added responsive utilities only where
the rendered evidence showed an actual layout difference — not just to
silence the warning. See git history on this file for the original task
description if the approach needs revisiting.

### What was verified

- All four layouts, rendered and visually inspected on:
  - TRMNL X, landscape (1040×780 CSS px) and portrait (780×1040).
  - TRMNL OG Plus (`ogv2`, 800×480), landscape only — OG hardware doesn't
    rotate.
- The existing busy fixture in `.trmnlp.yml` (two directions, multiple
  trips, long stop names, a three-stop chain) — the same data used for the
  original overflow report.
- No clipped titles, trips, stop chains, times, or title-bar content in any
  of the 12 (layout × device × orientation) renders.

### What changed

- **`src/full.liquid` / `src/half_horizontal.liquid`**: the two-direction
  `.columns` row was cramming itself into a narrow strip in portrait
  (columns don't reflow on their own — TRMNL X portrait is 780 CSS px wide,
  same as landscape's height). Added `portrait:flex--col portrait:gap--large`
  on `.columns` and `portrait:w--full` on each `.column` so directions stack
  top-to-bottom and use the full width in portrait, matching what
  `half_vertical`/`quadrant` already did with a plain flex column.
- **`src/half_vertical.liquid`**: this was the layout with a real overflow —
  two directions × 2 trips (one a three-stop chain) exceeds 480px on
  `screen--md` (TRMNL OG Plus). Rather than branching the transform per
  device (no Liquid media queries exist to key off), the second trip in each
  direction now carries `hidden lg:block` — hidden on `sm`/`md`, shown only
  on `screen--lg` (TRMNL X), which is the only size class with the vertical
  room for it. `quadrant.liquid` already only rendered one trip per
  direction plus `data-clamp="1"`, so it needed no changes.
- Fixed a latent bug found along the way: `full.liquid`'s title used
  `title--medium`, which isn't a class the framework ships (verified against
  the real `plugins.css`) — it was a silent no-op. Dropped it.
- `scripts/screenshots.mjs` now renders a device/orientation matrix instead
  of a single TRMNL X landscape shot: `docs/screenshots/*.png` (TRMNL X
  landscape, unchanged paths), `docs/screenshots/portrait/*.png` (TRMNL X
  portrait), `docs/screenshots/og-plus/*.png` (TRMNL OG Plus landscape).
  Device/size classes and CSS pixel dimensions came from
  `https://usetrmnl.com/api/models` and cross-checked against the real
  `plugins.css`/`trmnl-picker.js` rather than assumed. Also switched the
  page-load wait from `networkidle` to `load` — `networkidle` was flaky once
  the script started spinning up many browser contexts back to back
  (Google Fonts' preconnect never fully idles).

## Reference: how the framework's responsive scoping actually works

Confirmed directly against the shipped framework assets (not just docs),
since this repo had no working example to copy from before this session:

- Device/size classes come from each model's `css.classes` in the
  `/api/models` response (e.g. TRMNL X → `screen--v2 screen--lg`, TRMNL OG
  Plus → `screen--ogv2 screen--md`). Bit-depth palette class follows the
  model's `bit_depth` (4-bit for TRMNL X, 2-bit for OG Plus).
- Portrait is **not** a separate device/model — the dev-server picker just
  appends a `screen--portrait` class (see `trmnl-picker.js`), which swaps the
  framework's `--screen-w`/`--screen-h` CSS custom properties. Any device
  class can be combined with it.
- Responsive utilities compile to ordinary descendant selectors scoped to
  the screen class, e.g. `.trmnl .screen--portrait .portrait\:flex--col{...}`
  — there's no real media query involved, since the render is already
  per-device. Breakpoints (`sm:`/`md:`/`lg:`) are mobile-first: an unprefixed
  utility applies at every size unless a larger breakpoint overrides it.
- `trmnlp`'s render route (`web/views/render_html.erb`) does no layout math
  itself — it just wraps the template in `<div class="{screen_classes}">`
  and `<div class="view view--{layout}">`; all sizing comes from the
  framework CSS's `calc()` chain off `--screen-w`/`--screen-h`.

## Pointers

- Templates: [`src/*.liquid`](../src/)
- Sample payload: `.trmnlp.yml` → `variables:` block
- Screenshot tool: [`scripts/screenshots.mjs`](../scripts/screenshots.mjs)
- TRMNL Framework docs: <https://usetrmnl.com/framework>
- Device catalog (canonical class names + dimensions):
  <https://usetrmnl.com/api/models>
