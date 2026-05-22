<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/background.md
     ============================================================ -->

# Background

Use the color palette defined in [Colors](/framework/docs/3.1/colors). Apply these shades with bg--{token} for backgrounds. On 1-bit displays, grayscale uses dither patterns; on 2-bit and 4-bit+, solid colors render.

### Grayscale

Grayscale background shades only, including the center spacer between 40 and 45.

black

10

15

20

25

30

35

40

45

50

55

60

65

70

75

white

Grayscale backgrounds

**Dark Mode Notice:** The color palette appears inverted because TRMNL's dark mode inverts the entire screen, except the images.

### Base Colors

Full base palettes for background tokens: grayscale and all chromatic hues with every shade step.

10

15

20

25

30

35

40

base

45

50

55

60

65

70

75

Base background colors

### Usage

Use the `bg--{shade}` utility
 classes to apply these background patterns to any element. Grayscale: black, gray-10 through gray-75, and white.
 Chromatic: `bg--{hue}` (pure color, e.g. bg--red, bg--green) or `bg--{hue}-{step}` (e.g. bg--red-50, bg--blue-40).
 Semantic: `bg--primary`, `bg--success`, `bg--error`, etc. (see [Colors](/framework/docs/3.1/colors)).

    <div class="bg--black">Black</div>
    <div class="bg--gray-10">Gray 10</div>
    <div class="bg--gray-15">Gray 15</div>
    <div class="bg--gray-20">Gray 20</div>
    <div class="bg--gray-25">Gray 25</div>
    <div class="bg--gray-30">Gray 30</div>
    <div class="bg--gray-35">Gray 35</div>
    <div class="bg--gray-40">Gray 40</div>
    <div class="bg--gray-45">Gray 45</div>
    <div class="bg--gray-50">Gray 50</div>
    <div class="bg--gray-55">Gray 55</div>
    <div class="bg--gray-60">Gray 60</div>
    <div class="bg--gray-65">Gray 65</div>
    <div class="bg--gray-70">Gray 70</div>
    <div class="bg--gray-75">Gray 75</div>
    <div class="bg--white">White</div>

**Device Preview tip:** Use the Device Preview (top right) to switch between grayscale and color palettes. Try Inky Impression 7.3 (color-7a) or Tidbyt (color-24bit) to see chromatic colors.

#### Chromatic tokens

Use `bg--{hue}-{step}` and `text--{hue}-{step}` for color backgrounds and text.

    <div class="bg--red">Pure red</div>
    <div class="bg--red-50">Red 50</div>
    <div class="bg--blue-40">Blue 40</div>
    <div class="bg--green-60">Green 60</div>
    <div class="text--red-50">Red text</div>

#### Semantic tokens

Use `bg--{role}` and `text--{role}` for intent-based colors. Roles: primary, success, error, warning. See [Colors](/framework/docs/3.1/colors) for the full mapping.

    <div class="bg--primary text--white">Primary</div>
    <div class="bg--success text--white">Success</div>
    <div class="bg--error text--white">Error</div>
    <div class="text--warning">Warning text</div>

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

[Visibility Control element visibility based on display bit depth](/framework/docs/3.1/visibility)

Next

[Border Apply border patterns that create the illusion of different border intensities](/framework/docs/3.1/border)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/border.md
     ============================================================ -->

# Border

The Border system creates the illusion of grayscale borders through carefully designed dither patterns. When rendered on 1-bit displays, these patterns create varying border intensities using alternating black and white pixels.

### Usage

Apply borders using `border--h-{n}` for horizontal borders
 and `border--v-{n}` for vertical borders,
 where n ranges from 1 (black) to 7 (white), with dithered values in between.

#### Horizontal Borders

1

2

3

4

5

6

7

1

2

3

4

5

6

7

Horizontal Borders

**Dark Mode Notice:** The color palette appears inverted because TRMNL's dark mode inverts the entire screen, except the images.

    <div class="border--h-1">Horizontal Border 1</div>
    <div class="border--h-2">Horizontal Border 2</div>
    <div class="border--h-3">Horizontal Border 3</div>
    <div class="border--h-4">Horizontal Border 4</div>
    <div class="border--h-5">Horizontal Border 5</div>
    <div class="border--h-6">Horizontal Border 6</div>
    <div class="border--h-7">Horizontal Border 7</div>

#### Vertical Borders

1

2

3

4

5

6

7

1

2

3

4

5

6

7

Vertical Borders

    <div class="border--v-1">Vertical Border 1</div>
    <div class="border--v-2">Vertical Border 2</div>
    <div class="border--v-3">Vertical Border 3</div>
    <div class="border--v-4">Vertical Border 4</div>
    <div class="border--v-5">Vertical Border 5</div>
    <div class="border--v-6">Vertical Border 6</div>
    <div class="border--v-7">Vertical Border 7</div>

### Backward Compatibility

The Border utility in Framework v2 is **not backward compatible** with the legacy v1 Border utility. This is the only non-backward compatible utility in the new framework.

#### What changed?

- The visual scale has been redefined to a full-spectrum grayscale that works on *any* background shade: `1` = black … `7` = white.
- In v1, borders only produced a faux grayscale on white surfaces and appeared solid black (invisible) on black surfaces. In v2, borders render consistently on both light and dark backgrounds.
- Class names remain the same (`border--h-{n}`, `border--v-{n}`), but the visual output for a given `{n}` looks different.

#### How to upgrade existing plugins

