<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/size
     ============================================================ -->

# Size

Utility classes for width and height. Fixed sizes, arbitrary values, dynamic sizes, and container query units, each also available as a min or max constraint and with responsive variants.

## Setting Width and Height

Control element dimensions using fixed sizes from the design scale, arbitrary pixel values, or dynamic sizes that adapt to their container.

### Fixed Sizes

Use predefined size classes from the design scale. Apply `w--{size}` for width and `h--{size}` for height with these size values:

`w/h--0`

`w/h--0.5`

`w/h--1`

`w/h--1.5`

`w/h--2`

`w/h--2.5`

`w/h--3`

`w/h--3.5`

`w/h--4`

`w/h--5`

`w/h--6`

`w/h--7`

`w/h--8`

`w/h--9`

`w/h--10`

`w/h--11`

`w/h--12`

`w/h--14`

`w/h--16`

`w/h--20`

`w/h--24`

`w/h--28`

`w/h--32`

`w/h--36`

`w/h--40`

`w/h--44`

`w/h--48`

`w/h--52`

`w/h--56`

`w/h--60`

`w/h--64`

`w/h--72`

`w/h--80`

`w/h--96`

`0px`

`2px`

`4px`

`6px`

`8px`

`10px`

`12px`

`14px`

`16px`

`20px`

`24px`

`28px`

`32px`

`36px`

`40px`

`44px`

`48px`

`56px`

`64px`

`80px`

`96px`

`112px`

`128px`

`144px`

`160px`

`176px`

`192px`

`208px`

`224px`

`240px`

`256px`

`288px`

`320px`

`384px`

### Arbitrary Sizes

