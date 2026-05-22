<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/size.md
     ============================================================ -->

# Size

The Size system provides utility classes for controlling width and height dimensions. It includes both fixed sizes and responsive utilities to handle various layout needs.

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

Need a specific dimension? Use arbitrary size classes for precise pixel values with `w--[Npx]` and `h--[Npx]` syntax, where N can be any value from 0 to 800.

`w/h--[150px]`

`w/h--[225px]`

`w/h--[300px]`

`150px`

`225px`

`300px`

### Dynamic Sizes

Use dynamic sizes to set dimensions relative to the container or content. `w--full` and `h--full` set dimensions to 100% of the container, while `w--auto` and `h--auto` let the browser calculate dimensions based on content.

Full Width

Auto Width

SizeDynamic Widths

    <div class="w--full">Full width</div>
    <div class="w--auto">Auto width</div>
    <div class="h--full">Full height</div>
    <div class="h--auto">Auto height</div>

### Container Query Sizes

Container query sizes let you size elements as a percentage of the `.layout` container. Use `w--[Ncqw]` for width and `h--[Ncqh]` for height, where N is 0-100 (representing 0-100% of the layout's dimensions).

This works automatically because `.layout` is configured as a CSS container query context. Any element inside a layout can use these units to size itself relative to the layout's width or height—useful for responsive images, flexible columns, or proportional spacing.

For advanced cases where you need to reference a different container (e.g., a specific column), add `style="container-type: size;"` to that element. It must have explicit dimensions set.

`w--[50cqw]`

`w--[75cqw]`

`h--[50cqh]`

`50% container width`

`75% container width`

`50% container height`

    <div class="view view--full">
      <div class="layout">
        <div class="w--[50cqw]">50% of layout width</div>
        <div class="h--[33cqh]">33% of layout height</div>
      </div>
    </div>

## Min/Max Dimensions

Control minimum and maximum element dimensions independently using min and max classes. These constraints work with all sizing methods—fixed sizes, arbitrary sizes, container query units, and dynamic sizes.

### Fixed Sizes

Use `w--min-{size}`, `w--max-{size}`, `h--min-{size}`, and `h--max-{size}` to constrain dimensions using fixed size values.

Min Width 72 (288px)

Max Width 32 (128px)

SizeFixed Sizes

    <div class="w--auto w--min-72">Min Width 72 (288px)</div>
    <div class="w--full w--max-32">Max Width 32 (128px)</div>
    <div class="h--min-72">Min Height 72 (288px)</div>
    <div class="h--max-8">Max Height 8 (32px)</div>

### Arbitrary Sizes

Use `w--min-[Npx]`, `w--max-[Npx]`, `h--min-[Npx]`, and `h--max-[Npx]` to constrain dimensions using precise pixel values.

`w--min-[100px]`

`w--max-[200px]`

`h--min-[50px]`

`h--max-[150px]`

`min-width: 100px`

`max-width: 200px`

`min-height: 50px`

`max-height: 150px`

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

Responsive Width

Responsive Height

SizeResponsive Sizes

    <!-- Width: 8 (32px) by default, 16 (64px) on md and up, 24 (96px) on lg and up -->
    <div class="w--8 md:w--16 lg:w--24">Responsive Width</div>

    <!-- Height: 8 (32px) by default, 16 (64px) on md and up, 24 (96px) on lg and up -->
    <div class="h--8 md:h--16 lg:h--24">Responsive Height</div>

    <!-- Min/Max with responsive -->
    <div class="w--min-8 md:w--min-16 lg:w--min-24">Responsive Min Width</div>

    <!-- Container query units with responsive -->
    <div class="w--[25cqw] md:w--[50cqw] lg:w--[75cqw]">Responsive Container Query</div>

### Supported Responsive Classes

Responsive variants are available for most size utilities. Use prefixes like `md:`, `portrait:`, and `md:portrait:` to target different breakpoints and orientations.

| Category | Responsive Support | Example Usage |
| --- | --- | --- |
| Fixed Sizes | ✓ Supported | `md:w--16, lg:h--24` |
| Full/Auto Dimensions | ✓ Supported | `md:w--full, lg:h--auto` |
| Min/Max Dimensions | ✓ Supported | `md:w--min-16, lg:h--max-full` |
| Arbitrary Dimensions | ✗ Not Supported | `md:w--[150px], lg:w--[225px]` |
| Container Query Sizes | ✓ Supported | `md:w--[50cqw], lg:h--[75cqh]` |

Previous

[TRMNL X Guide Framework changes for TRMNL X compatibility](/framework/docs/3.1/trmnl_x_guide)

Next

[Spacing Control element spacing with fixed margin and padding values](/framework/docs/3.1/spacing)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/spacing.md
     ============================================================ -->

# Spacing

The Spacing system provides utility classes for controlling margins and padding. It includes both fixed sizes and decimal values to handle precise spacing needs.

Available spacing sizes and their pixel values

[View Size Documentation](/framework/docs/3.1/size)  

### Margin Utilities

Control element margins using these utility classes. Each class follows the pattern `{property}--{size}` and supports responsive modifiers for **Size** [Size](/framework/docs/3.1/size) , **Orientation**, and **Size + Orientation** [Responsive](/framework/docs/3.1/responsive) .

`m--{size}`All sides margin

`mt--{size}`Top margin

`mr--{size}`Right margin

`mb--{size}`Bottom margin

`ml--{size}`Left margin

`mx--{size}`Horizontal margin

`my--{size}`Vertical margin

`md:my--{size}`Size-based example

`portrait:mx--{size}`Orientation-based example

`lg:portrait:mt--{size}`Size + Orientation example

### Padding Utilities

Control element padding using these utility classes. Each class follows the pattern `{property}--{size}`. See [Size](/framework/docs/3.1/size) for sizing tokens.

`p--{size}`All sides padding

`pt--{size}`Top padding

`pr--{size}`Right padding

`pb--{size}`Bottom padding

`pl--{size}`Left padding

`px--{size}`Horizontal padding

`py--{size}`Vertical padding

`sm:px--{size}`Size-based example

`portrait:pb--{size}`Orientation-based example

`md:portrait:pt--{size}`Size + Orientation example

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

Previous

[Size Define exact width and height dimensions for elements](/framework/docs/3.1/size)

Next

[Gap Set precise spacing between elements with predefined gap values](/framework/docs/3.1/gap)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/gap.md
     ============================================================ -->

# Gap

The Gap system provides consistent spacing between elements using CSS gap property. It offers predefined sizes, responsive spacing, and custom values to maintain visual rhythm throughout your interface.

### Size Variants

The gap system includes predefined base sizes and arbitrary pixel values. These standardized spaces
 help maintain consistent spacing across your application's grid and flex layouts.

#### Base

The base `gap` class without size modifiers
 and the `gap--base` class both produce the same visual result,
 providing the standard spacing. Use `gap--base` when you need
 to explicitly set the base size in responsive contexts. See the [Responsive Gaps](#responsive-gap) section for examples.

gap--none

gap--none

gap--none

gap--xsmall

gap--xsmall

gap--xsmall

gap--small

gap--small

gap--small

gap

gap

gap

gap--medium

gap--medium

gap--medium

gap--large

gap--large

gap--large

gap--xlarge

gap--xlarge

gap--xlarge

gap--xxlarge

gap--xxlarge

gap--xxlarge

Predefined GapsDesign System

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

#### Arbitrary

Use `gap--[Npx]` syntax to specify
 exact pixel values from **0px to 50px**. This works with both grid and flex layouts, but does not support responsive variants.

gap--[0px]

gap--[0px]

gap--[0px]

gap--[10px]

gap--[10px]

gap--[10px]

gap--[30px]

gap--[30px]

gap--[30px]

gap--[50px]

gap--[50px]

gap--[50px]

Arbitrary Pixel GapsDesign System

    <!-- Custom gap values from 0px to 50px (no responsive support) -->
    <div class="grid grid--cols-3 gap--[0px]">...</div>
    <div class="grid grid--cols-3 gap--[10px]">...</div>
    <div class="grid grid--cols-3 gap--[30px]">...</div>
    <div class="grid grid--cols-3 gap--[50px]">...</div>

    <!-- Works with flex containers too -->
    <div class="flex flex--col gap--[25px]">...</div>

Arbitrary gap values using the `gap--[Npx]` syntax do not support responsive variants. Use predefined gap classes if you need responsive behavior.

### Distribution Modifiers

Beyond fixed gaps, you can use special modifiers to control how space is distributed between elements.
 These modifiers are particularly useful for creating flexible, dynamic layouts.

#### Auto Distribution

The `gap--auto` modifier
 distributes available space evenly between elements, including equal spacing at the edges.
 This uses `justify-content: space-evenly`.

gap--auto

gap--auto

gap--auto

Auto Distribution GapDesign System

    <!-- Auto distribution in a flex container -->
    <div class="flex flex--col gap--auto h--52">
      <div>...</div>
      <div>...</div>
      <div>...</div>
    </div>

#### Distribute

The `gap--distribute` modifier
 places the first item at the start of the container and the last item at the end, with equal spacing between items.
 This uses `justify-content: space-between`.

gap--distribute

gap--distribute

gap--distribute

Distribute GapDesign System

    <!-- Distribute spacing in a flex container -->
    <div class="flex flex--col gap--distribute h--52">
      <div>First item (at start)</div>
      <div>Middle item</div>
      <div>Last item (at end)</div>
    </div>

#### Legacy: Space Between

The `gap--space-between` modifier
 is maintained for backwards compatibility. It behaves the same as `gap--auto`,
 using `justify-content: space-evenly`.
 For the actual `space-between` behavior, use `gap--distribute`.

### Responsive Gaps

Gap utilities support size-based breakpoints, orientation variants, and their combination.
 Use prefixes like `md:`, `portrait:`,
 and `md:portrait:` to target conditions.

#### Responsive Gap Examples

Apply different gap values at different breakpoints using the size-based responsive system.
 The framework follows a mobile-first approach where larger breakpoints inherit smaller ones.
 The `--base` modifier
 is particularly useful for resetting to the default size at specific breakpoints.

Responsive Gap

Responsive Gap

Responsive Gap

Small by default, large on md+, xlarge on lg+, medium gap in portrait, xlarge in md+ portrait

Responsive GapsSize-Based

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

Gap utilities only support size-based responsive variants. Bit-depth variants (like `1bit:` or `4bit:`) are not available for gap classes.

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

Previous

[Spacing Control element spacing with fixed margin and padding values](/framework/docs/3.1/spacing)

Next

[Flex Arrange elements with flexible layouts and alignment options](/framework/docs/3.1/flex)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/flex.md
     ============================================================ -->

# Flex

The Flex system provides utility classes for creating flexible layouts using Flexbox. It supports both row and column directions with various alignment, centering, and stretching options.

### When to Use Flex

Use Flex inside[Layout](/framework/docs/3.1/layout) when you need flexible row or column arrangements. Flex lets items size by their content: width and height follow what's inside, rather than a fixed grid. It's the right choice when you want natural, content-driven layouts without strict column structure.

#### Content-Based Sizing

Flex items grow and shrink based on their content by default. You can override this with stretch modifiers, grow/shrink utilities, or basis classes. Use Flex when your layout should adapt to the content rather than forcing content into a fixed grid. Examples: toolbars, inline groups of labels and values, or stacks of variable-height cards.

#### Standalone or Nested

You can use Flex alone as the only child of Layout for simpler layouts. You can also nest Flex inside[Grid](/framework/docs/3.1/grid) . Each grid cell can contain a Flex container for row or column flexibility within that cell. And you can nest Flex inside [Columns](/framework/docs/3.1/columns) columns for per-column arrangement.

#### Compared to Grid and Columns

Choose Flex when you need flexible, content-sized layouts. If you need strict column alignment and spans, use Grid. If you have lots of same-type data and want the system to handle column distribution and overflow, use[Columns](/framework/docs/3.1/columns) .

### Base Structure

The Flex system provides two fundamental ways to organize content: horizontal (row) and vertical (column) arrangements.
 These base structures can be combined with alignment and stretch modifiers for complex layouts.

#### Row Direction

Use `flex flex--row` to create a horizontal layout:

Item 1

Item 2

Item 3

FlexRow Direction

    <div class="flex flex--row">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Column Direction

Use `flex flex--col` to create a vertical layout:

Item 1

Item 2

Item 3

FlexColumn Direction

    <div class="flex flex--col">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

### Alignment Modifiers

Once you've chosen a base direction, you can apply alignment modifiers to control how items are positioned
 within their container. The system provides directional alignment (left/right/top/bottom) and centering options.

#### Row Horizontal Alignment

For row layouts, use `flex--left`, `flex--center-x`, or `flex--right` to control horizontal alignment:

Left

Center X

Right

FlexRow Horizontal Alignment

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

#### Row Vertical Alignment

For row layouts, use `flex--top`, `flex--center-y`, or `flex--bottom` to control vertical alignment:

Top

Center Y

Bottom

FlexRow Vertical Alignment

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

#### Column Horizontal Alignment

For column layouts, use `flex--left`, `flex--center-x`, or `flex--right` to control horizontal alignment:

Left

Center X

Right

FlexColumn Horizontal Alignment

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

#### Column Vertical Alignment

For column layouts, use `flex--top`, `flex--center-y`, or `flex--bottom` to control vertical alignment:

Top

Center Y

Bottom

FlexColumn Vertical Alignment

    <div class="flex flex--col flex--top">
      <div>Item</div>
    </div>

    <div class="flex flex--col flex--center">
      <div>Item</div>
    </div>

    <div class="flex flex--col flex--bottom">
      <div>Item</div>
    </div>

### Stretch Modifiers

The Flex system provides both container-level and individual item stretch controls. Container modifiers affect all children,
 while item classes only affect the specific element they're applied to.

#### Container Stretch

Use `flex--stretch`, `flex--stretch-x`, or `flex--stretch-y` to control how children fill the container:

Stretch All

Stretch X

Stretch Y

FlexContainer Stretch

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

#### Individual Item Stretch (Row)

Use `stretch`, `stretch-x`, or `stretch-y` on individual items in a row layout:

Stretch

Normal

Stretch

Stretch X

Normal

Stretch X

Stretch Y

Normal

Stretch Y

FlexItem Stretch (Row)

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

#### Individual Item Stretch (Column)

Use `stretch`, `stretch-x`, or `stretch-y` on individual items in a column layout:

Stretch

Normal

Stretch

Stretch X

Normal

Stretch X

Stretch Y

Normal

Stretch Y

FlexItem Stretch (Column)

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

#### Preventing Item Shrinkage

Use `no-shrink` on flex children to prevent them from shrinking
 when other items try to take up more space:

Can Shrink

Stretching Content That Pushes Others

Won't Shrink

Stretching Content That Pushes Others

FlexPrevent Shrinking

    <div class="flex flex--row">
      <div class="no-shrink">Maintains its width</div>
      <div class="stretch">Stretches but won't squish the no-shrink item</div>
    </div>

### Orientation-Responsive Layouts

Flexbox utilities support orientation-responsive variants, allowing you to change layouts when the screen is rotated.
 This is particularly useful for adapting navigation bars, toolbars, and content grids.

#### Adaptive Direction

Use `portrait:` prefix to change flex direction or alignment
 when the screen is in portrait orientation. Try rotating the device preview to see the effect.

Nav Item 1

Nav Item 2

Nav Item 3

Row in landscape, column in portrait

FlexOrientation Responsive

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

### Extended Directions

In addition to standard directions, Flex supports reverse flow for quick reordering on the main axis.
 Use `flex--row-reverse` and `flex--col-reverse` to invert visual order without changing the DOM.

#### Row Reverse

A

B

C

FlexRow Reverse

    <div class="flex flex--row-reverse">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>

#### Column Reverse

1

2

3

FlexColumn Reverse

    <div class="flex flex--col-reverse">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>

### Wrapping and Multi‑Line Alignment

Control line breaks with `flex--wrap`, `flex--nowrap`, and `flex--wrap-reverse`. When wrapping, use align‑content
 modifiers to distribute lines: `flex--content-start|center|end|between|around|evenly|stretch`.

#### Wrap vs No‑wrap

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

FlexWrap vs No‑wrap

    <div class="flex flex--row flex--wrap gap">
      <div>Item 1</div> <div>Item 2</div> <div>Item 3</div>
      <div>Item 4</div> <div>Item 5</div> <div>Item 6</div>
    </div>

    <div class="flex flex--row flex--nowrap gap">
      <div>Item 1</div> <div>Item 2</div> <div>Item 3</div>
      <div>Item 4</div> <div>Item 5</div> <div>Item 6</div>
    </div>

#### Wrapping Item Elements

`.item` elements will wrap in flex rows.

Team MeetingWeekly team sync-up

Team MeetingWeekly team sync-up

Team MeetingWeekly team sync-up

Team MeetingWeekly team sync-up

Team MeetingWeekly team sync-up

FlexWrapping Items

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

#### Align Content Across Lines

These only apply when wrapping is enabled.

L1

L2

L3

L4

L5

L6

L7

L8

L1

L2

L3

L4

L5

L6

L7

L8

FlexAlign Content

    <div class="flex flex--row flex--wrap flex--content-between gap">
      <!-- multi-line items -->
    </div>

    <div class="flex flex--row flex--wrap flex--content-center gap">
      <!-- multi-line items -->
    </div>

### Main‑Axis Distribution

Use `flex--between`, `flex--around`, and `flex--evenly` to control spacing along the main axis.
 This differs from `gap`, which inserts physical gaps between items.

#### Row Distribution

Start

Middle

End

Around

Evenly

FlexRow Distribution

    <div class="flex flex--row flex--between">...</div>
    <div class="flex flex--row flex--around">...</div>
    <div class="flex flex--row flex--evenly">...</div>

### Item‑Level Controls

Per‑item utilities control alignment and flexing behavior without affecting siblings: self alignment,
 grow/shrink, flex shorthand, and basis sizing.

#### Self Alignment (align-self)

self--start

self--center

self--end

self--stretch

FlexSelf Alignment

    <div class="flex flex--row h--36">
      <div class="self--start">self--start</div>
      <div class="self--center">self--center</div>
      <div class="self--end">self--end</div>
      <div class="self--stretch">self--stretch</div>
    </div>

#### Grow/Shrink and Flex Shorthand

grow

shrink-0

flex-none

flex-initial

FlexGrow/Shrink & Flex

    <div class="flex flex--row">
      <div class="grow">grow</div>
      <div class="shrink-0 w--36">shrink-0</div>
      <div class="flex-none w--36">flex-none</div>
      <div class="flex-initial w--36">flex-initial</div>
    </div>

#### Basis and Order

basis--36

basis--20

basis--24

order--last

order--first

order--2

order---1

FlexBasis & Order

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

### Inline Flex Containers

Use `inline-flex` for inline‑level flex containers that align alongside text.

Text before

Text after

FlexInline Flex

    <span>Text before</span>
    <div class="inline-flex flex--row gap">
      <div>•</div>
      <div>•</div>
    </div>
    <span>Text after</span>

Previous

[Gap Set precise spacing between elements with predefined gap values](/framework/docs/3.1/gap)

Next

[Grid Create grid layouts with predefined column structures](/framework/docs/3.1/grid)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/grid.md
     ============================================================ -->

# Grid

The Grid system provides a flexible way to create both column-based and row-based layouts. It supports various column counts, column spans, and responsive behaviors to create complex layouts easily.

### When to Use Grid

Use Grid inside[Layout](/framework/docs/3.1/layout) when you need a strict, grid-based layout. Grid gives you precise control over column count and span, so items align to a consistent rhythm and every element snaps to the same underlying grid.

#### Grid-Based Distribution

You define how many columns the grid has with `grid--cols-{number}`, and you can let individual cells span multiple columns with `col--span-{number}`. The result is a predictable, aligned layout where everything shares the same column structure. Ideal for Swiss-style or editorial designs where visual consistency matters.

#### Multiple Grids and Nesting

You can place multiple Grid components as direct children of Layout; Layout's modifiers (row/col, alignment, stretch) arrange those grids within the available space. Inside each grid cell, you can nest[Flex](/framework/docs/3.1/flex) for row or column flexibility within that cell. For example, a grid cell that stacks items vertically or aligns them horizontally.

#### Compared to Flex and Columns

Choose Grid when you need fixed column structure and spans. If you need content-sized flexibility (items that grow or shrink by content), use Flex. If you have lots of same-type data and want the system to handle column distribution and overflow, use[Columns](/framework/docs/3.1/columns) .

### Related

[Columns](/framework/docs/3.1/columns)[Flex](/framework/docs/3.1/flex)[Gap](/framework/docs/3.1/gap)[Layout](/framework/docs/3.1/layout)

### Ways to Define the Grid

The grid system provides two ways to define column layouts:

- **Column Count:** Set `grid--cols-{number}` on the parent to create equal-width columns
- **Column Spans:** Set `col--span-{number}` on individual columns to control their width

#### Column Count

Use `grid--cols-{number}` to specify any number of columns.
 Here are examples with 4 and 3 columns:

Col 1/4

Col 1/4

Col 1/4

Col 1/4

Col 1/3

Col 1/3

Col 1/3

GridColumn Count

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

#### Column Spans

Use `col--span-{number}` to make a column
 span multiple grid columns. In a grid row, the sum of all column spans should equal the total number of grid columns.
 For example, you might have spans of 1 and 2, or spans of 3, 6, and 2.

Col Span 1

Col Span 2

Col Span 3

Col Span 6

Col Span 2

GridColumn Spans

    <div class="grid">
      <div class="col--span-1">Span 1</div>
      <div class="col--span-2">Span 2</div>
    </div>

    <div class="grid">
      <div class="col--span-3">Span 3</div>
      <div class="col--span-6">Span 6</div>
      <div class="col--span-2">Span 2</div>
    </div>

### Column Layouts

Use columns to create vertical layouts within the grid. Columns can be positioned and aligned using modifier classes.

#### Basic Column Layout

Use the `col` class to create vertical layouts.

Item 1

Item 2

Item 3

Item 4

GridColumn Layout

    <div class="grid">
      <div class="col">
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </div>
    </div>

#### Column Positioning

Use `col--{position}` where position can be `start`, `center`, or `end` to control vertical alignment:

Start

Center

End

GridColumn Positioning

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

### Row Layouts

Use rows to create horizontal layouts within the grid. Rows can be positioned and aligned using modifier classes.

#### Basic Row Layout

Use the `row` class to create horizontal layouts.

Item 1

Item 2

Item 3

Item 4

GridRow Layout

    <div class="grid">
      <div class="row">
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </div>
    </div>

#### Row Positioning

Use `row--{position}` where position can be `start`, `center`, or `end` to control horizontal alignment:

Start

Center

End

GridRow Positioning

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

### Grid Wrapping

Enable responsive wrapping based on a minimum column width using `grid--wrap`.
 Combine with `grid--min-{size}` to set the minimum track size.

#### Different Minimum Sizes

As the container shrinks, the grid reduces column count to respect the minimum size.

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

Item 7

Item 8

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

Item 7

Item 8

GridGrid Wrapping

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

Previous

[Flex Arrange elements with flexible layouts and alignment options](/framework/docs/3.1/flex)

Next

[Aspect Ratio Maintain consistent proportions for elements regardless of their content](/framework/docs/3.1/aspect_ratio)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/aspect_ratio.md
     ============================================================ -->

# Aspect Ratio

The Aspect Ratio utility uses the native CSS aspect-ratio property to maintain consistent proportions for elements. Perfect for images, videos, and containers that need to maintain specific width-to-height ratios across different screen sizes.

### Basic Usage

Use predefined aspect ratio classes to constrain element dimensions to specific proportions.
 These utilities apply the CSS `aspect-ratio` property directly to elements.

1:1

16:9

3:4

Aspect RatioBasic Usage

    <!-- Square aspect ratio -->
    <div class="aspect--1/1">...</div>

    <!-- Widescreen aspect ratio -->
    <div class="aspect--16/9">...</div>

    <!-- Portrait aspect ratio -->
    <div class="aspect--3/4">...</div>

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

[Grid Create grid layouts with predefined column structures](/framework/docs/3.1/grid)

Next

[Responsive Adapt styles based on screen width using breakpoint prefixes](/framework/docs/3.1/responsive)


