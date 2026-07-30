# TODO: responsive layouts across all TRMNL devices

## Publication status

This is intentionally deferred to a dedicated responsiveness session. The
public-registry automated review reported that no `lg:` or `portrait:`
classes are present and asked for TRMNL X landscape/portrait verification.
Do not add token responsive classes just to silence that warning: complete
the visual pass below and use responsive utilities only where they solve an
observed layout difference.

Treat this as the remaining pre-publication design task. The other automated
review items (image dithering, clickable form links, and moving outbound
requests from the transform into polling URLs) were handled separately.

### Acceptance criteria for the dedicated session

- Render and visually inspect all four layouts on TRMNL X in landscape
  (1040×780 CSS pixels) and portrait (780×1040).
- Render and visually inspect all four layouts on TRMNL OG/OG Plus
  (800×480), including every half/quadrant layout crop.
- Exercise the existing busy fixture: two directions, multiple trips, long
  stop names, and a three-stop chain.
- No clipped titles, trips, stop chains, times, or title-bar content.
- Add meaningful `lg:` and/or `portrait:` framework utilities where the
  rendered evidence calls for them.
- Extend `scripts/screenshots.mjs` to keep the tested device/orientation
  matrix as a repeatable regression check.
- Regenerate the committed screenshots and run `mise run lint` plus
  `mise run build` before considering the plugin ready to publish.

## Problem

The Liquid templates were sized for the original TRMNL (`og_plus`,
800×480). On smaller layouts with the sample payload, content overflows:

- **`half_vertical.liquid`** (400×480) clips the first section's title
  and the last trip. Caused by both directions carrying 2 trips, one a
  three-stop chain — the column stack exceeds 480px and the framework
  trims rather than scaling.
- Other layouts likely have similar issues at the edges (e.g.
  `quadrant` when both directions have busy trips).

On TRMNL X (`v2`, 1872×1404 / 1040×780 in the dev-server iframe) the
extra vertical room hides this — see [`screenshots/`](screenshots/) —
but the templates are still brittle on the original device.

## Goal

One set of templates that renders correctly on every device the TRMNL
framework supports (TRMNL OG, TRMNL X, Kindle variants, Inkplate,
Kobo, etc. — full list at <https://usetrmnl.com/api/models>).

## Approach

Lean on the TRMNL framework's screen-class scoping rather than
device-specific templates. Every render is wrapped in
`screen screen--{palette} screen--{device} screen--{size} screen--1x`
(see `scripts/screenshots.mjs` for the picker's class
composition). The framework already ships size buckets — `screen--sm`,
`screen--md`, `screen--lg` — and per-class typography/spacing scales.

Things to try, in rough order of cost:

1. **Use the framework's smaller text/spacing variants on `screen--md`
   and below** for the trips list. The template currently picks
   `label--small` / `value--tnums` unconditionally; size-scoped overrides
   in a small `<style>` block inside the Liquid (or moved into TRMNL's
   custom CSS field) could shrink them on small devices.
2. **Reduce `limit:` on small sizes.** `half_vertical` currently does
   `{% for trip in sec.trips limit: 2 %}`. A Liquid conditional keyed
   off some indicator of available height — or just bumping it to
   `limit: 1` for the half/quadrant cases — would prevent overflow.
   (Liquid has no media query, so this likely needs a custom field or a
   branch in the serverless transform.)
3. **Truncate long stop chains.** A three-stop intermediate trip is what
   pushes things over the edge most often. Show
   `origin → … → destination` (drop intermediates) when the layout is
   small.
4. **Verify on each device size class.** The screenshot script can be
   parameterized to render each model in `https://usetrmnl.com/api/models`
   — make `SCREEN_CLASSES` and `VIEWPORT` per-device and emit one PNG
   per (layout, device) pair. Useful regression artifact.

## Pointers

- Templates: [`src/*.liquid`](../src/)
- Sample payload (the content currently overflowing):
  `.trmnlp.yml` → `variables:` block
- Screenshot tool: [`scripts/screenshots.mjs`](../scripts/screenshots.mjs)
- TRMNL Framework docs: <https://usetrmnl.com/framework>
- Device catalog (canonical class names + dimensions):
  <https://usetrmnl.com/api/models>
