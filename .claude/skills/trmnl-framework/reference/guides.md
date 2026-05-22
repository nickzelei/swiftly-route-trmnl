<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/v3_overview.md
     ============================================================ -->

# V3 Overview

Framework v3 introduces a complete color system for ePaper devices. The framework now supports chromatic palettes, semantic color roles, and an extended grayscale scale, while shifting its internal architecture to CSS custom properties for cleaner, smaller stylesheets. Existing markup continues to work without changes.

### Most Important Upgrades

- **Color support:** v3 adds a complete color system with chromatic palettes, semantic color roles, and automatic adaptation to each device's supported palette and bit-depth.
- **Architecture overhaul:** the framework moves from a rules-based selector system to CSS custom properties, greatly reducing combinatorial mode rules while keeping existing class names stable.
- **High-density support:** framework rendering now supports high-density `1bit` and `2bit` output modes.
- **Expanded 1bit grayscale:** the usable `1bit` grayscale palette increases from 7 shades to 14.
- **Raw / Preview simulation:** Device Preview can compare full-bright tokens (Raw) against panel-accurate output that simulates true colors and white point.

### What's New

- **Chromatic utilities:** `bg--red`, `bg--blue-40`, `text--green-60` and similar classes for all 10 hues and 14 steps.
- **Semantic colors:** `bg--primary`, `text--success`, `label--error`, `bg--warning` - intent-based styling that maps to underlying hues.
- **Colors reference:** new [Colors](/framework/docs/3.1/colors) page documenting the full grayscale, chromatic, and semantic palette.
- **Label color variants:** [Label](/framework/docs/3.1/label) gains `label--primary`, `label--success`, `label--error`, and `label--warning` for colored badges.
- **Closest-hue mapping:** when a selected device cannot render a requested color directly, framework tokens map to the nearest supported hue automatically.
- **Color pattern images:** auto-generated dither patterns for limited-palette devices in `public/images/color-*/`.

### What's Enhanced

- **Background utility:** [Background](/framework/docs/3.1/background) refactored to reference CSS custom properties. Now supports grayscale, chromatic, and semantic tokens in a single class, including high-density `1bit` and `2bit` rendering modes.
- **Text utility:** [Text](/framework/docs/3.1) follows the same CSS variable pattern, supporting chromatic and semantic text colors alongside grayscale.
- **Border and Outline:** [Border](/framework/docs/3.1/border) and [Outline](/framework/docs/3.1/outline) use shared mixins for DRY, consistent rendering across bit-depths and color palettes, including high-density `1bit` and `2bit` modes.
- **Dark mode:** grayscale tokens invert automatically; chromatic hues stay stable while their lightness steps mirror (light to dark).
- **Progress component:** [Progress](/framework/docs/3.1/progress) updated to render with color palette awareness.

### What's Changed

- **Grayscale scale:** the primary naming convention is now `gray-10` through `gray-75` (14 steps of 5). In `1bit`, the usable grayscale palette expands from 7 shades to 14. The legacy names `gray-1` through `gray-7` remain functional but are deprecated.
- **Rendering model:** mode-dependent styling (bit-depth, dark mode, palette) is driven by CSS custom properties on `.screen` rather than combinatorial selector rules. This is an internal change - existing class names are unaffected.
- **Default font bundle:** Framework 3.1 uses the TRMNL bundle from [Font Family](/framework/docs/3.1/font_family) by default on low-density displays. Add `screen--fonts-classic` to keep the 3.0 Classic typography.

### Start Here

- Upgrading from v2? → [V3 Upgrade Guide](/framework/docs/3.1/v3_upgrade_guide) .
- Looking to use colors and the new palette system? → [V3 Enhancement Guide](/framework/docs/3.1/v3_enhancement_guide) .
- New to the framework? Start with the [Colors](/framework/docs/3.1/colors) reference page.

Next

[V3 Upgrade Guide Steps to upgrade your plugins from Framework v2 to v3](/framework/docs/3.1/v3_upgrade_guide)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/v3_upgrade_guide.md
     ============================================================ -->

# V3 Upgrade Guide

Framework v3 is structurally backward-compatible with v2: your existing class names still compile and render. However, the `1bit` grayscale dither patterns have been rebuilt on a new linear scale, so most shade names now produce different lightness values than they did in v2. Review the migration table below to restore your original look or take advantage of the finer 14-step palette.

