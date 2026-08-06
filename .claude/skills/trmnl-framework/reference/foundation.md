<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/structure
     ============================================================ -->

# Structure

Screen, View, Layout, Title Bar, Columns, and Mashup form the fixed hierarchy that defines the display environment. Plugins render their content inside Views. Follow the exact div setup; deviating causes layout and rendering issues.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You don't specify Screen, Mashup, or View. The platform provides them automatically, and you specify the Layout and optionally a Title Bar.

You provide the full hierarchy yourself: Screen, View, Layout, and optionally a Mashup container and a Title Bar.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- plugin's view markup -->
<div class="layout">...</div>
<div class="title_bar">...</div>
<!-- /plugin's view markup -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="screen">
  <div class="view view--full">
    <div class="layout">...</div>
    <div class="title_bar">...</div>
  </div>
</div>
```

### The Exact Structure

The framework uses a fixed div hierarchy. Each level has a specific role. The canonical structure is:

**Screen** → (**Mashup** →) **View** → **Layout** (+ optional **Title Bar**)

[Screen](https://trmnl.com/framework/docs/3.2/screen) --portrait --no-bleed --dark-mode --og --v2 --backdrop

[Mashup](https://trmnl.com/framework/docs/3.2/mashup) optional --1x1 --1Lx1R --1Tx1B --2x2 --1Lx2R --2Lx1R --2Tx1B --1Tx2B --3x3

[View](https://trmnl.com/framework/docs/3.2/view) --full --half_vertical --half_horizontal --quadrant

[Layout](https://trmnl.com/framework/docs/3.2/layout) --row --col

--left --center-x --right --top --center-y --bottom --center

--stretch --stretch-x --stretch-y

[Title Bar](https://trmnl.com/framework/docs/3.2/title_bar) optional

### Component Roles

Each foundation component has a specific role. Use them as intended.

#### Screen

*:last-child]:!mb-0"> Root container. Defines viewport dimensions, padding, and CSS variables that cascade throughout.

Go to [Screen](https://trmnl.com/framework/docs/3.2/screen)

#### View

*:last-child]:!mb-0"> Container for a plugin slot. Size modifiers (`view--full`, `view--half_horizontal`, `view--half_vertical`, `view--quadrant`) set how much space the plugin gets. Non-full views must be nested inside a Mashup.

Go to [View](https://trmnl.com/framework/docs/3.2/view)

#### Layout

*:last-child]:!mb-0"> The content container, exactly one per View. Its direct children are typically Columns, Grid, or Flex, arranged with `layout--row`, `layout--col`, and alignment modifiers. See the Layout page's "What Goes Inside Layout" section for when to use each.

Go to [Layout](https://trmnl.com/framework/docs/3.2/layout)

#### Title Bar

*:last-child]:!mb-0"> Optional. Sibling to Layout within a View. Displays icon, title, and instance label.

Go to [Title Bar](https://trmnl.com/framework/docs/3.2/title_bar)

#### Columns

*:last-child]:!mb-0"> Use *inside* Layout for column-based content organization.

Go to [Columns](https://trmnl.com/framework/docs/3.2/columns)

#### Mashup

*:last-child]:!mb-0"> Wraps multiple Views and arranges them within the Screen (1Lx1R, 1Tx1B, 2x2, etc.).

Go to [Mashup](https://trmnl.com/framework/docs/3.2/mashup)

#### Single View

For a single plugin occupying the full screen:

```html
<div class="screen">
  <div class="view view--full">
    <div class="layout">
      <!-- Your content here -->
    </div>
    <div class="title_bar">...</div>
  </div>
</div>
```

#### Mashup (Multiple Views)

For multiple plugins on one screen, wrap views in a [Mashup](https://trmnl.com/framework/docs/3.2/mashup) . Each view has exactly one [Layout](https://trmnl.com/framework/docs/3.2/layout) .

```html
<div class="screen">
  <div class="mashup mashup--1Lx1R">
    <div class="view view--half_vertical">
      <div class="layout">...</div>
    </div>
    <div class="view view--half_vertical">
      <div class="layout">...</div>
    </div>
  </div>
</div>
```

Previous

[Tokens Complete CSS variable reference with root defaults, density, and bit-depth overrides](https://trmnl.com/framework/docs/3.2/tokens)

Next

[Screen Device screen dimensions, orientation, and display properties](https://trmnl.com/framework/docs/3.2/screen)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/screen
     ============================================================ -->

# Screen

The Screen component is the outermost container that defines the device dimensions and provides global settings for your content.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You don't specify the `screen`. The platform provides the correct `screen` container based on the target device.

You provide the `screen` yourself. Include it with the appropriate device class (`screen--og`, `screen--v2`) and optional modifiers like `screen--portrait`, `screen--no-bleed`, or `screen--dark-mode`.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- screen (platform-provided) -->
<!-- view view--full (platform-provided) -->
<div class="layout">...</div>
<div class="title_bar">...</div>
<!-- /view -->
<!-- /screen -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="screen">
  <div class="view view--full">
    <div class="layout">...</div>
    <div class="title_bar">...</div>
  </div>
</div>
```

### Base Structure

The Screen component serves as the root container for all content. It establishes the viewport dimensions, padding, and provides CSS variables that cascade throughout the framework.

#### Default Screen

The base `screen` class creates a container with default dimensions (800x480px landscape). It includes padding controlled by the `--gap` variable.

```html
<div class="screen">
  <div class="view view--full">
    <div class="layout">
      <!-- Your content here -->
    </div>
  </div>
</div>
```

### CSS Variables

The Screen sets CSS variables that cascade through the framework. They recalculate automatically when device variants or orientation modifiers are applied.

#### Available Variables

These variables are set on the `screen` element and available to all nested components.

