<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/themes
     ============================================================ -->

# Themes

Themes are standalone stylesheets that re-point semantic channels, component slots, and utility tokens at different palette tokens. A themed screen still renders through its device mode: dither patterns on 1-bit, palette images on limited color, solids on full color.

### Usage

Each theme ships as a standalone stylesheet alongside `plugins.css`. Include the theme file and add `screen--theme-` to your screen element. Themes remap which tokens paint each surface; the screen's device mode (bit depth, palette) still decides how those tokens render: dither patterns on 1-bit, solids on full color.

Themes are light/dark agnostic: a theme is a complete color statement, so `screen--dark-mode` has no effect on a themed screen. A theme that wants a dark variant can style `.screen--theme-.screen--dark-mode` in its own stylesheet.

Monochrome plugin icons follow the theme automatically when they carry the `image--adaptive` class. See [Image](https://trmnl.com/framework/docs/3.2/image) .

```html
<link rel="stylesheet" href="plugins.css">
<link rel="stylesheet" href="themes/black-and-yellow-theme.css">

<div class="screen screen--theme-black-and-yellow">...</div>
```

To preview any docs example with a theme, pick a Style in the screen picker. It applies to every example on the page and persists across pages.

### Available Themes

The framework ships these themes. Apply one in your own markup with its `screen--theme-` class:

- **Black and Yellow**: `screen--theme-black-and-yellow` 
- **Dark**: `screen--theme-dark` 
- **White and Red**: `screen--theme-white-and-red`
Dark is how you render a plugin dark. Add `screen--theme-dark` to the screen element and every surface recolors through the slot system, the same mechanism the other themes use. The plugin's own markup stays as written.

To see them in action, open the screen picker (top right) and choose a Style. The example below carries no theme of its own, so it follows both the device mode and the Style you select, exactly as your plugin would on a themed screen.

### Themes in JavaScript

Themes never ship JavaScript. A theme is only CSS, and that CSS is the single source of truth, so a theme is readable from JS without any extra authoring:

- `TRMNLPaint`: resolves every color and tile pattern straight from the live cascade, so charts and other JS-driven visuals follow the active theme. 
- `TRMNLPaint.cssVar()`: reads back the public `--*` custom properties a theme publishes on the screen. This is the documented extension path for a theme that wants to expose its own values to plugin code, and it needs no framework changes.
See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

### The Themes API

Themes are authored against a fixed contract: slot mixins map framework surfaces to different tokens, and the paint pipeline stays untouched. The two pages below carry the workflow and the full slot vocabulary.

#### Authoring Themes

*:last-child]:!mb-0"> The contract and workflow: start from the boilerplate, map slots, register the id, and lint.

Go to [Authoring Themes](https://trmnl.com/framework/docs/3.2/theme_authoring)

#### Theme Slots

*:last-child]:!mb-0"> Every themable surface: semantic channels, component slots, utility remaps, border lines, and the chart ramp.

Go to [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots)

### Where This Applies

These pages document the surfaces this API programs.

