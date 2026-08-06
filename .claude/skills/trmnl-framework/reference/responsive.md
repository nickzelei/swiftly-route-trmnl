<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/responsive
     ============================================================ -->

# Responsive

The Responsive system adapts a layout to the device it renders on. **Size-based** breakpoints follow the size class each device carries, and **Bit-depth** variants follow its color capabilities. Combine them to control how your content appears across TRMNL's range of devices.

## Component Support

Not all framework components support responsive variants. We're trying to keep the framework as minimal as we can while offering the features you need.

This table shows which responsive features each framework component supports. Use this reference to understand what's possible with each component type.

| Component | Size | Orientation | Bit-Depth | Example Usage |
| --- | --- | --- | --- | --- |
| Background | Yes | Yes | Yes | `md:2bit:bg--gray-50` |
| Border | No | No | Auto | `border--h-30 (auto adapts)` |
| Text | Yes | Yes | Yes | `lg:2bit:text--center` |
| Visibility | Yes | Yes | Yes | `sm:1bit:hidden` |
| Value | Yes | Yes | Yes | `lg:2bit:value--xlarge` |
| Label | Yes | Yes | Yes | `md:portrait:2bit:label--filled` |
| Title | Yes | Yes | Yes | `md:2bit:title--large` |
| Description | Yes | Yes | Yes | `portrait:description--large` |
| Content | Yes | Yes | Yes | `lg:portrait:content--large` |
| Font Weight | Yes | Yes | Yes | `md:1bit:text--bold` |
| Text Stroke | No | No | Yes | `1bit:text-stroke--large` |
| Image Stroke | No | No | Yes | `2bit:image-stroke--large` |
| Spacing | Yes | Yes | No | `md:p--16, lg:m--32, md:portrait:my--24` |
| Layout | Yes | Yes | No | `md:layout--row, lg:layout--col` |
| Gap | Yes | Yes | No | `md:gap--large, lg:gap--xlarge` |
| Flexbox | Yes | Yes | No | `md:flex--row, portrait:flex--col` |
| Rounded | Yes | Yes | No | `md:rounded--large, lg:rounded--xlarge` |
| Aspect Ratio | Yes | Yes | No | `md:aspect--1/1, lg:landscape:aspect--16/9` |
| Table | Yes | Yes | No | `lg:table--base, lg:portrait:table--xlarge` |
| Size | Yes | Yes | No | `md:w--36, lg:h--full` |
| Grid | Yes | Yes | No | `md:grid--cols-3, md:portrait:col--span-2` |
| Clamp | Yes | Yes | No | `data-clamp-md-portrait="3"` |
| Overflow (Smart columns) | Yes | Yes | No | `data-overflow-max-cols-lg="4"` |

### Legend

Auto Built-in adaptive behavior

Yes Full support

No Not supported

## Size-Based Responsive

### How It Works

Every device carries a size class (e.g., `screen--md`) that activates the matching responsive utilities. The class comes from the device model, not from a measured width, so pick a breakpoint by the devices you want to hit rather than by a pixel count.

The system follows a mobile-first approach. When you use `md:value--large`, it applies on medium screens and larger.

### Basic Usage

Prefix any utility class with a breakpoint name followed by a colon. The style applies at that breakpoint and all larger sizes.

This example shows progressive sizing: the text starts at regular size, becomes large on medium screens (md:) and larger, then becomes xlarge on large screens (lg:) and larger.

```html
<!-- Regular by default, large on medium and above, xlarge on large and above -->
<span class="value md:value--large lg:value--xlarge">
  Responsive Value
</span>
```

### Available Breakpoints

Three breakpoints cover every supported TRMNL device. Prefixes are mobile-first, so a prefix applies on its own size class and every larger one.

| Prefix | Screen Class | Applies On | Example Devices |
| --- | --- | --- | --- |
| `sm:` | `screen--sm` | sm, md, lg | Kindle 2024 |
| `md:` | `screen--md` | md, lg | TRMNL OG, TRMNL OG V2, Playdate, Frame |
| `lg:` | `screen--lg` | lg | TRMNL V2, Kindle Scribe, reMarkable Paper 2 |

## Bit-Depth Responsive

### How It Works

Bit-depth responsiveness adapts styles based on the display's color capabilities. Unlike size-based breakpoints, bit-depth variants are not progressive. Each variant targets a specific bit-depth only.

When you use `4bit:bg--gray-65`, it applies only on 4-bit screens, not on 1-bit or 2-bit screens.

### Basic Usage

Prefix utilities with bit-depth values to create display-specific styles. This is especially useful for optimizing appearance across monochrome and grayscale screens.