| Variable | Description | Default Value |
| --- | --- | --- |
| `--screen-w` | Screen width | 800px |
| `--screen-h` | Screen height | 480px |
| `--full-w` | Full width minus padding | `calc(--screen-w - --gap * 2)` |
| `--full-h` | Full height minus padding | `calc(--screen-h - --gap * 2)` |
| `--device-ui-scale` | Device-native UI density factor | 1 |
| `--modifier-scale` | Selected scale modifier | 1 |
| `--ui-scale` | Composed device and modifier scale for framework UI | 1 |
| `--content-scale` | Scale modifier for plugin-authored content | 1 |
| `--modifier-text-scale` | Selected Text Scale modifier | 1 |
| `--text-ui-scale` | Composed device, Scale, and Text Scale factor for framework typography | 1 |
| `--gap-scale` | Gap scaling factor | 1 |
| `--color-depth` | Display color depth (bits) | 1 |

### Orientation

Screens can be displayed in landscape (default) or portrait orientation.

#### Orientation Toggle

The `screen--portrait` modifier swaps the width and height dimensions. All layout calculations automatically adjust to the new dimensions.

```html
<!-- Landscape (default) -->
<div class="screen">
  <!-- 800x480 dimensions -->
</div>

<!-- Portrait orientation -->
<div class="screen screen--portrait">
  <!-- 480x800 dimensions (swapped) -->
</div>
```

### Device Variants

The Screen component supports device-specific configurations that adjust dimensions, scaling, and color depth. These variants ensure content displays correctly across different TRMNL devices.

#### Available Devices

Each device variant sets specific dimensions and scaling factors. Combine with orientation and bit-depth modifiers for complete control.

```html
<!-- Original TRMNL -->
<div class="screen screen--og screen--1bit">
  <!-- 800x480, 1-bit depth -->
</div>

<!-- TRMNL V2 -->
<div class="screen screen--v2 screen--4bit">
  <!-- 1040x780, 4-bit depth -->
</div>

<!-- Amazon Kindle 2024 -->
<div class="screen screen--amazon_kindle_2024 screen--4bit">
  <!-- 800x480, 4-bit depth -->
</div>

<!-- Combined modifiers -->
<div class="screen screen--v2 screen--portrait screen--4bit">
  <!-- All modifiers work together -->
</div>
```

### Modifiers

Screen modifiers provide additional control over display properties and behavior.

#### No Bleed Modifier

The screen container that wraps your views has a no-bleed option that removes padding. This can be controlled through Private and Public Plugin settings, or applied directly in your code when developing locally. The `screen--no-bleed` modifier removes the default padding around the screen container, allowing content to extend fully to the edges.

```html
<div class="screen screen--no-bleed">
  <div class="view view--full">
    <div class="layout">
      <!-- Your content here -->
    </div>
  </div>
</div>
```

#### Dark Mode