- Keep your markup unchanged. Continue using `border--h-{n}` and `border--v-{n}`.
- Re-evaluate the chosen `{n}` values based on the new scale.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--rounded-full` | 9999px | — | — | — |
| `--rounded-large` | 20px | — | — | — |
| `--rounded-medium` | 15px | — | — | — |
| `--rounded-none` | 0px | — | — | — |
| `--rounded-small` | 7px | — | — | — |
| `--rounded-xlarge` | 25px | — | — | — |
| `--rounded-xsmall` | 5px | — | — | — |
| `--rounded-xxlarge` | 30px | — | — | — |

Previous

[Background Apply color tokens as backgrounds with bg--{token}](/framework/docs/3.1/background)

Next

[Rounded Control element rounding with predefined values](/framework/docs/3.1/rounded)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/rounded.md
     ============================================================ -->

# Rounded

The Rounded system provides consistent border radius values for creating smooth corners on elements. It offers predefined sizes, corner-specific controls, and custom values to maintain visual consistency throughout your interface.

### Size Variants

The rounded system includes predefined base sizes and arbitrary pixel values. These standardized radii
 help maintain consistent corner rounding across your application's components.

#### Base

The base `rounded` class without size modifiers
 and the `rounded--base` class both produce the same visual result,
 providing the standard border radius (10px). Use `rounded--base` when you need
 to explicitly set the base size in responsive contexts. See the [Responsive Rounded](#responsive-rounded) section for examples.

rounded--none

rounded--xsmall

rounded--small

rounded

rounded--medium

rounded--large

rounded--xlarge

rounded--xxlarge

rounded--full

Predefined RoundedDesign System

    <!-- Available rounded sizes from sharp to pill -->
    <div class="rounded--none">...</div>     <!-- 0px -->
    <div class="rounded--xsmall">...</div>   <!-- 5px -->
    <div class="rounded--small">...</div>    <!-- 7px -->
    <div class="rounded">...</div>           <!-- 10px (default) -->
    <div class="rounded--base">...</div>     <!-- 10px (explicit base) -->
    <div class="rounded--medium">...</div>   <!-- 15px -->
    <div class="rounded--large">...</div>    <!-- 20px -->
    <div class="rounded--xlarge">...</div>   <!-- 25px -->
    <div class="rounded--xxlarge">...</div>  <!-- 30px -->
    <div class="rounded--full">...</div>     <!-- 9999px (pill shape) -->

    <!-- Or using the base modifier -->
    <div class="rounded--base">...</div>

#### Arbitrary

Use `rounded--[Npx]` syntax to specify
 exact pixel values from **0px to 50px**. This works with all rounded utilities, but does not support responsive variants.

rounded--[0px]

rounded--[10px]

rounded--[30px]

rounded--[20px]

rounded--[40px]

rounded--[50px]

Arbitrary Pixel RoundedDesign System

    <!-- Custom rounded values from 0px to 50px (no responsive support) -->
    <div class="rounded--[0px]">...</div>
    <div class="rounded--[10px]">...</div>
    <div class="rounded--[20px]">...</div>
    <div class="rounded--[30px]">...</div>
    <div class="rounded--[40px]">...</div>
    <div class="rounded--[50px]">...</div>

    <!-- Works with corner-specific too -->
    <div class="rounded-t--[16px]">...</div>

Arbitrary rounded values using the `rounded--[Npx]` syntax do not support responsive variants. Use predefined rounded classes if you need responsive behavior.

### Corner-Specific Rounding

Apply border radius to specific corners or sides of an element. This allows for more complex shapes
 and asymmetric designs while maintaining consistency.

#### Individual Corners

Target specific corners with `rounded-{corner}{-size}` where
 corner can be tl (top-left), tr (top-right), br (bottom-right), or bl (bottom-left).

rounded-tl--large

rounded-tr--large

rounded-bl--large

rounded-br--large

Corner-Specific RoundingDesign System

#### Side Rounding

Round entire sides with `rounded-{side}{-size}` where
 side can be t (top), r (right), b (bottom), or l (left).

rounded-t--large

rounded-r--large

rounded-b--large

rounded-l--large

Side RoundingDesign System

    <!-- Individual corners -->
    <div class="rounded-tl--large">Top left corner</div>
    <div class="rounded-tr--large">Top right corner</div>
    <div class="rounded-br--large">Bottom right corner</div>
    <div class="rounded-bl--large">Bottom left corner</div>

    <!-- Entire sides -->
    <div class="rounded-t--large">Top corners</div>
    <div class="rounded-r--large">Right corners</div>
    <div class="rounded-b--large">Bottom corners</div>
    <div class="rounded-l--large">Left corners</div>

### Responsive Rounded

Rounded utilities support size-based breakpoints, orientation variants, and their combination.
 Use prefixes like `md:`, `portrait:`,
 and `md:portrait:` to target conditions.

#### Base Examples

Apply different border radius values at different breakpoints using the size-based responsive system.
 The framework follows a mobile-first approach where larger breakpoints inherit smaller ones.
 The `--base` modifier
 is particularly useful for resetting to the default size at specific breakpoints.

Responsive

Xlarge in landscape, small in portrait

Responsive RoundedSize-Based

    <!-- Orientation example -->
    <div class="rounded--xlarge portrait:rounded--small">
      Xlarge in landscape, small in portrait
    </div>

#### Corner-Specific Examples

Corner-specific rounding utilities support responsive variants just like base rounded utilities.
 Use prefixes like `md:`, `portrait:`,
 and `md:portrait:` to apply different corner rounding at different breakpoints.

Responsive

Xlarge in landscape, small in portrait

Responsive Corner RoundingSize-Based

    <!-- Orientation example -->
    <div class="rounded-tl--xlarge portrait:rounded-tl--small">
      Xlarge in landscape, small in portrait
    </div>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--progress-bar-radius` | 10px | — | — | — |
| `--rounded-full` | 9999px | — | — | — |
| `--rounded-large` | 20px | — | — | — |
| `--rounded-medium` | 15px | — | — | — |
| `--rounded-none` | 0px | — | — | — |
| `--rounded-small` | 7px | — | — | — |
| `--rounded-xlarge` | 25px | — | — | — |
| `--rounded-xsmall` | 5px | — | — | — |
| `--rounded-xxlarge` | 30px | — | — | — |
| `--title-bar-border-radius` | 10px | 10px | — | 10px |

Previous

[Border Apply border patterns that create the illusion of different border intensities](/framework/docs/3.1/border)

Next

[Outline Pixel-perfect rounded borders using border-image for 1-bit displays](/framework/docs/3.1/outline)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/outline.md
     ============================================================ -->

# Outline

The Outline utility provides pixel-perfect rounded borders using CSS border-image with a 9-slice composite image. On 1-bit displays, it renders crisp, dithered corner patterns that scale with the element. On 2-bit and 4-bit displays, it falls back to standard CSS borders with border-radius.

### Basic Usage

The outline utility applies a pixel-perfect dotted rounded border to any element. On 1-bit displays,
 it uses pure CSS gradients to place single-pixel dots at exact integer coordinates along
 a rounded rectangle path. On 2-bit and 4-bit displays, it falls back to a standard CSS border
 with border-radius.