This example demonstrates bit-depth adaptation: the square appears black on 1-bit displays, gray-45 on 2-bit displays, and gray-75 on 4-bit displays. Each bit-depth variant targets only that specific display type.

```html
<!-- black on 1-bit, gray-45 on 2-bit, gray-75 on 4-bit screens -->
<div class="h--36 w--36 rounded--large 1bit:bg--black 2bit:bg--gray-45 4bit:bg--gray-75"></div>
```

### Available Bit-Depths

The framework supports three bit-depth variants corresponding to TRMNL's display technologies. Each targets specific color capabilities.

| Prefix | Screen Class | Color Support | Example Devices |
| --- | --- | --- | --- |
| `1bit:` | `screen--1bit` | Monochrome (2 shades) | TRMNL OG |
| `2bit:` | `screen--2bit` | Grayscale (4 shades) | TRMNL OG V2 |
| `4bit:` | `screen--4bit` | Grayscale (16 shades) | TRMNL V2, Kindle 2024 |

## Orientation-Based Responsive

### How It Works

Orientation variants adapt styles based on whether the screen is in landscape or portrait mode. Since landscape is the default, only `portrait:` variants are provided to avoid redundancy.

Portrait variants are particularly useful for layout utilities like Flexbox, where you might want different flex directions or alignments when the screen is rotated.

### Basic Usage

Use the `portrait:` prefix to apply styles only when the screen is in portrait orientation:

This example shows orientation-responsive layout: items are arranged in a row by default (landscape), but automatically switch to a column layout when the screen is in portrait orientation using `portrait:flex--col`.

```html
<!-- Row layout in landscape, column layout in portrait -->
<div class="flex flex--row portrait:flex--col gap">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Combining All Systems

The responsive system lets you combine size, orientation, and bit-depth variants. This enables highly targeted designs that adapt to screen dimensions, orientation, and color capabilities.

This advanced example combines size and bit-depth variants to target specific device configurations: `md:1bit:` targets medium+ 1-bit screens, `md:2bit:` targets medium+ 2-bit screens, and `lg:4bit:` targets large+ 4-bit screens. Dark-mode-aware utilities also support a dark-first prefix (for scoped utilities): `dark:md:portrait:2bit:`.

```html
<!-- Orientation variant on a layout utility (size and orientation only) -->
<div class="flex flex--row portrait:flex--col">...</div>

<!-- Size + orientation -->
<div class="text--center md:portrait:text--left">...</div>

<!-- All three combined on a bit-depth utility: size + orientation + bit-depth -->
<div class="value md:portrait:4bit:value--large">
  <!-- Base size by default -->
  <!-- Large on medium+ screens, in portrait, on 4-bit displays -->
