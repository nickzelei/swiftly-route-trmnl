<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/v3_overview
     ============================================================ -->

# V3.2 Overview

Framework 3.2 makes plugins theme-aware. It adds opt-in theme stylesheets, the TRMNLPaint JavaScript paint API, adaptive charts and icons, rebuilt border, outline, and stroke utilities, and Fluid Mashups for arranging views, all on top of the v3 color system. Existing markup keeps working; every 3.2 feature is opt-in.

### The v3 Color Foundation

3.2 builds on the color system introduced in v3.0: 10 chromatic hues with 14 lightness steps, semantic roles (primary, success, error, warning), a 14-step grayscale, and per-mode CSS custom properties on `.screen`, so colors follow each device's palette and bit depth with no per-device markup. 3.1 added the TRMNL font bundle as the low-density default. See [Colors](https://trmnl.com/framework/docs/3.2/colors) for the full palette.

### Independent Text Scale

Text Scale adjusts every framework font size and pixel line height without applying the same factor to interface geometry or text strokes. It composes with Scale, so a dense layout can keep larger text instead of shrinking both together. See [Text Scale](https://trmnl.com/framework/docs/3.2/text_scale) .

### Themes

Restyle a whole screen by loading one extra stylesheet and adding `screen--theme-`. A theme remaps which tokens paint each surface; device-capability rendering is preserved, so a themed screen still dithers on 1-bit and paints solids on full color. 3.2 ships three themes: Black and Yellow, White and Red, and Dark.

- A theme is a complete color statement: `screen--dark-mode` has no effect on a themed screen. 
- Author your own theme with the `theme-slots` mixins and validate it with `rake framework:themes:lint`. 
- Preview any docs example with a theme via the Style selector in the screen picker.
Full reference: [Themes](https://trmnl.com/framework/docs/3.2/themes) .

### TRMNLPaint: the JavaScript Paint API

Resolve any framework color, border rail, typography role, or numeric scale from JavaScript. `TRMNLPaint` reads the live CSS cascade, with device density, scale, bit depth, dark mode, themes, and limited palettes already applied. Token mappings and scale factors are never duplicated in JS.

- Resolvers: `bg()`, `text()`, `semantic()`, `series()`, `border()`, `type()`, and more. 
- Painters: `apply()`, `applyBorder()`, `applyType()` write resolved paint onto nodes. 
- `watch()` re-runs your build function whenever the screen's device, scale, mode, dark mode, or theme changes. 
- `cssVar()` reads any public custom property, the documented extension path for themes. 
- `scale()` reads the composed scale contract, and `px()` converts numeric JavaScript dimensions.
Full reference: [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

### Generated Paint Assets

Dither paint no longer ships as PNG images. Every grayscale and limited-palette tile is generated at build time as an inline ink SVG: the dark pixels are baked into the asset and the light tone rides the background color, so a screen paints with zero image fetches.

- One tile pipeline: CSS paints from the generated assets, and `TRMNLPaint` reads the same resolved output back for JavaScript consumers. 
- Dark mode and Raw/Preview recolor by re-pointing tokens at other tiles from the same generated set; the geometry never forks. 
- Regenerate from the color manifest with `rake framework:color_tokens`; hand-edited pattern assets are gone.

### Adaptive Charts

Charts historically painted explicit colors and ignored bit depth, dark mode, and themes. The plugin runtime now bundles `TRMNLCharts`, a Highcharts adapter built on TRMNLPaint. Chart series pull from the screen's chart-series ramp, grid lines use the border system, and plotted text uses framework typography, so charts adapt with the rest of the screen.

- `options()` and `merge()` give you adaptive Highcharts defaults under your own settings. 
- `series(i, n)` resolves each series fill; `applySwatches()` paints matching legend markers. 
- `watch()` rebuilds the chart on device, scale, mode, dark mode, or theme changes. 
- `TRMNLPaint.px()` scales numeric chart dimensions from the same live CSS contract.
Usage and live examples: [Chart](https://trmnl.com/framework/docs/3.2/chart) . For charting beyond Highcharts, use [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) directly.

### Adaptive Icons

Add `image--adaptive` to a monochrome silhouette icon and the framework repaints it with the screen's icon paint, following the same Raw/Preview, bit-depth, dark-mode, and theme cascade as framework text. One set of icons works everywhere, as long as they are same-origin or CORS-readable. See [Image](https://trmnl.com/framework/docs/3.2/image) .

### Rebuilt Borders, Outlines, and Strokes

The Border, Outline, Text Stroke, and Image Stroke utilities were rebuilt on the same token model as the color and pattern system. Each one paints from semantic and theme variables, so dark mode, themes, and bit depth recolor it with no per-mode markup.

- **Borders:** a shade-step rail, `border--h-{step}` and `border--v-{step}` on the same 10 to 75 scale as backgrounds, plus semantic `border--h-black` / `border--h-white` rails. The rail renders as generated gradients instead of PNG tiles, so a bordered screen fetches no images, and themes repaint it without changing its geometry. The numbered levels `border--h-1` through `border--h-7` still work but are deprecated. See [Border](https://trmnl.com/framework/docs/3.2/border) . 
- **Outline:** draws a pixel-perfect dotted rounded border from CSS gradients on 1-bit, and a solid rounded border on 2-bit and 4-bit. It paints from the semantic border channel, so dark mode and themes recolor it. See [Outline](https://trmnl.com/framework/docs/3.2/outline) . 
- **Text Stroke:** renders as concentric drop-shadow rings instead of native `-webkit-text-stroke`, so the stroke sits behind the glyph in every browser and survives background-clipped pattern fills. Sizes run `text-stroke--small` to `text-stroke--xlarge`; colors resolve through the theme chain. See [Text Stroke](https://trmnl.com/framework/docs/3.2/text_stroke) . 
- **Image Stroke:** outlines transparent images with the same size and color variants, now resolved through the theme and semantic layers so themed and dark-mode screens recolor them. See [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) .

### Mashup Backdrop

The `screen--backdrop` modifier now paints through the semantic backdrop slot. Themes restyle mashup backdrops, and dark mode gets its own backdrop treatment. See [Mashup](https://trmnl.com/framework/docs/3.2/mashup) .

### Fluid Mashups

Fluid Mashups sit alongside the fixed layouts: the `mashup--3x3` layout uses `mashup-cell` placement modifiers for custom three by three tilings, with no inline grid styles. Every cell draws the window frame and a compact title bar at any size, across bit depths, dark mode, and themes. See [Mashup](https://trmnl.com/framework/docs/3.2/mashup) .

### Complete Scale Modifiers

Scale modifiers now compose with each device's native UI density and resize framework gaps, pixel-based utilities, image presets, component geometry, radii, and strokes. The new `screen--scale-xxsmall` level adds a 66% scale for dense dynamic mashups, and `TRMNLPaint.px()` converts JavaScript dimensions from the same live CSS contract. See [Scale](https://trmnl.com/framework/docs/3.2/scale) .

### Under the Hood

- **Smaller stylesheets:** utility gate selectors and responsive variants are refactored onto `:is()` screen scopes, reducing the CSS footprint.

### Start Here

- Upgrading an existing plugin? → [V3.2 Upgrade Guide](https://trmnl.com/framework/docs/3.2/v3_upgrade_guide) . 
- Want to adopt themes, adaptive charts, and adaptive icons? → [V3.2 Enhancement Guide](https://trmnl.com/framework/docs/3.2/v3_enhancement_guide) . 
- New to the framework? Start with [Colors](https://trmnl.com/framework/docs/3.2/colors) and [Themes](https://trmnl.com/framework/docs/3.2/themes) .

Next

[V3.2 Upgrade Guide Compatibility notes for upgrading plugins to Framework 3.2](https://trmnl.com/framework/docs/3.2/v3_upgrade_guide)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/v3_upgrade_guide
     ============================================================ -->

# V3.2 Upgrade Guide

Framework 3.2 is fully backward compatible with 3.0 and 3.1. Existing class names render unchanged, and every 3.2 feature (themes, the paint API, adaptive charts, adaptive icons) is opt-in. This guide lists the few things worth reviewing when you upgrade.

### From Framework 3.0 or 3.1

Upgrade and rerender: your plugin looks the same until you opt into 3.2 features. Two things are worth reviewing.

- **Numbered border levels are deprecated:** `border--h-1` through `border--h-7` (and vertical counterparts) still render, but will be removed in Framework 4.0. Prefer the shade-step rail (`border--h-10` to `border--h-75`) in new markup. See [Border](https://trmnl.com/framework/docs/3.2/border) . 
- **Themed screens ignore dark mode:** if you add a `screen--theme-` class, `screen--dark-mode` no longer applies. A theme is a complete color statement. See [Themes](https://trmnl.com/framework/docs/3.2/themes) .

### From Framework v2

v3 is structurally backward compatible with v2: your class names still compile and render. One visual change needs review: v3 rebuilt the `1bit` grayscale dither patterns on a 14-step linear scale, so most shade names produce different lightness values than they did in v2.

The full shade-by-shade migration table lives in the [Framework 3.1 upgrade guide](https://trmnl.com/framework/docs/3.1/v3_upgrade_guide). It lists each shade's v2 and v3 lightness and which v3 shade restores the original look.

### Verifying the Upgrade

Use the Raw / Preview toggle in Device Preview to compare full-bright token values against panel-accurate output. To check theme behavior, pick a Style in the screen picker and confirm your plugin stays legible under each theme.

### Next Steps

Head to the [V3.2 Enhancement Guide](https://trmnl.com/framework/docs/3.2/v3_enhancement_guide) to make your plugin theme-ready and to adopt adaptive charts and icons.

Previous

[V3.2 Overview What's new in Framework 3.2: themes, the TRMNLPaint JS API, adaptive charts and icons, and theme-driven borders](https://trmnl.com/framework/docs/3.2/v3_overview)

Next

[V3.2 Enhancement Guide Make your plugin theme-ready and adopt adaptive charts, icons, and JS paint](https://trmnl.com/framework/docs/3.2/v3_enhancement_guide)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/v3_enhancement_guide
     ============================================================ -->

# V3.2 Enhancement Guide

Framework 3.2 lets an existing plugin follow themes, dark mode, and device modes everywhere: in markup, in charts, in icons, and in text and image outlines. This guide walks through each enhancement you can adopt (theme readiness, adaptive charts, adaptive icons, JS paint, the border step rail, and legible overlaid text and images), one at a time and in any order.

### 1. Make Your Plugin Theme-Ready

A theme restyles the whole screen by remapping which tokens paint each surface. Your plugin does not load themes itself; it renders inside a screen that may carry one. A plugin is theme-ready when everything it draws goes through framework classes and tokens.

- Style with framework utilities (`bg--`, `text--`, `border--`) and elements (`label`, `value`, `title`). Themes remap all of them. 
- Avoid hardcoded hex colors and inline styles; a theme cannot remap paint it does not own. 
- Test with the Style selector in the docs screen picker. It applies a theme to every example on the page.
To theme a screen you control, include the theme stylesheet and add the theme class. Note that `screen--dark-mode` has no effect on a themed screen; a theme is a complete color statement. See [Themes](https://trmnl.com/framework/docs/3.2/themes) .

```html
<link rel="stylesheet" href="plugins.css">
<link rel="stylesheet" href="themes/black-and-yellow-theme.css">

<div class="screen screen--theme-black-and-yellow">...</div>
```

### 2. Migrate Charts to TRMNLCharts

Charts with hardcoded colors stay frozen while the rest of the screen adapts. The plugin runtime bundles `TRMNLCharts`, a Highcharts adapter that resolves series fills, grid lines, and text styles from the live screen.

- Build your chart inside `TRMNLCharts.watch()` so it rebuilds when the device, scale, mode, dark mode, or theme changes. 
- Start from `TRMNLCharts.options()` merged under your own settings. 
- Color each series with `TRMNLCharts.series(i, n)` instead of a literal color. 
- Convert numeric chart dimensions with `TRMNLPaint.px()`.

```javascript
var el = document.getElementById("my-chart");

TRMNLCharts.watch(el, function () {
  var px = function (value) { return TRMNLPaint.px(value, { el: el }); };
  Highcharts.chart(el, TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
    chart: { height: px(260) },
    plotOptions: { series: { lineWidth: px(4) } },
    series: [
      { data: incoming, color: TRMNLCharts.series(0, 2, { el: el }) },
      { data: outgoing, color: TRMNLCharts.series(1, 2, { el: el }) }
    ]
  }));

  // Paint legend markers tagged data-chart-series="i" from the same ramp.
  TRMNLCharts.applySwatches({ el: el });
});
```

Full examples for line, multi-series, and bar charts are on the [Chart](https://trmnl.com/framework/docs/3.2/chart) page.

### 3. Mark Monochrome Icons Adaptive

Add `image--adaptive` to monochrome silhouette icons. The framework flattens the icon to its alpha shape and repaints it with the screen's icon paint, following Raw/Preview, bit depth, dark mode, and the active theme.

```html
<!-- Monochrome silhouette icons (shape on a transparent background) -->
<img class="image--adaptive" src="path to icon">
```

- Silhouettes only: never use it on photos or multi-color logos. Use [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) to keep those legible instead. 
- Icons must be same-origin or served from a CORS-enabled host, or the framework leaves them unpainted. See [Image](https://trmnl.com/framework/docs/3.2/image) .

### 4. Resolve Paint from JavaScript

For custom JS-drawn visuals beyond Highcharts (canvas, SVG, other libraries), resolve framework paint with `TRMNLPaint`. It reads the live cascade, so bit depth, dark mode, themes, and limited palettes are already applied.

```javascript
// A background token: solid color on 4-bit+, dither tile on 1-bit.
var fill = TRMNLPaint.bg("gray-40", { el: "my-visual" });

// The effective one-color value of a text utility for SVG or canvas text.
var ink = TRMNLPaint.textColor("default", { el: "my-visual" });

// Rebuild whenever the screen device, scale, mode, dark mode, or theme changes.
TRMNLPaint.watch("my-visual", function () { draw(); });
```

The full resolver and painter surface is documented on [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

### 5. Move Borders to the Step Rail

Replace the numbered border levels with shade-step selectors (the numbered classes still render, but they are deprecated). Steps use the same 10 to 75 scale as the background utility, and themes repaint the whole rail. The rail now renders as generated gradients instead of PNG tiles, so a bordered screen fetches no border images.

```html
<!-- Before: numbered levels (deprecated) -->
<div class="item border--h-5">...</div>

<!-- After: shade steps, plus semantic black/white rails -->
<div class="item border--h-45">...</div>
<div class="item border--h-black">...</div>
```

See [Border](https://trmnl.com/framework/docs/3.2/border) for the full step scale and the themed rendering behavior.

### 6. Keep Overlaid Text and Images Legible

Text and images placed over a shaded or patterned surface can lose contrast. The Text Stroke and Image Stroke utilities outline them, and both were rebuilt to follow themes, dark mode, and bit depth like the rest of the screen.

- Add `text-stroke` to framework text over a busy background, and size it with `text-stroke--small` through `text-stroke--xlarge`. The stroke renders as drop-shadow rings, so it stays behind the glyph and behind background-clipped pattern fills in every browser. 
- Add `image-stroke` to a transparent or vector image for the same effect, with the matching `--small` through `--xlarge` sizes. 
- Leave the color off to stroke with the default contrast ink, or set one with a color variant (`text-stroke--black`, `image-stroke--white`, or any palette token). Color variants resolve through the theme chain, so themed and dark-mode screens recolor the outline to match.

```html
<!-- Framework text over a shaded background -->
<span class="value text-stroke text-stroke--medium">64%</span>

<!-- Transparent or vector image over a pattern -->
<img class="image-stroke image-stroke--large" src="path to icon">
```

Full size and color scales are on the [Text Stroke](https://trmnl.com/framework/docs/3.2/text_stroke) and [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) pages.

Previous

[V3.2 Upgrade Guide Compatibility notes for upgrading plugins to Framework 3.2](https://trmnl.com/framework/docs/3.2/v3_upgrade_guide)

Next

[TRMNL X Guide Framework changes for TRMNL X compatibility](https://trmnl.com/framework/docs/3.2/trmnl_x_guide)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/trmnl_x_guide
     ============================================================ -->

# TRMNL X Guide

TRMNL X is a larger, 4-bit ePaper display. This guide covers what changed in the Framework to support it: new size modifiers, container query units, responsive overflow columns, and layout improvements. Existing plugins keep working; adopt these features to use the larger screen, portrait orientation, and expanded grayscale.

### The --base Modifier

Every element and component now supports an explicit `--base` size modifier. It produces the exact same result as using the class without any size modifier, but it lets you **reset to the default size at a specific breakpoint**.

Previously, if you set a smaller size for compact screens, there was no way to undo it at a larger breakpoint. Now you can:

```html
<!-- Small title on compact screens, default size on large screens -->
<span class="title title--small lg:title--base">Dashboard</span>

<!-- Extra-small value by default, normal size on medium+ screens -->
<span class="value value--xsmall md:value--base">48,206</span>

<!-- Small gap by default, standard gap on large screens -->
<div class="flex flex--col gap--small lg:gap--base">...</div>
```

The `--base` modifier is available on:

- **Typography:** [Title](https://trmnl.com/framework/docs/3.2/title) (`title--base`), [Value](https://trmnl.com/framework/docs/3.2/value) (`value--base`), [Label](https://trmnl.com/framework/docs/3.2/label) (`label--base`), [Description](https://trmnl.com/framework/docs/3.2/description) (`description--base`) 
- **Rich Text:** [Rich Text](https://trmnl.com/framework/docs/3.2/rich_text) (`content--base`) 
- **Components:** [Table](https://trmnl.com/framework/docs/3.2/table) (`table--base`), [Progress](https://trmnl.com/framework/docs/3.2/progress) (`progress-bar--base`, `progress-dots--base`) 
- **Utilities:** [Gap](https://trmnl.com/framework/docs/3.2/gap) (`gap--base`), [Rounded](https://trmnl.com/framework/docs/3.2/rounded) (`rounded--base`), [Text Stroke](https://trmnl.com/framework/docs/3.2/text_stroke) (`text-stroke--base`), [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) (`image-stroke--base`)

### New Larger Typography Sizes

To take full advantage of TRMNL X's larger display, new size tiers have been added across all typography elements. All new sizes support responsive prefixes and render correctly on 2-bit and 4-bit screens.

#### Value

Four new sizes for hero-style numbers and display text. See the [Value](https://trmnl.com/framework/docs/3.2/value) docs for full details.

```html
<span class="value value--mega">42</span>    <!-- 170px -->
<span class="value value--giga">42</span>    <!-- 220px -->
<span class="value value--tera">42</span>    <!-- 290px -->
<span class="value value--peta">42</span>    <!-- 380px -->

<!-- Responsive example: xxxlarge on OG, giga on X -->
<span class="value value--xxxlarge lg:value--giga">42</span>
```

#### Title

Three new large sizes for headings. See the [Title](https://trmnl.com/framework/docs/3.2/title) docs.

```html
<span class="title title--large">Heading</span>     <!-- 30px -->
<span class="title title--xlarge">Heading</span>    <!-- 35px -->
<span class="title title--xxlarge">Heading</span>   <!-- 40px -->
```

#### Label, Description, Rich Text

New large sizes for [Label](https://trmnl.com/framework/docs/3.2/label) (`label--large`, `label--xlarge`, `label--xxlarge`), [Description](https://trmnl.com/framework/docs/3.2/description) (`description--large`, `description--xlarge`, `description--xxlarge`), and [Rich Text](https://trmnl.com/framework/docs/3.2/rich_text) content (`content--xlarge`, `content--xxlarge`, `content--xxxlarge`).

### Container Query Units

The [Layout](https://trmnl.com/framework/docs/3.2/layout) element now establishes a CSS Container Query context, enabling a new set of container-relative sizing utilities. Unlike viewport units, these are relative to the layout's dimensions, so they work correctly inside mashup slots (half vertical, quadrant, etc.) where the available space is a fraction of the full screen.

```html
<!-- Width as percentage of the layout container -->
<div class="w--[50cqw]">Half the layout width</div>

<!-- Height as percentage of the layout container -->
<div class="h--[80cqh]">80% of layout height</div>

<!-- Min/max constraints -->
<div class="w--min-[30cqw] w--max-[70cqw]">Constrained width</div>

<!-- Responsive container query units -->
<div class="w--[100cqw] lg:w--[50cqw]">Full width on small, half on large</div>
```

Available utilities: `w--[Ncqw]`, `h--[Ncqh]` (0 to 100), plus `w--min-[Ncqw]`, `w--max-[Ncqw]`, `h--min-[Ncqh]`, `h--max-[Ncqh]`. All support responsive variants. See the [Size](https://trmnl.com/framework/docs/3.2/size) docs for full details.

### Responsive Arbitrary Sizes

The `w--[Npx]` and `h--[Npx]` utilities now support responsive prefixes, where they used to be static-only. Pixel values range from 0 to 128. See the [Size](https://trmnl.com/framework/docs/3.2/size) docs.

```html
<!-- Responsive arbitrary sizes -->
<div class="w--[80px] md:w--[110px] lg:w--[128px]">Responsive arbitrary width</div>
<div class="h--[100px] portrait:h--[128px]">Orientation-aware height</div>
```

### Responsive Overflow Columns

The [Overflow](https://trmnl.com/framework/docs/3.2/overflow) engine now reads responsive data attributes to determine how many columns to generate, based on screen size and orientation. Resolution order (most specific wins): size + portrait, then size, then portrait, then base.

```html
<!-- 2 columns on small screens, 3 on large -->
<div class="columns"
     data-overflow-max-cols="2"
     data-overflow-max-cols-lg="3">
  ...
</div>

<!-- Different column counts for portrait orientation -->
<div class="columns"
     data-overflow-max-cols="3"
     data-overflow-max-cols-portrait="1"
     data-overflow-max-cols-lg-portrait="2">
  ...
</div>
```

Supported suffixes: `-sm`, `-md`, `-lg`, `-portrait`, `-sm-portrait`, `-md-portrait`, `-lg-portrait`. The same pattern works for `data-overflow-cols` (fixed column count).

### Layout Improvements

#### Axis-Correct stretch-x / stretch-y

`stretch-x` and `stretch-y` now behave correctly relative to the [Layout](https://trmnl.com/framework/docs/3.2/layout) direction. In `layout--row`, `stretch-x` grows along the horizontal axis and `stretch-y` stretches vertically, and in `layout--col` the axes are swapped. These utilities also now include `min-width: 0` / `min-height: 0` to prevent flex children from overflowing their containers.

#### Responsive Grid Column Spans

The [Grid](https://trmnl.com/framework/docs/3.2/grid) `col--span-*` classes now work with all responsive prefixes. Responsive parent variants also work: if the grid itself has a responsive prefix (e.g., `portrait:grid`), nested children resolve correctly.

```html
<div class="grid grid--cols-6">
  <div class="col--span-6 lg:col--span-3">Full width on small, half on large</div>
  <div class="col--span-6 lg:col--span-3">Full width on small, half on large</div>
</div>

<!-- Portrait reflow -->
<div class="grid grid--cols-2 portrait:grid--cols-1 portrait:gap">
  <div class="item col--span-2 portrait:col--span-1">...</div>
</div>
```

#### Item Component

The [Item](https://trmnl.com/framework/docs/3.2/item) component now gives `.icon` elements the same flex styling as `.content`. Items in [Flex](https://trmnl.com/framework/docs/3.2/flex) row containers automatically stretch to match the tallest sibling, and items in [Grid](https://trmnl.com/framework/docs/3.2/grid) containers stretch to fill their cell height.

### Gap and Rounded Utilities

#### Gap

New [Gap](https://trmnl.com/framework/docs/3.2/gap) classes: `gap--base` (explicit base, useful for responsive reset), `gap--auto` (distributes space evenly around items), and `gap--distribute` (first item at start, last at end, space between). Arbitrary gaps now start from `gap--[0px]` (previously 5px). `gap--space-between` remains as a legacy alias.

#### Rounded

New [Rounded](https://trmnl.com/framework/docs/3.2/rounded) class: `rounded--base` (explicit base, 10px). Arbitrary values now start from `rounded--[0px]` (previously 1px).

### Rich Text Improvements

The [Rich Text](https://trmnl.com/framework/docs/3.2/rich_text) component has several improvements:

- `content--center` now correctly centers text on 4-bit screens. 
- Rich text content max-width is now size-aware and adjusts automatically per screen size (small: 380px, medium: 640px, large: 780px). In portrait orientation, it uses the full screen width. 
- All content size variants support responsive prefixes.

```html
<div class="richtext">
  <div class="content content--small lg:content--base">
    <p>Small on compact devices, default on large screens</p>
  </div>
</div>
```

### Responsive Clamp

The [Clamp](https://trmnl.com/framework/docs/3.2/clamp) system now supports the `lg` breakpoint.

```html
<!-- 2 lines on small/medium, 4 on large, 1 in portrait -->
<span class="label"
      data-clamp="2"
      data-clamp-lg="4"
      data-clamp-portrait="1">
  Long label text...
</span>
```

Available attributes: `data-clamp`, `data-clamp-sm`, `data-clamp-md`, `data-clamp-lg`, `data-clamp-portrait`, `data-clamp-sm-portrait`, `data-clamp-md-portrait`, `data-clamp-lg-portrait`.

### Landscape Orientation Default

`landscape:` prefixed classes need no class of their own on the screen element. Landscape is the default orientation, so `landscape:` prefixes activate whenever `.screen--portrait` is not present. See the [Responsive](https://trmnl.com/framework/docs/3.2/responsive) docs.

### Bug Fixes

- **Title bar on 4-bit screens:** Fixed an issue where the background image could bleed through on 4-bit displays. The title bar now explicitly clears the background image before applying the background color. 
- **Half horizontal layout height:** The layout height inside half horizontal views was incorrectly using quadrant dimensions. It now correctly uses half horizontal dimensions. 
- **Available height computation:** Improved height calculation for elements inside flex column layouts. The engine now sums sibling heights and gaps instead of relying on `getBoundingClientRect()`, which can be inaccurate before layout settles.

### Internal Changes

The following changes are under-the-hood improvements to how the Framework generates its CSS. They don't introduce new classes or markup patterns, but they make the responsive system more robust and maintainable.

- Responsive mixin system refactored to use a shared `parse-selector-components` helper, fixing edge cases with nested selectors. 
- New `with-responsive-parent-child-variants` mixin powers responsive grid column spans and flex child utilities. 
- New device-specific responsive generators (`responsive-for-bit-depth`, `responsive-orientation-for-bit-depth`) for scoped bit-depth overrides. 
- Value and rich text device overrides refactored from manual per-class rules to generated loops. 
- `screen--sm`, `screen--md`, and `screen--lg` now apply size-specific CSS variable overrides (previously empty).

Previous

[V3.2 Enhancement Guide Make your plugin theme-ready and adopt adaptive charts, icons, and JS paint](https://trmnl.com/framework/docs/3.2/v3_enhancement_guide)

Next

[Open Source What this repository is, how it fits together, and the paint mandate that shapes it](https://trmnl.com/framework/docs/3.2/open_source)