#### Applying an Outline

Add the `outline` class to any element
 to give it a pixel-perfect rounded border.

With outline

Without outline

Outline UtilityDesign System

    <!-- Add outline to any element -->
    <div class="outline">
      Content with pixel-perfect rounded border
    </div>

### How It Works

The outline utility uses 20 CSS background layers to place each dot at an exact integer pixel
 coordinate. Edge dots use `repeating-linear-gradient` for a 1px dot every 4px. Corner dots use individual `linear-gradient` blocks sized to 1x1px
 and positioned with pixel-precise offsets.

#### CSS Gradient Dots

No images are used. Each dot is computed mathematically by the CSS engine,
 guaranteeing pixel-grid alignment at any element size. The border color comes from `--framework-border-strong`,
 so dark mode works automatically without separate assets.

    /* How the CSS works internally (simplified) */
    .outline::after {
        background:
            /* Edges: repeating 1px dot every 4px */
            repeating-linear-gradient(to right, black 0 1px, transparent 1px 4px)
                12px 0 / calc(100% - 24px) 1px no-repeat,
            /* ... 3 more edges ... */
            /* Corners: individual 1x1px dots */
            linear-gradient(black, black) 8px 0 / 1px 1px no-repeat,
            linear-gradient(black, black) 4px 1px / 1px 1px no-repeat,
            /* ... 14 more corner dots ... */
    }

### Bit-Depth Behavior

The outline utility adapts to different display bit-depths automatically. On 1-bit displays, it uses
 CSS gradient dots for pixel-perfect rendering. On 2-bit and 4-bit displays, it falls back to
 standard CSS borders with border-radius for smoother rendering.

#### 1-bit Displays

Uses pure CSS gradients to place sparse single-pixel dots at exact integer coordinates.
 Dark mode works automatically via `--framework-border-strong` which inverts to white.

#### 2-bit and 4-bit Displays

Falls back to a standard 1px solid border with 10px border-radius for smoother rendering
 that takes advantage of the additional grayscale capabilities.

    /* 1-bit: CSS gradient dots (via outline-dots mixin) */
    .outline::after {
        @include outline-dots;
    }

    /* 2-bit and 4-bit: Falls back to CSS border */
    .screen--2bit .outline::after,
    .screen--4bit .outline::after {
        background: none;
        border: 1px solid var(--framework-border-strong);
        border-radius: 10px;
    }

### Screen Backdrop Modifier

For mashup layouts, the `screen--backdrop` modifier provides an alternative appearance where views sit on a patterned background instead of
 having outlined borders.

#### Default vs Backdrop Mashups

By default, mashups use a white background with bordered views for a clean, separated look.
 The `screen--backdrop` modifier changes this to a patterned background (1-bit) or solid gray background (2-bit/4-bit)
 with plain white views on top.

Plugin A