</div>
```

### Pattern and Order

When combining variants, follow this pattern: `size:orientation:bit-depth:utility`. This order flows from general layout concerns to specific display characteristics.

Bit-depth applies only to color and typography utilities: backgrounds, text, text stroke, image stroke, font weight, value, label, title, description, content, and visibility. Layout utilities like flex, gap, grid, rounded, spacing, and size take size and orientation only. The stroke families are bit-depth-only: text stroke and image stroke have no size or orientation variants.

Each modifier is optional and can be used independently. You might use just `portrait:flex--col` for orientation-specific layouts, or `md:value--large` for size-responsive typography, depending on your design needs.

For utilities that support dark-mode variants (currently Visibility, Background, and Text), use: `dark:size:orientation:bit-depth:utility` with `dark:` as the first prefix.

The `dark:` tier is legacy: it keeps working for the rest of Framework 3.x and will be removed in Framework 4.0. Darken a whole screen with the Dark theme ( [Themes](https://trmnl.com/framework/docs/3.2/themes) ), or one element with `inverse` ( [Inverse](https://trmnl.com/framework/docs/3.2/inverse) ). No new utility family gains the prefix.

### Specificity Hierarchy

When multiple responsive variants target the same property, CSS specificity determines which style applies. The framework follows a clear hierarchy: the more modifiers in a class, the higher its specificity.

For example, `portrait:2bit:value--small` will override both `portrait:value--large` and `2bit:value--base` when all conditions are met, because it has the most specific combination of modifiers.

### Available Combinations

The responsive system supports flexible modifier combinations, allowing you to target specific device configurations. The table below shows all available patterns, from simple single modifiers to complex multi-modifier combinations. Each combination becomes active only when all its conditions are met.

| Pattern | Example | When Active | Use Case |
| --- | --- | --- | --- |
| `size:` | `md:value--large` | Medium screens and larger | Responsive sizing by device size class |
| `orientation:` | `portrait:flex--col` | Portrait orientation only | Layout adjustments for vertical screens |
| `bit-depth:` | `4bit:bg--gray-75` | 4-bit displays only | Color optimization for specific displays |
| `size:orientation:` | `md:portrait:text--center` | Medium+ screens in portrait | Size-aware orientation layouts |
| `size:bit-depth:` | `lg:2bit:value--xlarge` | Large+ screens with 2-bit display | Display-specific sizing on larger screens |
| `orientation:bit-depth:` | `portrait:2bit:value--small` | Portrait with 2-bit display | Orientation-aware display optimization |
| `size:orientation:bit-depth:` | `md:portrait:4bit:value--large` | Medium+ screens, portrait, 4-bit display | Highly specific device targeting |
| `dark:size:orientation:bit-depth:` | `dark:md:portrait:2bit:hidden` | Dark mode, medium+ screens, portrait, 2-bit display | Theme-specific responsive behavior |

### Related APIs

#### The same grammar in SCSS

The screen mixins generate device-aware rules from the same size, orientation, and bit-depth grammar these utility classes use, for styles that have no utility class. See [Sass Mixins](https://trmnl.com/framework/docs/3.2/sass_mixins) for the mixins and the scale functions.

```scss
@include trmnl.screen('md', 'portrait') {
  .status { display: none; }
}
```

Previous

[Aspect Ratio Maintain consistent proportions for elements regardless of their content](https://trmnl.com/framework/docs/3.2/aspect_ratio)

Next

[Responsive Test Test responsive utilities and compare SCSS mixins with CSS classes](https://trmnl.com/framework/docs/3.2/responsive_test)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/responsive_test
     ============================================================ -->

# Responsive Test

This page tests responsive utilities by comparing SCSS mixins with CSS classes across different screen conditions. Each test row shows an element styled with SCSS mixins alongside the same element styled with CSS utility classes. Both columns should look identical when the conditions are met, demonstrating that mixins and classes produce equivalent results.

### Utilities

#### Background

Test Case

SCSS Mixin Result

CSS Class Result

md:bg--gray-50

@include screen.screen('md')

Gray bg on md+ screens

portrait:bg--gray-50

@include screen.screen('portrait')

Gray bg in portrait

2bit:bg--gray-50

@include screen.screen('2bit')

Gray bg on 2-bit screens

md:portrait:bg--gray-50

@include screen.screen('md', 'portrait')

Gray bg on md+ portrait

md:2bit:bg--gray-50

@include screen.screen('md', '2bit')

Gray bg on md+ 2-bit

portrait:2bit:bg--gray-50

@include screen.screen('portrait', '2bit')

Gray bg on portrait 2-bit

md:portrait:2bit:bg--gray-50

@include screen.screen('md', 'portrait', '2bit')

Gray bg on md+ portrait 2-bit

#### Visibility

Test Case

SCSS Mixin Result

CSS Class Result

sm:hidden

@include screen.screen('sm')

Hidden on sm+ screens

portrait:hidden

@include screen.screen('portrait')

Hidden on portrait screens

4bit:hidden

@include screen.screen('4bit')

Hidden on 4-bit screens

md:portrait:hidden

@include screen.screen('md', 'portrait')

Hidden on md+ portrait screens

lg:2bit:hidden

@include screen.screen('lg', '2bit')

Hidden on lg+ 2-bit screens

portrait:4bit:hidden

@include screen.screen('portrait', '4bit')

Hidden on portrait 4-bit screens

md:portrait:2bit:hidden

@include screen.screen('md', 'portrait', '2bit')

Hidden on md+ portrait 2-bit screens

#### Text

Test Case

SCSS Mixin Result

CSS Class Result

lg:text--center

@include screen.screen('lg')

Centered text on lg+ screens

Aa

Aa

portrait:text--center

@include screen.screen('portrait')

Centered text in portrait

Aa

Aa

2bit:text--center

@include screen.screen('2bit')

Centered text on 2-bit screens

Aa

Aa

md:portrait:text--center

@include screen.screen('md', 'portrait')

Centered on md+ portrait

Aa

Aa

lg:4bit:text--center

@include screen.screen('lg', '4bit')

Centered on lg+ 4-bit screens

Aa

Aa

portrait:2bit:text--center

@include screen.screen('portrait', '2bit')

Centered on portrait 2-bit screens

Aa

Aa

md:portrait:2bit:text--right

@include screen.screen('md', 'portrait', '2bit')

Right-aligned on md+ portrait 2-bit

Aa

Aa

#### Flex

Test Case

SCSS Mixin Result

CSS Class Result

md:flex--center

@include screen.screen('md')

Centered on md+ screens

portrait:flex--col

@include screen.screen('portrait')

Column layout in portrait

lg:portrait:flex--center

@include screen.screen('lg', 'portrait')

Centered on lg+ portrait

#### Spacing

Test Case

SCSS Mixin Result

CSS Class Result

md:p--24

@include screen.screen('md')

Padding 24 on md+ screens

portrait:mx--20

@include screen.screen('portrait')

Horizontal margin 20 in portrait

#### Gap

Test Case

SCSS Mixin Result

CSS Class Result

lg:gap--xlarge

@include screen.screen('lg')

Gap xlarge on lg+ screens

portrait:gap--large

@include screen.screen('portrait')

Large gap in portrait

#### Size

Test Case

SCSS Mixin Result

CSS Class Result

md:w--36

@include screen.screen('md')

Large width on md+ screens

#### Rounded

Test Case

SCSS Mixin Result

CSS Class Result

md:rounded--xlarge

@include screen.screen('md')

Rounded xlarge on md+ screens

#### Grid

Test Case

SCSS Mixin Result

CSS Class Result

md:grid--cols-3

@include screen.screen('md')

3 columns on md+ screens

### Base

#### Layout

Test Case

SCSS Mixin Result

CSS Class Result

md:layout--col

@include screen.screen('md')

Column layout on md+ screens

portrait:layout--bottom

@include screen.screen('portrait')

Bottom alignment in portrait

lg:portrait:layout--bottom

@include screen.screen('lg', 'portrait')

Bottom alignment on lg+ portrait

### Elements

#### Value

Test Case

SCSS Mixin Result

CSS Class Result

md:value--large

Large value on md+ screens

Aa

portrait:value--large

Large value in portrait

Aa

4bit:value--large

Large value on 4-bit screens

Aa

lg:portrait:value--large

Large value on lg+ portrait

Aa

md:2bit:value--large

Large value on md+ 2-bit screens

Aa

portrait:4bit:value--large

Large value on portrait 4-bit

Aa

lg:portrait:4bit:value--xlarge

XLarge on lg+ portrait 4-bit

Aa

#### Label

Test Case

SCSS Mixin Result

CSS Class Result

md:label--small

Small label on md+ screens

Label

portrait:label--outline

Outlined label in portrait

Label

2bit:label--inverted

Inverted label on 2-bit screens

Label

md:portrait:label--underline

Underlined label on md+ portrait

Label

md:2bit:label--gray

Gray label on md+ 2-bit

Label

portrait:2bit:label--small

Small label on portrait 2-bit

Label

md:portrait:2bit:label--inverted

Inverted label on md+ portrait 2-bit

Label

### Components

No component tests have been implemented yet

Previous

[Responsive Adapt styles to the device's size class, orientation, and bit depth using variant prefixes](https://trmnl.com/framework/docs/3.2/responsive)

Next

[Visibility Control element visibility based on display bit depth](https://trmnl.com/framework/docs/3.2/visibility)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/visibility
     ============================================================ -->

# Visibility

Show or hide an element and set its display type. Hidden and visible controls plus display helpers like flex, grid, and inline, each with responsive and bit-depth variants for device-specific layouts.

## Visibility Across Devices

Every device carries a size class: `sm`, `md`, or `lg`. Each column below targets one of them, so switching the device in the screen picker changes which column has content.

```html
<!-- Always visible -->
<div class="visible">visible</div>

