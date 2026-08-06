<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/overflow
     ============================================================ -->

# Overflow

The Overflow engine automatically lays out items into up to N columns and adds an "and X more" label when content exceeds the available height. It also applies text clamping per-column width and handles grouped headers without leaving orphaned headings.

### Basic Usage

You can enable Overflow on any container (e.g., a flex or grid column) by adding `data-overflow="true"` to the container.

```html
<div class="flex flex--col gap" data-overflow="true">
  <div class="item">
    <div class="meta"></div>
    <div class="content">
      <span class="title title--small">Title goes here</span>
      <span class="description">Description goes here</span>
    </div>
  </div>
  <!-- more .item elements -->
</div>
```

| Attribute | Default | Description |
| --- | --- | --- |
| `data-overflow` | `false` | Enable Overflow on any container (non-`.columns`). Hides trailing items to fit the height budget. |
| `data-overflow-max-height` | `auto` | Override height budget. Pixel value (e.g., `320`) or `auto` to inherit the parent's content height. |
| `data-overflow-counter` | `false` | Show a trailing "and N more" label when items are hidden. |
| `data-overflow-max-cols` | `unset` | Best-fit columns up to N on a `.columns` container. Optimizes for the most visible items. Responsive: `-sm`, `-md`, `-lg`, `-portrait`, `-md-portrait`, etc. |
| `data-overflow-cols` | `unset` | Force exactly N columns on a `.columns` container. Same responsive variants as `data-overflow-max-cols`. |

### Smart Columns