Plugin B

    <!-- Default mashup (white background, bordered views) -->
    <div class="screen">
      <div class="mashup mashup--1Lx1R">
        <div class="view view--half_vertical">...</div>
        <div class="view view--half_vertical">...</div>
      </div>
    </div>

    <!-- Backdrop mashup (patterned background) -->
    <div class="screen screen--backdrop">
      <div class="mashup mashup--1Lx1R">
        <div class="view view--half_vertical">...</div>
        <div class="view view--half_vertical">...</div>
      </div>
    </div>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--rounded-full` | 9999px | — | — | — |
| `--rounded-large` | 20px | — | — | — |
| `--rounded-medium` | 15px | — | — | — |
| `--rounded-none` | 0px | — | — | — |
| `--rounded-small` | 7px | — | — | — |
| `--rounded-xlarge` | 25px | — | — | — |
| `--rounded-xsmall` | 5px | — | — | — |
| `--rounded-xxlarge` | 30px | — | — | — |

Previous

[Rounded Control element rounding with predefined values](/framework/docs/3.1/rounded)

Next

[Image Optimize images using dithering techniques for 1-bit rendering](/framework/docs/3.1/image)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/image.md
     ============================================================ -->

# Image

Image creates the illusion of grayscale through carefully designed dither patterns. When rendered on 1-bit (black and white only) displays, these patterns create an illusion of different shades of gray by using specific arrangements of black and white pixels.

### Dithering

Use the class `image-dither` to dither an image.

![Plugin icon](/images/framework/image/image--1bit.png)![Plugin icon](/images/framework/image/image--2bit.png)![Plugin icon](/images/framework/image/image--4bit.png)

Image

    <img class="image image-dither rounded" src="path to the image file">

### Object Fit

Control how images are displayed when not shown in their original aspect ratio.

#### Options

- **Fill:** The image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit.
- **Contain:** The image keeps its aspect ratio, but is resized to fit within the given dimension.
- **Cover:** The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit.

![Plugin icon](/images/screensaver/rover.bmp)

Fill

![Plugin icon](/images/screensaver/rover.bmp)

Contain

![Plugin icon](/images/screensaver/rover.bmp)

Cover

Object Fit Options

    <img class="image image--fill" src="path to image">
    <img class="image image--contain" src="path to image">
    <img class="image image--cover" src="path to image">

Previous

[Outline Pixel-perfect rounded borders using border-image for 1-bit displays](/framework/docs/3.1/outline)

Next

[Image Stroke Legible images when displayed on shaded backgrounds](/framework/docs/3.1/image_stroke)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/image_stroke.md
     ============================================================ -->

# Image Stroke

The Image Stroke system allows you to add an outline to a vector or transparent raster images with customizable stroke width and color. This is useful for creating images that stand out against shaded backgrounds.

### Usage

The Image Stroke system includes preset size modifiers that allow you to quickly apply different stroke widths to your images. The default stroke is 1.5px white, with additional options for base (1.5px, equivalent to default), small (1px), medium (2px), large (2.5px), and extra large (3px). The `image-stroke--base` modifier explicitly sets the default stroke width and is useful for responsive layouts.

No Stroke

Small

Base

Default

Medium

Large

Extra Large

Image StrokePreset Sizes

    <img src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke image-stroke--small" src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke image-stroke--base" src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke" src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke image-stroke--medium" src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke image-stroke--large" src="/images/trmnl--glyph-black.svg">
    <img class="image-stroke image-stroke--xlarge" src="/images/trmnl--glyph-black.svg">

### Stroke Colors

Use the black modifier for images on dark backgrounds.

No Stroke

Small

Base

Default

Medium

Large

Extra Large

Image StrokeColor Variants

    <img src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black image-stroke--small" src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black image-stroke--base" src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black" src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black image-stroke--medium" src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black image-stroke--large" src="/images/trmnl--glyph-white.svg">
    <img class="image-stroke image-stroke--black image-stroke--xlarge" src="/images/trmnl--glyph-white.svg">

Previous

[Image Optimize images using dithering techniques for 1-bit rendering](/framework/docs/3.1/image)

Next

[Scale Scale interface to affect content density and readability](/framework/docs/3.1/scale)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/scale.md
     ============================================================ -->

# Scale

The Scale system provides utility classes to scale the entire interface by adjusting the UI scale factor. This is useful for adapting content density for different viewing distances or user preferences.

### Basic Usage

Apply scale modifiers to the `screen` element to scale all interface elements proportionally.
 The scale affects fonts, spacing, dimensions, and other UI elements that use the `--ui-scale` CSS variable. Scale is available on 4bit devices.

#### Available Scale Levels

The framework provides six predefined scale levels:

| Class | Scale Factor | Use Case |
| --- | --- | --- |
| `screen--scale-xsmall` | 0.75 (75%) | Maximum content density |
| `screen--scale-small` | 0.875 (87.5%) | Increased content density |
| `screen--scale-regular` | 1.0 (100%) | Default scale, no scaling applied |
| `screen--scale-large` | 1.125 (112.5%) | Increased size for better readability |
| `screen--scale-xlarge` | 1.25 (125%) | Large scale for increased readability |
| `screen--scale-xxlarge` | 1.5 (150%) | Maximum scale for accessibility needs |

### Scale Examples

The following examples demonstrate how scale levels affect the same content layout. Notice how all elements scale proportionally.

#### Extra Small Scale (75%)

Maximum content density - useful when viewing up close or when you need to fit more information on screen.

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelExtra Small (75%)

    <div class="screen screen--scale-xsmall">
      <!-- Your content here -->
    </div>

#### Small Scale (87.5%)

Reduced scale for fitting more content while maintaining good readability.

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelSmall (87.5%)

    <div class="screen screen--scale-small">
      <!-- Your content here -->
    </div>

#### Regular Scale (100%)

Default scale - this is the baseline that all other scale levels are relative to.

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelRegular (100%)

    <div class="screen screen--scale-regular">
      <!-- Your content here -->
    </div>

#### Large Scale (112.5%)

Increased size for better readability

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelLarge (112.5%)

    <div class="screen screen--scale-large">
      <!-- Your content here -->
    </div>

#### Extra Large Scale (125%)

Large scale for increased readability

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelExtra Large (125%)

    <div class="screen screen--scale-xlarge">
      <!-- Your content here -->
    </div>

#### Extra Extra Large Scale (150%)

Maximum scale for accessibility needs

Today

1

Morning Meeting: Threat Level Check-inTeam sync and updates

9:00 AM - 9:30 AMDaily

2

Identity Theft WatchReview suspicious 'Jim' behaviours

10:30 AM - 11:30 AMReview

3

Lunch Break: Pretzel Day PrepTeam lunch at downtown

12:30 PM - 1:30 PMBreak

4

Client Call with JanWeekly check-in with stakeholders

2:00 PM - 3:00 PMClient

5

Complaint Sorting: Product RecallPrioritize reported issues

3:30 PM - 4:30 PMComplaints

6

Bulletin Board Update: DundiesUpdate nominations and categories

4:30 PM - 5:30 PMDocs

7

End of Day Sync: Café DiscoReview progress and blockers

5:30 PM - 6:00 PMSync

Tomorrow

1

Beach Games Roll-CallConfirm capacity without hot coals

10:00 AM - 12:00 PMPlanning

2

Stakeholder Presentation: Threat Level MidnightTasteful metrics, minimal fireworks

2:00 PM - 3:30 PMPresentation

3

Oscar’s Index Intervention (Of Spreadsheets)Deep dive into the budget tabs

9:00 AM - 11:00 AMNumbers

4

Parkour QA Gauntlet (Very Gentle)Functionality verified: walking

1:00 PM - 3:00 PMQA-ish

5

Campaign Analysis: WUPHF Without The WUPHFLess shouting, more smiling

4:00 PM - 5:30 PMMarketing

This Week

1

Warehouse to Cloud (No Forklifts)Move boxes, label feelings

WednesdayInfrastructure-ish

2

Customer Satisfaction Review: 'Did I Stutter?'Improve smiles per hour

ThursdayCustomer Success

3

Benihana to Back Office CoordinationWe will know who is who

FridayIntegration-ish

4

Data Deep Dive: Boom, Roasted (With Charts)Roasts limited to pie charts

MondayAnalytics

5

Accessibility: Conference Room B UpgradesLess squinting, more seeing

TuesdayAccessibility

6

Respect the Dashboard (Of Feelings)Set baselines for vibes

WednesdayMonitoring

7

The Dundies of GrowthSkills, mentoring, zero karaoke tears

FridayDevelopment

Scale LevelExtra Extra Large (150%)

    <div class="screen screen--scale-xxlarge">
      <!-- Your content here -->
    </div>

### How It Works

The scale system works by modifying the `--ui-scale` CSS variable, which is used throughout the framework to calculate sizes.

#### Affected Properties

When you apply a scale modifier, it scales the following properties:

- Font sizes (all text elements)
- Line heights
- Component dimensions (title bar height, progress bar sizes, etc.)
- Spacing that uses the ui-scale multiplier
- Any custom properties that reference `var(--ui-scale)`


**Note:** The scale utility only affects elements that use the `--ui-scale` variable in their calculations. Fixed pixel values and screen dimensions remain unchanged.

### Combining with Device Configurations

Scale modifiers can be combined with device-specific classes to override the default UI scale for particular devices.

| Class Combination | Description |
| --- | --- |
| `screen screen--v2` | Uses device default scale |
| `screen screen--v2 screen--scale-small` | Overrides to 87.5% scale |
| `screen screen--amazon_kindle_2024 screen--scale-large` | Overrides to 112.5% scale |

    <!-- Use device default UI scale -->
    <div class="screen screen--v2">
      <!-- Content -->
    </div>

    <!-- Override device scale with scale modifier -->
    <div class="screen screen--v2 screen--scale-small">
      <!-- Content at 87.5% scale -->
    </div>

    <!-- Combine with any device configuration -->
    <div class="screen screen--amazon_kindle_2024 screen--scale-large">
      <!-- Kindle device with 112.5% scale -->
    </div>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--gap-large` | 20px | — | — | — |
