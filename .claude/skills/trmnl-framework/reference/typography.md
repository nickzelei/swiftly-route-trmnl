<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/font_family.md
     ============================================================ -->

# Font Family

The Framework ships two pixel font bundles: Classic (NicoPups, NicoClean, BlockKie) and TRMNL (TRMNL12, TRMNL16, TRMNL21). Low-density displays use the selected bundle; high-density displays use Inter Variable for legibility.

The original pixel set. Three single-weight fonts: NicoPups, NicoClean, BlockKie. Default in Framework 3.0.

The new pixel set. Three font families with Regular and Bold weights: TRMNL12, TRMNL16, TRMNL21. Default in Framework 3.1.

    <div class="screen screen--fonts-classic">...</div>

    <div class="screen screen--fonts-trmnl">...</div>

Both bundles are available in Framework 3.x. Low-density displays use the selected pixel-font bundle.
 High-density displays use **Inter Variable** regardless of bundle or bit depth.
 In Framework 3.1, screens without a font-bundle class use **TRMNL** by default; add `screen--fonts-classic` to opt into Classic.

### Classic bundle

Three single-weight pixel fonts.
 Activate by adding `screen--fonts-classic` to the screen root.
 This controls pixel-font output on low-density displays; high-density displays still resolve to Inter.

#### NicoPups

Designed at **16px** pixel height. Used for descriptions, small labels, and metadata.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "NicoPups" · font-size: 16px

#### NicoClean

Designed at **16px** pixel height. The workhorse font, used for labels, rich text body copy, and title-bar text.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "NicoClean" · font-size: 16px

#### BlockKie

Designed at **26px** pixel height. Used for titles and large rich-text. The largest pixel font in the Classic bundle.

Regular 400

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

0123456789

!@#$%^&*()-=+[]{}|;:',./<>?

font-family: "BlockKie" · font-size: 26px

#### On-device preview

text--small · Classictext--base · Classictext--large · Classictext--base font--bold · Classic

Classic bundle

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

### TRMNL bundle

Three font families, each with Regular and Bold weights.
 This is the implicit default for Framework 3.1 when no font-bundle class is present.
 Add `screen--fonts-trmnl` when you want to pin the bundle explicitly.
 This controls pixel-font output on low-density displays; high-density displays still resolve to Inter.

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

font-family: "TRMNL12" · font-size: 12px

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

font-family: "TRMNL16" · font-size: 16px

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

font-family: "TRMNL21" · font-size: 21px

#### On-device preview

text--small · TRMNLtext--base · TRMNLtext--large · TRMNLtext--base font--bold · TRMNL

TRMNL bundle

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

### Component-by-component bundle map

Each component picks the appropriate font based on the active bundle. On high-density
 displays Inter Variable is used for every component regardless of bundle.

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

Previous

[Tokens Complete CSS variable reference with root defaults, density, and bit-depth overrides](/framework/docs/3.1/tokens)

Next

[Font Weight Toggle between regular and bold font weight independently of size](/framework/docs/3.1/font_weight)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/font_weight.md
     ============================================================ -->

# Font Weight

Utility classes for controlling font weight independently of size. Classic ships in a single weight, so <code>font--bold</code> is a no-op on low-density Classic; on low-density TRMNL it picks the bundled bold variant; on high-density displays it sets the Inter Variable weight.

### Usage

Use `font--regular` and `font--bold` to control font weight
 independently of size. Density decides whether the active pixel-font bundle or Inter receives the
 weight. The bold variant is resolved as follows:

- **Classic** bundle: every font ships in a single weight, so `font--bold` has no visual effect on low-density Classic.
- **TRMNL** bundle: `font--bold` selects the matching **TRMNL12/16/21 Bold** font file at the active size.
- **High-density** displays: both classes simply set the Inter Variable weight to 400 or 700.

**High-density font notice:** This preview is using Inter because the selected device is high-density. Classic and TRMNL pixel bundles still apply on low-density displays; choose a 1x-density model in Device Preview to compare those bundles.

| Class | Weight | Classic (low-density) | TRMNL (low-density) | High-density |
| --- | --- | --- | --- | --- |
| `font--regular` | 400 | NicoPups / NicoClean / BlockKie | TRMNL12/16/21 Regular | Inter Variable @ 400 |
| `font--bold` | 700 | — (no bold variant) | TRMNL12/16/21 Bold | Inter Variable @ 700 |