<!-- Always hidden -->
<div class="hidden">hidden</div>

<!-- Hidden by default, visible on medium+ -->
<div class="hidden md:visible">md:visible</div>

<!-- Visible by default, hidden on medium+ -->
<div class="visible md:hidden">md:hidden</div>

<!-- Visible by default, hidden on large -->
<div class="visible lg:hidden">lg:hidden</div>

<!-- Display as flex on medium+ -->
<div class="hidden md:flex">md:flex</div>

<!-- Display as grid on large screens -->
<div class="hidden lg:grid">lg:grid</div>
```

## Display Utilities

Control how elements are displayed with specific display types. These classes set the CSS `display` property.

| Class | Effect | CSS Output |
| --- | --- | --- |
| `hidden` | Hide element completely | `display: none` |
| `visible` | Display as block element | `display: block` |
| `block` | Display as block element | `display: block` |
| `inline` | Display as inline element | `display: inline` |
| `inline-block` | Display as inline block element | `display: inline-block` |
| `flex` | Display as flex container | `display: flex` |
| `grid` | Display as grid container | `display: grid` |
| `inline-grid` | Display as inline grid container | `display: inline-grid` |
| `table` | Display as table element | `display: table` |
| `table-row` | Display as table row element | `display: table-row` |
| `table-cell` | Display as table cell element | `display: table-cell` |

## Responsive Display Control

All display utilities take the size prefixes. They are mobile-first, so a prefix applies on its own size class and every larger one. See [Responsive](https://trmnl.com/framework/docs/3.2/responsive) for the size class each device carries.

| Example Class | Effect | Active On |
| --- | --- | --- |
| `sm:hidden` | Hide on small screens and larger | sm, md, lg (every device) |
| `md:flex` | Display as flex on medium screens and larger | md, lg |
| `lg:grid` | Display as grid on large screens | lg |
| `sm:inline-block` | Display as inline-block on small screens and larger | sm, md, lg (every device) |

```html
<!-- Basic responsive display -->
<div class="hidden md:block">Show as block on medium+</div>
<div class="block md:flex">Block by default, flex on medium+</div>
<div class="hidden lg:inline-grid">Show as inline-grid on large screens</div>