The `screen--dark-mode` modifier remaps framework color tokens and utility output for dark rendering (background, text, border, and stroke utilities included). Images are not remapped. Opt icons in with the `image--adaptive` utility (see [Image](https://trmnl.com/framework/docs/3.2/image) ) so they follow the screen's semantic text-primary paint.

Themed screens are exempt: a theme fully owns its colors, so `screen--dark-mode` has no effect while a `screen--theme-*` class is present. A theme can opt into its own dark treatment by styling `.screen--theme-.screen--dark-mode` in its own stylesheet. See [Themes](https://trmnl.com/framework/docs/3.2/themes) .

Use the [Inverse](https://trmnl.com/framework/docs/3.2/inverse) utility inside a dark-mode screen to flip one subtree back to light.

```html
<div class="screen screen--dark-mode">
  <!-- Framework tokens/utilities render in dark mode -->
</div>
```

#### Backdrop Mashups

By default, mashups display with a white background and bordered views. The `screen--backdrop` modifier changes this to a patterned background (1-bit) or solid gray background (2-bit/4-bit) with plain white views. See [Mashup](https://trmnl.com/framework/docs/3.2/mashup) for more details.

```html
<!-- Backdrop mashup (patterned / gray background) -->
<div class="screen screen--backdrop">
  <div class="mashup mashup--1Lx1R">
    <div class="view view--half_vertical">
      <div class="layout">...</div>
    </div>
    <div class="view view--half_vertical">
      <div class="layout">...</div>
    </div>
  </div>
</div>
```

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

#### Custom device profiles

Each entry in the device map compiles into a `screen--{name}` class with its dimensions, density, and color depth baked in. Configure `$custom-devices` to produce the same classes for your own panels without touching framework source. See [Custom Devices](https://trmnl.com/framework/docs/3.2/sass_devices) for the profile schema.

Previous

[Structure The framework's exact div hierarchy and how Screen, View, Layout, Title Bar, Columns, and Mashup work together](https://trmnl.com/framework/docs/3.2/structure)

Next

[Devices Device profiles: the geometry, size, and density a screen--{keyname} class carries, and how to rate a panel of your own](https://trmnl.com/framework/docs/3.2/devices)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/view
     ============================================================ -->

# View

A View holds content (e.g. a plugin instance). Single views use `view--full` inside the Screen; multiple views go inside a Mashup, where the view modifier sets each view's share of space and the Mashup modifier sets the arrangement. View and Layout receive calculated dimensions from the device and orientation.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You don't specify the `view`. The markup you write for any plugin layout is automatically wrapped in the appropriate `view` container by the platform.

You provide the `view` yourself. Include the appropriate wrapper in your markup: `view view--full`, `view view--half_vertical`, `view view--half_horizontal`, or `view view--quadrant`.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- view view--full (platform-provided) -->
<div class="layout">...</div>
<div class="title_bar">...</div>
<!-- /view -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="view view--full">
  <div class="layout">...</div>
  <div class="title_bar">...</div>
</div>
```

### Base Structure

The Layout element [Layout](https://trmnl.com/framework/docs/3.2/layout) is the core component of every View [View](https://trmnl.com/framework/docs/3.2/view) , providing a consistent container for your content. Views can optionally include a Title Bar [Title Bar](https://trmnl.com/framework/docs/3.2/title_bar) for additional context.

There are four view types: `view--full`, `view--half_horizontal`, `view--half_vertical`, and `view--quadrant`. The default full view (`view view--full`) lives directly inside the `screen` div. Other view types must be nested inside a [Mashup](https://trmnl.com/framework/docs/3.2/mashup) component.

#### With Layout and Title Bar

When combined with a title bar, it provides context and navigation options.

```html
<div class="view view--full">
  <div class="layout">
    <!-- Your content here -->
  </div>

  <div class="title_bar">
    <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg" alt="TRMNL Logo">
    <span class="title">Title</span>
    <span class="instance">Instance</span>
  </div>
</div>
```

#### With only Layout

For simpler interfaces, you can create a view without a title bar using just the base view classes.

```html
<div class="view view--full">
  <div class="layout">
    <!-- Your content here -->
  </div>
</div>
```

### Views in Mashups

When multiple plugins share a single screen, each one gets its own view, and those views must be wrapped in a [Mashup](https://trmnl.com/framework/docs/3.2/mashup) container.

The view modifier (`view--half_vertical`, `view--quadrant`, etc.) determines how much space each plugin gets. The mashup modifier (`mashup--1Lx1R`, `mashup--2x2`, etc.) determines how those views are arranged on screen.

Previous

[Rendering Modes The grayscale tiers and color modes a screen can carry, what each one paints, and the depth it publishes to the runtime](https://trmnl.com/framework/docs/3.2/rendering_modes)

Next

[Layout Primary container for organizing plugin content](https://trmnl.com/framework/docs/3.2/layout)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/layout
     ============================================================ -->

# Layout

The Layout is the content container inside a View, exactly one `layout` per `view`. It arranges content horizontally (`layout--row`) or vertically (`layout--col`), with alignment and stretch modifiers.

Do

Don't

Use one `layout` per `view`. Organize content inside it with `flex`, `columns`, or `grid`.

Don't nest `layout` inside `layout`. There should be exactly one `layout` per `view`.

div]:flex-1 [&>div]:min-h-0">

```html
<div class="layout">
  <div class="flex flex--row">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</div>
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="layout">
  <div class="layout layout--row">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</div>
```

### What Goes Inside Layout

Layout is the main content wrapper inside a View. It defines the available space: its height is calculated from the device type, the orientation, and whether a title bar is present. Its direct children are usually Columns, Grid, or Flex.

#### Three ways to lay out content

#### Grid

*:last-child]:!mb-0"> Use when you need a strict grid: define column count and spans, so items align to a consistent rhythm. Good for Swiss-style layouts where everything lines up to a fixed grid.

Go to [Grid](https://trmnl.com/framework/docs/3.2/grid)

#### Flex

*:last-child]:!mb-0"> Use when you want flexible arrangements where items size by content (width/height). You can use Flex alone for simpler layouts, or nest it inside Grid for per-cell flexibility.

Go to [Flex](https://trmnl.com/framework/docs/3.2/flex)

#### Columns

*:last-child]:!mb-0"> Use when you have lots of same-type data and want to display as few or as many items as there are, with the Columns system handling the layout. See the Columns page for details.

Go to [Columns](https://trmnl.com/framework/docs/3.2/columns)

You can use multiple of each: multiple Columns components, multiple Grids, multiple Flex containers. You can mix them. The Layout modifiers (`layout--row`, `layout--col`, alignment, stretch) control how these direct children are arranged within the Layout space.

1

2

3

4

5

6

7

8

9

10

11

12

/* Single pixel gap for both horizontal and vertical spacing. Change this to tune spacing. */ /* Half-gap inset on all sides so grid guides sit in the center of gaps between items. */ .layout-methods-infographic .layout-methods-infographic-stage { --layout-methods-gap: 18px; --layout-methods-inset: calc(var(--layout-methods-gap) / 2); /* Grid: 6 cols, 2 rows; block uses ~66% of height, centered vertically */ --grid-col-width: calc((100% - 6 * var(--layout-methods-gap)) / 6); --grid-flex-block-height: 66%; --grid-flex-row-height: calc((var(--grid-flex-block-height) - var(--layout-methods-gap)) / 2); --grid-flex-block-top: calc((100% - var(--grid-flex-block-height)) / 2); --grid-row-height: var(--grid-flex-row-height); /* Flex: 3 items per row → 2 gaps; same 66% height, centered */ --flex-row-height: var(--grid-flex-row-height); --flex-content-width: calc(100% - 3 * var(--layout-methods-gap)); /* Columns: 2 cols, 4 items per col; one full gap less (half each side) for width and height. Each column uses less than 100% of available height, with different scales per column. */ --columns-col-width: calc((100% - 2 * var(--layout-methods-gap)) / 2); --columns-content-height: calc(100% - 4 * var(--layout-methods-gap)); --columns-col1-scale: 0.84; --columns-col2-scale: 0.72; /* Taller column (col1) dictates position: block is centered vertically; both columns align to top of that block */ --columns-col1-total-height: calc(var(--columns-col1-scale) * var(--columns-content-height) + 3 * var(--layout-methods-gap)); --columns-block-top: calc((100% - var(--columns-col1-total-height)) / 2); } .layout-methods-infographic .layout-methods-infographic-stage .layout-methods-infographic-item { transition: left 1s ease-in-out, top 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out, opacity 1s ease-in-out, visibility 1s ease-in-out, transform 1s ease-in-out; z-index: 1; } /* Stagger only when Flex→Columns or Columns→Grid (controller adds .stagger-items for those transitions). 100ms between each item. */ .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-1 { transition-delay: 0s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-2 { transition-delay: 0.1s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-3 { transition-delay: 0.2s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-4 { transition-delay: 0.3s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-5 { transition-delay: 0.4s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-6 { transition-delay: 0.5s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-7 { transition-delay: 0.6s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-8 { transition-delay: 0.7s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-9 { transition-delay: 0.8s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-10 { transition-delay: 0.9s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-11 { transition-delay: 1s; } .layout-methods-infographic.stagger-items .layout-methods-infographic-stage .layout-methods-infographic-item.item-12 { transition-delay: 1.1s; } /* 12-column × 2-row guide lines behind items (visible in all states). Equal 12 cols, 2 rows. */ .layout-methods-infographic .layout-methods-infographic-stage::before { content: ""; position: absolute; inset: 0; z-index: 0; --grid-line: #a5c3b7; /* sage-200 */ /* Vertical: repeating every 8.3333% (100% / 12) = 12 columns, plus right edge at 100% */ background-image: repeating-linear-gradient( to right, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px, transparent 8.3333% ), linear-gradient(to right, transparent calc(100% - 1px), var(--grid-line) 100%), /* Horizontal: line at 0, at 50%, at 100% (1px each, like vertical lines) */ linear-gradient(to bottom, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, transparent 0, transparent 50%, var(--grid-line) 50%, var(--grid-line) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to bottom, transparent calc(100% - 1px), var(--grid-line) 100%); background-size: 100% 100%; background-position: 0 0; background-repeat: no-repeat; } .dark .layout-methods-infographic .layout-methods-infographic-stage::before { --grid-line: #214031; /* sage-750 */ } /* Grid: 6-column grid, 2 rows × 3 items. Row 1: 2+3+1 cols; Row 2: 1+3+2 cols. Block centered vertically at ~66% height. */ .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-1 { left: var(--layout-methods-inset); top: var(--grid-flex-block-top); width: calc(2 * var(--grid-col-width) + var(--layout-methods-gap)); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-2 { left: calc(var(--layout-methods-inset) + 2 * var(--grid-col-width) + 2 * var(--layout-methods-gap)); top: var(--grid-flex-block-top); width: calc(3 * var(--grid-col-width) + 2 * var(--layout-methods-gap)); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-3 { left: calc(var(--layout-methods-inset) + 5 * var(--grid-col-width) + 5 * var(--layout-methods-gap)); top: var(--grid-flex-block-top); width: var(--grid-col-width); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-4 { left: var(--layout-methods-inset); top: calc(var(--grid-flex-block-top) + var(--grid-row-height) + var(--layout-methods-gap)); width: var(--grid-col-width); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-5 { left: calc(var(--layout-methods-inset) + var(--grid-col-width) + var(--layout-methods-gap)); top: calc(var(--grid-flex-block-top) + var(--grid-row-height) + var(--layout-methods-gap)); width: calc(3 * var(--grid-col-width) + 2 * var(--layout-methods-gap)); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-6 { left: calc(var(--layout-methods-inset) + 4 * var(--grid-col-width) + 4 * var(--layout-methods-gap)); top: calc(var(--grid-flex-block-top) + var(--grid-row-height) + var(--layout-methods-gap)); width: calc(2 * var(--grid-col-width) + var(--layout-methods-gap)); height: var(--grid-row-height); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-7, .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-8 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); width: var(--columns-col-width); opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(24px); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-7 { top: calc(var(--columns-block-top) + 36 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 2 * var(--layout-methods-gap)); height: calc(16 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-8 { top: calc(var(--columns-block-top) + 52 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 3 * var(--layout-methods-gap)); height: calc(14 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-9, .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-10, .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-11, .layout-methods-infographic.state-grid .layout-methods-infographic-stage .item-12 { left: 0; top: 0; width: 0; height: 0; opacity: 0; visibility: hidden; pointer-events: none; } /* Flex: "compressed" layout. Row 1: 7 : 6 : 2. Row 2: 2 : 6 : 7. Block centered vertically at ~66% height. */ .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-1 { left: var(--layout-methods-inset); top: var(--grid-flex-block-top); width: calc(7 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-2 { left: calc(var(--layout-methods-inset) + 7 / 15 * var(--flex-content-width) + var(--layout-methods-gap)); top: var(--grid-flex-block-top); width: calc(6 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-3 { left: calc(var(--layout-methods-inset) + 13 / 15 * var(--flex-content-width) + 2 * var(--layout-methods-gap)); top: var(--grid-flex-block-top); width: calc(2 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-4 { left: var(--layout-methods-inset); top: calc(var(--grid-flex-block-top) + var(--flex-row-height) + var(--layout-methods-gap)); width: calc(2 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-5 { left: calc(var(--layout-methods-inset) + 2 / 15 * var(--flex-content-width) + var(--layout-methods-gap)); top: calc(var(--grid-flex-block-top) + var(--flex-row-height) + var(--layout-methods-gap)); width: calc(6 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-6 { left: calc(var(--layout-methods-inset) + 8 / 15 * var(--flex-content-width) + 2 * var(--layout-methods-gap)); top: calc(var(--grid-flex-block-top) + var(--flex-row-height) + var(--layout-methods-gap)); width: calc(7 / 15 * var(--flex-content-width)); height: var(--flex-row-height); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-7, .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-8 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); width: var(--columns-col-width); opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(24px); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-7 { top: calc(var(--columns-block-top) + 36 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 2 * var(--layout-methods-gap)); height: calc(16 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-8 { top: calc(var(--columns-block-top) + 52 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 3 * var(--layout-methods-gap)); height: calc(14 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-9, .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-10, .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-11, .layout-methods-infographic.state-flex .layout-methods-infographic-stage .item-12 { left: 0; top: 0; width: 0; height: 0; opacity: 0; visibility: hidden; pointer-events: none; } /* Columns: 2 columns, 4 items per column; varying heights. Centered vertically; taller column (col1) dictates position; both columns top-aligned. */ .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-1 { left: var(--layout-methods-inset); top: var(--columns-block-top); width: var(--columns-col-width); height: calc(22 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-2 { left: var(--layout-methods-inset); top: calc(var(--columns-block-top) + 22 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height) + var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(18 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-3 { left: var(--layout-methods-inset); top: calc(var(--columns-block-top) + 40 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height) + 2 * var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(24 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-4 { left: var(--layout-methods-inset); top: calc(var(--columns-block-top) + 64 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height) + 3 * var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(16.5 / 80.5 * var(--columns-col1-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-5 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); top: var(--columns-block-top); width: var(--columns-col-width); height: calc(17 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-6 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); top: calc(var(--columns-block-top) + 17 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(19 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-7 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); top: calc(var(--columns-block-top) + 36 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 2 * var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(16 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); transform: translateY(0); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-8 { left: calc(var(--layout-methods-inset) + var(--columns-col-width) + var(--layout-methods-gap)); top: calc(var(--columns-block-top) + 52 / 66 * var(--columns-col2-scale) * var(--columns-content-height) + 3 * var(--layout-methods-gap)); width: var(--columns-col-width); height: calc(14 / 66 * var(--columns-col2-scale) * var(--columns-content-height)); transform: translateY(0); } .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-9, .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-10, .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-11, .layout-methods-infographic.state-columns .layout-methods-infographic-stage .item-12 { left: 0; top: 0; width: 0; height: 0; opacity: 0; visibility: hidden; pointer-events: none; }

#### Nesting

These components can be nested: put a Grid inside Layout, give that Grid a column count, and place Flex containers inside each grid cell. Inside each Flex you then place your actual content (items, text, etc.). Layout arranges the top-level Grid(s); the Grid arranges its cells; the Flex arranges items within each cell.

### Base Structure

Layout arranges content in one of two directions: horizontal or vertical. These base structures are the building blocks for more complex layouts.

#### Row Layout

The `layout layout--row` classes create a horizontal layout. Items are arranged horizontally from left to right, with center alignment as the default positioning.

```html
<div class="layout layout--row">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Column Layout

The `layout layout--col` classes create a vertical layout. Items are arranged vertically from top to bottom, with center alignment as the default positioning.

```html
<div class="layout layout--col">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Alignment Modifiers

Once you've chosen a base layout structure, you can apply these modifier classes to control how items are aligned within their container. Modifiers cover directional alignment (top/bottom/left/right) and centering.

#### Horizontal Alignment

Use `layout--left`, `layout--center-x`, or `layout--right` to control horizontal alignment.

```html
<div class="layout layout--left">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Vertical Alignment

Use `layout--top`, `layout--center-y`, or `layout--bottom` to control vertical alignment.

```html
<div class="layout layout--row layout--top">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Center Alignment

Use `layout--center` to center items both horizontally and vertically, or use `layout--center-x` and `layout--center-y` for individual axis control.

```html
<div class="layout layout--row layout--center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Or with individual axis control -->
<div class="layout layout--row layout--center-x layout--center-y">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Axis Alignment

The modifiers above are screen-directional: `layout--left` means left whether the layout is a row or a column. The modifiers below follow the flex axes instead, so `layout--justify-*` moves items along the layout direction and `layout--align-*` moves them across it.

- `layout--justify-start` / `layout--justify-center` / `layout--justify-end`: position items along the main axis. 
- `layout--align-start` / `layout--align-center` / `layout--align-end`: position items across the cross axis. 
- `layout--start` / `layout--end`: both axes at once, the corner-anchored counterparts of `layout--center`.

```html
<!-- Top-left as a row, top-left as a column too -->
<div class="layout layout--row portrait:layout--col layout--start">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- End of the main axis, centered across the cross axis -->
<div class="layout layout--row layout--justify-end layout--align-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Stretch Modifiers

Stretch modifiers allow you to control how child elements fill the available space within a layout. You can apply these modifiers either to the layout container or to individual child elements.

#### Container Stretch

Use `layout--stretch` to make all children stretch in both directions. You can also use `layout--stretch-x` and `layout--stretch-y` for individual axis control. These modifiers work with both row and column layouts.

`layout--stretch-x` and `layout--stretch-y` are screen-directional, so each one swaps its rule between a row and a column. Reach for `layout--stretch-main` (children fill the layout direction) or `layout--stretch-cross` (children fill across it) when you want the axis to follow the layout instead of the screen.

#### Row Layout Stretch

Examples of stretch behavior in row layouts. Use `layout--stretch` for both directions, `layout--stretch-x` for horizontal, or `layout--stretch-y` for vertical stretch.

```html
<div class="layout layout--row layout--stretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```html
<div class="layout layout--row layout--stretch-x">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```html
<div class="layout layout--row layout--stretch-y">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Column Layout Stretch

Examples of stretch behavior in column layouts. The same modifiers work consistently regardless of layout direction.

```html
<div class="layout layout--col layout--stretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```html
<div class="layout layout--col layout--stretch-x">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```html
<div class="layout layout--col layout--stretch-y">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Child Element Stretch

Use `stretch-x` and `stretch-y` classes on individual elements to control their stretch behavior within row or column layouts.

```html
<div class="layout layout--row">
  <div>Item 1</div>
  <div class="stretch-x">Stretched Item</div>
  <div>Item 3</div>
</div>
```

```html
<div class="layout layout--col">
  <div>Item 1</div>
  <div class="stretch-y">Stretched Item</div>
  <div>Item 3</div>
</div>
```

Previous

[View Show your plugin in different sizes with Mashup view containers](https://trmnl.com/framework/docs/3.2/view)

Next

[Title Bar Standardized title bar with plugin information and instance details](https://trmnl.com/framework/docs/3.2/title_bar)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/title_bar
     ============================================================ -->

# Title Bar

A header strip for a View, holding an icon, a title, and an optional instance label. Place it as a sibling of the Layout, not inside it.

Do

Don't

Place Title Bar as a sibling of Layout inside a View. Both `layout` and `title_bar` should be direct children of the view.

Don't nest Title Bar inside Layout. `title_bar` and `layout` must be siblings, not parent and child.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- view view--full (platform-provided) -->
<div class="layout">...</div>
<div class="title_bar">...</div>
<!-- /view -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<!-- view view--full (platform-provided) -->
<div class="layout">
  <div class="title_bar">...</div>
</div>
<!-- /view -->
```

### Base Structure

The Title Bar [Title Bar](https://trmnl.com/framework/docs/3.2/title_bar) consists of three main elements: an icon [Image](https://trmnl.com/framework/docs/3.2/image) , a title [Title](https://trmnl.com/framework/docs/3.2/title) , and an optional instance label [Label](https://trmnl.com/framework/docs/3.2/label) . These elements are arranged horizontally and automatically spaced.

#### Basic Title Bar

The basic Title Bar includes an icon and title. Use the `title_bar` class [Title Bar](https://trmnl.com/framework/docs/3.2/title_bar) for the container.

```html
<div class="title_bar">
  <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
  <span class="title">Basic Title Bar</span>
</div>
```

#### Title Bar with Instance

Add an instance label using the `instance` class to display additional context.

```html
<div class="title_bar">
  <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
  <span class="title">Title Bar with Instance</span>
  <span class="instance">Production</span>
</div>
```

### Title Bar in Mashups

When the Title Bar is placed inside a [Mashup](https://trmnl.com/framework/docs/3.2/mashup) , it automatically receives different styling. Inside a view with a mashup layout (`view--half_vertical`, `view--half_horizontal`, or `view--quadrant`), the title bar uses a reduced height, a smaller icon, and no top or side border radius, with rounded bottom corners only so it aligns with the view's bordered outline.

#### Example

The same `title_bar` markup is used; the framework applies the compact styling automatically when the title bar is inside a mashup view.

```html
<div class="mashup mashup--1Lx1R">
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
    <div class="title_bar">
      <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
      <span class="title">Calendar</span>
    </div>
  </div>
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
    <div class="title_bar">
      <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
      <span class="title">RSS</span>
    </div>
  </div>
</div>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--title-bar-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--title-bar-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--title-bar-font-smoothing` | none | none | auto | - |
| `--title-bar-font-weight` | 400 | 400 | 700 | - |
| `--title-bar-height` | calc(40px * var(--ui-scale)) | calc(40px * var(--ui-scale)) | - | calc(40px * var(--ui-scale)) |
| `--title-bar-image-height` | calc(28px * var(--ui-scale)) | calc(28px * var(--ui-scale)) | - | calc(28px * var(--ui-scale)) |
| `--title-bar-line-height` | 1 | 1 | calc(22px * var(--text-ui-scale)) | - |
| `--title-bar-padding-top` | calc(5px * var(--ui-scale)) | calc(5px * var(--ui-scale)) | 0px | 0px |
| `--title-bar-text-stroke-width` | calc(3.5px * var(--ui-scale)) | calc(3.5px * var(--ui-scale)) | calc(2px * var(--ui-scale)) | calc(2px * var(--ui-scale)) |
| Small |
| `--title-bar-small-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--title-bar-small-height` | calc(32px * var(--ui-scale)) | calc(32px * var(--ui-scale)) | - | calc(32px * var(--ui-scale)) |
| `--title-bar-small-image-height` | calc(24px * var(--ui-scale)) | calc(24px * var(--ui-scale)) | - | calc(24px * var(--ui-scale)) |

### Related APIs

#### Theming the title bar

A theme can re-point the title bar's paint through its named slot (`title-bar`) without touching geometry. Slots take palette token references, so the surface still resolves through the device mode at render time. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for every slot and mixin.

```scss
@include theme-slots.bg-slot("title-bar", "yellow-40");
```

Previous

[Layout Primary container for organizing plugin content](https://trmnl.com/framework/docs/3.2/layout)

Next

[Columns Implement zero-config column layouts for content organization](https://trmnl.com/framework/docs/3.2/columns)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/columns
     ============================================================ -->

# Columns

The Columns system handles lots of same-type data. You provide the items; it distributes them into columns and manages overflow, so you can display as few or as many items as there are in any given situation. For other layout needs, use Grid or Flex.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

Columns go inside Layout. Use them in your plugin markup to organize content into balanced columns.

Same rules apply. Columns go inside Layout, which you provide as part of the full hierarchy.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- view view--full (platform-provided) -->
<div class="layout">
  <div class="columns">
    <div class="column">...</div>
    <div class="column">...</div>
  </div>
</div>
<div class="title_bar">...</div>
<!-- /view -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="view view--full">
  <div class="layout">
    <div class="columns">
      <div class="column">...</div>
      <div class="column">...</div>
    </div>
  </div>
  <div class="title_bar">...</div>
</div>
```

### When to Use Columns

Use Columns when you have a lot of same-type data to show and you want to display as few or as many items as there are in any given situation. The Columns system takes care of the layout: it distributes content into columns, adapts column count to the available space, and handles overflow when content exceeds the viewport.

#### Variable Data, Automatic Layout

You provide the items; Columns figures out how to fit them. It distributes content into multiple columns based on available screen real estate, adapts column count when the viewport or orientation changes, and works seamlessly with the framework's overflow and clamping systems. Set a maximum column count or let the system choose the best fit.

#### Overflow Handling

When content exceeds the available height, Columns doesn't break or overflow. It gracefully hides items that don't fit and, when configured, adds an "and X more" indicator so users know there's additional content. See the [Overflow](https://trmnl.com/framework/docs/3.2/overflow) page for details.

#### Item Grouping and Flow

Items can be grouped (for example, by date or category), and the Columns system keeps those groups together as they flow into columns. Group headers stay with their items, so you don't end up with orphaned headings or broken visual hierarchy when space is limited.

#### Compared to Grid and Flex

Choose Columns when you have lists or feeds of same-type items and want the system to handle distribution and overflow. If you need strict grid alignment with fixed column spans, use [Grid](https://trmnl.com/framework/docs/3.2/grid) . If you need flexible, content-sized row or column arrangements (toolbars, inline groups, etc.), use [Flex](https://trmnl.com/framework/docs/3.2/flex) .

### Basic Column Layout

The basic column layout is flexible: add as many columns as your content needs.

```html
<div class="columns">
  <div class="column">
    Content for column 1
  </div>
  <div class="column">
    Content for column 2
  </div>
  <div class="column">
    Content for column 3
  </div>
</div>
```

### Vertical Alignment

Columns align to the top of the row by default, so uneven columns share a baseline at the top. Add `columns--center` to center each column against the tallest one instead.

```html
<div class="columns columns--center">
  <div class="column">
    Three items
  </div>
  <div class="column">
    One item, vertically centered
  </div>
</div>
```

Previous

[Title Bar Standardized title bar with plugin information and instance details](https://trmnl.com/framework/docs/3.2/title_bar)

Next

[Mashup Assemble multiple plugin views into a single interface](https://trmnl.com/framework/docs/3.2/mashup)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/mashup
     ============================================================ -->

# Mashup

A Mashup arranges multiple plugin views within a single screen. A fixed mashup modifier (e.g. `mashup--1Lx1R`, `mashup--2x2`) positions the views, while each view's own modifier sets how much space it occupies. Fluid Mashups use the `mashup--3x3` layout and cell placement modifiers for custom tilings.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You don't specify the Mashup. When you configure multiple plugins on a single screen, the platform provides the appropriate Mashup container automatically.

You provide the Mashup yourself. Include the `mashup` container with the appropriate layout class in your markup (e.g. `mashup--1Lx1R`, `mashup--2x2`).

div]:flex-1 [&>div]:min-h-0">

```html
<!-- mashup mashup--1Lx1R (platform-provided) -->
<!-- view view--half_vertical (platform-provided) -->
<div class="layout">...</div>
<div class="title_bar">...</div>
<!-- /view -->
<!-- /mashup -->
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="mashup mashup--1Lx1R">
  <div class="view view--half_vertical">
    <div class="layout">...</div>
    <div class="title_bar">...</div>
  </div>
  <div class="view view--half_vertical">
    <div class="layout">...</div>
    <div class="title_bar">...</div>
  </div>
</div>
```

### Mashup Layouts

Mashup modifiers control how [View](https://trmnl.com/framework/docs/3.2/view) instances are arranged within the screen, while each view's own modifier determines how much space it occupies. The following layouts are available.

#### Single

In the 1x1 layout, one view spans both columns and both rows, so a single plugin fills the mashup. Pair it with `view--full`, which is sized to the same area.

```html
<div class="mashup mashup--1x1">
  <div class="view view--full">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
</div>
```

#### 1 Left, 1 Right

In the 1Lx1R layout, the first plugin occupies the left column while the second occupies the right column.

```html
<div class="mashup mashup--1Lx1R">
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
</div>
```

#### 1 Top, 1 Bottom

In the 1Tx1B layout, one plugin spans the top row while the other occupies the bottom row.

```html
<div class="mashup mashup--1Tx1B">
  <div class="view view--half_horizontal">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--half_horizontal">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
</div>
```

#### 1 Left, 2 Right

In the 1Lx2R layout, one plugin occupies the left column while two plugins stack in the right column.

```html
<div class="mashup mashup--1Lx2R">
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin C</span>
    </div>
  </div>
</div>
```

#### 2 Left, 1 Right

The 2Lx1R layout stacks two plugins in the left column, with a single plugin in the right column.

```html
<div class="mashup mashup--2Lx1R">
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
  <div class="view view--half_vertical">
    <div class="layout">
      <span class="label">Plugin C</span>
    </div>
  </div>
</div>
```

#### 2 Top, 1 Bottom

In the 2Tx1B layout, two plugins are presented side by side in the top row, with a single plugin in the bottom row.

```html
<div class="mashup mashup--2Tx1B">
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
  <div class="view view--half_horizontal">
    <div class="layout">
      <span class="label">Plugin C</span>
    </div>
  </div>
</div>
```

#### 1 Top, 2 Bottom

The 1Tx2B layout places one plugin in the top row, with two plugins side by side in the bottom row.

```html
<div class="mashup mashup--1Tx2B">
  <div class="view view--half_horizontal">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin C</span>
    </div>
  </div>
</div>
```

#### 2 x 2 Grid

The 2x2 grid arranges four plugins in a grid pattern.

```html
<div class="mashup mashup--2x2">
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin A</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin B</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin C</span>
    </div>
  </div>
  <div class="view view--quadrant">
    <div class="layout">
      <span class="label">Plugin D</span>
    </div>
  </div>
</div>
```

### Fluid Mashups

The `mashup--3x3` layout arranges [View](https://trmnl.com/framework/docs/3.2/view) instances on a three by three grid that you carve up yourself. Each `mashup-cell` uses column, row, and span modifiers to set its place. A grid can hold nine equal tiles or a few large regions, and every cell draws its own border and surface at any size.

A view inside a mashup cell always fills the cell, whatever view size class it carries. `w--*` and `h--*` utilities on that view have no effect; size the content inside the view instead.

#### Available Modifiers

Combine one modifier from each group to place a cell. Column, row, and span values range from 1 to 3.

Keep start plus span at 4 or less. The grid is three tracks wide, so `mashup-cell--col-2` with `mashup-cell--col-span-3` reaches past the last track and adds an auto-sized fourth column, which re-lays the whole mashup. The same holds for rows.

| Class | Description |
| --- | --- |
| `mashup-cell--col-1` | Starts the cell at column 1 |
| `mashup-cell--col-2` | Starts the cell at column 2 |
| `mashup-cell--col-3` | Starts the cell at column 3 |
| `mashup-cell--col-span-1` | Spans 1 column |
| `mashup-cell--col-span-2` | Spans 2 columns |
| `mashup-cell--col-span-3` | Spans 3 columns |
| `mashup-cell--row-1` | Starts the cell at row 1 |
| `mashup-cell--row-2` | Starts the cell at row 2 |
| `mashup-cell--row-3` | Starts the cell at row 3 |
| `mashup-cell--row-span-1` | Spans 1 row |
| `mashup-cell--row-span-2` | Spans 2 rows |
| `mashup-cell--row-span-3` | Spans 3 rows |

#### 3 x 3 Grid

Nine `mashup-cell` elements with no placement fill the grid from left to right, top to bottom, giving an even grid of equal tiles.

```html
<div class="mashup mashup--3x3">
  <div class="mashup-cell">
    <div class="view view--quadrant">
      <div class="layout">
        <span class="label">Plugin A</span>
      </div>
    </div>
  </div>
  <!-- eight more mashup-cell elements (Plugin B through Plugin I) -->
</div>
```

#### Feature and Sidebar

Add `mashup-cell--col-*` and `mashup-cell--row-*` to choose the starting tracks. Add the matching `*-span-*` modifiers to cover up to three tracks in either direction.

```html
<div class="mashup mashup--3x3">
  <div class="mashup-cell mashup-cell--col-1 mashup-cell--col-span-2 mashup-cell--row-1 mashup-cell--row-span-3">
    <div class="view view--full">
      <div class="layout">
        <span class="label">Plugin A</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-1 mashup-cell--row-span-1">
    <div class="view view--quadrant">
      <div class="layout">
        <span class="label">Plugin B</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-2 mashup-cell--row-span-1">
    <div class="view view--quadrant">
      <div class="layout">
        <span class="label">Plugin C</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-3 mashup-cell--row-span-1">
    <div class="view view--quadrant">
      <div class="layout">
        <span class="label">Plugin D</span>
      </div>
    </div>
  </div>
</div>
```

#### Banner and Split

Cells span in either direction. This grid runs a full width banner across the top, a two by two block below it, and a tall cell down the right.

```html
<div class="mashup mashup--3x3">
  <div class="mashup-cell mashup-cell--col-1 mashup-cell--col-span-3 mashup-cell--row-1 mashup-cell--row-span-1">
    <div class="view view--half_horizontal">
      <div class="layout">
        <span class="label">Plugin A</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-1 mashup-cell--col-span-2 mashup-cell--row-2 mashup-cell--row-span-2">
    <div class="view view--full">
      <div class="layout">
        <span class="label">Plugin B</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-2 mashup-cell--row-span-2">
    <div class="view view--half_vertical">
      <div class="layout">
        <span class="label">Plugin C</span>
      </div>
    </div>
  </div>
</div>
```

#### Title Bars

Add a [Title Bar](https://trmnl.com/framework/docs/3.2/title_bar) to a cell to label its plugin. Place the `title_bar` as a sibling of `layout` inside the view, the same as a standalone view. Every cell uses the compact title bar, whatever its size, and the layout above shrinks to make room for it.

```html
<div class="mashup mashup--3x3">
  <div class="mashup-cell mashup-cell--col-1 mashup-cell--col-span-2 mashup-cell--row-1 mashup-cell--row-span-1">
    <div class="view view--half_horizontal">
      <div class="layout">
        <span class="value">72&deg;</span>
      </div>
      <div class="title_bar">
        <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
        <span class="title">Weather</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-1 mashup-cell--row-span-2">
    <div class="view view--half_vertical">
      <div class="layout">
        <span class="value">2 PM</span>
      </div>
      <div class="title_bar">
        <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
        <span class="title">Agenda</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-1 mashup-cell--col-span-2 mashup-cell--row-2 mashup-cell--row-span-2">
    <div class="view view--full">
      <div class="layout">
        <span class="value">Wed 14</span>
      </div>
      <div class="title_bar">
        <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
        <span class="title">Calendar</span>
      </div>
    </div>
  </div>
  <div class="mashup-cell mashup-cell--col-3 mashup-cell--col-span-1 mashup-cell--row-3 mashup-cell--row-span-1">
    <div class="view view--quadrant">
      <div class="layout">
        <span class="value">84%</span>
      </div>
      <div class="title_bar">
        <img class="image image--adaptive" src="/images/plugins/trmnl--render.svg">
        <span class="title">Battery</span>
      </div>
    </div>
  </div>
</div>
```

### Screen Backdrop Modifier

The `screen--backdrop` modifier provides an alternative appearance where views sit on a patterned background instead of having outlined borders.

#### Default vs Backdrop Mashups

By default, mashups use a white background with bordered views for a clean, separated look. The `screen--backdrop` modifier changes this to a patterned background (1-bit) or solid gray background (2-bit/4-bit) with plain white views on top.

```html
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
```

Previous

[Columns Implement zero-config column layouts for content organization](https://trmnl.com/framework/docs/3.2/columns)

Next

[Title Style headings with consistent typography](https://trmnl.com/framework/docs/3.2/title)