#### Weight comparison · Classic bundle

Each weight shown at every pixel-font size with `screen--fonts-classic` on the screen root.
 Low-density displays use that bundle; high-density displays use Inter weights instead.

text--small font--regulartext--small font--bold

text--base font--regulartext--base font--bold

text--large font--regulartext--large font--bold

Font WeightClassic

#### Weight comparison · TRMNL bundle

Each weight shown at every pixel-font size with `screen--fonts-trmnl` on the screen root.
 Low-density displays use that bundle; high-density displays use Inter weights instead.

text--small font--regulartext--small font--bold

text--base font--regulartext--base font--bold

text--large font--regulartext--large font--bold

Font WeightTRMNL

    <span class="text--small font--regular">Small regular</span>
    <span class="text--small font--bold">Small bold</span>
    <span class="text--base font--regular">Base regular</span>
    <span class="text--base font--bold">Base bold</span>
    <span class="text--large font--regular">Large regular</span>
    <span class="text--large font--bold">Large bold</span>

### Responsive & bit-depth variants

Font weight utilities support responsive, orientation, and bit-depth prefixes.
 Combine them to fine-tune weight across screen sizes and display types.

| Variant | Example | Description |
| --- | --- | --- |
| Responsive | `md:font--bold` | Bold at medium breakpoint and up |
| Orientation | `portrait:font--regular` | Regular weight in portrait orientation |
| Bit-depth | `4bit:font--bold` | Bold on 4-bit displays only |
| Combined | `md:4bit:font--bold` | Bold at medium breakpoint on 4-bit displays |

    <span class="text--base font--regular 4bit:font--bold">
      Bold only on 4-bit displays
    </span>
    <span class="text--large font--regular md:font--bold">
      Bold at medium breakpoint and up
    </span>

Previous

[Font Family Switch between Classic and TRMNL font bundles per device](/framework/docs/3.1/font_family)

Next

[Font Glyphs Browse every glyph available in each Framework font bundle](/framework/docs/3.1/font_glyphs)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/font_glyphs.md
     ============================================================ -->

# Font Glyphs

Browse every glyph available in each Framework font. Switch between the Classic and TRMNL bundles to view their full character inventory.

### Font selector

Classic bundle

Original TRMNL pixel fonts. Each family ships in a single weight - there is no bold variant.

TRMNL bundle

New TRMNL family. Each family ships with both Regular and Bold weight variants.

Loading font…

Previous

[Font Weight Toggle between regular and bold font weight independently of size](/framework/docs/3.1/font_weight)

Next

[Text Size Control text size with utility classes across all display types](/framework/docs/3.1/text_size)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/text_size.md
     ============================================================ -->

# Text Size

Utility classes for controlling text size. Each class sets the correct font family, size, line-height, and smoothing for the active density tier: pixel bundle on low-density displays, Inter Variable on high-density displays.

### Text Size Utilities

Use `text--{size}` utility classes to set
 font family, size, line-height, and smoothing in one declaration. Density decides which font family
 the utility resolves to. On low-density displays, the three smallest sizes use the active pixel-font
 bundle (Classic NicoPups/NicoClean/BlockKie or TRMNL TRMNL12/16/21). On high-density displays,
 every text size uses Inter Variable regardless of bundle. Sizes from xlarge onward use Inter Variable
 on every display.

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

#### Small

The `text--small` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeSmall

    <span class="text--small">Regular text</span>
    <span class="text--small font--bold">Bold text</span>

#### Base

The `text--base` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeBase

    <span class="text--base">Regular text</span>
    <span class="text--base font--bold">Bold text</span>

#### Large

The `text--large` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeLarge

    <span class="text--large">Regular text</span>
    <span class="text--large font--bold">Bold text</span>

#### XLarge

The `text--xlarge` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeXLarge

    <span class="text--xlarge">Regular text</span>
    <span class="text--xlarge font--bold">Bold text</span>

#### XXLarge

The `text--xxlarge` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeXXLarge

    <span class="text--xxlarge">Regular text</span>
    <span class="text--xxlarge font--bold">Bold text</span>

#### XXXLarge

The `text--xxxlarge` class.
 Low-density previews show the active pixel-font bundle where that size supports it; high-density previews show Inter.

The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog

Text SizeXXXLarge

    <span class="text--xxxlarge">Regular text</span>
    <span class="text--xxxlarge font--bold">Bold text</span>

### Responsive & bit-depth variants

All text size utilities support responsive, orientation, and bit-depth prefixes.
 Combine them to fine-tune typography across screen sizes and display types.

| Variant | Example | Description |
| --- | --- | --- |
| Responsive | `md:text--large` | Apply at medium breakpoint and up |
| Orientation | `portrait:text--small` | Apply in portrait orientation |
| Bit-depth | `4bit:text--xlarge` | Apply on 4-bit displays only |
| Combined | `md:4bit:text--xxlarge` | Apply at medium breakpoint on 4-bit displays |

    <span class="text--base md:text--large portrait:text--small">
      Responsive text sizing
    </span>
    <span class="text--base 4bit:text--xlarge">
      Larger on 4-bit displays
    </span>

Previous

[Font Glyphs Browse every glyph available in each Framework font bundle](/framework/docs/3.1/font_glyphs)

Next

[Text Alignment Control text alignment with responsive breakpoint, orientation, and bit-depth variants](/framework/docs/3.1/text_alignment)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/text_alignment.md
     ============================================================ -->

# Text Alignment

The Text Alignment system provides utility classes for controlling horizontal text alignment. Use left, center, right, and justify alignment with responsive variants for breakpoints, orientation, and bit-depth.

### Usage