### 1-Bit Grayscale Dither Scale

In `1bit` mode, v3 replaces the 7-step non-linear dither scale (12×12 px tiles) with a 14-step linear scale (16×16 px tiles). Each step now increments by 6.25% white-pixel density. In v2 the 14 extended shade names were rendered in pairs: `gray-15` produced the same pattern as `gray-10`, `gray-25` the same as `gray-20`, and so on. In v3 every shade has its own distinct pattern, so nearly all shades now sit at **different lightness values** than they did in v2.

#### Lightness Shift

The table below shows the white-pixel density each shade produced in v2 `1bit` mode, what it now produces in v3, and which v3 shade to use to restore the original appearance.

| Class | v2 Lightness | v3 Lightness | Shift | Use Instead |
| --- | --- | --- | --- | --- |
| `gray-10` | 6.25% | 6.25% | — | — |
| `gray-15` | 6.25% | 12.5% | +6.25% | `gray-10` |
| `gray-20` | 12.5% | 18.75% | +6.25% | `gray-15` |
| `gray-25` | 12.5% | 25% | +12.5% | `gray-15` |
| `gray-30` | 25% | 31.25% | +6.25% | `gray-25` |
| `gray-35` | 25% | 37.5% | +12.5% | `gray-25` |
| `gray-40` | 50% | 43.75% | −6.25% | `gray-45` |
| `gray-45` | 50% | 56.25% | +6.25% | `gray-40` |
| `gray-50` | 75% | 62.5% | −12.5% | `gray-60` |
| `gray-55` | 75% | 68.75% | −6.25% | `gray-60` |
| `gray-60` | 87.5% | 75% | −12.5% | `gray-70` |
| `gray-65` | 87.5% | 81.25% | −6.25% | `gray-70` |
| `gray-70` | 93.75% | 87.5% | −6.25% | `gray-75` |
| `gray-75` | 93.75% | 93.75% | — | — |

To preserve your v2 look, switch to the shade listed in the “Use Instead” column. To adopt the new linear scale and take advantage of the finer 14-step palette, keep your current class names - they now each produce a unique dither pattern. See the[Colors](/framework/docs/3.1/colors) reference for the full scale.

### CSS Variable Architecture

Under the hood, utilities like[Background](/framework/docs/3.1/background) and [Text](/framework/docs/3.1) now reference CSS custom properties instead of containing per-mode selector rules.

This is an internal refactor. The class names you use in your markup (`bg--gray-50`, `text--black`, etc.) are unchanged. If you have custom CSS that directly targets framework internals (e.g., overriding `.screen--1bit .bg--gray-3` selectors), you may need to update those overrides to use the new CSS variable approach.

If you use only framework-provided class names, no action is needed. If you have custom CSS overriding framework internals, review the updated[Background](/framework/docs/3.1/background) and [Text](/framework/docs/3.1) pages for the new variable-based approach.

### Background and Border Rendering Modes

Utility class names are unchanged, but rendering support is broader in v3. Both[Background](/framework/docs/3.1/background) and [Border](/framework/docs/3.1/border) now support high-density `1bit` and `2bit` output modes without markup changes.

### Color Palette on Grayscale Devices

If you adopt the new chromatic color classes (e.g., `bg--red`, `text--blue-40`) in your plugin, they automatically adapt by device capability. On grayscale hardware, colors fall back to perceptually equivalent gray values; on limited-color hardware, unavailable colors map to the closest supported hue. No conditional logic is needed. The framework handles this mapping via perceptual lightness (LAB L*).

### Raw / Preview Verification

Use the Raw Colors / Preview Colors toggle in Device Preview while upgrading. Raw mode shows full-bright token values; Preview mode simulates panel-accurate output, including true-color behavior and device white point.

### Next Steps

Once you've reviewed the deprecation notes above, head to the[V3 Enhancement Guide](/framework/docs/3.1/v3_enhancement_guide) to learn how to use chromatic colors, semantic roles, and the new label variants in your plugins.

Previous

