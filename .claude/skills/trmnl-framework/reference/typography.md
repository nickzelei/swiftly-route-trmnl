<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/font_family
     ============================================================ -->

# Font Family

The Framework ships two pixel font bundles: Classic (NicoPups, NicoClean, BlockKie) and TRMNL (TRMNL12, TRMNL16, TRMNL21). Low-density displays use the selected bundle; high-density displays use Inter Variable for legibility.

Classic screen--fonts-classic

TRMNL screen--fonts-trmnl

The original pixel set. Three single-weight fonts: NicoPups, NicoClean, BlockKie. Default in Framework 3.0.

The new pixel set. Three font families with Regular and Bold weights: TRMNL12, TRMNL16, TRMNL21. Default in Framework 3.1.

div]:flex-1 [&>div]:min-h-0">

```html
<div class="screen screen--fonts-classic">...</div>
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="screen screen--fonts-trmnl">...</div>
```

Both bundles are available in Framework 3.x. Which one a screen renders depends on the display and the active scale:

- **Low-density displays:** the selected pixel-font bundle. 
- **High-density displays:** **Inter Variable**, regardless of bundle or bit depth. 
- **Any Scale or Text Scale other than Regular:** Inter Variable, because pixel bundles only render correctly at their native sizes. 
- **No font-bundle class:** in Framework 3.2 the screen uses **TRMNL**; add `screen--fonts-classic` to opt into Classic.

### Classic bundle

Three single-weight pixel fonts. Activate by adding `screen--fonts-classic` to the screen root. This controls pixel-font output on low-density displays; high-density displays still resolve to Inter.

#### NicoPups

Designed at **16px** pixel height. Used for descriptions, small labels, and metadata.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "NicoPups" &middot; font-size: 16px