Control text alignment using the alignment utility classes. Options include left, center, right, and justify alignment.
 See the [Responsive Features](#responsive-text-alignment) section for breakpoint, orientation, and bit-depth variants.

| Class | Description |
| --- | --- |
| `text--left` | Aligns text to the left (default for most elements) |
| `text--center` | Centers text horizontally |
| `text--right` | Aligns text to the right |
| `text--justify` | Justifies text, creating even edges on both sides |

This text is left-aligned. This is the default alignment for most text content.

This text is center-aligned. Useful for headings and important content.

This text is right-aligned. Often used for numerical data or RTL languages.

This text is justified. Creates even text edges on both sides but affects readability. Useful for multi-column text layouts.

TextAlignment

    <p class="text--left">Left-aligned text</p>
    <p class="text--center">Center-aligned text</p>
    <p class="text--right">Right-aligned text</p>
    <p class="text--justify">Justified text</p>

### Responsive Features

Alignment classes support all three responsive systems: size-based breakpoints, orientation-based, and bit-depth variants.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different alignment at different screen widths.

Responsive alignment

Left by default, center on md+, right on lg+

Text AlignmentResponsive

    <!-- Left by default, center on md+, right on lg+ -->
    <p class="description text--left md:text--center lg:text--right">Responsive alignment</p>

    <!-- Progressive alignment scaling -->
    <p class="description text--left sm:text--center md:text--right lg:text--justify">Progressive alignment</p>

#### Orientation and Size+Orientation

Text alignment can adapt to orientation with `portrait:` and `landscape:`, and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation variant

Left by default, center in portrait

Text AlignmentOrientation

    <!-- Left by default, center in portrait -->
    <p class="description text--left portrait:text--center">Orientation variant</p>

    <!-- Combined size and orientation -->
    <p class="description text--left md:portrait:text--right">Left by default, right on md+ portrait</p>

#### Bit-Depth Responsive

Alignment classes support bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to apply different alignment on different display color capabilities.

Bit-depth alignment

Center by default, right on 2-bit screens

Text AlignmentBit-Depth Responsive

    <!-- Center by default, right on 2-bit screens -->
    <p class="description text--center 2bit:text--right">Bit-depth alignment</p>

    <!-- Combined: size + bit-depth -->
    <p class="description text--left lg:4bit:text--center">Left by default, center on lg+ 4-bit screens</p>

#### Combined Responsive Features

Combine size, orientation, and bit-depth modifiers for alignment. Use the pattern `size:orientation:bit-depth:utility` for highly targeted styling.

    <!-- Size + orientation + bit-depth -->
    <p class="description md:portrait:2bit:text--right">Right on md+ portrait 2-bit screens</p>

    <!-- Multiple responsive conditions -->
    <p class="description text--left sm:text--center lg:4bit:text--right">Progressive with bit-depth override</p>

Previous

[Text Size Control text size with utility classes across all display types](/framework/docs/3.1/text_size)

Next

[Text Color Apply grayscale and chromatic color shades to text elements](/framework/docs/3.1/text_color)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/text_color.md
     ============================================================ -->

# Text Color

The Text Color system creates the illusion of grayscale text through carefully designed dither patterns. When rendered on 1-bit (black and white only) displays, these patterns create an illusion of different shades of gray by using specific arrangements of black and white pixels. The shade scale matches the [Colors](/framework/docs/3.1/colors) palette.

### Usage

Use the `text--{shade}` utility
 classes to apply these text color patterns to any element. Choose from sixteen values: black, gray-10 through gray-75,
 and white. See the [Responsive Features](#responsive-text-color) section for responsive variants.

Aa

black

Aa

gray-10

Aa

gray-15

Aa

gray-20

Aa

gray-25

Aa

gray-30

Aa

gray-35

Aa

gray-40

Aa

gray-45

Aa

gray-50

Aa

gray-55

Aa

gray-60

Aa

gray-65

Aa

gray-70

Aa

gray-75

Aa

white

Aa

black

Aa

gray-10

Aa

gray-15

Aa

gray-20

Aa

gray-25

Aa

gray-30

Aa

gray-35

Aa

gray-40

Aa

gray-45

Aa

gray-50

Aa

gray-55

Aa

gray-60

Aa

gray-65

Aa

gray-70

Aa

gray-75

Aa

white

Text color shades

**Dark Mode Notice:** The color palette appears inverted because TRMNL's dark mode inverts the entire screen, except the images.

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

### Backward Compatibility

For backward compatibility, the original shade names (`gray-1` through `gray-7`) are still supported but deprecated. These map to equivalent extended shades:

    <!-- Deprecated (but still works) -->
    <div class="text--gray-1">Gray 1 text (deprecated)</div>
    <div class="text--gray-2">Gray 2 text (deprecated)</div>

    <!-- Preferred (new naming) -->
    <div class="text--gray-10">Gray 10 text (preferred)</div>
    <div class="text--gray-20">Gray 20 text (preferred)</div>

### Responsive Features

Text color classes support size-based and orientation-based responsive variants.
 Bit-depth affects color rendering automatically based on the device (1-bit patterns, 2-bit patterns, 4-bit solid colors)—no bit-depth class prefixes are needed for colors.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different colors at different screen widths.

Responsive color

Gray 50 by default, gray 30 on md+

Text ColorResponsive

    <!-- Text color: different shades at different breakpoints -->
    <span class="value text--gray-50 md:text--gray-30">Responsive color</span>

    <!-- Progressive color scaling -->
    <span class="value text--gray-70 sm:text--gray-50 md:text--gray-30 lg:text--black">Progressive color</span>

#### Orientation and Size+Orientation

Text colors can adapt to orientation with `portrait:` and `landscape:`, and can be combined
 with size breakpoints (e.g., `md:portrait:`).

    <!-- Different color in portrait -->
    <span class="value text--gray-50 portrait:text--black">Orientation color variant</span>

    <!-- Combined size and orientation -->
    <span class="value text--gray-50 md:portrait:text--gray-30">Color on md+ portrait</span>

Text color classes support size-based and orientation-based variants only. Bit-depth affects color rendering automatically based on the device (1-bit patterns, 2-bit patterns, 4-bit solid colors)—no bit-depth class prefixes are needed for colors.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Semantic | | | | |
| `--black` | #000000 | — | — | — |
| `--color-error` | var(--red) | — | — | — |
| `--color-primary` | var(--blue) | — | — | — |
| `--color-success` | var(--green) | — | — | — |
| `--color-warning` | var(--orange) | — | — | — |
| `--white` | #FFFFFF | — | — | — |
| Grayscale | | | | |
| `--gray-10` | #111111 | — | — | — |
| `--gray-15` | #222222 | — | — | — |
| `--gray-20` | #333333 | — | — | — |
| `--gray-25` | #444444 | — | — | — |
| `--gray-30` | #555555 | — | — | — |
| `--gray-35` | #666666 | — | — | — |
| `--gray-40` | #777777 | — | — | — |
| `--gray-45` | #888888 | — | — | — |
| `--gray-50` | #999999 | — | — | — |
| `--gray-55` | #AAAAAA | — | — | — |
| `--gray-60` | #BBBBBB | — | — | — |
| `--gray-65` | #CCCCCC | — | — | — |
| `--gray-70` | #DDDDDD | — | — | — |
| `--gray-75` | #EEEEEE | — | — | — |
| Legacy Grayscale | | | | |
| `--gray-1` | #111111 | — | — | — |
| `--gray-2` | #333333 | — | — | — |
| `--gray-3` | #555555 | — | — | — |
| `--gray-4` | #777777 | — | — | — |
| `--gray-5` | #999999 | — | — | — |
| `--gray-6` | #BBBBBB | — | — | — |
| `--gray-7` | #DDDDDD | — | — | — |

Previous

[Text Alignment Control text alignment with responsive breakpoint, orientation, and bit-depth variants](/framework/docs/3.1/text_alignment)

Next

[Text Stroke Legible text when displayed on shaded backgrounds](/framework/docs/3.1/text_stroke)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/text_stroke.md
     ============================================================ -->

# Text Stroke

The Text Stroke system allows you to add outlined text with customizable stroke width and color. This is useful for creating text that stands out against shaded backgrounds.

**Note:** Text Stroke works only on pure black or white text.

[Learn More](#browser-limitations)  

### Basic Usage

Apply `text-stroke` to outline text. Combine with width and shade modifiers as needed.

| Class | Description |
| --- | --- |
| `text-stroke` | Stroke: outline (default 3.5px white) |
| `text-stroke--{size}` | Stroke width: `small`, `medium`, `large`, `xlarge` |
| `text-stroke--{shade}` | Stroke color: `black`, `gray-10` … `gray-75`, `white`. See  [Background](/framework/docs/3.1/background)  for the shade scale. |

    <span class="text-stroke">Outlined text</span>

### Widths

The Text Stroke system includes preset size modifiers that allow you to quickly apply different stroke widths to your text. The default stroke is 3.5px white, with additional options for base (3.5px, equivalent to default), small (2px), medium (4.5px), large (6px), and extra large (7.5px). The `text-stroke--base` modifier explicitly sets the default stroke width and is useful for responsive layouts.

AaNo Stroke

AaSmall

AaBase

AaDefault

AaMedium

AaLarge

AaExtra Large

Text StrokePreset Sizes

    <span class="value value--large">Aa</span>
    <span class="value value--large text-stroke text-stroke--small">Aa</span>
    <span class="value value--large text-stroke text-stroke--base">Aa</span>
    <span class="value value--large text-stroke">Aa</span>
    <span class="value value--large text-stroke text-stroke--medium">Aa</span>
    <span class="value value--large text-stroke text-stroke--large">Aa</span>
    <span class="value value--large text-stroke text-stroke--xlarge">Aa</span>

### Shades

Use the `text-stroke--{shade}` modifier to change the stroke color. Choose from sixteen values: black, gray-10 through gray-75, and white. For an overview of the shade scale and how it adapts across bit‑depths, see [Background](/framework/docs/3.1/background) .

AaNo Stroke

AaSmall

AaBase

AaDefault

AaMedium

AaLarge

AaExtra Large

Text StrokeShades

    <span class="value value--large text--white">Aa</span>
    <span class="value value--large text--white text-stroke text-stroke--small text-stroke--black">Aa</span>
    <span class="value value--large text--white text-stroke text-stroke--black">Aa</span>
    <span class="value value--large text--white text-stroke text-stroke--medium text-stroke--black">Aa</span>
    <span class="value value--large text--white text-stroke text-stroke--large text-stroke--black">Aa</span>
    <span class="value value--large text--white text-stroke text-stroke--xlarge text-stroke--black">Aa</span>

### Browser Limitations

**Text Stroke works only when the text itself is pure black or pure white.** This is due to how browsers render strokes relative to text fills.

We simulate grayscale text by applying hand-crafted bitmap patterns as a background and revealing them with `background-clip: text` (with transparent text color). This makes text appear gray, but under the hood the fill is not a solid color - it's a background image clipped to the text.

The CSS `paint-order` property cannot treat a background as a pass-through fill layer, so only `paint-order: stroke fill;` is effective when the fill is a solid color. Because clipped backgrounds are not considered a fill for paint-order, we cannot stroke around grayscale (background-clipped) text. Use black or white text when you need a stroke.

Previous

[Text Color Apply grayscale and chromatic color shades to text elements](/framework/docs/3.1/text_color)

Next

[Overflow Handle column items overflow](/framework/docs/3.1/overflow)