[V3 Overview What's new in Framework v3: color palette, semantic colors, extended grayscale, and CSS variable architecture](/framework/docs/3.1/v3_overview)

Next

[V3 Enhancement Guide Use chromatic colors, semantic roles, and label variants in your plugins](/framework/docs/3.1/v3_enhancement_guide)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/v3_enhancement_guide.md
     ============================================================ -->

# V3 Enhancement Guide

Framework v3 opens up the full color spectrum for ePaper plugins. This guide walks through the key enhancements you can adopt, from chromatic backgrounds and text to semantic labels and the extended grayscale.

### 1. Use Chromatic Colors

The framework now provides 10 hues, each with 14 lightness steps. Apply them with the same `bg--` and `text--` prefixes you already know.

- **Base hue:** `bg--red`, `text--blue` - the pure, full-saturation color.
- **Hue + step:** `bg--red-40`, `text--green-60` - lighter or darker variants using steps 10 (darkest) through 75 (lightest).
- **Available hues:** red, orange, yellow, lime, green, cyan, blue, violet, purple, pink.


On grayscale devices, chromatic tokens automatically fall back to perceptually equivalent gray shades. On limited-color panels, unavailable colors map to the closest supported hue automatically, so no conditional markup is needed. See the full palette on the[Colors](/framework/docs/3.1/colors) page.

### 2. Apply Semantic Colors

Semantic roles let you style by intent rather than specific hue. The framework maps each role to an underlying color token that can be themed via CSS variables.

- `bg--primary` / `text--primary` - blue (highlights, accents)
- `bg--success` / `text--success` - green (confirmations, positive states)
- `bg--error` / `text--error` - red (errors, critical states)
- `bg--warning` / `text--warning` - orange (cautions, alerts)


Semantic tokens inherit all device and bit-depth behavior. To override the default mapping, set `--color-primary`, `--color-success`, etc. in your custom CSS.

### 3. Use Label Color Variants

The[Label](/framework/docs/3.1/label) element now supports semantic color variants for colored badges and status indicators.

- `label--primary` - blue label for key information
- `label--success` - green label for positive states
- `label--error` - red label for errors or alerts
- `label--warning` - orange label for cautions


The default filled label (`label--filled`) continues to use black (the darkest shade). The new color variants use semantic color backgrounds while adapting to the current device palette.

### 4. Leverage the Extended Grayscale

The extended scale doubles the available gray shades from 7 to 14, giving you finer control over tonal variation in your layouts. In `1bit` mode, the usable grayscale palette now expands from 7 shades to 14.

- **Old scale:** `gray-1` through `gray-7` (still works, deprecated)
- **New scale:** `gray-10`, `gray-15`, `gray-20`, …, `gray-75`


Intermediate steps like `gray-15`, `gray-25`, and `gray-35` let you create subtler contrasts and more nuanced visual hierarchies, especially on 2-bit and 4-bit displays.

### 5. Use the Raw / Preview Toggle

The device picker now includes a Raw / Preview switch that lets you compare how colors render across different modes.

- **Raw:** shows the full-bright token values, useful for verifying your color choices.
- **Preview:** shows panel-accurate simulation, including device true-color behavior and lowered white points on displays like TRMNL BWRY, so you can see what end users actually see on hardware.


### 6. Target High-Density 1bit / 2bit Rendering

Core utilities now render consistently on high-density ePaper modes. Use the same classes and let the framework adapt to panel capabilities.

- **Background utility:** [Background](/framework/docs/3.1/background) supports high-density `1bit` and `2bit` output in addition to broader color-capable modes.
- **Border utility:** [Border](/framework/docs/3.1/border) supports the same high-density `1bit` and `2bit` rendering behavior for consistent edge contrast.


Previous

[V3 Upgrade Guide Steps to upgrade your plugins from Framework v2 to v3](/framework/docs/3.1/v3_upgrade_guide)

Next

[TRMNL X Guide Framework changes for TRMNL X compatibility](/framework/docs/3.1/trmnl_x_guide)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/trmnl_x_guide.md
     ============================================================ -->

# TRMNL X Guide

TRMNL X is a larger, 4-bit ePaper display. This guide covers everything that changed in the Framework to support it. Your existing plugins will continue to work, but by adopting these new features you can build layouts that take full advantage of the larger screen, portrait orientation, and expanded grayscale.

### The --base Modifier

Every element and component now supports an explicit `--base` size modifier. It produces the exact same result as using the class without any size modifier, but it lets you **reset to the default size at a specific breakpoint**.

Previously, if you set a smaller size for compact screens, there was no way to undo it at a larger breakpoint. Now you can:

    <!-- Small title on compact screens, default size on large screens -->
    <span class="title title--small lg:title--base">Dashboard</span>

    <!-- Extra-small value by default, normal size on medium+ screens -->
    <span class="value value--xsmall md:value--base">48,206</span>

    <!-- Small gap by default, standard gap on large screens -->
    <div class="flex flex--col gap--small lg:gap--base">...</div>

The `--base` modifier is available on:

- **Typography:** [Title](/framework/docs/3.1/title) (`title--base`), [Value](/framework/docs/3.1/value) (`value--base`), [Label](/framework/docs/3.1/label) (`label--base`), [Description](/framework/docs/3.1/description) (`description--base`)
- **Rich Text:** [Rich Text](/framework/docs/3.1/rich_text) (`content--base`)
- **Components:** [Table](/framework/docs/3.1/table) (`table--base`), [Progress](/framework/docs/3.1/progress) (`progress-bar--base`, `progress-dots--base`)
- **Utilities:** [Gap](/framework/docs/3.1/gap) (`gap--base`), [Rounded](/framework/docs/3.1/rounded) (`rounded--base`), [Text Stroke](/framework/docs/3.1/text_stroke) (`text-stroke--base`), [Image Stroke](/framework/docs/3.1/image_stroke) (`image-stroke--base`)


### New Larger Typography Sizes

To take full advantage of TRMNL X's larger display, new size tiers have been added across all typography elements. All new sizes support responsive prefixes and render correctly on 2-bit and 4-bit screens.

#### Value

Four new sizes for hero-style numbers and display text. See the[Value](/framework/docs/3.1/value) docs for full details.

    <span class="value value--mega">42</span>    <!-- 170px -->
    <span class="value value--giga">42</span>    <!-- 220px -->
    <span class="value value--tera">42</span>    <!-- 290px -->
    <span class="value value--peta">42</span>    <!-- 380px -->

    <!-- Responsive example: xxxlarge on OG, giga on X -->
    <span class="value value--xxxlarge lg:value--giga">42</span>

#### Title

Three new large sizes for headings. See the[Title](/framework/docs/3.1/title) docs.

    <span class="title title--large">Heading</span>     <!-- 30px -->
    <span class="title title--xlarge">Heading</span>    <!-- 35px -->
    <span class="title title--xxlarge">Heading</span>   <!-- 40px -->

#### Label, Description, Rich Text

New large sizes for[Label](/framework/docs/3.1/label) (`label--large`, `label--xlarge`, `label--xxlarge`), [Description](/framework/docs/3.1/description) (`description--large`, `description--xlarge`, `description--xxlarge`), and [Rich Text](/framework/docs/3.1/rich_text) content (`content--xlarge`, `content--xxlarge`, `content--xxxlarge`).

### Container Query Units

The[Layout](/framework/docs/3.1/layout) element now establishes a CSS Container Query context, enabling a new set of container-relative sizing utilities. Unlike viewport units, these are relative to the layout's dimensions, so they work correctly inside mashup slots (half vertical, quadrant, etc.) where the available space is a fraction of the full screen.

    <!-- Width as percentage of the layout container -->
    <div class="w--[50cqw]">Half the layout width</div>

    <!-- Height as percentage of the layout container -->
    <div class="h--[80cqh]">80% of layout height</div>

    <!-- Min/max constraints -->
    <div class="w--min-[30cqw] w--max-[70cqw]">Constrained width</div>

    <!-- Responsive container query units -->
    <div class="w--[100cqw] lg:w--[50cqw]">Full width on small, half on large</div>

Available utilities: `w--[Ncqw]`, `h--[Ncqh]` (0 to 100), plus `w--min-[Ncqw]`, `w--max-[Ncqw]`, `h--min-[Ncqh]`, `h--max-[Ncqh]`. All support responsive variants. See the [Size](/framework/docs/3.1/size) docs for full details.

### Responsive Arbitrary Sizes

The `w--[Npx]` and `h--[Npx]` utilities now support responsive prefixes. Previously, these were static-only. The maximum value has been reduced from 1000px to 800px. See the [Size](/framework/docs/3.1/size) docs.

    <!-- Responsive arbitrary sizes -->
    <div class="w--[150px] md:w--[250px] lg:w--[400px]">Responsive arbitrary width</div>
    <div class="h--[100px] portrait:h--[200px]">Orientation-aware height</div>

### Responsive Overflow Columns

The[Overflow](/framework/docs/3.1/overflow) engine now reads responsive data attributes to determine how many columns to generate, based on screen size and orientation. Resolution order (most specific wins): size + portrait, then size, then portrait, then base.

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

Supported suffixes: `-sm`, `-md`, `-lg`, `-portrait`, `-sm-portrait`, `-md-portrait`, `-lg-portrait`. The same pattern works for `data-overflow-cols` (fixed column count).

### Layout Improvements

#### Axis-Correct stretch-x / stretch-y

`stretch-x` and `stretch-y` now behave correctly relative to the [Layout](/framework/docs/3.1/layout) direction. In `layout--row`, `stretch-x` grows along the horizontal axis and `stretch-y` stretches vertically. In `layout--col`, the axes are swapped. These utilities also now include `min-width: 0` / `min-height: 0` to prevent flex children from overflowing their containers.

#### Responsive Grid Column Spans

The[Grid](/framework/docs/3.1/grid)`col--span-*` classes now work with all responsive prefixes. Responsive parent variants also work: if the grid itself has a responsive prefix (e.g., `portrait:grid`), nested children resolve correctly.

    <div class="grid grid--cols-6">
      <div class="col--span-6 lg:col--span-3">Full width on small, half on large</div>
      <div class="col--span-6 lg:col--span-3">Full width on small, half on large</div>
    </div>

    <!-- Portrait reflow -->
    <div class="grid grid--cols-2 portrait:grid--cols-1 portrait:gap">
      <div class="item col--span-2 portrait:col--span-1">...</div>
    </div>

#### Item Component

The[Item](/framework/docs/3.1/item) component now gives `.icon` elements the same flex styling as `.content`. Items in [Flex](/framework/docs/3.1/flex) row containers automatically stretch to match the tallest sibling, and items in [Grid](/framework/docs/3.1/grid) containers stretch to fill their cell height.

### Gap and Rounded Utilities

#### Gap

New[Gap](/framework/docs/3.1/gap) classes: `gap--base` (explicit base, useful for responsive reset), `gap--auto` (distributes space evenly around items), and `gap--distribute` (first item at start, last at end, space between). Arbitrary gaps now start from `gap--[0px]` (previously 5px). `gap--space-between` remains as a legacy alias.

#### Rounded

New[Rounded](/framework/docs/3.1/rounded) class: `rounded--base` (explicit base, 10px). Arbitrary values now start from `rounded--[0px]` (previously 1px).

### Rich Text Improvements

The[Rich Text](/framework/docs/3.1/rich_text) component has several improvements:

- `content--center` now correctly centers text on 4-bit screens.
- Rich text content max-width is now size-aware and adjusts automatically per screen size (small: 380px, medium: 640px, large: 780px). In portrait orientation, it uses the full screen width.
- All content size variants support responsive prefixes.


    <div class="richtext">
      <div class="content content--small lg:content--base">
        <p>Small on compact devices, default on large screens</p>
      </div>
    </div>

### Responsive Clamp

The[Clamp](/framework/docs/3.1/clamp) system now supports the `lg` breakpoint.

    <!-- 2 lines on small/medium, 4 on large, 1 in portrait -->
    <span class="label"
          data-clamp="2"
          data-clamp-lg="4"
          data-clamp-portrait="1">
      Long label text...
    </span>

Available attributes: `data-clamp`, `data-clamp-sm`, `data-clamp-md`, `data-clamp-lg`, `data-clamp-portrait`, `data-clamp-sm-portrait`, `data-clamp-md-portrait`, `data-clamp-lg-portrait`.

### Landscape Orientation Default

`landscape:` prefixed classes now work correctly even without an explicit `.screen--landscape` class on the screen element. Since landscape is the default orientation, `landscape:` prefixes activate whenever `.screen--portrait` is not present. See the [Responsive](/framework/docs/3.1/responsive) docs.

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

[V3 Enhancement Guide Use chromatic colors, semantic roles, and label variants in your plugins](/framework/docs/3.1/v3_enhancement_guide)

Next

[Size Define exact width and height dimensions for elements](/framework/docs/3.1/size)