Designer [Emily Huo (emhuo)](https://emhuo.itch.io/nico-pixel-fonts-pack) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

#### NicoClean

Designed at **16px** pixel height. The workhorse font, used for labels, rich text body copy, and title-bar text.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "NicoClean" &middot; font-size: 16px

Designer [Emily Huo (emhuo)](https://emhuo.itch.io/nico-pixel-fonts-pack) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

#### BlockKie

Designed at **26px** pixel height. Used for titles and large rich-text. The largest pixel font in the Classic bundle.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "BlockKie" &middot; font-size: 26px

Designer [JoohnFonts](https://fontstruct.com/fontstructors/show/1669437/joohnfonts) License [Creative Commons Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/)

#### On-device preview

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

### TRMNL bundle

Three font families, each with Regular and Bold weights. Framework 3.2 uses it when no font-bundle class is present, so add `screen--fonts-trmnl` only to pin the bundle explicitly. This controls pixel-font output on low-density displays; high-density displays still resolve to Inter.

#### TRMNL12

Designed at **12px** pixel height. The smallest pixel font, used for descriptions, small labels, and metadata.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

Bold 700

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "TRMNL12" &middot; font-size: 12px

Designer [Heavyweight Digital Type Foundry](https://heavyweight-type.com) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

#### TRMNL16

Designed at **16px** pixel height. The workhorse font, used for labels, rich text body copy, and title-bar text.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

Bold 700

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "TRMNL16" &middot; font-size: 16px

Designer [Heavyweight Digital Type Foundry](https://heavyweight-type.com) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

#### TRMNL21

Designed at **21px** pixel height. The largest pixel font, used for titles, headings, and large rich-text.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

Bold 700

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "TRMNL21" &middot; font-size: 21px

Designer [Heavyweight Digital Type Foundry](https://heavyweight-type.com) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

#### On-device preview

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

### Component-by-component bundle map

Each component picks the appropriate font based on the active bundle. On high-density displays Inter Variable is used for every component regardless of bundle.

| Component | Classic (low-density) | TRMNL (low-density) | High-density |
| --- | --- | --- | --- |
| Title Bar | NicoClean | TRMNL16 | Inter Variable |
| Title | BlockKie | TRMNL21 | Inter Variable |
| Title (small) | NicoClean | TRMNL16 | Inter Variable |
| Label | NicoClean | TRMNL16 | Inter Variable |
| Label (small) | NicoPups | TRMNL12 | Inter Variable |
| Description | NicoPups | TRMNL12 | Inter Variable |
| Description (large) | NicoClean | TRMNL16 | Inter Variable |
| Value (xxsmall) | NicoClean | TRMNL16 | Inter Variable |
| Value (other sizes) | Inter Variable | Inter Variable | Inter Variable |
| Rich Text | NicoClean | TRMNL16 | Inter Variable |
| Rich Text (small) | NicoPups | TRMNL12 | Inter Variable |
| Rich Text (large) | BlockKie | TRMNL21 | Inter Variable |
| Item Index | NicoPups | TRMNL12 | Inter Variable |

### High-density: Inter Variable

Used on high-density displays in both bundles for legibility.

Designer [Rasmus Andersson](https://rsms.me/inter) License [SIL Open Font License v1.1](https://scripts.sil.org/OFL)

Previous

[Inverse Apply inverse framework colors to an element and its descendants](https://trmnl.com/framework/docs/3.2/inverse)

Next

[Font Weight Toggle between regular and bold font weight independently of size](https://trmnl.com/framework/docs/3.2/font_weight)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/font_weight
     ============================================================ -->

# Font Weight

Utility classes for controlling font weight independently of size. Classic ships in a single weight, so `text--bold` is a no-op on low-density Classic; on low-density TRMNL it picks the bundled bold variant; on high-density displays it sets the Inter Variable weight.

### Usage

Use `text--regular` and `text--bold` to control font weight independently of size. Density decides whether the active pixel-font bundle or Inter receives the weight. The bold variant is resolved as follows:

- **Classic** bundle: every font ships in a single weight, so `text--bold` has no visual effect on low-density Classic. 
- **TRMNL** bundle: `text--bold` selects the matching **TRMNL12/16/21 Bold** font file at the active size. 
- **High-density** displays: both classes simply set the Inter Variable weight to 400 or 700.
The older `font--regular` and `font--bold` spellings still render and are deprecated. See Deprecated weight aliases below.

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

| Class | Weight | Classic (low-density) | TRMNL (low-density) | High-density |
| --- | --- | --- | --- | --- |
| `text--regular` | 400 | NicoPups / NicoClean / BlockKie | TRMNL12/16/21 Regular | Inter Variable @ 400 |
| `text--bold` | 700 | No bold variant | TRMNL12/16/21 Bold | Inter Variable @ 700 |

#### Weight comparison &middot; Classic bundle

Each weight shown at every pixel-font size with `screen--fonts-classic` on the screen root. Low-density displays use that bundle; high-density displays use Inter weights instead.

#### Weight comparison &middot; TRMNL bundle

Each weight shown at every pixel-font size with `screen--fonts-trmnl` on the screen root. Low-density displays use that bundle; high-density displays use Inter weights instead.

```html
<span class="text--small text--regular">Small regular</span>
<span class="text--small text--bold">Small bold</span>
<span class="text--base text--regular">Base regular</span>
<span class="text--base text--bold">Base bold</span>
<span class="text--large text--regular">Large regular</span>
<span class="text--large text--bold">Large bold</span>
```

### Responsive & bit-depth variants

Font weight utilities support responsive, orientation, and bit-depth prefixes. Combine them to fine-tune weight across screen sizes and display types.

| Variant | Example | Description |
| --- | --- | --- |
| Responsive | `md:text--bold` | Bold at medium breakpoint and up |
| Orientation | `portrait:text--regular` | Regular weight in portrait orientation |
| Bit-depth | `4bit:text--bold` | Bold on 4-bit displays only |
| Combined | `md:4bit:text--bold` | Bold at medium breakpoint on 4-bit displays |

```html
<span class="text--base text--regular 4bit:text--bold">
  Bold only on 4-bit displays
</span>
<span class="text--large text--regular md:text--bold">
  Bold at medium breakpoint and up
</span>
```

### Deprecated weight aliases

Two `font--{weight}` classes ship as aliases of the weight utilities: `font--regular` and `font--bold`. Each renders exactly like the `text--` class with the same suffix, down to the responsive, orientation, and bit-depth variants.

They are deprecated and will be removed in Framework 4.0. Prefer `text--regular` and `text--bold` in new markup. The ten `font--{size}` classes carry the same removal release; see [Text Size](https://trmnl.com/framework/docs/3.2/text_size) .

```html
<!-- Deprecated (but still works) -->
<span class="text--base font--bold">Bold text</span>
<span class="text--base font--regular md:font--bold">Bold at medium breakpoint and up</span>

<!-- Preferred -->
<span class="text--base text--bold">Bold text</span>
<span class="text--base text--regular md:text--bold">Bold at medium breakpoint and up</span>
```

Previous

[Font Family Switch between Classic and TRMNL font bundles per device](https://trmnl.com/framework/docs/3.2/font_family)

Next

[Font Glyphs Browse every glyph available in each Framework font bundle](https://trmnl.com/framework/docs/3.2/font_glyphs)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/font_glyphs
     ============================================================ -->

# Font Glyphs

Browse every glyph available in each Framework font. Switch between the Classic and TRMNL bundles to view their full character inventory.

The glyph tables are read in the browser by opentype.js, loaded from jsDelivr, so they stay empty without network. The fonts themselves are served from this origin.

### Font selector

Classic bundle

Original TRMNL pixel fonts. Each family ships in a single weight, so there is no bold variant.

TRMNL bundle

New TRMNL family. Each family ships with both Regular and Bold weight variants.

Loading font&hellip;

Previous

[Font Weight Toggle between regular and bold font weight independently of size](https://trmnl.com/framework/docs/3.2/font_weight)

Next

[Text Size Control text size with utility classes across all display types](https://trmnl.com/framework/docs/3.2/text_size)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/text_size
     ============================================================ -->

# Text Size

Utility classes for controlling text size. Each class sets the correct font family, size, line-height, and smoothing for the active density tier: pixel bundle on low-density displays, Inter Variable on high-density displays.

### Text Size Utilities

Use `text--{size}` utility classes to set font family, size, line-height, and smoothing in one declaration. Density decides which font family the utility resolves to.

- **Low-density displays:** the three smallest sizes use the active pixel-font bundle (Classic NicoPups/NicoClean/BlockKie or TRMNL TRMNL12/16/21). 
- **High-density displays:** every text size uses Inter Variable, regardless of bundle. 
- **Sizes from xlarge onward:** Inter Variable on every display. 
- **Any Scale or Text Scale other than Regular:** Inter Variable at every size, because pixel bundles only render correctly at their native sizes.
Text Size selects one typography role for an element. Use [Text Scale](https://trmnl.com/framework/docs/3.2/text_scale) to adjust every typography role from the screen.

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

| Class | Size | Line-height | Classic (low-density) | TRMNL (low-density) | High-density |
| --- | --- | --- | --- | --- | --- |
| `text--small` | 12px | 1 | NicoPups @ 16px | TRMNL12 | Inter Variable |
| `text--base` | 16px | 1.25 | NicoClean | TRMNL16 | Inter Variable |
| `text--large` | 21px | 1 | BlockKie @ 26px | TRMNL21 | Inter Variable |
| `text--xlarge` | 26px | 29px | Inter Variable | Inter Variable | Inter Variable |
| `text--xxlarge` | 38px | 42px | Inter Variable | Inter Variable | Inter Variable |
| `text--xxxlarge` | 58px | 70px | Inter Variable | Inter Variable | Inter Variable |
| `text--mega` | 74px | 86px | Inter Variable | Inter Variable | Inter Variable |
| `text--giga` | 96px | 108px | Inter Variable | Inter Variable | Inter Variable |
| `text--tera` | 128px | 128px | Inter Variable | Inter Variable | Inter Variable |
| `text--peta` | 170px | 180px | Inter Variable | Inter Variable | Inter Variable |

These sizes belong to the `text--` ladder only. The Value element reuses the same tier names on a much larger ladder, where `value--xlarge` is 74px against 26px here, so read the size table on each page before mixing the two.

#### Small

The `text--small` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--small">Regular text</span>
<span class="text--small text--bold">Bold text</span>
```

#### Base

The `text--base` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--base">Regular text</span>
<span class="text--base text--bold">Bold text</span>
```

#### Large

The `text--large` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--large">Regular text</span>
<span class="text--large text--bold">Bold text</span>
```

#### XLarge

The `text--xlarge` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--xlarge">Regular text</span>
<span class="text--xlarge text--bold">Bold text</span>
```

#### XXLarge

The `text--xxlarge` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--xxlarge">Regular text</span>
<span class="text--xxlarge text--bold">Bold text</span>
```

#### XXXLarge

The `text--xxxlarge` class. Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

```html
<span class="text--xxxlarge">Regular text</span>
<span class="text--xxxlarge text--bold">Bold text</span>
```

### Responsive & bit-depth variants

All text size utilities support responsive, orientation, and bit-depth prefixes. Combine them to fine-tune typography across screen sizes and display types.

| Variant | Example | Description |
| --- | --- | --- |
| Responsive | `md:text--large` | Apply at medium breakpoint and up |
| Orientation | `portrait:text--small` | Apply in portrait orientation |
| Bit-depth | `4bit:text--xlarge` | Apply on 4-bit displays only |
| Combined | `md:4bit:text--xxlarge` | Apply at medium breakpoint on 4-bit displays |

```html
<span class="text--base md:text--large portrait:text--small">
  Responsive text sizing
</span>
<span class="text--base 4bit:text--xlarge">
  Larger on 4-bit displays
</span>
```

### Deprecated font--{size} aliases

Ten `font--{size}` classes ship as aliases of the text size utilities: `font--small`, `font--base`, `font--large`, `font--xlarge`, `font--xxlarge`, `font--xxxlarge`, `font--mega`, `font--giga`, `font--tera`, and `font--peta`. Each renders exactly like the `text--{size}` class with the same suffix, down to the responsive, orientation, and bit-depth variants.

They are deprecated and will be removed in Framework 4.0. Prefer `text--{size}` in new markup. The weight aliases `font--bold` and `font--regular` carry the same removal release, with `text--bold` and `text--regular` as their successors; see [Font Weight](https://trmnl.com/framework/docs/3.2/font_weight) .

```html
<!-- Deprecated (but still works) -->
<span class="font--large">Large text</span>
<span class="font--mega md:font--giga">Mega text</span>

<!-- Preferred -->
<span class="text--large">Large text</span>
<span class="text--mega md:text--giga">Mega text</span>
```

Previous

[Font Glyphs Browse every glyph available in each Framework font bundle](https://trmnl.com/framework/docs/3.2/font_glyphs)

Next

[Text Scale Scale all framework typography independently of interface geometry](https://trmnl.com/framework/docs/3.2/text_scale)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/text_scale
     ============================================================ -->

# Text Scale

Text Scale adjusts every framework font size and pixel line height from one screen modifier. It composes with Scale, so you can change text readability without applying the same factor to interface geometry or text strokes.

### Basic Usage

Add `screen--text-scale-{size}` to the `screen`. Text Scale changes framework typography while Scale continues to control the rest of the interface.

```html
<div class="screen screen--text-scale-large">
  <!-- All framework typography renders at 125%. -->
</div>
```

#### Available Levels

Text Scale uses four factors from 80% to 150%. Each factor applies after device density and [Scale](https://trmnl.com/framework/docs/3.2/scale) . Every factor except Regular also resolves typography to Inter Variable on low-density displays, because pixel bundles only render correctly at their native sizes.

| Class | Factor | Result |
| --- | --- | --- |
| `screen--text-scale-small` | 0.8 | 80% of the composed text size |
| `screen--text-scale-regular` | 1 | 100% of the composed text size |
| `screen--text-scale-large` | 1.25 | 125% of the composed text size |
| `screen--text-scale-xlarge` | 1.5 | 150% of the composed text size |

Text Scale names its neutral tier `regular` and its ladder stops at `xlarge`, where Scale runs seven tiers. Utility families name their neutral tier `base` (`gap--base`, `text--base`), so there is no `screen--text-scale-base`.

### Interactive Preview

Move the slider between the four Text Scale levels. The Weather example updates its framework typography while component dimensions, gaps, and text strokes keep their regular scale.

Aa

Aa

Aa

Aa

text-scale-preview#change">

```html
<div class="screen screen--text-scale-regular">
  <!-- Replace regular with small, large, or xlarge. -->
</div>
```

### Combining Scale and Text Scale

Scale sets the base size for the whole interface, including component dimensions, spacing, and typography. Text Scale then multiplies only the typography on top of that base while leaving the surrounding geometry unchanged. For example, a 66% Scale combined with a 150% Text Scale produces text at 99% of its original size inside an interface that remains at 66%.

Device density is still part of the framework's typography calculation, so Text Scale complements rather than replaces the device's font bundle and density settings.

### Custom Typography

Framework classes scale automatically. Use `--text-ui-scale` for custom CSS that follows framework typography, or pass `kind: "text"` to `TRMNLPaint.px()` for JavaScript values.

```html
<style>
  .custom-reading {
    font-size: calc(20px * var(--text-ui-scale, 1));
    line-height: calc(26px * var(--text-ui-scale, 1));
  }
</style>

<script>
  var fontSize = TRMNLPaint.px(20, { el: "reading", kind: "text" });
</script>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--content-scale` | 1 | - | - | - |
| `--device-ui-scale` | 1 | - | - | - |
| `--modifier-scale` | 1 | - | - | - |
| `--modifier-text-scale` | 1 | - | - | - |
| `--text-ui-scale` | 1 | - | - | - |
| `--ui-scale` | 1 | - | - | - |

### Related APIs

#### Reading scale factors from JavaScript

The `scale({ el })` and `px(value, { el, kind })` helpers read the resolved scale factors from the live screen, so JavaScript-drawn visuals follow the factors this page documents. Pass `kind: "text"` to scale framework typography with the text scale. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

```javascript
var fontSize = TRMNLPaint.px(16, { el: "my-chart", kind: "text" });
```

Previous

[Text Size Control text size with utility classes across all display types](https://trmnl.com/framework/docs/3.2/text_size)

Next

[Text Alignment Control text alignment with responsive breakpoint, orientation, and bit-depth variants](https://trmnl.com/framework/docs/3.2/text_alignment)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/text_alignment
     ============================================================ -->

# Text Alignment

Utility classes for horizontal text alignment. Left, center, right, and justify, with responsive variants for breakpoints, orientation, and bit-depth.

### Usage

Control text alignment using the alignment utility classes. Options include left, center, right, and justify alignment. See the [Responsive Features](#responsive-text-alignment) section for breakpoint, orientation, and bit-depth variants.

| Class | Description |
| --- | --- |
| `text--left` | Aligns text to the left (default for most elements) |
| `text--center` | Centers text horizontally |
| `text--right` | Aligns text to the right |
| `text--justify` | Justifies text, creating even edges on both sides |

```html
<p class="text--left">Left-aligned text</p>
<p class="text--center">Center-aligned text</p>
<p class="text--right">Right-aligned text</p>
<p class="text--justify">Justified text</p>
```

### Responsive Features

Alignment classes support all three responsive systems: size-based breakpoints, orientation-based, and bit-depth variants.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different alignment per device size class.

```html
<!-- Left by default, center on md+, right on lg+ -->
<p class="description text--left md:text--center lg:text--right">Responsive alignment</p>

<!-- Progressive alignment scaling -->
<p class="description text--left sm:text--center md:text--right lg:text--justify">Progressive alignment</p>
```

#### Orientation and Size+Orientation

Text alignment can adapt to orientation with `portrait:` and `landscape:`, and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Left by default, center in portrait -->
<p class="description text--left portrait:text--center">Orientation variant</p>

<!-- Combined size and orientation -->
<p class="description text--left md:portrait:text--right">Left by default, right on md+ portrait</p>
```

#### Bit-Depth Responsive

Alignment classes support bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to apply different alignment on different display color capabilities.

```html
<!-- Center by default, right on 2-bit screens -->
<p class="description text--center 2bit:text--right">Bit-depth alignment</p>

<!-- Combined: size + bit-depth -->
<p class="description text--left lg:4bit:text--center">Left by default, center on lg+ 4-bit screens</p>
```

#### Combined Responsive Features

Combine size, orientation, and bit-depth modifiers for alignment. Use the pattern `size:orientation:bit-depth:utility` for highly targeted styling.

```html
<!-- Size + orientation + bit-depth -->
<p class="description md:portrait:2bit:text--right">Right on md+ portrait 2-bit screens</p>

<!-- Multiple responsive conditions -->
<p class="description text--left sm:text--center lg:4bit:text--right">Progressive with bit-depth override</p>
```

Previous

[Text Scale Scale all framework typography independently of interface geometry](https://trmnl.com/framework/docs/3.2/text_scale)

Next

[Text Color Apply grayscale and chromatic color shades to text elements](https://trmnl.com/framework/docs/3.2/text_color)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/text_color
     ============================================================ -->

# Text Color

Set text color with the text--{token} utilities, on the same scale as the [Colors](https://trmnl.com/framework/docs/3.2/colors) palette. On 1-bit displays a grayscale token renders as a dither pattern of black and white pixels, so text can read as any shade of gray.

### Usage

Use the `text--{shade}` utility classes to apply text color patterns to any element. The shade comes from one of three schemes (see [Colors](https://trmnl.com/framework/docs/3.2/colors)):

- **Grayscale:** `text--black`, `text--gray-10` through `text--gray-75`, and `text--white`. 
- **Chromatic:** `text--{hue}` for the pure color, or `text--{hue}-{step}` for a step on that hue's ladder (e.g. text--red-50, text--blue-40). 
- **Semantic:** `text--primary`, `text--success`, `text--error`, and `text--warning`. 
- **Ink roles:** `text--default`, `text--muted`, and `text--inverse` paint the screen's own text roles. They resolve through the theme slot chain, so a theme repaints them, and they mirror `bg--canvas` and its siblings on [Background](https://trmnl.com/framework/docs/3.2/background) .
See the [Responsive Features](#responsive-text-color) section for responsive variants.

### Grayscale

Sixteen grayscale values: black, gray-10 through gray-75, and white.

**Dark Mode Notice:** The color palette appears inverted because dark mode remaps the framework tokens: black and white swap, grays and chromatic steps mirror. Images are not affected unless they opt in via `image--adaptive`. Themed screens are exempt from dark mode entirely.

```html
<div class="text--black">Black text</div>
<div class="text--gray-10">Gray 10 text</div>
<div class="text--gray-15">Gray 15 text</div>
<div class="text--gray-20">Gray 20 text</div>
<div class="text--gray-25">Gray 25 text</div>
<div class="text--gray-30">Gray 30 text</div>
<div class="text--gray-35">Gray 35 text</div>
<div class="text--gray-40">Gray 40 text</div>
<div class="text--gray-45">Gray 45 text</div>
<div class="text--gray-50">Gray 50 text</div>
<div class="text--gray-55">Gray 55 text</div>
<div class="text--gray-60">Gray 60 text</div>
<div class="text--gray-65">Gray 65 text</div>
<div class="text--gray-70">Gray 70 text</div>
<div class="text--gray-75">Gray 75 text</div>
<div class="text--white">White text</div>
```

### Red

Two classes write red text:

- `text--red`: the pure red. 
- `text--red-{step}`: a step on the red ladder (e.g. text--red-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--red-10">Red-10 text</div>
<div class="text--red-15">Red-15 text</div>
<div class="text--red-20">Red-20 text</div>
<div class="text--red-25">Red-25 text</div>
<div class="text--red-30">Red-30 text</div>
<div class="text--red-35">Red-35 text</div>
<div class="text--red-40">Red-40 text</div>
<div class="text--red">Red text</div>
<div class="text--red-45">Red-45 text</div>
<div class="text--red-50">Red-50 text</div>
<div class="text--red-55">Red-55 text</div>
<div class="text--red-60">Red-60 text</div>
<div class="text--red-65">Red-65 text</div>
<div class="text--red-70">Red-70 text</div>
<div class="text--red-75">Red-75 text</div>
```

### Orange

Two classes write orange text:

- `text--orange`: the pure orange. 
- `text--orange-{step}`: a step on the orange ladder (e.g. text--orange-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--orange-10">Orange-10 text</div>
<div class="text--orange-15">Orange-15 text</div>
<div class="text--orange-20">Orange-20 text</div>
<div class="text--orange-25">Orange-25 text</div>
<div class="text--orange-30">Orange-30 text</div>
<div class="text--orange-35">Orange-35 text</div>
<div class="text--orange-40">Orange-40 text</div>
<div class="text--orange">Orange text</div>
<div class="text--orange-45">Orange-45 text</div>
<div class="text--orange-50">Orange-50 text</div>
<div class="text--orange-55">Orange-55 text</div>
<div class="text--orange-60">Orange-60 text</div>
<div class="text--orange-65">Orange-65 text</div>
<div class="text--orange-70">Orange-70 text</div>
<div class="text--orange-75">Orange-75 text</div>
```

### Yellow

Two classes write yellow text:

- `text--yellow`: the pure yellow. 
- `text--yellow-{step}`: a step on the yellow ladder (e.g. text--yellow-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--yellow-10">Yellow-10 text</div>
<div class="text--yellow-15">Yellow-15 text</div>
<div class="text--yellow-20">Yellow-20 text</div>
<div class="text--yellow-25">Yellow-25 text</div>
<div class="text--yellow-30">Yellow-30 text</div>
<div class="text--yellow-35">Yellow-35 text</div>
<div class="text--yellow-40">Yellow-40 text</div>
<div class="text--yellow">Yellow text</div>
<div class="text--yellow-45">Yellow-45 text</div>
<div class="text--yellow-50">Yellow-50 text</div>
<div class="text--yellow-55">Yellow-55 text</div>
<div class="text--yellow-60">Yellow-60 text</div>
<div class="text--yellow-65">Yellow-65 text</div>
<div class="text--yellow-70">Yellow-70 text</div>
<div class="text--yellow-75">Yellow-75 text</div>
```

### Lime

Two classes write lime text:

- `text--lime`: the pure lime. 
- `text--lime-{step}`: a step on the lime ladder (e.g. text--lime-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--lime-10">Lime-10 text</div>
<div class="text--lime-15">Lime-15 text</div>
<div class="text--lime-20">Lime-20 text</div>
<div class="text--lime-25">Lime-25 text</div>
<div class="text--lime-30">Lime-30 text</div>
<div class="text--lime-35">Lime-35 text</div>
<div class="text--lime-40">Lime-40 text</div>
<div class="text--lime">Lime text</div>
<div class="text--lime-45">Lime-45 text</div>
<div class="text--lime-50">Lime-50 text</div>
<div class="text--lime-55">Lime-55 text</div>
<div class="text--lime-60">Lime-60 text</div>
<div class="text--lime-65">Lime-65 text</div>
<div class="text--lime-70">Lime-70 text</div>
<div class="text--lime-75">Lime-75 text</div>
```

### Green

Two classes write green text:

- `text--green`: the pure green. 
- `text--green-{step}`: a step on the green ladder (e.g. text--green-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--green-10">Green-10 text</div>
<div class="text--green-15">Green-15 text</div>
<div class="text--green-20">Green-20 text</div>
<div class="text--green-25">Green-25 text</div>
<div class="text--green-30">Green-30 text</div>
<div class="text--green-35">Green-35 text</div>
<div class="text--green-40">Green-40 text</div>
<div class="text--green">Green text</div>
<div class="text--green-45">Green-45 text</div>
<div class="text--green-50">Green-50 text</div>
<div class="text--green-55">Green-55 text</div>
<div class="text--green-60">Green-60 text</div>
<div class="text--green-65">Green-65 text</div>
<div class="text--green-70">Green-70 text</div>
<div class="text--green-75">Green-75 text</div>
```

### Cyan

Two classes write cyan text:

- `text--cyan`: the pure cyan. 
- `text--cyan-{step}`: a step on the cyan ladder (e.g. text--cyan-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--cyan-10">Cyan-10 text</div>
<div class="text--cyan-15">Cyan-15 text</div>
<div class="text--cyan-20">Cyan-20 text</div>
<div class="text--cyan-25">Cyan-25 text</div>
<div class="text--cyan-30">Cyan-30 text</div>
<div class="text--cyan-35">Cyan-35 text</div>
<div class="text--cyan-40">Cyan-40 text</div>
<div class="text--cyan">Cyan text</div>
<div class="text--cyan-45">Cyan-45 text</div>
<div class="text--cyan-50">Cyan-50 text</div>
<div class="text--cyan-55">Cyan-55 text</div>
<div class="text--cyan-60">Cyan-60 text</div>
<div class="text--cyan-65">Cyan-65 text</div>
<div class="text--cyan-70">Cyan-70 text</div>
<div class="text--cyan-75">Cyan-75 text</div>
```

### Blue

Two classes write blue text:

- `text--blue`: the pure blue. 
- `text--blue-{step}`: a step on the blue ladder (e.g. text--blue-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--blue-10">Blue-10 text</div>
<div class="text--blue-15">Blue-15 text</div>
<div class="text--blue-20">Blue-20 text</div>
<div class="text--blue-25">Blue-25 text</div>
<div class="text--blue-30">Blue-30 text</div>
<div class="text--blue-35">Blue-35 text</div>
<div class="text--blue-40">Blue-40 text</div>
<div class="text--blue">Blue text</div>
<div class="text--blue-45">Blue-45 text</div>
<div class="text--blue-50">Blue-50 text</div>
<div class="text--blue-55">Blue-55 text</div>
<div class="text--blue-60">Blue-60 text</div>
<div class="text--blue-65">Blue-65 text</div>
<div class="text--blue-70">Blue-70 text</div>
<div class="text--blue-75">Blue-75 text</div>
```

### Violet

Two classes write violet text:

- `text--violet`: the pure violet. 
- `text--violet-{step}`: a step on the violet ladder (e.g. text--violet-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--violet-10">Violet-10 text</div>
<div class="text--violet-15">Violet-15 text</div>
<div class="text--violet-20">Violet-20 text</div>
<div class="text--violet-25">Violet-25 text</div>
<div class="text--violet-30">Violet-30 text</div>
<div class="text--violet-35">Violet-35 text</div>
<div class="text--violet-40">Violet-40 text</div>
<div class="text--violet">Violet text</div>
<div class="text--violet-45">Violet-45 text</div>
<div class="text--violet-50">Violet-50 text</div>
<div class="text--violet-55">Violet-55 text</div>
<div class="text--violet-60">Violet-60 text</div>
<div class="text--violet-65">Violet-65 text</div>
<div class="text--violet-70">Violet-70 text</div>
<div class="text--violet-75">Violet-75 text</div>
```

### Purple

Two classes write purple text:

- `text--purple`: the pure purple. 
- `text--purple-{step}`: a step on the purple ladder (e.g. text--purple-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--purple-10">Purple-10 text</div>
<div class="text--purple-15">Purple-15 text</div>
<div class="text--purple-20">Purple-20 text</div>
<div class="text--purple-25">Purple-25 text</div>
<div class="text--purple-30">Purple-30 text</div>
<div class="text--purple-35">Purple-35 text</div>
<div class="text--purple-40">Purple-40 text</div>
<div class="text--purple">Purple text</div>
<div class="text--purple-45">Purple-45 text</div>
<div class="text--purple-50">Purple-50 text</div>
<div class="text--purple-55">Purple-55 text</div>
<div class="text--purple-60">Purple-60 text</div>
<div class="text--purple-65">Purple-65 text</div>
<div class="text--purple-70">Purple-70 text</div>
<div class="text--purple-75">Purple-75 text</div>
```

### Pink

Two classes write pink text:

- `text--pink`: the pure pink. 
- `text--pink-{step}`: a step on the pink ladder (e.g. text--pink-50), on the same 10 to 75 scale as grayscale.
Use the Device Preview (top right) to switch to a color device (e.g. Inky Impression 7.3, Tidbyt) to see these colors.

```html
<div class="text--pink-10">Pink-10 text</div>
<div class="text--pink-15">Pink-15 text</div>
<div class="text--pink-20">Pink-20 text</div>
<div class="text--pink-25">Pink-25 text</div>
<div class="text--pink-30">Pink-30 text</div>
<div class="text--pink-35">Pink-35 text</div>
<div class="text--pink-40">Pink-40 text</div>
<div class="text--pink">Pink text</div>
<div class="text--pink-45">Pink-45 text</div>
<div class="text--pink-50">Pink-50 text</div>
<div class="text--pink-55">Pink-55 text</div>
<div class="text--pink-60">Pink-60 text</div>
<div class="text--pink-65">Pink-65 text</div>
<div class="text--pink-70">Pink-70 text</div>
<div class="text--pink-75">Pink-75 text</div>
```

### Backward Compatibility

For backward compatibility, the original shade names (`gray-1` through `gray-7`) are still supported but deprecated. These map to equivalent extended shades:

```html
<!-- Deprecated (but still works) -->
<div class="text--gray-1">Gray 1 text (deprecated)</div>
<div class="text--gray-2">Gray 2 text (deprecated)</div>

<!-- Preferred (new naming) -->
<div class="text--gray-10">Gray 10 text (preferred)</div>
<div class="text--gray-20">Gray 20 text (preferred)</div>
```

### Responsive Features

Text color classes support size, orientation, and bit-depth variants. Bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` set the shade for a specific device color depth. The demos above use them together, for example `1bit:text--black 2bit:text--gray-55 4bit:text--gray-60`.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different colors per device size class.

```html
<!-- Text color: different shades at different breakpoints -->
<span class="value text--gray-50 md:text--gray-30">Responsive color</span>

<!-- Progressive color scaling -->
<span class="value text--gray-70 sm:text--gray-50 md:text--gray-30 lg:text--black">Progressive color</span>

<!-- Chromatic color at breakpoints -->
<span class="value text--red sm:text--blue lg:text--green">Responsive chromatic color</span>
```

#### Orientation and Size+Orientation

Text colors can adapt to orientation with `portrait:` and `landscape:`, and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Different color in portrait -->
<span class="value text--gray-50 portrait:text--black">Orientation color variant</span>

<!-- Combined size and orientation -->
<span class="value text--gray-50 md:portrait:text--gray-30">Color on md+ portrait</span>
```

Text color classes accept size, orientation, and bit-depth prefixes. Bit-depth prefixes (1bit:, 2bit:, 4bit:) override the shade for a specific device color depth.

### Related APIs

#### Reading text paint from JavaScript

The `text(token, { el })` resolver returns the exact paint a `text--{token}` utility would apply, as a canonical Fill read from the live cascade with bit depth, dark mode, and theme resolved. Apply it to canvases, SVGs, or chart options. See [Painting Colors](https://trmnl.com/framework/docs/3.2/paint_colors) for every resolver and the Fill shape.

```javascript
var fill = TRMNLPaint.text("gray-45", { el: "my-node" });
```

Previous

[Text Alignment Control text alignment with responsive breakpoint, orientation, and bit-depth variants](https://trmnl.com/framework/docs/3.2/text_alignment)

Next

[Text Stroke Legible text when displayed on shaded backgrounds](https://trmnl.com/framework/docs/3.2/text_stroke)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/text_stroke
     ============================================================ -->

# Text Stroke

Outline text so it stays legible on a shaded background. Set the stroke width and color with the text stroke utilities.

### Basic Usage

Apply `text-stroke` to outline text. Combine with width and shade modifiers as needed.

| Class | Description |
| --- | --- |
| `text-stroke` | Stroke: outline (default 3.5px, default contrast ink) |
| `text-stroke--{size}` | Stroke width: `small`, `medium`, `large`, `xlarge` |
| `text-stroke--{shade}` | Stroke color: any palette token, from `black` and `white` to `gray-75` and `red-40`. See [Background](https://trmnl.com/framework/docs/3.2/background) for the shade scale. |

```html
<span class="text-stroke">Outlined text</span>
```

### Widths

Preset size modifiers set the stroke width on text. The default stroke is 3.5px in the default contrast ink, with additional options for base (3.5px, equivalent to default), small (2px), medium (4.5px), large (6px), and extra large (7.5px). The `text-stroke--base` modifier explicitly sets the default stroke width and is useful for responsive layouts.

```html
<span class="value value--large">Aa</span>
<span class="value value--large text-stroke text-stroke--small">Aa</span>
<span class="value value--large text-stroke text-stroke--base">Aa</span>
<span class="value value--large text-stroke">Aa</span>
<span class="value value--large text-stroke text-stroke--medium">Aa</span>
<span class="value value--large text-stroke text-stroke--large">Aa</span>
<span class="value value--large text-stroke text-stroke--xlarge">Aa</span>
```

### Shades

Leave the shade off to stroke with the default contrast ink, which resolves through the theme chain and flips with dark mode. Use the `text-stroke--{shade}` modifier to pin a color instead. The shades are the same palette tokens the background scale uses:

- `text-stroke--black` and `text-stroke--white`. 
- `text-stroke--gray-10` through `text-stroke--gray-75`, in steps of five, plus the legacy `gray-1` to `gray-7` aliases. 
- Ten hues (red, orange, yellow, lime, green, cyan, blue, violet, purple, pink) as a bare name such as `text-stroke--red` and on the same 10 to 75 steps, so `text-stroke--red-40` works on a color panel.
For the shade scale and how it adapts across bit depths, see [Background](https://trmnl.com/framework/docs/3.2/background) .

A shade modifier and a width modifier combine: `text-stroke text-stroke--black text-stroke--small` is a 2px black outline. Both take the bit-depth prefixes, so `2bit:text-stroke--gray-30` restyles the outline on 2-bit screens only.

A bare shade class draws nothing: it sets the color and leaves the drawing to `text-stroke` or a width modifier. [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) differs here, where a lone shade class draws the default ring.

```html
<span class="value value--large text--white">Aa</span>
<span class="value value--large text--white text-stroke text-stroke--small text-stroke--black">Aa</span>
<span class="value value--large text--white text-stroke text-stroke--black">Aa</span>
<span class="value value--large text--white text-stroke text-stroke--medium text-stroke--black">Aa</span>
<span class="value value--large text--white text-stroke text-stroke--large text-stroke--black">Aa</span>
<span class="value value--large text--white text-stroke text-stroke--xlarge text-stroke--black">Aa</span>
```

### How It Renders

The stroke draws as concentric drop-shadow rings, not as native `-webkit-text-stroke`. The ring sits behind the glyph in every browser, so text of any shade takes a stroke.

That includes grayscale text, which the framework paints as a bitmap pattern revealed with `background-clip: text`. Native strokes overpaint a clipped fill; rings do not, so `text--gray-40 text-stroke` keeps both the pattern and the outline.

Before 3.2 the stroke was a native outline and worked only on pure black or white text. Screens pinned to 3.0 or 3.1 still render that way.

Previous

[Text Color Apply grayscale and chromatic color shades to text elements](https://trmnl.com/framework/docs/3.2/text_color)

Next

[Framework Runtime How the runtime applies layout, clamping, overflow, and presentation adjustments at render time](https://trmnl.com/framework/docs/3.2/framework_runtime)