Need a specific dimension? Use arbitrary size classes for precise pixel values with `w--[Npx]` and `h--[Npx]` syntax, where N can be any value from 0 to 128. Responsive prefixes work here (`md:w--[96px]`), unlike the arbitrary values on [Gap](https://trmnl.com/framework/docs/3.2/gap) and [Rounded](https://trmnl.com/framework/docs/3.2/rounded) .

`w/h--[60px]`

`w/h--[90px]`

`w/h--[120px]`

`60px`

`90px`

`120px`

### Dynamic Sizes

Use dynamic sizes to set dimensions relative to the container or content. `w--full` and `h--full` set dimensions to 100% of the container, while `w--auto` and `h--auto` let the browser calculate dimensions based on content.

```html
<div class="w--full">Full width</div>
<div class="w--auto">Auto width</div>
<div class="h--full">Full height</div>
<div class="h--auto">Auto height</div>
```

### Container Query Sizes

Container query sizes let you size elements as a percentage of the `.layout` container. Use `w--[Ncqw]` for width and `h--[Ncqh]` for height, where N is 0 to 100 (0% to 100% of the layout's dimensions).

This works automatically because `.layout` is configured as a CSS container query context. Any element inside a layout can use these units to size itself relative to the layout's width or height. This is useful for responsive images, flexible columns, or proportional spacing.

For advanced cases where you need to reference a different container (e.g., a specific column), add `style="container-type: size;"` to that element. It must have explicit dimensions set.

`w--[50cqw]`

`w--[75cqw]`

`h--[50cqh]`

`50% container width`

`75% container width`

`50% container height`

```html
<div class="view view--full">
  <div class="layout">
    <div class="w--[50cqw]">50% of layout width</div>
    <div class="h--[33cqh]">33% of layout height</div>
  </div>
</div>
```

## Min/Max Dimensions

Control minimum and maximum element dimensions independently using min and max classes. These constraints work with all sizing methods: fixed sizes, arbitrary sizes, container query units, and dynamic sizes.

### Fixed Sizes

Use `w--min-{size}`, `w--max-{size}`, `h--min-{size}`, and `h--max-{size}` to constrain dimensions using fixed size values.

```html
<div class="w--auto w--min-72">Min Width 72 (288px)</div>
<div class="w--full w--max-32">Max Width 32 (128px)</div>
<div class="h--min-72">Min Height 72 (288px)</div>
<div class="h--max-8">Max Height 8 (32px)</div>
```

### Arbitrary Sizes

Use `w--min-[Npx]`, `w--max-[Npx]`, `h--min-[Npx]`, and `h--max-[Npx]` to constrain dimensions using precise pixel values. N can be any value from 0 to 128, the same range as the arbitrary width and height classes.

`w--min-[100px]`

`w--max-[120px]`

`h--min-[50px]`

`h--max-[100px]`

`min-width: 100px`

`max-width: 120px`

`min-height: 50px`

`max-height: 100px`

### Dynamic Sizes

Use `w--min-full`, `w--max-full`, `h--min-full`, `h--max-full`, `w--min-auto`, `w--max-auto`, `h--min-auto`, and `h--max-auto` to constrain dynamic dimensions.

`w--min-full`

`w--max-full`

`h--min-auto`

`h--max-auto`

`min-width: 100%`

`max-width: 100%`

`min-height: auto`

`max-height: none`

### Container Query Sizes

Use `w--min-[Ncqw]`, `w--max-[Ncqw]`, `h--min-[Ncqh]`, and `h--max-[Ncqh]` to constrain dimensions relative to the container.

`w--min-[100cqw]`

`w--max-[50cqw]`

`h--min-[75cqh]`

`h--max-[90cqh]`

`min-width: 100cqw`

`max-width: 50cqw`

`min-height: 75cqh`

`max-height: 90cqh`

## Responsive Sizes

Size utilities support responsive variants, allowing you to set different dimensions at different screen breakpoints. Use the pattern `breakpoint:size-class` to apply sizes conditionally.

### Responsive Examples

Apply different width and height values at different screen sizes using responsive prefixes. The framework follows a mobile-first approach where styles apply to the target breakpoint and larger.

```html
<!-- Width: 8 (32px) by default, 16 (64px) on md and up, 24 (96px) on lg and up -->
<div class="w--8 md:w--16 lg:w--24">Responsive Width</div>

<!-- Height: 8 (32px) by default, 16 (64px) on md and up, 24 (96px) on lg and up -->
<div class="h--8 md:h--16 lg:h--24">Responsive Height</div>

<!-- Min/Max with responsive -->
<div class="w--min-8 md:w--min-16 lg:w--min-24">Responsive Min Width</div>

<!-- Container query units with responsive -->
<div class="w--[25cqw] md:w--[50cqw] lg:w--[75cqw]">Responsive Container Query</div>
```

### Supported Responsive Classes

Responsive variants are available for most size utilities. Use prefixes like `md:`, `portrait:`, and `md:portrait:` to target different breakpoints and orientations.

| Category | Responsive Support | Example Usage |
| --- | --- | --- |
| Fixed Sizes | ✓ Supported | `md:w--16, lg:h--24` |
| Full/Auto Dimensions | ✓ Supported | `md:w--full, lg:h--auto` |
| Min/Max Dimensions | ✓ Supported | `md:w--min-16, lg:h--max-full` |
| Arbitrary Dimensions | ✓ Supported | `md:w--[128px], lg:h--[96px]` |
| Container Query Sizes | ✓ Supported | `md:w--[50cqw], lg:h--[75cqh]` |

Previous

[Contributing Run the framework locally, find your way around, run the tests, and open a good pull request](https://trmnl.com/framework/docs/3.2/contributing)

Next

[Spacing Control element spacing with fixed margin and padding values](https://trmnl.com/framework/docs/3.2/spacing)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/spacing
     ============================================================ -->

# Spacing

Utility classes for margin and padding. Fixed steps plus decimal values for the cases where a whole step is too coarse.

Available spacing sizes and their pixel values

[View Size Documentation](https://trmnl.com/framework/docs/3.2/size)

### Margin Utilities

Control element margins using these utility classes. Each class follows the pattern `{property}--{size}` and supports responsive modifiers for **Size** [Size](https://trmnl.com/framework/docs/3.2/size) , **Orientation**, and **Size + Orientation** [Responsive](https://trmnl.com/framework/docs/3.2/responsive) . Margins take a scale token, so an arbitrary `m--[Npx]` value does nothing and the element keeps the margin it already had.

`m--{size}` All sides margin

`mt--{size}` Top margin

`mr--{size}` Right margin

`mb--{size}` Bottom margin

`ml--{size}` Left margin

`mx--{size}` Horizontal margin

`my--{size}` Vertical margin

`md:my--{size}` Size-based example

`portrait:mx--{size}` Orientation-based example

`lg:portrait:mt--{size}` Size + Orientation example

### Padding Utilities

Control element padding using these utility classes. Each class follows the pattern `{property}--{size}`. See [Size](https://trmnl.com/framework/docs/3.2/size) for sizing tokens, the only values padding takes.

`p--{size}` All sides padding

`pt--{size}` Top padding

`pr--{size}` Right padding

`pb--{size}` Bottom padding

`pl--{size}` Left padding

`px--{size}` Horizontal padding

`py--{size}` Vertical padding

`sm:px--{size}` Size-based example

`portrait:pb--{size}` Orientation-based example

`md:portrait:pt--{size}` Size + Orientation example

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--gap-large` | 20px | - | - | - |
| `--gap-medium` | 16px | - | - | - |
| `--gap-small` | 7px | - | - | - |
| `--gap-xlarge` | 30px | - | - | - |
| `--gap-xsmall` | 5px | - | - | - |
| `--gap-xxlarge` | 40px | - | - | - |
| `--list-gap-small` | 8px | - | - | - |

Previous

[Size Define exact width and height dimensions for elements](https://trmnl.com/framework/docs/3.2/size)

Next

[Gap Set precise spacing between elements with predefined gap values](https://trmnl.com/framework/docs/3.2/gap)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/gap
     ============================================================ -->

# Gap

Utility classes for the space between the children of a flex, grid, or column container. Predefined sizes, arbitrary values, distribution modifiers, and responsive variants.

### Size Variants

The gap system includes predefined base sizes and arbitrary pixel values. These standardized spaces help maintain consistent spacing across your application's grid and flex layouts.

#### Base

The base `gap` class without size modifiers and the `gap--base` class both produce the same visual result, providing the standard spacing. Use `gap--base` when you need to explicitly set the base size in responsive contexts. See the [Responsive Gaps](#responsive-gap) section for examples.

```html
<!-- Available base gap sizes from smallest to largest -->
<div class="grid grid--cols-3 gap--none">...</div>
<div class="grid grid--cols-3 gap--xsmall">...</div>
<div class="grid grid--cols-3 gap--small">...</div>
<div class="grid grid--cols-3 gap">...</div>
<div class="grid grid--cols-3 gap--medium">...</div>
<div class="grid grid--cols-3 gap--large">...</div>
<div class="grid grid--cols-3 gap--xlarge">...</div>
<div class="grid grid--cols-3 gap--xxlarge">...</div>

<!-- Or using the base modifier -->
<div class="flex flex--col gap--base">...</div>
```

#### Arbitrary

Use `gap--[Npx]` syntax to specify exact pixel values from **0px to 50px**. This works with both grid and flex layouts, but does not support responsive variants.

```html
<!-- Custom gap values from 0px to 50px (no responsive support) -->
<div class="grid grid--cols-3 gap--[0px]">...</div>
<div class="grid grid--cols-3 gap--[10px]">...</div>
<div class="grid grid--cols-3 gap--[30px]">...</div>
<div class="grid grid--cols-3 gap--[50px]">...</div>

<!-- Works with flex containers too -->
<div class="flex flex--col gap--[25px]">...</div>
```

Arbitrary gap values using the `gap--[Npx]` syntax do not support responsive variants. Use predefined gap classes if you need responsive behavior.

### Distribution Modifiers

Beyond fixed gaps, you can use special modifiers to control how space is distributed between elements. These modifiers are particularly useful for creating flexible, dynamic layouts.

#### Auto Distribution

The `gap--auto` modifier distributes available space evenly between elements, including equal spacing at the edges. This uses `justify-content: space-evenly`.

```html
<!-- Auto distribution in a flex container -->
<div class="flex flex--col gap--auto h--52">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

#### Distribute

The `gap--distribute` modifier places the first item at the start of the container and the last item at the end, with equal spacing between items. This uses `justify-content: space-between`.

```html
<!-- Distribute spacing in a flex container -->
<div class="flex flex--col gap--distribute h--52">
  <div>First item (at start)</div>
  <div>Middle item</div>
  <div>Last item (at end)</div>
</div>
```

#### Legacy: Space Between

The `gap--space-between` modifier is maintained for backwards compatibility. It behaves the same as `gap--auto`, using `justify-content: space-evenly`. For the actual `space-between` behavior, use `gap--distribute`.

### Responsive Gaps

Gap utilities support size-based breakpoints, orientation variants, and their combination. Use prefixes like `md:`, `portrait:`, and `md:portrait:` to target conditions.

#### Responsive Gap Examples

Apply different gap values at different breakpoints using the size-based responsive system. The framework follows a mobile-first approach where larger breakpoints inherit smaller ones. The `--base` modifier is particularly useful for resetting to the default size at specific breakpoints.

```html
<!-- Size + orientation examples -->
<div class="grid grid--cols-3 gap--small md:gap--large lg:gap--xlarge portrait:gap--medium md:portrait:gap--xlarge">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>

<!-- Examples of different responsive patterns -->
<div class="flex flex--col gap md:gap--large portrait:gap--small">...</div>
<div class="grid grid--cols-2 gap--xsmall lg:gap--medium md:portrait:gap--large">...</div>

<!-- Using base modifier to reset to default size at breakpoint -->
<div class="grid grid--cols-3 gap--small lg:gap--base">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

Gap utilities only support size-based responsive variants. Bit-depth variants (like `1bit:` or `4bit:`) are not available for gap classes.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--gap-large` | 20px | - | - | - |
| `--gap-medium` | 16px | - | - | - |
| `--gap-small` | 7px | - | - | - |
| `--gap-xlarge` | 30px | - | - | - |
| `--gap-xsmall` | 5px | - | - | - |
| `--gap-xxlarge` | 40px | - | - | - |
| `--list-gap-small` | 8px | - | - | - |

Previous

[Spacing Control element spacing with fixed margin and padding values](https://trmnl.com/framework/docs/3.2/spacing)

Next

[Flex Arrange elements with flexible layouts and alignment options](https://trmnl.com/framework/docs/3.2/flex)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/flex
     ============================================================ -->

# Flex

Utility classes for Flexbox layouts. Row and column directions with alignment, centering, and stretching modifiers.

### When to Use Flex

Use Flex inside [Layout](https://trmnl.com/framework/docs/3.2/layout) when you need flexible row or column arrangements. Flex lets items size by their content: width and height follow what's inside, rather than a fixed grid. It's the right choice when you want natural, content-driven layouts without strict column structure.

#### Content-Based Sizing

Flex items grow and shrink based on their content by default. You can override this with stretch modifiers, grow/shrink utilities, or basis classes. Use Flex when your layout should adapt to the content rather than forcing content into a fixed grid: toolbars, inline groups of labels and values, or stacks of variable-height cards.

#### Standalone or Nested

Use Flex alone as the only child of Layout for simpler layouts. Nest it inside [Grid](https://trmnl.com/framework/docs/3.2/grid) and each grid cell can hold its own Flex container for row or column flexibility within that cell. Nest it inside [Columns](https://trmnl.com/framework/docs/3.2/columns) columns for per-column arrangement.

#### Compared to Grid and Columns

Choose Flex when you need flexible, content-sized layouts. If you need strict column alignment and spans, use Grid. If you have lots of same-type data and want the system to handle column distribution and overflow, use [Columns](https://trmnl.com/framework/docs/3.2/columns) .

### Base Structure

Flex arranges content in one of two directions: horizontal (row) or vertical (column). These base structures can be combined with alignment and stretch modifiers for complex layouts.

#### Row Direction

Use `flex flex--row` to create a horizontal layout:

```html
<div class="flex flex--row">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Column Direction

Use `flex flex--col` to create a vertical layout:

```html
<div class="flex flex--col">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Alignment Modifiers

Once you've chosen a base direction, you can apply alignment modifiers to control how items are positioned within their container. Modifiers cover directional alignment (left/right/top/bottom) and centering.

`flex--start` and `flex--end` follow the container's direction: in a row they match `flex--left` and `flex--right`, in a column they match `flex--top` and `flex--bottom`. On a `flex` with no direction modifier they match `flex--left` and `flex--right`. Use them when a container flips direction responsively and the alignment should flip with it.

#### Row Horizontal Alignment

For row layouts, use `flex--left`, `flex--center-x`, or `flex--right` to control horizontal alignment:

```html
<div class="flex flex--row flex--left">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--center-x">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--right">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

#### Row Vertical Alignment

For row layouts, use `flex--top`, `flex--center-y`, or `flex--bottom` to control vertical alignment:

```html
<div class="flex flex--row flex--top">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--center-y">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--bottom">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

#### Column Horizontal Alignment

For column layouts, use `flex--left`, `flex--center-x`, or `flex--right` to control horizontal alignment:

```html
<div class="flex flex--col flex--left">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--col flex--center-x">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--col flex--right">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

#### Column Vertical Alignment

For column layouts, use `flex--top`, `flex--center-y`, or `flex--bottom` to control vertical alignment:

```html
<div class="flex flex--col flex--top">
  <div>Item</div>
</div>

<div class="flex flex--col flex--center">
  <div>Item</div>
</div>

<div class="flex flex--col flex--bottom">
  <div>Item</div>
</div>
```

### Stretch Modifiers

Stretch works at two levels: container modifiers affect all children, while item classes only affect the specific element they're applied to.

#### Container Stretch

Use `flex--stretch`, `flex--stretch-x`, or `flex--stretch-y` to control how children fill the container:

```html
<div class="flex flex--row flex--stretch">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--stretch-x">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<div class="flex flex--row flex--stretch-y">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

#### Individual Item Stretch (Row)

Use `stretch`, `stretch-x`, or `stretch-y` on individual items in a row layout:

```html
<div class="flex flex--row">
  <div class="stretch">Stretches in cross-axis</div>
  <div>Normal item</div>
  <div class="stretch">Stretches in cross-axis</div>
</div>

<div class="flex flex--row">
  <div class="stretch-x">Stretches horizontally</div>
  <div>Normal item</div>
  <div class="stretch-x">Stretches horizontally</div>
</div>

<div class="flex flex--row">
  <div class="stretch-y">Stretches vertically</div>
  <div>Normal item</div>
  <div class="stretch-y">Stretches vertically</div>
</div>
```

#### Individual Item Stretch (Column)

Use `stretch`, `stretch-x`, or `stretch-y` on individual items in a column layout:

```html
<div class="flex flex--col">
  <div class="stretch">Stretches in cross-axis</div>
  <div>Normal item</div>
  <div class="stretch">Stretches in cross-axis</div>
</div>

<div class="flex flex--col">
  <div class="stretch-x">Stretches horizontally</div>
  <div>Normal item</div>
  <div class="stretch-x">Stretches horizontally</div>
</div>

<div class="flex flex--col">
  <div class="stretch-y">Stretches vertically</div>
  <div>Normal item</div>
  <div class="stretch-y">Stretches vertically</div>
</div>
```

#### Preventing Item Shrinkage

Use `shrink-0` on flex children to prevent them from shrinking when other items try to take up more space.

`no-shrink` is an alias for the same rule and stays supported: both classes set `flex-shrink: 0` under the same responsive and orientation variants. Write `shrink-0` in new markup, matching the `grow-0` naming in the item utilities below.

```html
<div class="flex flex--row">
  <div class="shrink-0">Maintains its width</div>
  <div class="stretch">Stretches but won't squish the shrink-0 item</div>
</div>

<!-- no-shrink is an alias for shrink-0 -->
<div class="flex flex--row">
  <div class="no-shrink">Maintains its width</div>
</div>
```

### Orientation-Responsive Layouts

Flexbox utilities support orientation-responsive variants, allowing you to change layouts when the screen is rotated. This is particularly useful for adapting navigation bars, toolbars, and content grids.

#### Adaptive Direction

Use `portrait:` prefix to change flex direction or alignment when the screen is in portrait orientation. Try rotating the device preview to see the effect.

```html
<!-- Navigation that adapts to orientation -->
<div class="flex flex--row portrait:flex--col gap">
  <div class="stretch">Nav Item 1</div>
  <div class="stretch">Nav Item 2</div>
  <div class="stretch">Nav Item 3</div>
</div>

<!-- Combined with size breakpoints -->
<div class="flex flex--col md:flex--row md:portrait:flex--col">
  <!-- Column on small screens -->
  <!-- Row on medium+ landscape screens -->
  <!-- Column on medium+ portrait screens -->
</div>
```

### Extended Directions

In addition to standard directions, Flex supports reverse flow for quick reordering on the main axis. Use `flex--row-reverse` and `flex--col-reverse` to invert visual order without changing the DOM.

Alignment modifiers answer to the reversed direction. `flex--row-reverse flex--left` aligns along the row, the same axis `flex--row flex--left` uses.

#### Row Reverse

```html
<div class="flex flex--row-reverse">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
```

#### Column Reverse

```html
<div class="flex flex--col-reverse">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### Wrapping and Multi-Line Alignment

Control line breaks with `flex--wrap`, `flex--nowrap`, and `flex--wrap-reverse`. When wrapping, use align-content modifiers to distribute lines: `flex--content-start|center|end|between|around|evenly|stretch`.

#### Wrap vs No-wrap

```html
<div class="flex flex--row flex--wrap gap">
  <div>Item 1</div> <div>Item 2</div> <div>Item 3</div>
  <div>Item 4</div> <div>Item 5</div> <div>Item 6</div>
</div>

<div class="flex flex--row flex--nowrap gap">
  <div>Item 1</div> <div>Item 2</div> <div>Item 3</div>
  <div>Item 4</div> <div>Item 5</div> <div>Item 6</div>
</div>
```

#### Wrapping Item Elements

`.item` elements will wrap in flex rows.

```html
<div class="flex flex--row flex--wrap gap">
  <div class="item w--40">
    <div class="meta"></div>
    <div class="content">
      <span class="title title--small">Team Meeting</span>
      <span class="description">Weekly team sync-up</span>
    </div>
  </div>
  <!-- ... -->
</div>
```

#### Align Content Across Lines

These only apply when wrapping is enabled.

```html
<div class="flex flex--row flex--wrap flex--content-between gap">
  <!-- multi-line items -->
</div>

<div class="flex flex--row flex--wrap flex--content-center gap">
  <!-- multi-line items -->
</div>
```

### Main-Axis Distribution

Use `flex--between`, `flex--around`, and `flex--evenly` to control spacing along the main axis. This differs from `gap`, which inserts physical gaps between items.

#### Row Distribution

```html
<div class="flex flex--row flex--between">...</div>
<div class="flex flex--row flex--around">...</div>
<div class="flex flex--row flex--evenly">...</div>
```

### Item-Level Controls

Per-item utilities control alignment and flexing behavior without affecting siblings: self alignment, grow/shrink, flex shorthand, and basis sizing.

#### Self Alignment (align-self)

```html
<div class="flex flex--row h--36">
  <div class="self--start">self--start</div>
  <div class="self--center">self--center</div>
  <div class="self--end">self--end</div>
  <div class="self--stretch">self--stretch</div>
</div>
```

#### Grow/Shrink and Flex Shorthand

Six utilities set an item's flex behavior. The demo below shows four of them.

- `grow`: the item takes a share of the spare space. 
- `grow-0`: the item never takes a share, the explicit opposite of `grow`. 
- `shrink-0`: the item keeps its size when the container runs tight. 
- `flex-auto`: the item both grows and shrinks, starting from its content size. 
- `flex-initial`: the item shrinks but never grows. 
- `flex-none`: the item does neither and stays at its content size.

```html
<div class="flex flex--row">
  <div class="grow">grow</div>
  <div class="shrink-0 w--36">shrink-0</div>
  <div class="flex-none w--36">flex-none</div>
  <div class="flex-initial w--36">flex-initial</div>
</div>
```

#### Basis and Order

Basis sets the size an item starts from before it grows or shrinks. Order moves an item to a different position without changing the markup.

- `basis--{size}`: the whole-number steps of the size scale, `basis--0` through `basis--96`. A step is 4px scaled by the content scale, so `basis--36` is 144px at scale 1. See [Size](https://trmnl.com/framework/docs/3.2/size) . 
- `basis--auto`: the item starts at its content size. 
- `order--{n}`: any whole number from -10 to 10. A negative number takes a third dash, so -1 is `order---1`. 
- `order--first` and `order--last`: move the item ahead of or behind every numbered item.

```html
<div class="flex flex--row">
  <div class="basis--36">basis--36</div>
  <div class="basis--20">basis--20</div>
  <div class="basis--24">basis--24</div>
</div>

<div class="flex flex--row">
  <div class="order--last">order--last</div>
  <div class="order--first">order--first</div>
  <div class="order--2">order--2</div>
  <div class="order---1">order---1</div>
</div>
```

### Inline Flex Containers

Use `inline-flex` for inline-level flex containers that align alongside text.

```html
<span class="label">Text before</span>
<div class="inline-flex flex--row gap">
  <div>•</div>
  <div>•</div>
</div>
<span class="label">Text after</span>
```

Previous

[Gap Set precise spacing between elements with predefined gap values](https://trmnl.com/framework/docs/3.2/gap)

Next

[Grid Create grid layouts with predefined column structures](https://trmnl.com/framework/docs/3.2/grid)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/grid
     ============================================================ -->

# Grid

Utility classes for column-based and row-based grids. Set the column count, span cells across columns, and change either at a breakpoint.

### When to Use Grid

Use Grid inside [Layout](https://trmnl.com/framework/docs/3.2/layout) when you need a strict, grid-based layout. Grid gives you precise control over column count and span, so items align to a consistent rhythm and every element snaps to the same underlying grid.

#### Grid-Based Distribution

You define how many columns the grid has with `grid--cols-{number}`, and you can let individual cells span multiple columns with `col--span-{number}`. The result is a predictable, aligned layout where everything shares the same column structure. Ideal for Swiss-style or editorial designs where visual consistency matters.

#### Multiple Grids and Nesting

You can place multiple Grid components as direct children of Layout; Layout's modifiers (row/col, alignment, stretch) arrange those grids within the available space. Inside each grid cell, you can nest [Flex](https://trmnl.com/framework/docs/3.2/flex) for row or column flexibility within that cell. For example, a grid cell that stacks items vertically or aligns them horizontally.

#### Compared to Flex and Columns

Choose Grid when you need fixed column structure and spans. If you need content-sized flexibility (items that grow or shrink by content), use Flex. If you have lots of same-type data and want the system to handle column distribution and overflow, use [Columns](https://trmnl.com/framework/docs/3.2/columns) .

### Related

[Columns](https://trmnl.com/framework/docs/3.2/columns) [Flex](https://trmnl.com/framework/docs/3.2/flex) [Gap](https://trmnl.com/framework/docs/3.2/gap) [Layout](https://trmnl.com/framework/docs/3.2/layout)

### Ways to Define the Grid

Define a column layout in one of two ways:

- **Column Count:** Set `grid--cols-{number}` on the parent to create equal-width columns 
- **Column Spans:** Set `col--span-{number}` on individual columns to control their width

#### Column Count

Use `grid--cols-{number}` to set the column count, from 1 to 12. A number above 12 has no class, so the grid keeps its default auto-fit template. Here are examples with 4 and 3 columns:

```html
<div class="grid grid--cols-4">
  <div>1/4</div>
  <div>1/4</div>
  <div>1/4</div>
  <div>1/4</div>
</div>

<div class="grid grid--cols-3">
  <div>1/3</div>
  <div>1/3</div>
  <div>1/3</div>
</div>
```

#### Column Spans

Use `col--span-{number}` to make a column span multiple grid columns, from 1 to 12 like the column count. In a grid row, the sum of all column spans should equal the total number of grid columns. For example, you might have spans of 1 and 2, or spans of 3, 6, and 2.

```html
<div class="grid">
  <div class="col--span-1">Span 1</div>
  <div class="col--span-2">Span 2</div>
</div>

<div class="grid">
  <div class="col--span-3">Span 3</div>
  <div class="col--span-6">Span 6</div>
  <div class="col--span-2">Span 2</div>
</div>
```

### Column Layouts

Use columns to create vertical layouts within the grid. Columns can be positioned and aligned using modifier classes.

#### Basic Column Layout

Use the `col` class to create vertical layouts.

```html
<div class="grid">
  <div class="col">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </div>
</div>
```

#### Column Positioning

Use `col--{position}` where position can be `start`, `center`, or `end` to control vertical alignment:

```html
<div class="grid grid--cols-3">
  <div class="col col--start">
    <div>Item</div>
  </div>
  <div class="col col--center">
    <div>Item</div>
  </div>
  <div class="col col--end">
    <div>Item</div>
  </div>
</div>
```

### Row Layouts

Use rows to create horizontal layouts within the grid. Rows can be positioned and aligned using modifier classes.

#### Basic Row Layout

Use the `row` class to create horizontal layouts.

```html
<div class="grid">
  <div class="row">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </div>
</div>
```

#### Row Positioning

Use `row--{position}` where position can be `start`, `center`, or `end` to control horizontal alignment:

```html
<div class="grid grid--cols-1">
  <div class="row row--start">
    <div>Item</div>
  </div>
  <div class="row row--center">
    <div>Item</div>
  </div>
  <div class="row row--end">
    <div>Item</div>
  </div>
</div>
```

### Grid Wrapping

Enable responsive wrapping based on a minimum column width using `grid--wrap`. Combine with `grid--min-{size}` to set the minimum track size.

#### Different Minimum Sizes

As the container shrinks, the grid reduces column count to respect the minimum size.

```html
<div class="grid grid--wrap grid--min-32">
  <div class="col">Item 1</div>
  <div class="col">Item 2</div>
  <div class="col">Item 3</div>
  <div class="col">Item 4</div>
  <div class="col">Item 5</div>
  <div class="col">Item 6</div>
  <div class="col">Item 7</div>
  <div class="col">Item 8</div>
</div>

<div class="grid grid--wrap grid--min-56">
  <div class="col">Item 1</div>
  <div class="col">Item 2</div>
  <div class="col">Item 3</div>
  <div class="col">Item 4</div>
  <div class="col">Item 5</div>
  <div class="col">Item 6</div>
  <div class="col">Item 7</div>
  <div class="col">Item 8</div>
</div>
```

### Removing the Gap

A grid separates its columns by the screen's gap. Add `grid--no-gap` to close it, so tiles meet edge to edge and read as one band. Size and orientation prefixes work on it like any other grid modifier (`portrait:grid--no-gap`), and a [Gap](https://trmnl.com/framework/docs/3.2/gap) utility sets a different gap rather than none.

```html
<div class="grid grid--cols-4 grid--no-gap">
  <div class="col">Mon</div>
  <div class="col">Tue</div>
  <div class="col">Wed</div>
  <div class="col">Thu</div>
</div>
```

Previous

[Flex Arrange elements with flexible layouts and alignment options](https://trmnl.com/framework/docs/3.2/flex)

Next

[Aspect Ratio Maintain consistent proportions for elements regardless of their content](https://trmnl.com/framework/docs/3.2/aspect_ratio)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/aspect_ratio
     ============================================================ -->

# Aspect Ratio

Hold an element to a fixed width-to-height ratio. The utilities set the native CSS aspect-ratio property, so images, charts, and containers keep their proportions at any screen size.

### Basic Usage

Use predefined aspect ratio classes to constrain element dimensions to specific proportions. These utilities apply the CSS `aspect-ratio` property directly to elements.

```html
<!-- Square aspect ratio -->
<div class="aspect--1/1">...</div>

<!-- Widescreen aspect ratio -->
<div class="aspect--16/9">...</div>

<!-- Portrait aspect ratio -->
<div class="aspect--3/4">...</div>
```

### Responsive Behavior

Aspect ratio utilities take the framework's responsive prefixes. A prefixed class overrides the base ratio whenever the screen matches, so one tile can sit square on most screens and go portrait on a tall one.

The prefixes are `sm:`, `md:`, `lg:`, `landscape:`, `portrait:`, and the combined `size:orientation` forms. Aspect ratio carries no bit-depth variants. See [Responsive](https://trmnl.com/framework/docs/3.2/responsive) for the size class each device carries.

```html
<!-- Square, 3:4 on portrait screens -->
<div class="aspect--1/1 portrait:aspect--3/4">...</div>

<!-- 4:3, widescreen on large screens and up -->
<div class="aspect--4/3 lg:aspect--16/9">...</div>

<!-- Widescreen on large landscape screens only -->
<div class="aspect--1/1 lg:landscape:aspect--16/9">...</div>
```

## Available Aspect Ratios

Complete reference of all available aspect ratio utilities.

| Class | Ratio |
| --- | --- |
| `aspect--auto` | No constraints |
| `aspect--1/1` | 1:1 |
| `aspect--4/3` | 4:3 |
| `aspect--3/2` | 3:2 |
| `aspect--16/9` | 16:9 |
| `aspect--21/9` | 21:9 |
| `aspect--3/4` | 3:4 |
| `aspect--2/3` | 2:3 |
| `aspect--9/16` | 9:16 |
| `aspect--9/21` | 9:21 |

Previous

[Grid Create grid layouts with predefined column structures](https://trmnl.com/framework/docs/3.2/grid)

Next

[Responsive Adapt styles to the device's size class, orientation, and bit depth using variant prefixes](https://trmnl.com/framework/docs/3.2/responsive)