[
## Image
](https://trmnl.com/framework/docs/3.2/image)

Previous

[Sass Mixins Screen-targeting mixins and scale functions for authoring device-aware SCSS](https://trmnl.com/framework/docs/3.2/sass_mixins)

Next

[Authoring Themes The theme contract and workflow: boilerplate, slot mapping, registration, and linting](https://trmnl.com/framework/docs/3.2/theme_authoring)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/theme_authoring
     ============================================================ -->

# Authoring Themes

A theme maps framework slots to different tokens and never touches the paint pipeline, so a themed screen keeps its device-capability rendering. This page walks the workflow: start from the boilerplate, map your slots, register the id, and lint.

### The contract

A theme sets token *references* through the theme-slot mixins and never touches the paint pipeline directly. The screen's device mode still decides how every token renders: dither patterns on 1-bit, palette images on limited color, solids on full color.

- Allowed: semantic channel refs (`theme-slots.semantic-bg/text/stroke/border`) 
- Allowed: component slot refs (`theme-slots.bg-slot/text-slot/border-level-slot/border-token-slot`) 
- Allowed: utility token remaps (`theme-slots.utility-*` and the bulk `utility-remap-*` helpers) 
- Optional: icon paint for adaptive images (`theme-slots.semantic-icon`). When omitted, `image--adaptive` icons follow the theme's semantic text-primary paint. 
- Disallowed: root palette overrides (`--white`, `--black`, `--gray-*`, `--color-*`) 
- Disallowed: framework-owned paint variables (`--bg-*`, `--text-*`, `--border-*`)
The full vocabulary of channels, slots, and remaps lives on [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) .

### Start from the boilerplate

`framework/themes/_theme-boilerplate.scss` is the starting point. A theme is one file: load the theme-slot mixins, emit the framework layer order, open the `tn--themes` layer, and scope every rule to `.trmnl .screen--theme-`.

Keep `@include layers.order;` above the layer block. Cascade layer order is fixed by whichever stylesheet the browser parses first. Without it, a theme link placed before `plugins.css` loses to the framework defaults.

```scss
@use "../config/layers" as layers;
@use "../mixins/theme-slots" as theme-slots;

@include layers.order;

@layer tn--themes {
    .trmnl .screen--theme-example {
        // 1. Semantic channels: the whole screen in a few lines.
        @include theme-slots.semantic-bg("canvas", "yellow");
        @include theme-slots.semantic-text("text-primary", "black");

        // 2. Component slots: tune specific surfaces.
        @include theme-slots.bg-slot("title-bar", "yellow-40");

        // 3. Utility remaps: re-point the raw bg--/text-- utilities.
        @include theme-slots.utility-remap-grayscale("yellow");

        // Optional: give image--adaptive icons their own paint
        // (they follow text-primary when this is omitted)
        // @include theme-slots.semantic-icon("yellow-20");
    }
}
```

Work in that order: semantic channels first, then component slots, then utility remaps. The shipped themes follow the same section order, so they read as reference implementations: `black-and-yellow-theme.scss` is a dark-side grayscale remap, `white-and-red-theme.scss` a bright-side remap with one targeted utility exception.

### Register and lint

The file name, the registry id, and the screen class stay in sync: `themes/-theme.scss` registers as `` in `lib/framework/themes.rb` and applies as `screen--theme-`.

`rake framework:themes:lint` enforces the contract on every theme file:

- The theme files on disk match the registry ids. 
- No framework-owned paint variables (`--bg-*`, `--text-*`, `--border-*`). 
- No root palette overrides (`--white`, `--black`, `--gray-*`, `--color-*`). 
- No calls to the deprecated `role-token` helper.

### Compile and ship

Each theme compiles to its own stylesheet, never into `plugins.css`. It ships as a second `` next to the framework, and the screen opts in with its theme class; see [Themes](https://trmnl.com/framework/docs/3.2/themes) for usage and [Compiling the Framework](https://trmnl.com/framework/docs/3.2/sass_build) for the compile command.

### Dark mode

Themed screens are exempt from the framework's dark-mode remaps: every dark rule carries a zero-specificity `:where(:not([class*="screen--theme-"]))` gate, so a theme is a complete color statement and `screen--dark-mode` has no effect on it.

A theme that wants a dark variant styles the combination itself, with the same plain mixins as the rest of the theme. There is no dark remap to work around, so the device mode still resolves every token: dither patterns on 1-bit, palette tiles on limited color, solids on full color.

```scss
.trmnl .screen--theme-example.screen--dark-mode {
    @include theme-slots.semantic-bg("canvas", "black");
    @include theme-slots.semantic-bg("surface", "black");
    @include theme-slots.semantic-text("text-primary", "yellow");
}
```

**Do not use $raw: true in a theme.** It skips the mode pipeline, so the surface renders as one flat color with no dither on 1-bit and no palette tile on `screen--color-4bwry`. The framework uses it only for its own unthemed dark defaults.

### Expose values to JavaScript

Themes never ship JavaScript. A theme that wants to hand extra values to plugin code publishes its own public `--*` custom properties on the screen, and JS reads them back with `TRMNLPaint.cssVar()`. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

### Where This Applies

These pages document the surfaces this API programs.

[
## Tokens
](https://trmnl.com/framework/docs/3.2/tokens)

Previous

[Themes Opt-in stylesheets that re-theme screens while preserving device-capability rendering](https://trmnl.com/framework/docs/3.2/themes)

Next

[Theme Slots Every themable surface: semantic channels, component slots, utility remaps, border lines, and the chart ramp](https://trmnl.com/framework/docs/3.2/theme_slots)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/theme_slots
     ============================================================ -->

# Theme Slots

Every surface a theme can re-point, with the mixin that sets it: semantic channels, component slots, utility remaps, border lines, and the chart ramp. Slots take token references, so each one still resolves through the device mode at render time.

### Semantic channels

The semantic channels are the preferred API: a few lines re-theme the whole screen, and every component that reads a channel follows. The channels are a fixed set:

- Backgrounds: `canvas`, `surface`, `backdrop`, `fill-strong`, `fill-muted`, `fill-soft` 
- Text: `text-primary`, `text-secondary`, `text-inverse` 
- Stroke: `stroke-contrast` 
- Borders: `border-strong`, `border-muted` 
- Icon: one global channel for `image--adaptive` paint, defaulting to text-primary. See [Image](https://trmnl.com/framework/docs/3.2/image) .

- `semantic-bg($semantic, $token)`: points a background channel at a token. 
- `semantic-text($semantic, $token)`: points a text channel at a token, carrying the full text paint (ink, tile, clip). 
- `semantic-stroke($semantic, $token)`: points the stroke channel at a token. 
- `semantic-border($semantic, $token)`: points a border channel at a token's fill paint. 
- `semantic-icon($token)`: optional paint for adaptive icons; omit it and icons follow text-primary.
Every semantic mixin takes `$raw: true`, which points the channel at a root palette variable and skips the mode pipeline. The framework uses it for its own unthemed dark defaults, where the dark remap would invert the value a second time. Theme files have no use for it; see [Authoring Themes](https://trmnl.com/framework/docs/3.2/theme_authoring) .

```scss
@include theme-slots.semantic-bg("canvas", "yellow");
@include theme-slots.semantic-bg("surface", "yellow");
@include theme-slots.semantic-text("text-primary", "black");
@include theme-slots.semantic-text("text-secondary", "yellow-30");
@include theme-slots.semantic-stroke("stroke-contrast", "yellow");
@include theme-slots.semantic-border("border-muted", "yellow-30");
```

### Component slots

Component slots tune one surface without moving a whole channel. A slot name is the variable fragment a component reads, and each slot takes one kind of paint. These are the slots components consume today:

- Background slots: `screen-backdrop`, `title-bar`, `item-meta`, `item-meta-emphasis-2`, `item-meta-emphasis-3`, `progress-track`, `progress-fill`, `progress-fill-emphasis-2`, `progress-fill-emphasis-3`, `progress-dot`, `progress-dot-current`, `table-meta`, `table-meta-device`, `chip` 
- Text slots: `label-gray`, `chip` 
- Border slots: `table-head-row`, `table-body-row`, `label-underline`
`chip` is a pair, one background slot and one text slot for the same surface: a solid marker box with readable text on it, for plugin surfaces the framework has no component for. It is the only slot whose default names semantic channels instead of a token, taking its field from `fill-strong` and its text from `text-inverse`. State both halves in a theme when the marker box needs its own pairing, the way White and Red gives it a white field with red text.

Pointing a slot at a channel it does not take is silent. A background slot given `text-slot` writes four variables no component reads, and nothing on the screen changes.

- `bg-slot($slot, $token)`: a slot's background paint. 
- `text-slot($slot, $token)`: a slot's text paint, including the tile and clip. 
- `border-level-slot($slot, $level, $dir: h)`: points a slot's border at one of the framework border levels. 
- `border-token-slot($slot, $token, $dir: h)`: points a slot's border at a token's fill paint instead of a level.
Slot values cascade from the screen, so you can set them again on a component or state wrapper. On unthemed screens the `inverse` class supplies local defaults for the opposite of the screen's scheme. Inside a theme the subtree keeps the theme's slots, and the theme's inverse rule restates the ones that flip with the ground.

```scss
@include theme-slots.bg-slot("title-bar", "yellow-40");
@include theme-slots.bg-slot("progress-fill", "yellow-55");
@include theme-slots.text-slot("label-gray", "yellow-30");
@include theme-slots.border-token-slot("label-underline", "yellow-30");

.screen--theme-example .inverse {
    @include theme-slots.bg-slot("progress-fill", "yellow-20");
}
```

### Utility remaps

Utility remaps re-point the raw palette utilities (`bg--*`, `text--*`, `text-stroke--*`), so plugin markup that names gray tokens follows the theme without edits.

- `utility-remap-grayscale($to-hue, $side)`: the bulk remap of the whole grayscale ladder to a hue. `$side: 'dark'` (default) compresses grays into the hue's dark steps 10 to 40, keeps black as ink, and sends white to the hue; `'bright'` compresses into steps 45 to 75, sends black to the hue, and keeps white; `'linear'` maps gray steps 1:1 to hue steps. Strokes are the exception: the token sent to the hue takes the nearest hue step for its stroke instead (45 under bright, 40 under dark, 75 under linear), so outlines never dissolve into the canvas. 
- `utility-remap-border-grayscale($to-hue, $side)`: the same idea for the two border line inks, recoloring the staggered patterns without touching their geometry. 
- `utility-bg($token, $remap-to)` / `utility-text($token, $remap-to)` / `utility-stroke($token, $remap-to)`: remap one utility token, for exceptions on top of a bulk remap. 
- `utility-border-token($level, $dir, $token)`: remap one border level and direction to a token's paint. 
- `utility-border-level($level, $dir, $from-level)`: point one border level at another level's art, fields and render program included. This is the handle the 2-bit rail needs, where the four tones are literal in the line data and no token remap can reach them. Restating a level onto itself is not a no-op: it also pins that level to the family's own line polarity.
The three shipped themes show every side: Black and Yellow is a dark-side remap; White and Red is a bright-side remap plus one exception, `utility-bg("white", "red")`, so white surfaces adopt the canvas hue while white text stays ink. Dark mirrors the grayscale axis and leans on `utility-border-level` for the 2-bit rail and for the one level that maps to itself.

```scss
// White and Red: bright-side remap with one exception.
@include theme-slots.utility-remap-grayscale("red", $side: "bright");
@include theme-slots.utility-remap-border-grayscale("red", $side: "bright");
@include theme-slots.utility-bg("white", "red");
```

### Border levels and lines

Border levels are the seven-step intensity scale the border pipeline renders: 1 is black, 2 through 6 step through the grays (gray-15, gray-30, gray-40, gray-50, gray-65), 7 is white, each with an `h` and a `v` direction. `border-level-slot` points a component slot at a level; `utility-border-token` re-points a level itself, and the bulk line remap recolors the two dither line inks. See [Border](https://trmnl.com/framework/docs/3.2/border) and [Divider](https://trmnl.com/framework/docs/3.2/divider) for how levels render.

Every border slot and remap moves two outputs: the CSS background and the SVG render program that `TRMNLPaint.border()` and `TRMNLPaint.divider()` export. A slot bound to a level carries that level's pattern program. A slot or remap bound to a token exports a flat line in the token's stroke color, because a token line has no pattern program of its own.

### The chart ramp

`chart-series-ramp($tokens, $span: 6)` publishes the theme's chart-series ramp. `$tokens` is an ordered list running from the strongest contrast against the canvas (series 0) toward the canvas tone; each slot aliases the token's own paint, so series inherit per-mode dithers and solids for free. `$span` is the legible front of the ramp that JavaScript spreads series across.

The ramp always publishes 16 slots, so a short list is safe: the slots past your last token are cleared rather than left holding the framework grayscale, and `$span` never reaches past that token.

Charts read the ramp through `TRMNLPaint.series()`; see [Painting Charts](https://trmnl.com/framework/docs/3.2/paint_charts) and [Chart](https://trmnl.com/framework/docs/3.2/chart) .

```scss
@include theme-slots.chart-series-ramp((
    black, yellow-10, yellow-20, yellow-30, yellow-40, yellow-55, yellow-75, yellow
));
```

### Where This Applies

These pages document the surfaces this API programs.

[
## Border
](https://trmnl.com/framework/docs/3.2/border) [
## Colors
](https://trmnl.com/framework/docs/3.2/colors) [
## Title Bar
](https://trmnl.com/framework/docs/3.2/title_bar) [
## Label
](https://trmnl.com/framework/docs/3.2/label) [
## Item
](https://trmnl.com/framework/docs/3.2/item) [
## Table
](https://trmnl.com/framework/docs/3.2/table) [
## Progress
](https://trmnl.com/framework/docs/3.2/progress)

Previous

[Authoring Themes The theme contract and workflow: boilerplate, slot mapping, registration, and linting](https://trmnl.com/framework/docs/3.2/theme_authoring)

Next

[CSS Variables The CSS variable contract: which families are public, which are internal, and who reads, re-points, and generates them](https://trmnl.com/framework/docs/3.2/variables_api)