| `--gap-medium` | 16px | — | — | — |
| `--gap-small` | 7px | — | — | — |
| `--gap-xlarge` | 30px | — | — | — |
| `--gap-xsmall` | 5px | — | — | — |
| `--gap-xxlarge` | 40px | — | — | — |
| `--list-gap-large` | 16px | — | — | — |
| `--list-gap-small` | 8px | — | — | — |
| `--ui-scale` | 1 | — | — | — |

Previous

[Image Stroke Legible images when displayed on shaded backgrounds](/framework/docs/3.1/image_stroke)

Next

[Colors Complete palette definition: grayscale, chromatic hues, and blend pairs](/framework/docs/3.1/colors)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/colors.md
     ============================================================ -->

# Colors

The Colors system defines the complete palette for the framework: grayscale, chromatic hues, blend pairs, and semantic roles (primary, success, error, warning). Use these tokens with bg--, text--, and other utilities. See Background and Text Color for usage examples.

### Grayscale Palette

The complete range of grayscale shades available in the framework, from pure black to pure white. These tokens use the same lightness scale as chromatic and blend palettes.

black

black

10

gray-10

15

gray-15

20

gray-20

25

gray-25

30

gray-30

35

gray-35

40

gray-40

45

gray-45

50

gray-50

55

gray-55

60

gray-60

65

gray-65

70

gray-70

75

gray-75

white

white

**Dark Mode Notice:** The color palette appears inverted because TRMNL's dark mode inverts the entire screen, except the images.

### Chromatic Palette

The framework offers 10 hues × 14 lightness steps (red, orange, yellow, lime, green, cyan, blue, violet, purple, pink), using the same steps as grayscale (10, 15, 20, …, 75). Select a color device (e.g. Inky Impression 7.3, Tidbyt) from the Device Preview above to see these colors in action. Use the Raw Colors / Preview Colors toggle to compare full-bright tokens vs device-representative rendering.

red

red-10

red-15

red-20

red-25

red-30

red-35

red-40

red

red-45

red-50

red-55

red-60

red-65

red-70

red-75

orange

orange-10

orange-15

orange-20

orange-25

orange-30

orange-35

orange-40

orange

orange-45

orange-50

orange-55

orange-60

orange-65

orange-70

orange-75

yellow

yellow-10

yellow-15

yellow-20

yellow-25

yellow-30

yellow-35

yellow-40

yellow

yellow-45

yellow-50

yellow-55

yellow-60

yellow-65

yellow-70

yellow-75

lime

lime-10

lime-15

lime-20

lime-25

lime-30

lime-35

lime-40

lime

lime-45

lime-50

lime-55

lime-60

lime-65

lime-70

lime-75

green

green-10

green-15

green-20

green-25

green-30

green-35

green-40

green

green-45

green-50

green-55

green-60

green-65

green-70

green-75

cyan

cyan-10

cyan-15

cyan-20

cyan-25

cyan-30

cyan-35

cyan-40

cyan

cyan-45

cyan-50

cyan-55

cyan-60

cyan-65

cyan-70

cyan-75

blue

blue-10

blue-15

blue-20

blue-25

blue-30

blue-35

blue-40

blue

blue-45

blue-50

blue-55

blue-60

blue-65

blue-70

blue-75

violet

violet-10

violet-15

violet-20

violet-25

violet-30

violet-35

violet-40

violet

violet-45

violet-50

violet-55

violet-60

violet-65

violet-70

violet-75

purple

purple-10

purple-15

purple-20

purple-25

purple-30

purple-35

purple-40

purple

purple-45

purple-50

purple-55

purple-60

purple-65

purple-70

purple-75

pink

pink-10

pink-15

pink-20

pink-25

pink-30

pink-35

pink-40

pink

pink-45

pink-50

pink-55

pink-60

pink-65

pink-70

pink-75

**Device Preview tip:** Use the Device Preview (top right) to switch between grayscale and color palettes, then toggle Raw Colors / Preview Colors to compare full-bright and device-accurate previews. Try Inky Impression 7.3 (color-7a) or Tidbyt (color-24bit) to see chromatic colors.

### Semantic Colors

Semantic color roles map meaning to base hues. Use `bg--primary`, `text--success`, and similar utilities for intent-based styling. These alias underlying tokens (e.g. primary → blue) and inherit all device/bit-depth behavior. Themes can override via `--color-{role}` CSS variables.

Primary

bg--primary

→ blue

Success

bg--success

→ green

Error

bg--error

→ red

Warning

bg--warning

→ orange

| Role | Underlying Token | Use |
| --- | --- | --- |
| primary | `blue` | Main actions, accents |
| success | `green` | Confirmations, positive states |
| error | `red` | Errors, destructive actions |
| warning | `orange` | Cautions, alerts |

### Token Syntax

Apply these color tokens with utility prefixes. The [Background](/framework/docs/3.1/background) page documents `bg--{token}`; the [Text Color](/framework/docs/3.1/text_color) page documents `text--{token}`. Other utilities (border, outline, etc.) may use the same tokens where applicable.

| Utility | Example | Use |
| --- | --- | --- |
| bg-- | `bg--gray-50`, `bg--red-40` | Background colors |
| text-- | `text--gray-50`, `text--blue-60`, `text--success` | Text colors |
| bg-- / text-- (semantic) | `bg--primary`, `text--error`, `text--success` | Semantic roles (primary, success, error, warning) |

**Grayscale:** black, gray-10 through gray-75, white. **Chromatic:** `{hue}` (pure color) or `{hue}-{step}` (e.g. red-50, blue-40). **Blend:** `{colorA}-{colorB}-{step}` (e.g. red-blue-50, green-yellow-25). **Semantic:** `primary`, `success`, `error`, `warning` (alias base hues).

### Backward Compatibility

For backward compatibility, the original shade names (`gray-1` through `gray-7`) are still supported but deprecated. These map to equivalent extended shades:

gray-1 (deprecated)

gray-1

gray-2 (deprecated)

gray-2

gray-3 (deprecated)

gray-3

gray-4 (deprecated)

gray-4

gray-5 (deprecated)

gray-5

gray-6 (deprecated)

gray-6

gray-7 (deprecated)

gray-7

    <!-- Deprecated (but still works) -->
    <div class="bg--gray-1">Gray 1</div>
    <div class="bg--gray-2">Gray 2</div>

    <!-- Preferred (new naming) -->
    <div class="bg--gray-10">Gray 10</div>
    <div class="bg--gray-20">Gray 20</div>

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

[Scale Scale interface to affect content density and readability](/framework/docs/3.1/scale)

Next

[Tokens Complete CSS variable reference with root defaults, density, and bit-depth overrides](/framework/docs/3.1/tokens)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/tokens.md
     ============================================================ -->

# Tokens

The Tokens reference lists every Framework CSS variable from `_variables_root.scss` and display overrides in `_variables_overrides.scss`. Use it to understand defaults, 2-bit visual/layout behavior, high-density typography, and 4/8/16-bit scaling.

### How To Read This Table

Each row is a CSS custom property token. `Root` comes from `_variables_root.scss`. `2-bit`, `density 2x`, and `4/8/16-bit` come from mixins in `_variables_overrides.scss`.

### Palette

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

### Description

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--description-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--description-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--description-font-smoothing` | none | none | auto | — |
| `--description-font-weight` | 400 | 400 | 400 | — |
| `--description-line-height` | 1 | 1 | 1.2 | — |
| Large | | | | |
| `--description-large-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--description-large-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--description-large-font-smoothing` | none | none | auto | — |
| `--description-large-font-weight` | 400 | 400 | 700 | — |
| `--description-large-line-height` | 1.25 | 1.25 | 1.2 | — |
| Xlarge | | | | |
| `--description-xlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--description-xlarge-font-size` | 21px | — | calc(21px * var(--ui-scale)) | — |
| `--description-xlarge-font-smoothing` | auto | — | auto | — |
| `--description-xlarge-font-weight` | 500 | — | 500 | — |
| `--description-xlarge-line-height` | 1.2 | — | 1.2 | — |
| Xxlarge | | | | |
| `--description-xxlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--description-xxlarge-font-size` | 24px | — | calc(24px * var(--ui-scale)) | — |
| `--description-xxlarge-font-smoothing` | auto | — | auto | — |
| `--description-xxlarge-font-weight` | 475 | — | 475 | — |
| `--description-xxlarge-line-height` | 1.2 | — | 1.2 | — |

### Other

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--font-base-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--font-base-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--font-base-font-smoothing` | none | none | auto | — |
| `--font-base-line-height` | 1.25 | 1.25 | calc(22px * var(--ui-scale)) | — |
| `--font-giga-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-giga-font-size` | 96px | — | — | — |
| `--font-giga-font-smoothing` | auto | — | — | — |
| `--font-giga-line-height` | 108px | — | — | — |
| `--font-large-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | — |
| `--font-large-font-size` | 26px | 26px | calc(21px * var(--ui-scale)) | — |
| `--font-large-font-smoothing` | none | none | auto | — |
| `--font-large-line-height` | 1 | 1 | 1.2 | — |
| `--font-mega-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-mega-font-size` | 74px | — | — | — |
| `--font-mega-font-smoothing` | auto | — | — | — |
| `--font-mega-line-height` | 86px | — | — | — |
| `--font-peta-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-peta-font-size` | 170px | — | — | — |
| `--font-peta-font-smoothing` | auto | — | — | — |
| `--font-peta-line-height` | 180px | — | — | — |
| `--font-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--font-small-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--font-small-font-smoothing` | none | none | auto | — |
| `--font-small-line-height` | 1 | 1 | calc(18px * var(--ui-scale)) | — |
| `--font-tera-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-tera-font-size` | 128px | — | — | — |
| `--font-tera-font-smoothing` | auto | — | — | — |
| `--font-tera-line-height` | 128px | — | — | — |
| `--font-xlarge-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-xlarge-font-size` | 26px | — | — | — |
| `--font-xlarge-font-smoothing` | auto | — | — | — |
| `--font-xlarge-line-height` | 29px | — | — | — |
| `--font-xxlarge-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-xxlarge-font-size` | 38px | — | — | — |
| `--font-xxlarge-font-smoothing` | auto | — | — | — |
| `--font-xxlarge-line-height` | 42px | — | — | — |
| `--font-xxxlarge-font-family` | "Inter Variable", Inter | — | — | — |
| `--font-xxxlarge-font-size` | 58px | — | — | — |
| `--font-xxxlarge-font-smoothing` | auto | — | — | — |
| `--font-xxxlarge-line-height` | 70px | — | — | — |

### Layout

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--full-h` | calc(var(--screen-h) - var(--gap) * 2) | — | — | — |
| `--full-w` | calc(var(--screen-w) - var(--gap) * 2) | — | — | — |
| `--half_horizontal-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | — | — | — |
| `--half_horizontal-w` | calc((var(--screen-w) - var(--gap) * 2)) | — | — | — |
| `--half_vertical-h` | calc((var(--screen-h) - var(--gap) * 2)) | — | — | — |
| `--half_vertical-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | — | — | — |
| `--quadrant-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | — | — | — |
| `--quadrant-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | — | — | — |
| `--screen-h` | 480px | — | — | — |
| `--screen-h-original` | 480px | — | — | — |
| `--screen-w` | 800px | — | — | — |
| `--screen-w-original` | 800px | — | — | — |

### Spacing

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--gap` | 10px | — | — | — |
| `--gap-large` | 20px | — | — | — |
| `--gap-medium` | 16px | — | — | — |
| `--gap-small` | 7px | — | — | — |
| `--gap-xlarge` | 30px | — | — | — |
| `--gap-xsmall` | 5px | — | — | — |
| `--gap-xxlarge` | 40px | — | — | — |
| `--list-gap-large` | 16px | — | — | — |
| `--list-gap-small` | 8px | — | — | — |

### Item

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--item-index-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--item-index-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--item-index-font-smoothing` | none | none | auto | — |
| `--item-index-font-weight` | 400 | 400 | 600 | — |
| `--item-index-line-height` | 1 | 1 | 1 | — |
| `--item-meta-width` | 10px | 10px | — | calc(10px * var(--ui-scale)) |

