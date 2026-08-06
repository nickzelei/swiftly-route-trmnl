<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/rich_text
     ============================================================ -->

# Rich Text

A container for long-form text: paragraphs, headings, lists, and quotes. The framework styles the children of the content block, so text from a feed renders in the framework font without a class on every tag.

### Understanding Richtext Components

The richtext system consists of two key parts working together: the parent `.richtext` container and its natural child `.content` [Content Limiter](https://trmnl.com/framework/docs/3.2/content_limiter) component.

The parent `.richtext` container is designed for flexibility and can hold any content. It controls the overall placement and spacing of the component within your layout.

The `.content` component is where your actual text content lives. It carries the type styles and the alignment modifiers specific to text.

Rich Text is the one component that takes plain HTML children. A `.content` block styles its children directly, so paragraphs, headings, and lists coming from a feed render in the framework font without a class on every tag. Everywhere else on a screen, use the framework elements ( [Title](https://trmnl.com/framework/docs/3.2/title) , [Description](https://trmnl.com/framework/docs/3.2/description) , [Label](https://trmnl.com/framework/docs/3.2/label) , [Value](https://trmnl.com/framework/docs/3.2/value) ).

Both components have separate alignment modifiers that serve different purposes. The table below summarizes each modifier:

| Class | Modifiers | Applies To | Controls | Example |
| --- | --- | --- | --- | --- |
| `richtext` | `left`, `center`, `right` | Container (`.richtext`) | Aligns the richtext container within its parent | `richtext--center` |
| `content` | `left`, `center`, `right` | Child content (`.content`) | Aligns the content block within the richtext container | `content--right` |
| `text` | `left`, `center`, `right` | Text elements inside `.content` | Aligns inline text within the content block | `text--center` |

The two levels are independent, so you can place the component one way and align its text another.

### Rich Text Alignment

The Rich Text component can be aligned in three different ways: left, center, or right. Each alignment option provides different text positioning to suit various design needs.

#### Left Aligned

Left alignment is the default and most readable format for longer text content, ideal for paragraphs and articles.

```html
<div class="richtext richtext--left gap--large">
  <img class="image" src="/assets/trmnl--glyph-black-large.svg">
  <div class="content content--left gap text--left">
    <p>This is an example of left-aligned rich text content.</p>
    <p>Multiple paragraphs will maintain the same alignment.</p>
  </div>
</div>
```

#### Center Aligned

Center alignment is ideal for headings, quotes, or shorter text that needs to be highlighted or visually balanced within the layout.

```html
<div class="richtext richtext--center gap--large">
  <img class="image" src="/assets/trmnl--glyph-black-large.svg">
  <div class="content content--center gap text--center">
    <p>This is an example of center-aligned rich text content.</p>
    <p>Centered text works well for quotes or highlighted information.</p>
  </div>
</div>
```

#### Right Aligned

Right alignment is less common but can be useful for specific design scenarios or to create visual tension in layouts.

```html
<div class="richtext richtext--right gap--large">
  <img class="image" src="/assets/trmnl--glyph-black-large.svg">
  <div class="content content--right gap text--right">
    <p>This is an example of right-aligned rich text content.</p>
    <p>Right alignment can be used for captions or sidebars.</p>
  </div>
</div>
```

### Content Size Variants

The Rich Text component offers six size variants: `small`, `base`, `large`, `xlarge`, `xxlarge`, and `xxxlarge`. The `content` class without size modifiers and the `content--base` class produce the same visual result, so use `content--base` when you need to set the base size explicitly in responsive contexts. All size variants support responsive prefixes like `sm:`, `md:`, `lg:`, and `portrait:`.

```html
<div class="richtext gap--large">
  <!-- XXXLarge Size -->
  <div class="content content--xxxlarge">
    <p>This is xxxlarge size rich text content.</p>
  </div>

  <!-- XXLarge Size -->
  <div class="content content--xxlarge">
    <p>This is xxlarge size rich text content.</p>
  </div>

  <!-- XLarge Size -->
  <div class="content content--xlarge">
    <p>This is xlarge size rich text content.</p>
  </div>

  <!-- Large Size -->
  <div class="content content--large">
    <p>This is large size rich text content.</p>
  </div>

  <!-- Base Size (same as default, useful for responsive) -->
  <div class="content content--base">
    <p>This is base size rich text content.</p>
  </div>

  <!-- Small Size -->
  <div class="content content--small">
    <p>This is small size rich text content.</p>
  </div>
</div>

<!-- Responsive example -->
<div class="richtext gap--large">
  <div class="content content--base lg:content--xxxlarge">
    <p>Base by default, xxxlarge on large screens</p>
  </div>
</div>
```

### Controlling Width

By default, the Rich Text content takes up as much space as it needs and is centered in the layout, expanding up to a maximum width. However, you can precisely control the width of content using Size utility classes [Size](https://trmnl.com/framework/docs/3.2/size) .

```html
<div class="richtext richtext--center gap--large">
  <div class="content w--60 text--center gap">
    <p>This Rich Text content has a fixed width of 240 pixels using utility classes.</p>
    <p>Notice how the text is constrained to this specific width regardless of the container size.</p>
  </div>
</div>
```

You can use any of the Size system's fixed sizes (`w--32`, `w--64`, etc.), arbitrary sizes up to 128px (`w--[120px]`), or responsive sizes (`w--full`, `w--auto`). This flexibility lets you create perfectly sized text blocks for any layout need.

### Responsive Features

The `content` component supports all three responsive systems: size-based, orientation-based, and bit-depth variants. This enables precise control over content text size across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different content sizes per device size class.

```html
<!-- Base by default, xxlarge on lg screens -->
<div class="richtext gap--large">
  <div class="content content--base lg:content--xxlarge">
    <p>Responsive content</p>
  </div>
</div>

<!-- Small by default, base on medium+ screens -->
<div class="richtext gap--large">
  <div class="content content--small md:content--base">
    <p>Small by default, base on medium+ screens</p>
  </div>
</div>

<!-- Progressive size scaling -->
<div class="richtext gap--large">
  <div class="content content--small sm:content--base md:content--large lg:content--xxlarge">
    <p>Progressive content sizing</p>
  </div>
</div>
```

#### Orientation and Size+Orientation

Content sizes can adapt to orientation with `portrait:` and `landscape:`, and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Large by default, small in portrait -->
<div class="richtext gap--large">
  <div class="content content--large portrait:content--small">
    <p>Orientation variant content</p>
  </div>
</div>

<!-- Caption describing the responsive behavior -->
<div class="content content--small">Large by default, small in portrait.</div>
```

#### Bit-Depth Responsive

Use bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to optimize content text size for different display color capabilities.

```html
<!-- Different content sizes for different bit-depth displays -->
<div class="richtext gap--large">
  <div class="content 1bit:content--large 2bit:content--xlarge 4bit:content--xxlarge">
    <p>Display optimized content</p>
  </div>
</div>

<!-- Selective bit-depth targeting -->
<div class="richtext gap--large">
  <div class="content 1bit:content--base 4bit:content--xlarge">
    <p>Selective sizing</p>
  </div>
</div>
```

#### Combined Responsive Features

Combine multiple responsive systems for highly targeted content sizing. Use size, orientation, and bit-depth modifiers together following the pattern: `size:orientation:bit-depth:content--size`.

```html
<!-- Highly targeted responsive combinations -->
<div class="richtext gap--large">
  <div class="content md:portrait:2bit:content--xlarge lg:4bit:content--xxlarge">
    <p>Advanced targeting</p>
  </div>
</div>

<!-- Multiple responsive conditions -->
<div class="richtext gap--large">
  <div class="content sm:1bit:content--large md:portrait:content--base lg:4bit:content--xlarge">
    <p>Multi-condition content</p>
  </div>
</div>
```

### Integration with Content Limiter

The Rich Text component works seamlessly with the Content Limiter utility [Content Limiter](https://trmnl.com/framework/docs/3.2/content_limiter) to handle overflowing text. When combined, it automatically adjusts text size to fit the available space, which is particularly useful in constrained layouts.

Simply add the `data-content-limiter="true"` attribute to your richtext content element. You can also specify a custom maximum height using the `data-content-max-height` attribute (e.g., `data-content-max-height="140"`).

When `data-content-limiter="true"` is present, the limiter auto-measures the available height in the nearest container and adjusts text to fit. You can override the auto height by specifying `data-content-max-height` with a pixel value.

Automatically resize text when content exceeds height limits

[View Content Limiter Documentation](https://trmnl.com/framework/docs/3.2/content_limiter)

```html
<div class="richtext richtext--left gap--large">
  <div class="content" data-content-limiter="true">
    <p class="text--left">
      The Rich Text component with Content Limiter will automatically
      adjust text size when content exceeds the height threshold.
      This is particularly useful for views with limited vertical space.
    </p>
  </div>
</div>
```

### Integration with Pixel Perfect

For optimal text rendering on ePaper displays, the Rich Text component can be enhanced with the Pixel Perfect utility [Pixel Perfect](https://trmnl.com/framework/docs/3.2/pixel_perfect) . This ensures text is rendered with crisp edges by aligning precisely to the pixel grid, preventing blurry or inconsistent text weight.

Simply add the `data-pixel-perfect="true"` attribute to your richtext content element.

Ensure crisp text rendering on 1-bit displays

[View Pixel Perfect Documentation](https://trmnl.com/framework/docs/3.2/pixel_perfect)

```html
<div class="richtext richtext--left gap">
  <div class="content" data-pixel-perfect="true">
    <p>
      This text is rendered with pixel perfect alignment, ensuring that each character aligns precisely with the pixel grid. Notice how the text appears crisp and clear with consistent weight.
    </p>
  </div>
  <div class="content" data-pixel-perfect="true">
    <p>
      Pixel Perfect is especially important for ePaper displays that use a 1-bit color space (just black and white), where anti-aliased gray pixels are forced to become either fully black or fully white.
    </p>
  </div>
</div>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--richtext-content-max-width` | calc(640px * var(--ui-scale)) | - | - | - |
| `--richtext-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--richtext-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--richtext-font-smoothing` | none | none | auto | - |
| `--richtext-font-weight` | 400 | 400 | 500 | - |
| `--richtext-line-height` | calc(22px * var(--text-ui-scale)) | calc(22px * var(--text-ui-scale)) | calc(22px * var(--text-ui-scale)) | - |
| Small |
| `--richtext-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--richtext-small-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--richtext-small-font-smoothing` | none | none | auto | - |
| `--richtext-small-font-weight` | 400 | 400 | 500 | - |
| `--richtext-small-line-height` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(18px * var(--text-ui-scale)) | - |
| Large |
| `--richtext-large-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | - |
| `--richtext-large-font-size` | calc(26px * var(--text-ui-scale)) | calc(26px * var(--text-ui-scale)) | calc(21px * var(--text-ui-scale)) | - |
| `--richtext-large-font-smoothing` | none | none | auto | - |
| `--richtext-large-font-weight` | 400 | 400 | 500 | - |
| `--richtext-large-line-height` | 1 | 1 | 1.2 | - |
| Xlarge |
| `--richtext-xlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--richtext-xlarge-font-size` | calc(30px * var(--text-ui-scale)) | - | calc(30px * var(--text-ui-scale)) | - |
| `--richtext-xlarge-font-smoothing` | auto | - | auto | - |
| `--richtext-xlarge-font-weight` | 425 | - | 425 | - |
| `--richtext-xlarge-line-height` | 1.2 | - | 1.2 | - |
| Xxlarge |
| `--richtext-xxlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--richtext-xxlarge-font-size` | calc(35px * var(--text-ui-scale)) | - | calc(35px * var(--text-ui-scale)) | - |
| `--richtext-xxlarge-font-smoothing` | auto | - | auto | - |
| `--richtext-xxlarge-font-weight` | 400 | - | 400 | - |
| `--richtext-xxlarge-line-height` | 1.2 | - | 1.2 | - |
| Xxxlarge |
| `--richtext-xxxlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--richtext-xxxlarge-font-size` | calc(40px * var(--text-ui-scale)) | - | calc(40px * var(--text-ui-scale)) | - |
| `--richtext-xxxlarge-font-smoothing` | auto | - | auto | - |
| `--richtext-xxxlarge-font-weight` | 375 | - | 375 | - |
| `--richtext-xxxlarge-line-height` | 1.2 | - | 1.2 | - |

Previous

[Divider Create horizontal or vertical dividers between elements](https://trmnl.com/framework/docs/3.2/divider)

Next

[Item Build standardized list items and content blocks](https://trmnl.com/framework/docs/3.2/item)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/item
     ============================================================ -->

# Item

A row for lists, schedules, and other repeating content, with optional meta text, an index, or an icon. Stack items in a Layout and let the Overflow engine handle the ones that do not fit.

### Item Variants

Items can be displayed in four variants: with meta and index, with meta only, with meta emphasis levels, or in a simple format. Each variant provides different levels of visual hierarchy and information density.

#### With Meta

This variant includes a meta section without an index, providing space for optional metadata while maintaining a clean appearance.

```html
<div class="item">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Team Meeting</span>
    <span class="description">Weekly team sync-up</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">9:00 AM - 10:00 AM</span>
      <span class="label label--small label--underline">Confirmed</span>
    </div>
  </div>
</div>
```

#### With Meta Emphasis

Items support three emphasis levels: default, emphasis-2, and emphasis-3. Apply `item--emphasis-2` or `item--emphasis-3` to progressively darken the meta bar and draw attention.

```html
<div class="item">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Team Meeting</span>
    <span class="description">Weekly team sync-up</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">9:00 AM - 10:00 AM</span>
      <span class="label label--small label--underline">Confirmed</span>
    </div>
  </div>
</div>

<div class="item item--emphasis-2">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Client Presentation</span>
    <span class="description">Quarterly review with XYZ Corp</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">2:00 PM - 3:30 PM</span>
      <span class="label label--small label--underline">Tentative</span>
    </div>
  </div>
</div>

<div class="item item--emphasis-3">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Project Deadline</span>
    <span class="description">Submit final deliverables for Project Alpha</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">11:59 PM</span>
      <span class="label label--small label--underline">Important</span>
    </div>
  </div>
</div>
```

#### With Meta and Index

The most detailed variant includes both a meta section and an index number, useful for ordered lists or when additional context is needed.

```html
<div class="item">
  <div class="meta">
    <span class="index">1</span>
  </div>
  <div class="content">
    <span class="title title--small">Team Meeting</span>
    <span class="description">Weekly team sync-up</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">9:00 AM - 10:00 AM</span>
      <span class="label label--small label--underline">Confirmed</span>
    </div>
  </div>
</div>
```

#### Simple

The simplest variant focuses purely on content, ideal for basic lists or when metadata isn't needed.

```html
<div class="item">
  <div class="content">
    <span class="title title--small">Team Meeting</span>
    <span class="description">Weekly team sync-up</span>
    <div class="flex gap--small">
      <span class="label label--small label--underline">9:00 AM - 10:00 AM</span>
      <span class="label label--small label--underline">Confirmed</span>
    </div>
  </div>
</div>
```

#### With Icon

Add an `icon` div between meta and content to display an icon alongside the item. Give monochrome icons the `image--adaptive` class so they follow the screen's semantic text-primary paint across Raw/Preview, themes, and dark mode (see [Image](https://trmnl.com/framework/docs/3.2/image) ).

```html
<div class="layout">
  <div class="item">
    <div class="meta"></div>
    <div class="icon">
      <img src="path/to/icon.svg" class="image--adaptive w--[6cqw] h--[6cqh] portrait:w--[10cqw] portrait:h--[10cqh]" />
    </div>
    <div class="content">
      <span class="value value--small">72°</span>
      <span class="label">Temperature</span>
    </div>
  </div>
</div>
```

### Filling Spare Space

An item sizes to its content. Add `item--shrink` to make it flexible instead: it grows into the container's spare space along the main axis and gives that space back when the container runs tight.

Use it for the one item that should absorb the leftover room, such as the body row above a fixed footer row. Applying it to every item in a container splits the space between them.

```html
<div class="flex flex--col h--36">
  <div class="item item--shrink">
    <div class="meta"></div>
    <div class="content">
      <span class="value value--small">72°</span>
      <span class="label">Temperature</span>
    </div>
  </div>
  <div class="item">
    <div class="meta"></div>
    <div class="content">
      <span class="label label--small">Updated 4 min ago</span>
    </div>
  </div>
</div>
```

### List component (deprecated)

The `.list` class is deprecated. Prefer a column component, flex column, grid column, or a layout wrapper with a [Gap](https://trmnl.com/framework/docs/3.2/gap) utility instead. The [Overflow](https://trmnl.com/framework/docs/3.2/overflow) engine still supports legacy `.list` for backward compatibility.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--item-index-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--item-index-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--item-index-font-smoothing` | none | none | auto | - |
| `--item-index-font-weight` | 400 | 400 | 600 | - |
| `--item-index-line-height` | 1 | 1 | 1 | - |
| `--item-meta-width` | calc(10px * var(--ui-scale)) | calc(10px * var(--ui-scale)) | - | calc(10px * var(--ui-scale)) |

### Related APIs

#### Theming the item

A theme can re-point the item's paint through its named slots (`item-meta`, `item-meta-emphasis-2`, `item-meta-emphasis-3`) without touching geometry. Slots take palette token references, so the surface still resolves through the device mode at render time. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for every slot and mixin.

```scss
@include theme-slots.text-slot("item-meta", "black");
```

Previous

[Rich Text Display formatted paragraphs with alignment and size variants](https://trmnl.com/framework/docs/3.2/rich_text)

Next

[Table Create data tables optimized for 1-bit rendering](https://trmnl.com/framework/docs/3.2/table)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/table
     ============================================================ -->

# Table

Tabular data with optional row indexes. Five size variants, and the Overflow and Clamp engines drop rows and truncate cells that do not fit the space available.

### Base Structure

Tables are built using standard HTML table elements with additional classes for styling. The base structure includes headers and data cells with consistent spacing and typography.

#### Default Table

The `table` class provides the standard table styling with comfortable spacing and clear visual hierarchy.

```html
<table class="table" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

#### Indexed Table

Add an opt-in index column by placing a meta block in the cells you want indexed: `td .meta > span.index`. Add `table--indexed` to dock the meta block to the left and add padding for that column.

```html
<table class="table table--indexed" data-table-limit="true">
  <thead>
    <tr>
      <th><span class="title title--small"></span></th>
      <th><span class="title title--small">Employee</span></th>
      <th><span class="title title--small">Role</span></th>
      <th><span class="title title--small">Pranks</span></th>
      <th><span class="title title--small">Sales</span></th>
      <th><span class="title title--small">Score</span></th>
      <th><span class="title title--small">Fun Fact</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="meta"><span class="index">1</span></span></td>
      <td><span class="label">Pam Beesly</span></td>
      <td><span class="label label--small">Receptionist</span></td>
      <td><span class="label label--small">3</span></td>
      <td><span class="label label--small">$0</span></td>
      <td><span class="label label--small">0.00</span></td>
      <td><span class="label label--small" data-clamp="1">Loves drawing</span></td>
    </tr>
  </tbody>
</table>
```

### Size Variants

Tables support five sizes: Base, Large, XLarge, Small, and XSmall. Use modifier classes to change row heights. Size and orientation prefixes both apply, so `lg:portrait:table--xlarge` raises the row height only on large portrait screens (see the [Responsive](https://trmnl.com/framework/docs/3.2/responsive) docs).

#### Base

The `table` class without size modifiers and the `table--base` class both produce the same visual result, providing the standard table styling with comfortable spacing and clear visual hierarchy. Use `table--base` when you need to explicitly set the base size in responsive contexts, such as `table--small lg:table--base`.

```html
<table class="table table--base" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

#### Large

Use `table--large` to increase row heights for more spacious tables.

```html
<table class="table table--large" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

#### XLarge

Use `table--xlarge` for larger screens. Pairs well with larger font-sizes.

```html
<table class="table table--xlarge" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

#### Small

Use `table--small` for a compact table with reduced row heights. The older `table--condensed` class remains supported as a backward-compatible alias.

```html
<table class="table table--small" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title title--small">Employee</span></th>
            <th><span class="title title--small">Role</span></th>
            <th><span class="title title--small">Pranks</span></th>
            <th><span class="title title--small">Sales</span></th>
            <th><span class="title title--small">Score</span></th>
            <th><span class="title title--small">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

#### XSmall

Use `table--xsmall` for the most compact row heights.

```html
<table class="table table--xsmall" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title title--small">Employee</span></th>
            <th><span class="title title--small">Role</span></th>
            <th><span class="title title--small">Pranks</span></th>
            <th><span class="title title--small">Sales</span></th>
            <th><span class="title title--small">Score</span></th>
            <th><span class="title title--small">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label label--small">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

### Overflow Engine

Demonstrates the Overflow behavior [Table Overflow](https://trmnl.com/framework/docs/3.2/table_overflow) and trailing "and X more" row when content exceeds the height budget.

```html
<table class="table" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

### Clamp Engine

Apply `data-clamp` [Clamp](https://trmnl.com/framework/docs/3.2/clamp) to each cell's content to ensure consistent single-line truncation with ellipsis. This works with the Table Overflow behavior [Table Overflow](https://trmnl.com/framework/docs/3.2/table_overflow) .

```html
<table class="table" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title">Employee</span></th>
            <th><span class="title">Role</span></th>
            <th><span class="title">Pranks</span></th>
            <th><span class="title">Sales</span></th>
            <th><span class="title">Score</span></th>
            <th><span class="title">Fun Fact</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="label label--small" data-clamp="1">Row 1, Cell 1</span></td>
            <td><span class="label" data-clamp="1">Row 1, Cell 2</span></td>
            <td><span class="label label--small" data-clamp="1">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--table-tbody-height` | calc(46px * var(--ui-scale)) | - | - | - |
| `--table-thead-height` | calc(36px * var(--ui-scale)) | - | - | - |
| Xsmall |
| `--table-xsmall-tbody-height` | calc(22px * var(--ui-scale)) | - | - | - |
| `--table-xsmall-thead-height` | calc(18px * var(--ui-scale)) | - | - | - |
| Small |
| `--table-small-tbody-height` | calc(31px * var(--ui-scale)) | - | - | - |
| `--table-small-thead-height` | calc(24px * var(--ui-scale)) | - | - | - |
| Large |
| `--table-large-tbody-height` | calc(56px * var(--ui-scale)) | - | - | - |
| `--table-large-thead-height` | calc(44px * var(--ui-scale)) | - | - | - |
| Xlarge |
| `--table-xlarge-tbody-height` | calc(72px * var(--ui-scale)) | - | - | - |
| `--table-xlarge-thead-height` | calc(56px * var(--ui-scale)) | - | - | - |

### Related APIs

#### Theming the table

A theme can re-point the table's paint through its named slots (`table-meta`, `table-meta-device`, `table-head-row`, `table-body-row`) without touching geometry. Slots take palette token references, so the surface still resolves through the device mode at render time. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for every slot and mixin.

```scss
@include theme-slots.bg-slot("table-meta", "yellow-55");
```

Previous

[Item Build standardized list items and content blocks](https://trmnl.com/framework/docs/3.2/item)

Next

[Chart Visualize data optimized for 1-bit rendering](https://trmnl.com/framework/docs/3.2/chart)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/chart
     ============================================================ -->

# Chart

With careful, minimal styling choices, TRMNL can display a variety of numerical or time centric content as charts and graphs.

### Usage

Any CDN-enabled JavaScript library may be used to develop charting interfaces, however the examples below leverage [Highcharts](https://highcharts.com) and [Chartkick](https://chartkick.com).

Charts paint with explicit colors, so they historically ignored bit depth, dark mode and themes while the rest of the screen adapted. The plugin runtime bundles a small `TRMNLCharts` helper that resolves adaptive paint from the live screen at build time. The methods below are the ones these examples use; [Painting Charts](https://trmnl.com/framework/docs/3.2/paint_charts) carries the full signature list and the resolvers behind it.

- `series(i, n, { el })`: the fill for series *i* of *n* from the screen's chart-series ramp. 
- `applySwatches({ el })`: paints legend markers tagged `data-chart-series="i"` from the same ramp. 
- `textStyle(role, { el })`: resolves a framework typography role for SVG text. 
- `options({ el })` and `merge()`: the recommended adaptive Highcharts defaults, merged under your overrides. 
- `watch(el, buildFn)`: rebuilds the chart when device, scale, mode, dark mode or theme changes. 
- `paint(token, { el })`: a single token, a flat color on solid panels or a dither pattern on 1- and 2-bit screens. 
- `grid({ el, dir })` and `axisLine({ el })`: the grid-line and axis/tick options `options()` already applies, for an axis you build by hand.
`{ el }` is the chart container id or element. Omit it on a single-screen plugin.

`TRMNLCharts` is the Highcharts adapter built on `TRMNLPaint`, the framework's public JS paint API. Grid lines and plotted text use the same border and typography systems as the rest of the screen. For anything beyond Highcharts, use TRMNLPaint directly: see [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

Highcharts numeric dimensions do not read CSS automatically. Resolve heights, spacing, line widths, and label offsets with `TRMNLPaint.px()` inside `TRMNLCharts.watch()`. The watcher rebuilds the chart after a scale change, and the paint API supplies the new numbers.

If you set the `height: null` within your highchart's settings, the chart will automatically expand to fill the available space.

Take care to disable animation effects, otherwise your chart may be only partially captured by TRMNL's screenshot rendering service.

These examples load Highcharts and Chartkick from trmnl.com, so they render empty without network. Highcharts is a commercial library that TRMNL licenses, and a custom stack brings its own charting library and license.

#### Line Chart

Line charts effectively display trends over time. This example shows a simple line chart with customized styling to match the TRMNL aesthetic.

```html
<!-- import Highcharts + Chartkick libraries -->
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/chartkick/5.0.1/chartkick.min.js"></script>

<!-- markup with empty, ID'd element for chart injection -->
<div class="view view--full">
  <div class="layout layout--col gap--space-between">
    <div class="grid grid--cols-3">
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <span class="value value--tnums">25,388</span>
          <span class="label">Pageviews</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <span class="value value--tnums">4,771</span>
          <span class="label">Visitors</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <span class="value value--tnums">2.23</span>
          <span class="label">Mins on Page</span>
        </div>
      </div>
    </div>

    <div id="chart-123" class="w--full"></div>
  </div>

  <div class="title_bar">
    <img class="image" src="/images/plugins/simple-analytics--render.svg" alt="Simple Analytics Logo">
    <span class="title">Simple Analytics</span>
    <span class="instance">trmnl.com</span>
  </div>
</div>

<script type="text/javascript">
  var data = [["2024-06-09", 975],["2024-06-10", 840],["2024-06-11", 1004],["2024-06-12", 1308],["2024-06-13", 753],["2024-06-14", 600],["2024-06-15", 710],
              ["2024-06-16", 489],["2024-06-17", 510],["2024-06-18", 590],["2024-06-19", 610],["2024-06-20", 671],["2024-06-21", 512],["2024-06-22", 550],
              ["2024-06-23", 421],["2024-06-24", 315],["2024-06-25", 604],["2024-06-26", 672],["2024-06-27", 601],["2024-06-28", 705],["2024-06-29", 800],
              ["2024-06-30", 912],["2024-07-01", 1503],["2024-07-02", 1273],["2024-07-03", 1250],["2024-07-04", 1198],["2024-07-05", 1005],["2024-07-06", 1300],
              ["2024-07-07", 1103],["2024-07-08", 1004],["2024-07-09", 600]];

  // Wait for Chartkick and the framework TRMNLCharts helper (bundled in the
  // plugin runtime), then read adaptive paint from the live screen.
  function whenReady(cb) {
    if (window.TRMNLCharts && window.Chartkick) return cb();
    window.addEventListener("load", function () {
      if (window.TRMNLCharts && window.Chartkick) cb();
    }, { once: true });
  }

  whenReady(function () {
    var el = "chart-123";
    // watch() rebuilds on device/scale/mode/dark/theme change; series() resolves plotted-data
    // paint from the framework chart ramp.
    TRMNLCharts.watch(el, function () {
      var px = function (value) { return TRMNLPaint.px(value, { el: el }); };
      var linePaint = TRMNLCharts.series(0, 1, { el: el });
      return new Chartkick.LineChart(el, data, {
        adapter: "highcharts", // chartjs, google, etc available
        prefix: "",
        thousands: ",",
        points: false,
        colors: [linePaint],
        curve: true,
        // options() supplies the adaptive grid + label paint; layer the
        // chart-specific overrides on top with merge().
        library: TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
          chart: { height: px(260) },
          plotOptions: { series: { lineWidth: px(4) } },
          yAxis: {
            gridLineDashStyle: "shortdot",
            tickAmount: 5
          },
          xAxis: {
            type: "daytime",
            lineWidth: 0,
            gridLineDashStyle: "dot",
            tickWidth: 1,
            tickLength: 0,
            tickPixelInterval: px(120)
          }
        })
      });
    });
  });
</script>
```

#### Multi-Series Line Chart

For comparing data across multiple time periods or categories, multi-series line charts are ideal. This example demonstrates a comparison between current and previous period data with distinct styling for each series.

```html
<!-- import required libraries -->
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts-more.js"></script>
<script src="https://trmnl.com/js/highcharts/12.3.0/pattern-fill.js"></script>

<div class="view view--full">
  <div class="layout layout--col gap--space-between">
    <!-- Optional data metrics displayed above chart -->
    <div class="grid">
      <div class="row">
        <div class="grid">
          <div class="item col--span-2">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--large value--tnums">$85,240</span>
              <span class="label">Total Sales</span>
            </div>
          </div>

          <div class="item col--span-1">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--small value--tnums">32</span>
              <span class="label">Pending Orders</span>
            </div>
          </div>

          <div class="item col--span-1">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--xsmall value--tnums">
                <div class="w--14 h--1.5 mb--2 rounded--full" data-chart-series="0" data-chart-series-count="2"></div>
                Jul 01 - Jul 15
              </span>
              <span class="label">Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border--h-5 w--full"></div>

    <!-- More metrics if needed -->
    <div class="grid">
      <div class="row">
        <div class="grid">
          <div class="item col--span-2">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--tnums">$128</span>
              <span class="label">AOV</span>
            </div>
          </div>

          <div class="item col--span-1">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--small value--tnums">665</span>
              <span class="label">Fulfilled Orders</span>
            </div>
          </div>

          <div class="item col--span-1">
            <div class="meta"></div>
            <div class="content">
              <span class="value value--xsmall value--tnums">
                <div class="w--14 h--1.5 mb--2" data-chart-series="1" data-chart-series-count="2"></div>
                Jun 15 - Jun 30
              </span>
              <span class="label">Previous</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart container with unique ID -->
    <div id="multi-series-chart" class="w--full"></div>

    <script type="text/javascript">
      // Using same date range for both series to ensure proper overlap
      var currentPeriod = [
        ["2024-07-01", 3500], ["2024-07-02", 4200], ["2024-07-03", 3800],
        ["2024-07-04", 5100], ["2024-07-05", 4800], ["2024-07-06", 3600],
        ["2024-07-07", 2900], ["2024-07-08", 4300], ["2024-07-09", 5200],
        ["2024-07-10", 6100], ["2024-07-11", 5700], ["2024-07-12", 4900],
        ["2024-07-13", 5300], ["2024-07-14", 5800], ["2024-07-15", 6500]
      ];

      // Using same date range but different values for comparison
      var previousPeriod = [
        ["2024-07-01", 2800], ["2024-07-02", 3100], ["2024-07-03", 3400],
        ["2024-07-04", 3900], ["2024-07-05", 4500], ["2024-07-06", 4100],
        ["2024-07-07", 3700], ["2024-07-08", 3300], ["2024-07-09", 4200],
        ["2024-07-10", 4800], ["2024-07-11", 5100], ["2024-07-12", 4700],
        ["2024-07-13", 5400], ["2024-07-14", 5800], ["2024-07-15", 5600]
      ];

      var formattedData = [
        { name: "Current", data: currentPeriod },
        { name: "Previous", data: previousPeriod }
      ];

      // Wait for Highcharts and the framework TRMNLCharts helper (bundled in the
      // plugin runtime) before building the chart.
      function whenReady(cb) {
        if (window.TRMNLCharts && window.Highcharts) return cb();
        window.addEventListener("load", function () {
          if (window.TRMNLCharts && window.Highcharts) cb();
        }, { once: true });
      }

      whenReady(function () {
        var el = "multi-series-chart";
        // watch() rebuilds when the screen device/scale/mode/dark/theme changes, re-reading
        // adaptive paint from the live cascade each time.
        TRMNLCharts.watch(el, function () {
          var px = function (value) { return TRMNLPaint.px(value, { el: el }); };
          // series(i, 2) draws each line from the framework chart-series ramp
          // (ink for the first, a legible step toward the canvas for the second),
          // and applySwatches() paints the matching legend markers.
          var chart = Highcharts.chart(el, TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
            chart: { type: "spline", height: px(203), spacing: px([10, 10, 5, 10]) },
            series: [{
              data: formattedData[0].data,
              name: formattedData[0].name,
              lineWidth: px(4),
              color: TRMNLCharts.series(0, 2, { el: el }),
              zIndex: 2
            }, {
              data: formattedData[1].data,
              name: formattedData[1].name,
              lineWidth: px(5),
              color: TRMNLCharts.series(1, 2, { el: el }),
              zIndex: 1
            }],
            yAxis: {
              gridLineDashStyle: "shortdot",
              tickAmount: 5
            },
            xAxis: {
              type: "datetime",
              labels: { padding: px(5), y: px(25) },
              lineWidth: 0,
              gridLineDashStyle: "dot",
              tickWidth: 1,
              tickLength: 0,
              tickPixelInterval: px(120)
            }
          }));
          TRMNLCharts.applySwatches({ el: el });
          return chart;
        });
      });
    </script>
  </div>

  <div class="title_bar">
    <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
    <span class="title">Charts</span>
    <span class="instance">Multi-Series Line Chart</span>
  </div>
</div>
```

#### Bar Chart

Bar charts are ideal for comparing discrete categories side by side. This example displays four different metrics across multiple time periods.

```html
<!-- import Highcharts library -->
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/highcharts/12.3.0/pattern-fill.js"></script>

<div class="view view--full">
  <div class="layout layout--col gap--space-between">
    <!-- Business metrics displayed above chart -->
    <div class="grid grid--cols-4">
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <div class="w--14 h--1.5 mb--2 rounded--full" data-chart-series="0" data-chart-series-count="4"></div>
          <span class="value value--tnums">$31,883</span>
          <span class="label">Revenue</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <div class="w--14 h--1.5 mb--2" data-chart-series="1" data-chart-series-count="4"></div>
          <span class="value value--tnums">$22,910</span>
          <span class="label">Expenses</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <div class="w--14 h--1.5 mb--2" data-chart-series="2" data-chart-series-count="4"></div>
          <span class="value value--tnums">$8,990</span>
          <span class="label">Marketing</span>
        </div>
      </div>
      <div class="item">
        <div class="meta"></div>
        <div class="content">
          <div class="w--14 h--1.5 mb--2" data-chart-series="3" data-chart-series-count="4"></div>
          <span class="value value--tnums">$14,930</span>
          <span class="label">Operations</span>
        </div>
      </div>
    </div>

    <div class="border--h-5 w--full"></div>

    <!-- Chart container with unique ID -->
    <div id="example-bar-chart" class="w--full"></div>

    <script type="text/javascript">
      // Simplified regional data across four quarters
      var revenueData = [
        ["Jan", 5883],
        ["Feb", 5260],
        ["Mar", 4760],
        ["Apr", 5120],
        ["May", 5540],
        ["Jun", 6320]
      ];

      var expensesData = [
        ["Jan", 3580],
        ["Feb", 3210],
        ["Mar", 3620],
        ["Apr", 3950],
        ["May", 4120],
        ["Jun", 4430]
      ];

      var marketingData = [
        ["Jan", 1120],
        ["Feb", 980],
        ["Mar", 1320],
        ["Apr", 1650],
        ["May", 1820],
        ["Jun", 2100]
      ];

      var operationsData = [
        ["Jan", 2240],
        ["Feb", 2170],
        ["Mar", 2380],
        ["Apr", 2520],
        ["May", 2730],
        ["Jun", 2890]
      ];

      var formattedBarData = [
        { name: "Revenue", data: revenueData },
        { name: "Expenses", data: expensesData },
        { name: "Marketing", data: marketingData },
        { name: "Operations", data: operationsData }
      ];

      // Wait for Highcharts and the framework TRMNLCharts helper (bundled in the
      // plugin runtime) before building the chart.
      function whenReady(cb) {
        if (window.TRMNLCharts && window.Highcharts) return cb();
        window.addEventListener("load", function () {
          if (window.TRMNLCharts && window.Highcharts) cb();
        }, { once: true });
      }

      whenReady(function () {
        var el = "example-bar-chart";
        // series(i, 4) draws each bar from the framework chart-series ramp, and
        // applySwatches() paints the matching legend markers from the same ramp,
        // so bars and swatches stay in lockstep in every bit depth, dark mode and theme.
        TRMNLCharts.watch(el, function () {
          var px = function (value) { return TRMNLPaint.px(value, { el: el }); };
          var chart = Highcharts.chart(el, TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
            chart: { type: "column", height: px(284), spacing: px([10, 10, 5, 10]) },
            plotOptions: { series: { pointPadding: 0.05, groupPadding: 0.1, borderWidth: 0 } },
            series: [{
              data: formattedBarData[0].data,
              name: formattedBarData[0].name,
              color: TRMNLCharts.series(0, 4, { el: el }),
              zIndex: 4
            }, {
              data: formattedBarData[1].data,
              name: formattedBarData[1].name,
              color: TRMNLCharts.series(1, 4, { el: el }),
              zIndex: 3
            }, {
              data: formattedBarData[2].data,
              name: formattedBarData[2].name,
              color: TRMNLCharts.series(2, 4, { el: el }),
              zIndex: 2
            }, {
              data: formattedBarData[3].data,
              name: formattedBarData[3].name,
              color: TRMNLCharts.series(3, 4, { el: el }),
              zIndex: 1
            }],
            yAxis: {
              gridLineDashStyle: "shortdot",
              tickAmount: 5
            },
            xAxis: {
              type: "category",
              labels: { padding: px(5), y: px(25) },
              lineWidth: 0,
              gridLineDashStyle: "dot",
              tickWidth: 0,
              tickLength: 0
            }
          }));
          TRMNLCharts.applySwatches({ el: el });
          return chart;
        });
      });
    </script>
  </div>
</div>
```

#### Gauge Chart

Gauge charts can effectively display single metrics or scores. This example shows multiple gauges in a row with a main summary gauge, perfect for displaying daily and weekly metrics like sleep quality scores.

```html
<!-- import Highcharts libraries -->
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts.js"></script>
<script src="https://trmnl.com/js/highcharts/12.3.0/highcharts-more.js"></script>
<script src="https://trmnl.com/js/highcharts/12.3.0/pattern-fill.js"></script>

<div class="view view--full">
  <div class="layout layout--col gap--none">
    <div class="grid grid--cols-7 mb--5">
      <div class="h--32">
        <div id="day_0" class="h--24"></div>
        <span class="description text--center">Monday</span>
      </div>
      <div class="h--32">
        <div id="day_1" class="h--24"></div>
        <span class="description text--center">Tuesday</span>
      </div>
      <div class="h--32">
        <div id="day_2" class="h--24"></div>
        <span class="description text--center">Wednesday</span>
      </div>
      <div class="h--32">
        <div id="day_3" class="h--24"></div>
        <span class="description text--center">Thursday</span>
      </div>
      <div class="h--32">
        <div id="day_4" class="h--24"></div>
        <span class="description text--center">Friday</span>
      </div>
      <div class="h--32">
        <div id="day_5" class="h--24"></div>
        <span class="description text--center">Saturday</span>
      </div>
      <div class="h--32">
        <div id="day_6" class="h--24"></div>
        <span class="description text--center">Sunday</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="grid">
      <div class="col--span-1 col--center">
        <div id="day_all"></div>
      </div>
      <div class="col--span-1 gap--large">
        <div class="flex flex--col gap--medium w--full flex--center">
          <div class="grid grid--cols-2">
            <div class="item">
            <div class="meta"></div>
            <div class="content">
                <span class="value value--tnums">18%</span>
                <span class="label">REM Sleep</span>
            </div>
          </div>
            <div class="item">
              <div class="meta"></div>
              <div class="content">
                <span class="value value--tnums">23%</span>
                <span class="label">Deep Sleep</span>
        </div>
      </div>
    </div>
          <div class="divider"></div>
          <div class="grid grid--cols-2">
            <div class="item">
              <div class="meta"></div>
              <div class="content">
                <span class="value value--small value--tnums">12m</span>
                <span class="label">Time to Sleep</span>
  </div>
          </div>
            <div class="item">
              <div class="meta"></div>
              <div class="content">
                <span class="value value--small value--tnums">7h 32min</span>
                <span class="label">Sleep Duration</span>
        </div>
          </div>
          </div>
          <div class="divider"></div>
          <div class="grid grid--cols-2">
            <div class="item">
                            <div class="meta"></div>
                            <div class="content">
                <span class="value value--small value--tnums">8</span>
                <span class="label">Toss & Turns</span>
                            </div>
                          </div>
            <div class="item">
              <div class="meta"></div>
              <div class="content">
                <span class="value value--small value--tnums">0.5%</span>
                <span class="label">Snoring</span>
                            </div>
                            </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <script type="text/javascript">
  var dailyScores = [92, 95, 81, 56, 81, 72, 85];
  var weeklyScore = 82;

  function createGauge(score, day, opts) {
    opts ||= {
      big: true,
      height: "80%",
      labels: { distance: 15 },
      rating: textRating(score)
    };

    var el = "day_" + day;
    var px = function (value) { return TRMNLPaint.px(value, { el: el }); };
    var labels = { ...(opts.labels || {}) };
    if (typeof labels.distance === "number") labels.distance = px(labels.distance);
    // options() supplies the adaptive text + axis paint; the gauge-specific config
    // is layered on top with merge(). textStyle() plots the value in the framework
    // .value role (weekly) or text--small (daily gauges).
    return Highcharts.chart(el, TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
      chart: {
        type: "gauge",
        height: opts.height
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: {
          backgroundColor: "transparent",
          borderWidth: 0
        }
      },

      plotOptions: {
        gauge: {
          animation: false,
          pivot: {
            backgroundColor: "transparent"
          },
          dial: {
            backgroundColor: "transparent",
            baseWidth: 0
          }
        }
      },

      yAxis: {
        min: 0,
        max: 100,
        minorTickInterval: 0,
        tickLength: px(40),
        tickPixelInterval: px(40),
        tickWidth: 0,
        lineWidth: 0,
        gridLineWidth: 0,
        title: {
          text: opts.rating,
          style: TRMNLCharts.textStyle("chart-label", { el: el })
        },
        labels: {
          ...labels,
          style: TRMNLCharts.textStyle("chart-label", { el: el })
        },
        plotBands: [{
          from: 1,
          to: score,
          color: TRMNLCharts.series(0, 2, { el: el }),
          innerRadius: "82%",
          borderRadius: "50%"
        }, {
          from: score + 1,
          to: 100,
          color: TRMNLCharts.series(1, 2, { el: el }),
          innerRadius: "82%",
          borderRadius: "50%"
        }]
      },

      series: [{
        name: "Score",
        data: [score],
        dataLabels: {
          borderWidth: 0,
          style: TRMNLCharts.textStyle(opts.big ? "value" : "chart-label", { el: el })
        }
      }]
    }));
  }

  function textRating(score) {
    if (score <= 50) {
      return "Low";
    } else if (score <= 65) {
      return "Pay Attention";
    } else if (score < 80) {
      return "Fair";
    } else {
      return "Good";
    }
  }

  // Wait for Highcharts + the framework TRMNLCharts helper, then build all gauges
  // and rebuild them whenever the screen device/scale/mode/dark/theme changes.
  function whenReady(cb) {
    if (window.TRMNLCharts && window.Highcharts) return cb();
    window.addEventListener("load", function () {
      if (window.TRMNLCharts && window.Highcharts) cb();
    }, { once: true });
  }

  whenReady(function () {
    // watch() tracks one instance; return a composite whose destroy() tears down
    // every gauge before the next rebuild.
    TRMNLCharts.watch("day_all", function () {
      var charts = [];

      // Small daily gauges (value in the text--small role, no rating label)
      dailyScores.forEach(function (score, idx) {
        charts.push(createGauge(score, idx, {
          big: false,
          labels: { enabled: false },
          rating: null
        }));
      });

      // Main weekly gauge: big=true plots the score in the same .value
      // role as the stat tiles beside it.
      charts.push(createGauge(weeklyScore, "all", {
        big: true,
        height: "80%",
        labels: { distance: 15 },
        rating: textRating(weeklyScore)
      }));

      return { destroy: function () {
        charts.forEach(function (c) { try { c.destroy(); } catch (e) {} });
      } };
    });
  });
</script>
```

Previous

[Table Create data tables optimized for 1-bit rendering](https://trmnl.com/framework/docs/3.2/table)

Next

[Progress Display progress bars in different styles](https://trmnl.com/framework/docs/3.2/progress)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/progress
     ============================================================ -->

# Progress

Progress bars and step dots for completion state. The fill renders as a bitmap pattern on 1-bit displays and as a solid color on 4-bit+ displays.

### Progress Bar

Progress bars display continuous progress with a filled track. They support multiple sizes and emphasis levels for different visual weights and contexts.

#### Sizes

Progress bars come in four sizes: xsmall, small, base (the default, which a bare `progress-bar` already renders), and large. Use the `fill` element with inline width styling to set the progress percentage. The `progress-bar--base` modifier spells the default out, which is what a responsive layout needs to switch back to it: `progress-bar--large md:progress-bar--base`.

```html
<!-- Xsmall bar -->
<div class="progress-bar progress-bar--xsmall">
  <div class="content">
    <span class="label label--small">Xsmall Progress</span>
    <span class="value value--xxsmall">25%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 25%"></div>
  </div>
</div>

<!-- Small bar -->
<div class="progress-bar progress-bar--small">
  <div class="content">
    <span class="label label--small">Small Progress</span>
    <span class="value value--xxsmall">25%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 25%"></div>
  </div>
</div>

<!-- Base bar (equivalent to default, useful for responsive) -->
<div class="progress-bar progress-bar--base">
  <div class="content">
    <span class="label">Base Progress</span>
    <span class="value value--xxsmall">50%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 50%"></div>
  </div>
</div>

<!-- Regular bar -->
<div class="progress-bar">
  <div class="content">
    <span class="label">Regular Progress</span>
    <span class="value value--xxsmall">50%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 50%"></div>
  </div>
</div>

<!-- Large bar -->
<div class="progress-bar progress-bar--large">
  <div class="content">
    <span class="label">Large Progress</span>
    <span class="value value--xxsmall">75%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 75%"></div>
  </div>
</div>
```

#### Emphasis

Progress bars support three emphasis levels: default, emphasis-2, and emphasis-3 for different visual weights.

```html
<!-- Default emphasis -->
<div class="progress-bar">
  <div class="content">
    <span class="label">Default Emphasis</span>
    <span class="value value--xxsmall">60%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 60%"></div>
  </div>
</div>

<!-- Emphasis 2 -->
<div class="progress-bar progress-bar--emphasis-2">
  <div class="content">
    <span class="label">Emphasis 2</span>
    <span class="value value--xxsmall">60%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 60%"></div>
  </div>
</div>

<!-- Emphasis 3 -->
<div class="progress-bar progress-bar--emphasis-3">
  <div class="content">
    <span class="label">Emphasis 3</span>
    <span class="value value--xxsmall">60%</span>
  </div>
  <div class="track">
    <div class="fill" style="width: 60%"></div>
  </div>
</div>
```

### Progress Dots

Progress dots display discrete steps or stages in a process. They come in five sizes and show different states: filled (completed), current (active), and empty (upcoming).

#### Sizes

Progress dots come in four sizes: xsmall, small, base (the default, which a bare `progress-dots` already renders), and large. Each size maintains the same dot states and functionality. The `progress-dots--base` modifier spells the default out, which is what a responsive layout needs to switch back to it: `progress-dots--large md:progress-dots--base`.

```html
<!-- Xsmall dots -->
<div class="progress-dots progress-dots--xsmall">
  <div class="track">
    <div class="dot dot--filled"></div>
    <div class="dot dot--filled"></div>
    <div class="dot dot--current"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

<!-- Small dots -->
<div class="progress-dots progress-dots--small">
  <div class="track">
    <div class="dot dot--filled"></div>
    <div class="dot dot--filled"></div>
    <div class="dot dot--current"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

<!-- Base dots (equivalent to default, useful for responsive) -->
<div class="progress-dots progress-dots--base">
  <div class="track">
    <div class="dot dot--filled"></div>
    <div class="dot dot--filled"></div>
    <div class="dot dot--current"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

<!-- Regular dots -->
<div class="progress-dots">
  <div class="track">
    <div class="dot dot--filled"></div>
    <div class="dot dot--filled"></div>
    <div class="dot dot--current"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

<!-- Large dots -->
<div class="progress-dots progress-dots--large">
  <div class="track">
    <div class="dot dot--filled"></div>
    <div class="dot dot--filled"></div>
    <div class="dot dot--current"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--progress-bar-height` | calc(24px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-large` | calc(32px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-small` | calc(12px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-xsmall` | calc(6px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size` | calc(16px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-large` | calc(20px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-small` | calc(12px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-xsmall` | calc(8px * var(--ui-scale)) | - | - | - |

### Related APIs

#### Theming the progress bar

A theme can re-point the progress bar's paint through its named slots (`progress-track`, `progress-fill`, `progress-dot`, `progress-dot-current`) without touching geometry. Slots take palette token references, so the surface still resolves through the device mode at render time. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for every slot and mixin.

```scss
@include theme-slots.bg-slot("progress-fill", "yellow-55");
```

Previous

[Chart Visualize data optimized for 1-bit rendering](https://trmnl.com/framework/docs/3.2/chart)