<!-- Complex responsive layouts -->
<div class="inline sm:inline-block md:flex lg:grid">
  Changes display type at each breakpoint
</div>

<!-- Hide on mobile, show different layouts -->
<div class="hidden sm:flex md:grid lg:table">
  Different layout per screen size
</div>

<!-- Table-style structures -->
<div class="table">
  <div class="table-row">
    <div class="table-cell">Cell A</div>
    <div class="table-cell">Cell B</div>
  </div>
</div>
```

## Bit-Depth Display Control

All display utilities take the bit-depth prefixes. These are not progressive the way the size prefixes are: `2bit:` applies on 2-bit screens and nowhere else.

| Example Class | Effect | Active On |
| --- | --- | --- |
| `1bit:hidden` | Hide on monochrome displays | Every 1-bit profile (TRMNL OG, Playdate, Frame, and the color panels that dither to black and white) |
| `2bit:flex` | Display as flex on 4-shade grayscale displays | Every 2-bit profile (TRMNL OG V2, Waveshare 5.8" B/W) |
| `4bit:grid` | Display as grid on 16-shade grayscale displays | Every 4-bit profile (TRMNL V2, Kindle 2024, reMarkable Paper 2, and most Kobo and Inkplate panels) |

## Device-Specific Display Control

Combine a size and a bit-depth prefix on any display utility to narrow the target to one group of panels. Use the pattern `size:bit-depth:display`.

| Example Class | Target Device | Effect |
| --- | --- | --- |
| `md:1bit:block` | 1-bit screens at md or lg (TRMNL OG, Frame) | Display as block |
| `md:2bit:flex` | 2-bit screens at md or lg (TRMNL OG V2, Waveshare 5.8" B/W) | Display as flex |
| `lg:4bit:grid` | 4-bit screens at lg (TRMNL V2, Kindle Scribe, reMarkable Paper 2, and 11 more) | Display as grid |
| `sm:4bit:table` | Every 4-bit screen, since sm is the smallest size class | Display as table |

```html
<!-- Device-specific layouts -->
<div class="hidden md:1bit:block md:2bit:flex lg:4bit:grid">
  Different display types per device generation
</div>

<!-- Optimize for ePaper performance -->
<div class="table 1bit:block 2bit:flex">
  Simple layouts for lower bit-depth displays
</div>

<!-- Complex responsive + bit-depth targeting -->
<div class="hidden sm:inline md:1bit:block md:2bit:flex lg:4bit:grid">
  Progressive enhancement across all device capabilities
</div>
```

## Dark Mode Display Control

Visibility utilities support dark-first prefixes for screen dark mode targeting. Use `dark:` to show or hide content by screen dark mode. Light-mode behavior is the default state.

```html
<!-- Hide only in dark mode -->
<div class="dark:hidden">Dark mode hides this</div>

<!-- Show only in dark mode -->
<div class="hidden dark:block">Dark mode shows this</div>

<!-- Combined targeting -->
<div class="dark:md:portrait:2bit:hidden">
  Hidden on dark medium+ portrait 2-bit screens
</div>
```

Previous

[Responsive Test Test responsive utilities and compare SCSS mixins with CSS classes](https://trmnl.com/framework/docs/3.2/responsive_test)

Next

[Background Apply color tokens as backgrounds with bg--{token}](https://trmnl.com/framework/docs/3.2/background)