### Label

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--label-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--label-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--label-font-smoothing` | none | none | auto | — |
| `--label-font-weight` | 400 | 400 | 500 | — |
| `--label-line-height` | 1.25 | 1.25 | 1.25 | — |
| Small | | | | |
| `--label-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--label-small-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--label-small-font-smoothing` | none | none | auto | — |
| `--label-small-font-weight` | 400 | 400 | 500 | — |
| `--label-small-line-height` | 1 | 1 | 1 | — |
| Large | | | | |
| `--label-large-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--label-large-font-size` | 21px | — | calc(21px * var(--ui-scale)) | — |
| `--label-large-font-smoothing` | auto | — | auto | — |
| `--label-large-font-weight` | 500 | — | 500 | — |
| `--label-large-line-height` | 1.2 | — | 1.2 | — |
| Xlarge | | | | |
| `--label-xlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--label-xlarge-font-size` | 26px | — | calc(26px * var(--ui-scale)) | — |
| `--label-xlarge-font-smoothing` | auto | — | auto | — |
| `--label-xlarge-font-weight` | 475 | — | 475 | — |
| `--label-xlarge-line-height` | 1.2 | — | 1.2 | — |
| Xxlarge | | | | |
| `--label-xxlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--label-xxlarge-font-size` | 30px | — | calc(30px * var(--ui-scale)) | — |
| `--label-xxlarge-font-smoothing` | auto | — | auto | — |
| `--label-xxlarge-font-weight` | 450 | — | 450 | — |
| `--label-xxlarge-line-height` | 1.2 | — | 1.2 | — |

### Progress

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--progress-bar-height` | 24px | — | — | — |
| `--progress-bar-height-large` | 32px | — | — | — |
| `--progress-bar-height-small` | 12px | — | — | — |
| `--progress-bar-height-xsmall` | 6px | — | — | — |
| `--progress-bar-radius` | 10px | — | — | — |
| `--progress-dot-size` | 16px | — | — | — |
| `--progress-dot-size-large` | 20px | — | — | — |
| `--progress-dot-size-small` | 12px | — | — | — |
| `--progress-dot-size-xsmall` | 8px | — | — | — |

### Rich Text

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--richtext-content-max-width` | 640px | — | — | — |
| `--richtext-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--richtext-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--richtext-font-smoothing` | none | none | auto | — |
| `--richtext-font-weight` | 400 | 400 | 500 | — |
| `--richtext-line-height` | 22px | 22px | calc(22px * var(--ui-scale)) | — |
| Small | | | | |
| `--richtext-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--richtext-small-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--richtext-small-font-smoothing` | none | none | auto | — |
| `--richtext-small-font-weight` | 400 | 400 | 500 | — |
| `--richtext-small-line-height` | 16px | 16px | calc(18px * var(--ui-scale)) | — |
| Large | | | | |
| `--richtext-large-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | — |
| `--richtext-large-font-size` | 26px | 26px | calc(21px * var(--ui-scale)) | — |
| `--richtext-large-font-smoothing` | none | none | auto | — |
| `--richtext-large-font-weight` | 400 | 400 | 500 | — |
| `--richtext-large-line-height` | 1 | 1 | 1.2 | — |
| Xlarge | | | | |
| `--richtext-xlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--richtext-xlarge-font-size` | 30px | — | calc(30px * var(--ui-scale)) | — |
| `--richtext-xlarge-font-smoothing` | auto | — | auto | — |
| `--richtext-xlarge-font-weight` | 425 | — | 425 | — |
| `--richtext-xlarge-line-height` | 1.2 | — | 1.2 | — |
| Xxlarge | | | | |
| `--richtext-xxlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--richtext-xxlarge-font-size` | 35px | — | calc(35px * var(--ui-scale)) | — |
| `--richtext-xxlarge-font-smoothing` | auto | — | auto | — |
| `--richtext-xxlarge-font-weight` | 400 | — | 400 | — |
| `--richtext-xxlarge-line-height` | 1.2 | — | 1.2 | — |
| Xxxlarge | | | | |
| `--richtext-xxxlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--richtext-xxxlarge-font-size` | 40px | — | calc(40px * var(--ui-scale)) | — |
| `--richtext-xxxlarge-font-smoothing` | auto | — | auto | — |
| `--richtext-xxxlarge-font-weight` | 375 | — | 375 | — |
| `--richtext-xxxlarge-line-height` | 1.2 | — | 1.2 | — |

### Rounded

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--rounded` | 10px | — | — | — |
| `--rounded-full` | 9999px | — | — | — |
| `--rounded-large` | 20px | — | — | — |
| `--rounded-medium` | 15px | — | — | — |
| `--rounded-none` | 0px | — | — | — |
| `--rounded-small` | 7px | — | — | — |
| `--rounded-xlarge` | 25px | — | — | — |
| `--rounded-xsmall` | 5px | — | — | — |
| `--rounded-xxlarge` | 30px | — | — | — |

### Table

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--table-tbody-height` | 46px | — | — | — |
| `--table-thead-height` | 36px | — | — | — |
| Xsmall | | | | |
| `--table-xsmall-tbody-height` | 22px | — | — | — |
| `--table-xsmall-thead-height` | 18px | — | — | — |
| Small | | | | |
| `--table-small-tbody-height` | 31px | — | — | — |
| `--table-small-thead-height` | 24px | — | — | — |
| Large | | | | |
| `--table-large-tbody-height` | 56px | — | — | — |
| `--table-large-thead-height` | 44px | — | — | — |
| Xlarge | | | | |
| `--table-xlarge-tbody-height` | 72px | — | — | — |
| `--table-xlarge-thead-height` | 56px | — | — | — |