Place `.item` [Item](https://trmnl.com/framework/docs/3.2/item) elements inside a single `.column` element, that's nested inside a `.columns` [Columns](https://trmnl.com/framework/docs/3.2/columns) container. Set the exact or maximum number of columns with `data-overflow-cols` or `data-overflow-max-cols`.

#### Number of columns

Set `data-overflow-cols` to force an exact column count. Use this when you want a consistent column count regardless of how many items fit. The engine will still respect height constraints, but it will keep the requested number of columns even if that shows fewer items than a best-fit layout.

```html
<div class="columns" data-overflow-cols="3">
  <div class="column">
    <!-- Items go here -->
  </div>
</div>
```

#### Maximum number of columns

Set `data-overflow-max-cols` to allow the engine to choose the best number of columns up to the maximum you specify. This best-fit mode prioritizes the most visible items. For example, allowing 3 columns may still render 2 columns if that shows more items due to less wrapping.

```html
<div class="columns" data-overflow-max-cols="3">
  <div class="column">
    <!-- Items go here -->
  </div>
</div>
```

#### Responsive

`data-overflow-max-cols` and `data-overflow-cols` support the same size and orientation modifiers as other framework components. Specificity (most specific first): size + orientation (e.g. `data-overflow-max-cols-md-portrait`), size (`-sm`, `-md`, `-lg`), orientation (`-portrait`), then base.

```html
<div class="columns" data-overflow-max-cols="2" data-overflow-max-cols-lg="4">
  <div class="column"><!-- Items --></div>
</div>
```

### Height Budget

Control how much vertical space Overflow can use by specifying `data-overflow-max-height`. When not specified, the height budget defaults to the parent's content height.

```html
<div class="flex flex--col gap" data-overflow="true" data-overflow-max-height="220">
  <!-- Items go here -->
</div>
```

### Overflow Counter

Opt-in to display a trailing "and N more" label by adding `data-overflow-counter="true"` The engine will reserve space for the label during planning so it fits without pushing items out of bounds.

```html
<div class="columns" data-overflow-max-cols="1" data-overflow-counter="true">
  <div class="column">
    <!-- Items go here -->
  </div>
</div>
```

### Clamp-aware Overflow

The Clamp engine [Clamp](https://trmnl.com/framework/docs/3.2/clamp) re-clamps text for the actual column width. Apply `data-clamp` on titles or descriptions as needed.

```html
<div class="columns" data-overflow-max-cols="2">
  <div class="column">
    <!-- Items go here -->
  </div>
</div>
```

### Group Headers

Mark headers with `group-header`. The engine avoids orphaned headers and duplicates a header at the start of the next column when a group spills over.

```html
<div class="columns" data-overflow-max-cols="3">
  <div class="column">
    <span class="label label--base group-header" data-group-header="true">Today</span>
    <!-- Items go here -->
    <span class="label label--base group-header" data-group-header="true">Tomorrow</span>
    <!-- Items go here -->
    <span class="label label--base group-header" data-group-header="true">This Week</span>
    <!-- Items go here -->
  </div>
</div>
```

- Headers are never left as the last visible element in a column. 
- When a group spills, a gray duplicate header is added to the next column for context.

### Harmonious Group Columns

When the number of group headers equals the maximum columns and there's enough space, the engine places each group in its own column for a more harmonious layout.

```html
<div class="columns" data-overflow-max-cols="3">
  <div class="column">
    <span class="label label--base group-header" data-group-header="true">Today</span>
    <!-- Items go here -->
    <span class="label label--base group-header" data-group-header="true">Tomorrow</span>
    <!-- Items go here -->
    <span class="label label--base group-header" data-group-header="true">This Week</span>
    <!-- Items go here -->
  </div>
</div>
```

### With dividers

When the Overflow engine hides items to fit the height or column budget, [Divider](https://trmnl.com/framework/docs/3.2/divider) elements between items are hidden when either adjacent item is hidden. That way you never see an orphaned divider: a divider is only shown when both the item above and the item below are visible. Place `.divider` between `.item` [Item](https://trmnl.com/framework/docs/3.2/item) elements in your overflow container; the engine handles visibility automatically.

```html
<div class="flex flex--col gap" data-overflow="true">
  <div class="item">...</div>
  <div class="divider"></div>
  <div class="item">...</div>
  <div class="divider"></div>
  <div class="item">...</div>
  <!-- more items with dividers between -->
</div>
```

### Backwards compatibility

The Overflow engine [Overflow](https://trmnl.com/framework/docs/3.2/overflow) remains compatible with legacy list attributes used in older plugins. When these attributes are present on a descendant `.column` or `.list`, the engine will promote them onto the enclosing `.columns` [Columns](https://trmnl.com/framework/docs/3.2/columns) container at runtime.

#### Supported legacy attributes

- `data-list-limit="true"`: opts the list into Overflow. If the enclosing `.columns` lacks `data-overflow-max-cols`, it will default to `1`. 
- `data-list-max-columns`: sets the maximum column count. This attribute takes a single value. For a column count that changes with screen size or orientation, use `data-overflow-max-cols-{size}` on the `.columns` container (see Responsive above). 
- `data-list-max-height`: sets the height budget for the columns. Use a pixel value (e.g., `340`) or `auto` to inherit from the parent container. 
- `data-list-hidden-count`: older toggle for the trailing label; still honored when present. 
- Divider visibility when items are hidden: see the With dividers section above.

#### Legacy example (still works)

```html
<div class="columns">
  <div class="column"
       data-list-limit="true"
       data-list-max-height="340"
       data-list-hidden-count="true"
       data-list-max-columns="2">
    <!-- Items go here -->
  </div>
</div>
```

#### Notes

- `data-overflow-cols` (fixed count) takes precedence over `data-overflow-max-cols` (best-fit up to N) when both are present. 
- When only `data-list-limit` is present, the engine defaults to 1 column. 
- By default, the trailing hidden count label is not shown. Enable with `data-overflow-counter="true"`. Legacy `data-list-hidden-count` remains supported.

Previous

[Framework Runtime How the runtime applies layout, clamping, overflow, and presentation adjustments at render time](https://trmnl.com/framework/docs/3.2/framework_runtime)

Next

[Table Overflow Handle table rows overflow](https://trmnl.com/framework/docs/3.2/table_overflow)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/table_overflow
     ============================================================ -->

# Table Overflow

When a table has more rows than can fit within the available vertical space, it constrains its height and appends a trailing "and X more" row to indicate the hidden entries.

### Basic usage

To enable table overflow handling, add `data-table-limit="true"` to your `` [Table](https://trmnl.com/framework/docs/3.2/table) . Control the maximum height with `data-table-max-height` using a pixel value (for example, `240`) or set `auto` to inherit from the parent container. When rows exceed the available height, a trailing "and X more" row is added automatically.

| Attribute | Default | Description |
| --- | --- | --- |
| `data-table-limit="true"` | - | Enable overflow handling and trailing "and X more" row |
| `data-table-max-height` | auto | Maximum table height (px). Use `auto` to inherit from parent |
| `data-table-overflow-counter` | true | Set to `false` to hide the "and X more" counter row while still clipping overflow rows |

```html
<table class="table" data-table-limit="true" data-table-max-height="auto">...</table>
```

### Table Overflow

A regular-sized table demonstrating the overflow behavior within a fixed height budget.

```html
<table class="table" data-table-limit="true">
        <thead>
          <tr>
            <th><span class="title"></span></th>
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

### Small table overflow

When a table uses `table--small` or `table--xsmall`, the "and X more" counter row automatically scales to match using a smaller label style.

```html
<table class="table table--small" data-table-limit="true">
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
            <td><span class="label label--small">Row 1, Cell 1</span></td>
            <td><span class="label">Row 1, Cell 2</span></td>
            <td><span class="label label--small">Row 1, Cell 3</span></td>
          </tr>
        </tbody>
      </table>
```

### Hidden counter

Use `data-table-overflow-counter="false"` to clip the table at its height budget without showing the "and X more" row. The legacy `table-overflow-counter` attribute still works for existing plugins, but the `data-` prefixed form is valid HTML and preferred.

```html
<table class="table" data-table-limit="true" data-table-overflow-counter="false">
        <thead>
          <tr>
            <th><span class="title"></span></th>
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

Previous

[Overflow Handle column items overflow](https://trmnl.com/framework/docs/3.2/overflow)

Next

[Clamp Manage text overflow with single and multi-line truncation](https://trmnl.com/framework/docs/3.2/clamp)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/clamp
     ============================================================ -->

# Clamp

The Clamp engine truncates text to a specified number of lines using word-based ellipsis. It preserves the original text, measures available width, and re-applies clamping whenever layouts change.

### Basic usage

Add `data-clamp="N"` to any text element to clamp it to N lines. The engine preserves the original text and re-applies clamping when layouts change.

```html
<span class="description" data-clamp="2">Example description text that will be clamped to two lines</span>
```

### Responsive

Use the same size and orientation modifiers as other framework components. Specificity (most specific first): size + orientation (e.g. `data-clamp-md-portrait`), size only (`data-clamp-sm`, `-md`, `-lg`), orientation only (`data-clamp-portrait`), then base `data-clamp`.

```html
<span class="description" data-clamp="2" data-clamp-md="4" data-clamp-portrait="1">Clamp to 2 lines by default, 4 on medium+ screens, 1 in portrait</span>
```

### Backward Compatibility

Legacy class tokens are supported and mapped to the Clamp engine automatically: `clamp--none` disables clamping, and `clamp--1` through `clamp--50` request N lines.

```html
<span class="description clamp--2">Example description with legacy class clamped to two lines of text</span>
```

Previous

[Table Overflow Handle table rows overflow](https://trmnl.com/framework/docs/3.2/table_overflow)

Next

[Format Value Format numbers and values with consistent styling](https://trmnl.com/framework/docs/3.2/format_value)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/format_value
     ============================================================ -->

# Format Value

Format numbers so they fit their container and stay readable. Abbreviations (K, M, B), precision that adjusts to the space, and currency values with the symbol in the right place.

### Basic Usage

To enable automatic value formatting, add the `data-value-format="true"` attribute to your element.

`data-value-type="number"` is an accepted alias for the same opt-in, and only the exact value `number` opts in. The runtime selects both attributes in one pass, so an element carrying either one is formatted the same way and honors the same companion attributes. The examples on this page use `data-value-format`.

```html
<span class="value value--xlarge value--tnums" data-value-format="true">2345678</span>

<span class="value value--large value--tnums" data-value-format="true">456789</span>

<span class="value value--small value--tnums" data-value-format="true">34562</span>
```

To add a delimiter to large numbers, for example 1234 => 1,234, see [custom filters](https://intercom.help/trmnl/en/articles/10347358-custom-plugin-filters).

### Currency Values

Values with currency symbols are automatically formatted while maintaining the symbol placement.

```html
<span class="value value--xlarge value--tnums" data-value-format="true" data-fit-value="true">$2345678</span>

<span class="value value--large value--tnums" data-value-format="true" data-fit-value="true">$456789</span>

<span class="value value--small value--tnums" data-value-format="true" data-fit-value="true">$34562</span>
```

To add a currency symbol, for example 1234 => $1,234, see [custom filters](https://intercom.help/trmnl/en/articles/10347358-custom-plugin-filters).

Supported currency symbols include:

`$` US Dollar

`€` Euro

`£` British Pound

`¥` Japanese Yen / Chinese Yuan

`₴` Ukrainian Hryvnia

`₹` Indian Rupee

`₪` Israeli Shekel

`₩` Korean Won

`₫` Vietnamese Dong

`₱` Philippine Peso

`₽` Russian Ruble

`₿` Bitcoin

### Regional Number Formats

Numbers can be formatted according to different regional standards using the `data-value-locale` attribute.

```html
<span class="value value--xlarge value--tnums" data-value-format="true" data-value-locale="en-US">$123456.78</span>

<span class="value value--large value--tnums" data-value-format="true" data-value-locale="de-DE">€123456.78</span>

<span class="value value--small value--tnums" data-value-format="true" data-value-locale="fr-FR">€123456.78</span>
```

Common locale options include:

`en-US` United States (123,456.78)

`de-DE` German (123.456,78)

`fr-FR` French (123 456,78)

`en-GB` British English (123,456.78)

`ja-JP` Japanese (123,456.78)

If no locale is specified, numbers will be formatted using US format (en-US) by default.

Previous

[Clamp Manage text overflow with single and multi-line truncation](https://trmnl.com/framework/docs/3.2/clamp)

Next

[Fit Value Automatically resize numbers and values to fit within their containers](https://trmnl.com/framework/docs/3.2/fit_value)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/fit_value
     ============================================================ -->

# Fit Value

Fit text to its container by adjusting font size, weight, and line height. Use it where the space available changes between devices, orientations, or view sizes.

### Basic Usage

To enable automatic text resizing, add the `data-value-fit="true"` attribute to your element. The system adjusts the element's font size and weight to fit the content on a single line within the container width, for both numeric and text values. For multi-line text fitting, see the `data-value-fit-max-height` option below.

```html
<span class="value value--xxxlarge" data-value-fit="true">$1,000</span>

<span class="value value--xxxlarge" data-value-fit="true">$1,000,000</span>

<span class="value value--xxxlarge" data-value-fit="true">$1,000,000,000</span>
```

### Single-line Text Fitting

Text values are automatically fitted to a single line when using `data-value-fit="true"` without specifying a max height. The system derives the single-line height from the element's computed line-height, then shrinks the font size and weight until the text fits on one line within the container.

```html
<span class="value value--xxxlarge" data-value-fit="true">Assistant to the Regional Manager</span>

<span class="value value--xxxlarge" data-value-fit="true">Threat Level Midnight</span>

<span class="value value--xxxlarge" data-value-fit="true">World's Best Boss</span>
```

### Multi-line Text Fitting

To allow text to wrap across multiple lines while still fitting within a constrained area, specify a maximum height using the `data-value-fit-max-height` attribute (in pixels). This overrides the default single-line behavior, allowing the text to wrap while ensuring it stays within both width and height constraints through automatic font size and weight adjustments.

```html
<span class="value value--xxxlarge" data-value-fit="true" data-value-fit-max-height="340">
  Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.
</span>

<span class="value value--xxxlarge" data-value-fit="true" data-value-fit-max-height="340">
  Identity theft is not a joke, Jim! Millions of families suffer every year.
</span>

<span class="value value--xxxlarge" data-value-fit="true" data-value-fit-max-height="340">
  That's what she said.
</span>
```

Previous

[Format Value Format numbers and values with consistent styling](https://trmnl.com/framework/docs/3.2/format_value)

Next

[Content Limiter Change font size when content overflows to fit within the container](https://trmnl.com/framework/docs/3.2/content_limiter)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/content_limiter
     ============================================================ -->

# Content Limiter

Content areas are capped in height by the view type they sit in. Past that threshold the limiter steps typography down and the Clamp engine truncates the first block that still overflows.

### Basic usage

To enable automatic content limiting, add the `data-content-limiter="true"` attribute to your content element.

```html
<div class="content" data-content-limiter="true">
  <p>Contrary to what one might think, the Lorem ipsum text, despite being meaningless, has noble...</p>
</div>
```

When content exceeds the height threshold, the limiter adds the `content--small` class and automatically truncates the first overflowing block using the Clamp Engine [Clamp](https://trmnl.com/framework/docs/3.2/clamp) so it fits the remaining space. Subsequent blocks are hidden.

### Custom Height Threshold

You can specify a custom maximum height using the `data-content-max-height` attribute.

```html
<div class="content" data-content-limiter="true" data-content-max-height="140">
  <p>Contrary to what one might think, the Lorem ipsum text, despite being meaningless, has noble...</p>
</div>

<div class="content" data-content-limiter="true" data-content-max-height="140">
  <p>Contrary to what one might think, the Lorem ipsum text, despite being meaningless, has noble...</p>
</div>
```

### Mashup Example

This demonstrates content limiting within a multi-view mashup.

Previous

[Fit Value Automatically resize numbers and values to fit within their containers](https://trmnl.com/framework/docs/3.2/fit_value)

Next

[Pixel Perfect Ensure text renders with crisp edges by aligning to the pixel grid](https://trmnl.com/framework/docs/3.2/pixel_perfect)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/pixel_perfect
     ============================================================ -->

# Pixel Perfect

Pixel Perfect aligns text to the pixel grid so it renders with crisp edges. It uses pixel fonts designed for specific sizes, so text stays sharp instead of turning blurry or unevenly bold when a layout is converted to 1-bit for ePaper displays.

### Usage

To enable pixel perfect text rendering, add the `data-pixel-perfect="true"` attribute to your text element.

```html
<span class="title" data-pixel-perfect="true">Pixel Perfect Title</span>
<div class="content" data-pixel-perfect="true">
  <p>This text will be aligned to the pixel grid for crisp rendering.</p>
</div>
```

### Why?

Text rendering on digital displays involves complex anti-aliasing techniques to make text appear smooth at various sizes. This process creates partially opaque pixels (gray pixels) at the edges of characters to create the illusion of smoothness.

When text isn't perfectly aligned to the pixel grid, these anti-aliased pixels can appear inconsistently, particularly with centered text. This is especially problematic for ePaper displays that use a 1-bit color space (just black and white, no grays), where anti-aliased gray pixels are forced to become either fully black or fully white. The result is text that appears randomly bold or distorted in final renders, creating an unprofessional and difficult-to-read presentation.

Our system uses pixel fonts that are specifically designed to work at particular pixel sizes and their multipliers. These fonts are meticulously crafted to perfectly align with the pixel grid, ensuring each character renders with maximum sharpness and clarity. By combining these specialized fonts with our pixel-perfect alignment technique, we achieve optimal text rendering for ePaper displays.

### How It Works

The Pixel Perfect system works by applying the following techniques to elements with `data-pixel-perfect="true"`:

- The system measures the parent element's width to determine whether it's odd or even 
- The text content is broken into individual lines 
- Each line is wrapped in a span element 
- Each span's width is adjusted to match the parent's pattern: even widths for even-width parents, odd widths for odd-width parents

By analyzing the parent container's dimensions and adjusting each line accordingly, the system ensures text falls precisely on the pixel grid. This precise adjustment ensures text is perfectly aligned to the pixel grid, eliminating sub-pixel rendering issues on 1-bit displays.

### Cross-Platform Consistency

Different browsers render text differently across operating systems. For example, Chrome on macOS handles font rendering differently than Chrome on Linux or Windows. This means developers see different results depending on their development environment.

The Pixel Perfect system unifies the developer experience across platforms by enforcing consistent rendering rules regardless of the browser or operating system. This ensures that text renders with the same crispness and weight consistency on the final ePaper display, regardless of where it was developed or previewed.

Previous

[Content Limiter Change font size when content overflows to fit within the container](https://trmnl.com/framework/docs/3.2/content_limiter)

Next

[Paint API TRMNLPaint: read the live CSS cascade from JavaScript to resolve framework colors and tile patterns](https://trmnl.com/framework/docs/3.2/paint_api)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/framework_runtime
     ============================================================ -->

# Framework Runtime

Different devices have different, fixed amounts of screen space. The Framework Runtime fills that space when a plugin layout renders, doing the heavy, repetitive measuring and fitting for you. Expand the "Framework Runtime" panel under any example on this site to see the stats for that render.

### What it does

At a high level, it measures the space you have and then plans columns, clamps text, formats and fits values, and adjusts gaps and index widths, so everything fits neatly without manual tweaking.

- Normalizes screen context (size, orientation, bit depth, scale) 
- Maps legacy responsive classes to data attributes for consistency 
- Formats values and fits numbers into their containers 
- Adjusts gaps so columns/grids land on integer pixel widths 
- Plans multi-column layouts, re-clamps text per column, and can add a trailing "and N more" label when enabled 
- Applies standalone clamping where needed outside columns 
- Limits overly tall content and schedules pixel-perfect text processing

### Runtime steps and stats

When the runtime executes, it performs these steps in the order below. Column Gaps runs twice: once before Overflow for the columns Overflow does not own, and once at the end.

#### Images

*:last-child]:!mb-0"> Waits for every image to settle, then recolors the adaptive ones for the current mode.

- Holds the pass until images have loaded, so later steps measure real heights 
- Repaints `image--adaptive` sources for the screen's bit depth, dark mode, and theme

Go to [Image](https://trmnl.com/framework/docs/3.2/image)

#### Index Widths

*:last-child]:!mb-0"> Ensures item index badges render at even widths to avoid artifacts.

- Runs as one pass per terminalize, for indices outside `.columns` 
- Runs again inside each `.columns` container after its layout commits 
- Skipped on 2-bit and higher, where any width it pinned is cleared

Go to [Item](https://trmnl.com/framework/docs/3.2/item)

#### Value Formatting

*:last-child]:!mb-0"> Formats numbers to fit available space and abbreviates as needed (k, M, B).

- Accepts `data-value-format="true"` or `data-value-type="number"` 
- Respects `data-value-locale` 
- Works with `data-fit-value` for auto-sizing

Go to [Format Value](https://trmnl.com/framework/docs/3.2/format_value)

#### Fit Value

*:last-child]:!mb-0"> Adjusts font size, line-height, and weight to fit numbers within their containers.

- Minimum font size safeguard (default 8px) 
- Accepts `data-fit-value` or `data-value-fit`

Go to [Fit Value](https://trmnl.com/framework/docs/3.2/fit_value)

#### Grid Gaps

*:last-child]:!mb-0"> Tweaks CSS gaps so grid column widths resolve to integer pixels.

- Disable with `data-adjust-grid-gaps="false"` 
- Falls back to measuring child positions when `gap` is not explicitly set

Go to [Grid](https://trmnl.com/framework/docs/3.2/grid)

#### Column Gaps

*:last-child]:!mb-0"> Normalizes gaps between `.column` elements so column widths are integers.

- Disable with `data-adjust-column-gaps="false"` 
- Runs as a pre-pass for non-overflow columns and a final pass after Overflow

Go to [Columns](https://trmnl.com/framework/docs/3.2/columns)

#### Overflow

*:last-child]:!mb-0"> Plans 1..N columns with off-screen staging and commits the best fit, then re-clamps per real column width.

- Duplicates group headers across columns when needed 
- Optional trailing "and N more" label for hidden items (enable with `data-overflow-counter="true"`) 
- Enforces final fit by hiding trailing items if necessary

Go to [Overflow](https://trmnl.com/framework/docs/3.2/overflow)

#### Clamp

*:last-child]:!mb-0"> Clamps text to N lines.

- Word-based ellipsis 
- Preserves original text 
- Re-clamps when widths change 
- Supports responsive data attributes (size/orientation) 
- Maps legacy class utilities to `data-clamp` 
- Applies outside and inside columns (per-column re-clamp handled by Overflow)

Go to [Clamp](https://trmnl.com/framework/docs/3.2/clamp)

#### Table Overflow

*:last-child]:!mb-0"> Trims table rows that do not fit the space the table has.

- Opt in with `data-table-limit="true"` on the table 
- Runs after Clamp, so it measures rows at their final line count

Go to [Table Overflow](https://trmnl.com/framework/docs/3.2/table_overflow)

#### Content Limiter

*:last-child]:!mb-0"> Caps content at an explicit height budget, or at the space it measures as available, and flags small content.

- Set the budget with `data-content-max-height`, otherwise the limiter measures the view's layout 
- Adds `content--small`, then sets `data-clamp` and `data-clamp-max-height-px` on the block it has to trim

Go to [Content Limiter](https://trmnl.com/framework/docs/3.2/content_limiter)

#### Pixel-Perfect Fonts

*:last-child]:!mb-0"> Wraps lines in spans and enforces even/odd widths for crisp rendering; scheduled in idle time.

- Skipped on higher bit-depth modes 
- Respects centered alignment

Go to [Pixel Perfect](https://trmnl.com/framework/docs/3.2/pixel_perfect)

### Driving the runtime from JavaScript

The runtime starts itself. It runs one pass after the page load event, then runs again whenever a `screen--*` class changes on a `.screen` element. Content injected after that needs an explicit re-run.

#### Functions

- `terminalize()`: runs the full pipeline and returns a Promise that resolves once the screen has settled, including the deferred pixel-perfect pass. Call it after you inject or replace content. 
- `executeTerminalize()`: queues a run two animation frames out instead of starting one immediately. Repeated calls before it fires collapse into a single pass. 
- `markFrameworkReady()`: sets `window.frameworkReady` and dispatches `trmnl:framework:ready` on `window`. A host page calls it once its own setup is done.

#### Ready signals

- `window.TRMNL_PLUGINS_READY`: `false` while a pass runs and `true` once it settles. A screenshot pipeline waits for `true` before it captures. 
- `window.frameworkReady`: `false` until `markFrameworkReady()` runs. 
- `window.__TRMNL_BUILD__`: the build stamp of the loaded `plugins.js`. A released bundle reports its own version (`plugins.js v3.2.0`) and a working checkout reports `plugins.js source`. Read it when an edit does not show up and you suspect a pinned or cached file.

#### The stats event

Every pass dispatches `trmnl:terminalize:stats` on `window`. Its `detail` carries three fields.

- `steps`: every step the pass ran, each with a `name`, a `durationMs`, and its own counters. 
- `engines` and `engineCount`: the subset of steps that changed something. 
- `errors`: present only when an engine threw, as `{ engine, message }` entries. The pass runs the remaining engines and readiness still flips to `true`.

```javascript
// Re-run after injecting content into a screen.
terminalize().then(function () {
  console.log("screen settled");
});

// Inspect what each pass did.
window.addEventListener("trmnl:terminalize:stats", function (event) {
  console.log(event.detail.engineCount, "engines changed something");
});
```

#### Debug logging

Set `window.__TRMNL_DEBUG__ = true` before a pass to log what each engine decided. Renders are quiet by default. Engine failures always reach the console, debug flag or not.

`plugins.js` also puts `TRMNLPaint` and `TRMNLCharts` on `window`. Those are documented on [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

### Why this exists

Plugins need to fit source data into a static layout space that is device-defined and varies by model, orientation, and density. While this resembles responsive web design, the runtime provides purpose-built tools (overflow planning, per-column clamping, integer pixel alignment, and value fitting) tailored specifically for TRMNL devices.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--content-scale` | 1 | - | - | - |
| `--device-ui-scale` | 1 | - | - | - |
| `--full-h` | calc(var(--screen-h) - var(--gap) * 2) | - | - | - |
| `--full-w` | calc(var(--screen-w) - var(--gap) * 2) | - | - | - |
| `--gap-scale` | 1 | - | - | - |
| `--half_horizontal-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--half_horizontal-w` | calc((var(--screen-w) - var(--gap) * 2)) | - | - | - |
| `--half_vertical-h` | calc((var(--screen-h) - var(--gap) * 2)) | - | - | - |
| `--half_vertical-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--modifier-scale` | 1 | - | - | - |
| `--modifier-text-scale` | 1 | - | - | - |
| `--quadrant-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--quadrant-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--screen-h` | 480px | - | - | - |
| `--screen-h-original` | 480px | - | - | - |
| `--screen-w` | 800px | - | - | - |
| `--screen-w-original` | 800px | - | - | - |
| `--text-ui-scale` | 1 | - | - | - |
| `--ui-scale` | 1 | - | - | - |

### Related APIs

#### The paint half of the runtime

The same `plugins.js` that runs these engines also ships TRMNLPaint, the framework's public paint API. It reads the live cascade and returns canonical Fill, BorderFill, and TypeSpec objects, so a plugin can resolve framework colors from JavaScript while the engines handle layout. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

Previous

[Text Stroke Legible text when displayed on shaded backgrounds](https://trmnl.com/framework/docs/3.2/text_stroke)

Next

[Overflow Handle column items overflow](https://trmnl.com/framework/docs/3.2/overflow)