### Title Bar

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--title-bar-border-radius` | 10px | 10px | — | 10px |
| `--title-bar-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--title-bar-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--title-bar-font-smoothing` | none | none | auto | — |
| `--title-bar-font-weight` | 400 | 400 | 700 | — |
| `--title-bar-height` | 40px | 40px | — | calc(40px * var(--ui-scale)) |
| `--title-bar-image-height` | 28px | 28px | — | calc(28px * var(--ui-scale)) |
| `--title-bar-line-height` | 1 | 1 | calc(22px * var(--ui-scale)) | — |
| `--title-bar-padding-top` | 5px | 5px | 0px | 0px |
| `--title-bar-text-stroke-width` | 3.5px | 3.5px | 2px | 2px |
| Small | | | | |
| `--title-bar-small-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--title-bar-small-height` | 32px | 32px | — | calc(32px * var(--ui-scale)) |
| `--title-bar-small-image-height` | 24px | 24px | — | calc(24px * var(--ui-scale)) |

### Title

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--title-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | — |
| `--title-font-size` | 26px | 26px | calc(21px * var(--ui-scale)) | — |
| `--title-font-smoothing` | none | none | auto | — |
| `--title-font-weight` | 400 | 400 | 400 | — |
| `--title-line-height` | 1 | 1 | 1.2 | — |
| Small | | | | |
| `--title-small-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--title-small-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--title-small-font-smoothing` | none | none | auto | — |
| `--title-small-font-weight` | 400 | 400 | 700 | — |
| `--title-small-line-height` | 1 | 1 | 1.2 | — |
| Large | | | | |
| `--title-large-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--title-large-font-size` | 30px | — | calc(30px * var(--ui-scale)) | — |
| `--title-large-font-smoothing` | auto | — | auto | — |
| `--title-large-font-weight` | 425 | — | 425 | — |
| `--title-large-line-height` | 1.2 | — | 1.2 | — |
| Xlarge | | | | |
| `--title-xlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--title-xlarge-font-size` | 35px | — | calc(35px * var(--ui-scale)) | — |
| `--title-xlarge-font-smoothing` | auto | — | auto | — |
| `--title-xlarge-font-weight` | 400 | — | 400 | — |
| `--title-xlarge-line-height` | 1.2 | — | 1.2 | — |
| Xxlarge | | | | |
| `--title-xxlarge-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--title-xxlarge-font-size` | 40px | — | calc(40px * var(--ui-scale)) | — |
| `--title-xxlarge-font-smoothing` | auto | — | auto | — |
| `--title-xxlarge-font-weight` | 375 | — | 375 | — |
| `--title-xxlarge-line-height` | 1.2 | — | 1.2 | — |

### Scaling

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| `--ui-scale` | 1 | — | — | — |

### Value

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--value-font-family` | "Inter Variable", Inter | — | "Inter Variable", Inter | — |
| `--value-font-size` | 38px | — | calc(38px * var(--ui-scale)) | — |
| `--value-font-smoothing` | auto | — | auto | — |
| `--value-font-weight` | 450 | — | 450 | — |
| `--value-line-height` | 42px | — | calc(42px * var(--ui-scale)) | — |
| Xxsmall | | | | |
| `--value-xxsmall-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | — |
| `--value-xxsmall-font-size` | 16px | 16px | calc(16px * var(--ui-scale)) | — |
| `--value-xxsmall-font-smoothing` | none | none | auto | — |
| `--value-xxsmall-font-weight` | 400 | 400 | 700 | — |
| `--value-xxsmall-line-height` | 16px | 16px | calc(14px * var(--ui-scale)) | — |
| Xsmall | | | | |
| `--value-xsmall-font-size` | 20px | — | calc(20px * var(--ui-scale)) | — |
| `--value-xsmall-font-weight` | 600 | — | 600 | — |
| `--value-xsmall-line-height` | 24px | — | calc(24px * var(--ui-scale)) | — |
| Small | | | | |
| `--value-small-font-size` | 26px | — | calc(26px * var(--ui-scale)) | — |
| `--value-small-font-weight` | 500 | — | 475 | — |
| `--value-small-line-height` | 29px | — | calc(29px * var(--ui-scale)) | — |
| Large | | | | |
| `--value-large-font-size` | 58px | — | calc(58px * var(--ui-scale)) | — |
| `--value-large-font-weight` | 400 | — | 400 | — |
| `--value-large-line-height` | 70px | — | calc(70px * var(--ui-scale)) | — |
| Xlarge | | | | |
| `--value-xlarge-font-size` | 74px | — | calc(74px * var(--ui-scale)) | — |
| `--value-xlarge-font-weight` | 375 | — | 375 | — |
| `--value-xlarge-line-height` | 86px | — | calc(86px * var(--ui-scale)) | — |
| Xxlarge | | | | |
| `--value-xxlarge-font-size` | 96px | — | calc(96px * var(--ui-scale)) | — |
| `--value-xxlarge-font-weight` | 350 | — | 350 | — |
| `--value-xxlarge-line-height` | 108px | — | calc(108px * var(--ui-scale)) | — |
| Xxxlarge | | | | |
| `--value-xxxlarge-font-size` | 128px | — | calc(128px * var(--ui-scale)) | — |
| `--value-xxxlarge-font-weight` | 300 | — | 300 | — |
| `--value-xxxlarge-line-height` | 128px | — | calc(128px * var(--ui-scale)) | — |
| Mega | | | | |
| `--value-mega-font-size` | 170px | — | calc(170px * var(--ui-scale)) | — |
| `--value-mega-font-weight` | 275 | — | 275 | — |
| `--value-mega-line-height` | 180px | — | calc(180px * var(--ui-scale)) | — |
| Giga | | | | |
| `--value-giga-font-size` | 220px | — | calc(220px * var(--ui-scale)) | — |
| `--value-giga-font-weight` | 250 | — | 250 | — |
| `--value-giga-line-height` | 230px | — | calc(230px * var(--ui-scale)) | — |
| Tera | | | | |
| `--value-tera-font-size` | 290px | — | calc(290px * var(--ui-scale)) | — |
| `--value-tera-font-weight` | 225 | — | 225 | — |
| `--value-tera-line-height` | 300px | — | calc(300px * var(--ui-scale)) | — |
| Peta | | | | |
| `--value-peta-font-size` | 380px | — | calc(380px * var(--ui-scale)) | — |
| `--value-peta-font-weight` | 200 | — | 200 | — |
| `--value-peta-line-height` | 390px | — | calc(390px * var(--ui-scale)) | — |

Previous

[Colors Complete palette definition: grayscale, chromatic hues, and blend pairs](/framework/docs/3.1/colors)

Next

[Font Family Switch between Classic and TRMNL font bundles per device](/framework/docs/3.1/font_family)


