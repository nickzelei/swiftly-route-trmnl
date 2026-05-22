<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/structure.md
     ============================================================ -->

# Structure

The framework structure is a fixed hierarchy that defines the display environment. Screen, View, Layout, Title Bar, Columns, and Mashup each have a specific role. Plugins render their content inside Views. Follow the exact div setup; deviating causes layout and rendering issues.

You don't specify Screen, Mashup, or View - the platform provides them automatically. You only specify the Layout and optionally a Title Bar.

You provide the full hierarchy yourself: Screen, View, Layout, and optionally a Mashup container and a Title Bar.

    <!-- plugin's view markup -->
    <div class="layout">...</div>
    <div class="title_bar">...</div>
    <!-- /plugin's view markup -->

    <div class="screen">
      <div class="view view--full">
        <div class="layout">...</div>
        <div class="title_bar">...</div>
      </div>
    </div>

### The Exact Structure

The framework uses a fixed div hierarchy. Each level has a specific role. The canonical structure is:

**Screen** → (**Mashup** →) **View** → **Layout** (+ optional **Title Bar**)

[Screen](/framework/docs/3.1/screen)--portrait --no-bleed --dark-mode --og --v2 --backdrop

[Mashup](/framework/docs/3.1/mashup)--1Lx1R --1Tx1B --2x2 --1Lx2R --2Lx1R --2Tx1B --1Tx2B

[View](/framework/docs/3.1/view)--full --half_vertical --half_horizontal --quadrant

[Layout](/framework/docs/3.1/layout)--row --col

--left --center-x --right --top --center-y --bottom --center

--stretch --stretch-x --stretch-y

[Title Bar](/framework/docs/3.1/title_bar)

### Component Roles

Each foundation component has a specific role. Use them as intended.

#### Screen

Root container. Defines viewport dimensions, padding, and CSS variables that cascade throughout.

Go to[Screen](/framework/docs/3.1/screen)

#### View

Container for a plugin slot. Size modifiers (`view--full`, `view--half_horizontal`, `view--half_vertical`, `view--quadrant`) set how much space the plugin gets. Non-full views must be nested inside a Mashup.

Go to[View](/framework/docs/3.1/view)

#### Layout

Exactly one per View. The content container. Its direct children are typically Columns, Grid, or Flex. Use `layout--row`, `layout--col`, and alignment modifiers to arrange those children. See the Layout page's "What Goes Inside Layout" section for when to use each.

Go to[Layout](/framework/docs/3.1/layout)

#### Title Bar

Optional. Sibling to Layout within a View. Displays icon, title, and instance label.

Go to[Title Bar](/framework/docs/3.1/title_bar)

#### Columns

Use *inside* Layout for column-based content organization.

Go to[Columns](/framework/docs/3.1/columns)

#### Mashup

Wraps multiple Views and arranges them within the Screen (1Lx1R, 1Tx1B, 2x2, etc.).

Go to[Mashup](/framework/docs/3.1/mashup)

#### Single View

For a single plugin occupying the full screen:

Layout

PluginInstance

    <div class="screen">
      <div class="view view--full">
        <div class="layout">
          <!-- Your content here -->
        </div>
        <div class="title_bar">...</div>
      </div>
    </div>

#### Mashup (Multiple Views)

For multiple plugins on one screen, wrap views in a[Mashup](/framework/docs/3.1/mashup) . Each view has exactly one [Layout](/framework/docs/3.1/layout) .

Plugin A

Plugin B

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

Previous

[Framework Runtime How the runtime applies layout, clamping, overflow, and presentation adjustments at render time](/framework/docs/3.1/framework_runtime)

Next

[Screen Device screen dimensions, orientation, and display properties](/framework/docs/3.1/screen)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/screen.md
     ============================================================ -->

# Screen

The Screen component is the outermost container that defines the device dimensions and provides global settings for your content.

You don't specify the `screen`. The platform provides the correct `screen` container based on the target device.

You provide the `screen` yourself. Include it with the appropriate device class (`screen--og`, `screen--v2`) and optional modifiers like `screen--portrait`, `screen--no-bleed`, or `screen--dark-mode`.

    <!-- screen (platform-provided) -->
    <!-- view view--full (platform-provided) -->
    <div class="layout">...</div>
    <div class="title_bar">...</div>
    <!-- /view -->
    <!-- /screen -->

    <div class="screen">
      <div class="view view--full">
        <div class="layout">...</div>
        <div class="title_bar">...</div>
      </div>
    </div>

### Base Structure

The Screen component serves as the root container for all content. It establishes the viewport dimensions,
 padding, and provides CSS variables that cascade throughout the framework.

#### Default Screen

The base `screen` class creates a container with default dimensions (800x480px landscape).
 It includes padding controlled by the `--gap` variable.

Default Screen

    <div class="screen">
      <div class="view view--full">
        <div class="layout">
          <!-- Your content here -->
        </div>
      </div>
    </div>

### CSS Variables

The Screen component provides CSS variables that cascade throughout the framework. These variables automatically
 recalculate when device variants or orientation modifiers are applied.

#### Available Variables

These variables are set on the `screen` element and available to all nested components.

| Variable | Description | Default Value |
| --- | --- | --- |
| `--screen-w` | Screen width | 800px |
| `--screen-h` | Screen height | 480px |
| `--full-w` | Full width minus padding | `calc(--screen-w - --gap * 2)` |
| `--full-h` | Full height minus padding | `calc(--screen-h - --gap * 2)` |
| `--ui-scale` | UI scaling factor | 1 |
| `--gap-scale` | Gap scaling factor | 1 |
| `--color-depth` | Display color depth (bits) | 1 |

### Orientation

Screens can be displayed in landscape (default) or portrait orientation.

#### Orientation Toggle

The `screen--portrait` modifier swaps the width and height dimensions.
 All layout calculations automatically adjust to the new dimensions.

    <!-- Landscape (default) -->
    <div class="screen">
      <!-- 800x480 dimensions -->
    </div>

    <!-- Portrait orientation -->
    <div class="screen screen--portrait">
      <!-- 480x800 dimensions (swapped) -->
    </div>

### Device Variants

The Screen component supports device-specific configurations that adjust dimensions, scaling, and color depth.
 These variants ensure content displays correctly across different TRMNL devices.

#### Available Devices

Each device variant sets specific dimensions and scaling factors. Combine with orientation and bit-depth modifiers for complete control.

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
      <!-- 718x540, 4-bit depth -->
    </div>

    <!-- Combined modifiers -->
    <div class="screen screen--v2 screen--portrait screen--4bit">
      <!-- All modifiers work together -->
    </div>

### Modifiers

Screen modifiers provide additional control over display properties and behavior.

#### No Bleed Modifier

The screen container that wraps your views has a no-bleed option that removes padding. This can be controlled through Private and Public Plugin settings,
 or applied directly in your code when developing locally.
 The `screen--no-bleed` modifier removes the default padding around the screen container,
 allowing content to extend fully to the edges.

Screen No Bleed / Layout

    <div class="screen screen--no-bleed">
      <div class="view view--full">
        <div class="layout">
          <!-- Your content here -->
        </div>
      </div>
    </div>

#### Dark Mode

The `screen--dark-mode` modifier remaps framework color tokens and utility output
 for dark rendering (background, text, border, and stroke utilities included).

    <div class="screen screen--dark-mode">
      <!-- Framework tokens/utilities render in dark mode -->
    </div>

#### Backdrop Mashups

By default, mashups display with a white background and bordered views.
 The `screen--backdrop` modifier changes this to a patterned
 background (1-bit) or solid gray background (2-bit/4-bit) with plain white views.
 See the [Outline](/framework/docs/3.1/outline) utility for more details.

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

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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
| `--ui-scale` | 1 | — | — | — |

Previous

[Structure The framework's exact div hierarchy and how Screen, View, Layout, Title Bar, Columns, and Mashup work together](/framework/docs/3.1/structure)

Next

[View Show your plugin in different sizes with Mashup view containers](/framework/docs/3.1/view)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/view.md
     ============================================================ -->

# View

A View holds content (e.g. a plugin instance). Single views use `view--full` inside the Screen; multiple views go inside a Mashup. The view modifier sets each view's share of space; the Mashup modifier controls the arrangement. View and Layout receive calculated dimensions from the device and orientation.

You don't specify the `view`. The markup you write for any plugin layout is automatically wrapped in the appropriate `view` container by the platform.

You provide the `view` yourself. Include the appropriate wrapper in your markup: `view view--full`, `view view--half_vertical`, `view view--half_horizontal`, or `view view--quadrant`.

    <!-- view view--full (platform-provided) -->
    <div class="layout">...</div>
    <div class="title_bar">...</div>
    <!-- /view -->

    <div class="view view--full">
      <div class="layout">...</div>
      <div class="title_bar">...</div>
    </div>

### Base Structure

The Layout element[Layout](/framework/docs/3.1/layout) is the core component of every View [View](/framework/docs/3.1/view) , providing a consistent container for your content.
 Views can optionally include a Title Bar [Title Bar](/framework/docs/3.1/title_bar) for additional context.

There are four view types: `view--full`, `view--half_horizontal`, `view--half_vertical`, and `view--quadrant`.
 The default full view (`view view--full`) lives directly inside the `screen` div.
 Other view types must be nested inside a [Mashup](/framework/docs/3.1/mashup) component.

#### With Layout and Title Bar

When combined with a title bar, it provides context and navigation options.

Layout

TitleInstance

    <div class="view view--full">
      <div class="layout">
        <!-- Your content here -->
      </div>

      <div class="title_bar">
        <img class="image" src="/images/plugins/trmnl--render.svg" alt="TRMNL Logo">
        <span class="title">Title</span>
        <span class="instance">Instance</span>
      </div>
    </div>

#### With only Layout

For simpler interfaces, you can create a view without a title bar using just the base view classes.

Layout

    <div class="view view--full">
      <div class="layout">
        <!-- Your content here -->
      </div>
    </div>

### Views in Mashups

When multiple plugins share a single screen, each one gets its own view, and those views must be wrapped in a[Mashup](/framework/docs/3.1/mashup) container.

The view modifier (`view--half_vertical`, `view--quadrant`, etc.) determines how much space each plugin gets.
 The mashup modifier (`mashup--1Lx1R`, `mashup--2x2`, etc.) determines how those views are arranged on screen.

Previous

[Screen Device screen dimensions, orientation, and display properties](/framework/docs/3.1/screen)

Next

[Layout Primary container for organizing plugin content](/framework/docs/3.1/layout)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/layout.md
     ============================================================ -->

# Layout

The Layout is the content container inside a View. There should be exactly one `layout` per `view`. Its height is calculated automatically based on the device type, orientation, and whether a title bar is present. It can arrange content horizontally (`layout--row`) or vertically (`layout--col`), with alignment and stretch modifiers. For organizing content inside it, use `flex`, `columns`, or `grid`.

Use one `layout` per `view`. Organize content inside it with `flex`, `columns`, or `grid`.

Don't nest `layout` inside `layout`. There should be exactly one `layout` per `view`.

    <div class="layout">
      <div class="flex flex--row">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </div>

    <div class="layout">
      <div class="layout layout--row">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </div>

### What Goes Inside Layout

Layout is the main content wrapper inside a View. It defines the available space. Its direct children are usually Columns, Grid, or Flex.

#### Three ways to lay out content

#### Grid

Use when you need a strict grid: define column count and spans, so items align to a consistent rhythm. Good for Swiss-style layouts where everything lines up to a fixed grid.

Go to[Grid](/framework/docs/3.1/grid)

#### Flex

Use when you want flexible arrangements where items size by content (width/height). You can use Flex alone for simpler layouts, or nest it inside Grid for per-cell flexibility.

Go to[Flex](/framework/docs/3.1/flex)

#### Columns

Use when you have lots of same-type data and want to display as few or as many items as there are, with the Columns system handling the layout. See the Columns page for details.

Go to[Columns](/framework/docs/3.1/columns)

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

#### Nesting

These components can be nested. For example, you might put a Grid inside Layout, give that Grid a column count, and place Flex containers inside each grid cell. Inside each Flex you then place your actual content (items, text, etc.). Layout arranges the top-level Grid(s); the Grid arranges its cells; the Flex arranges items within each cell.

### Base Structure

The Layout system provides two fundamental ways to organize content: horizontal and vertical arrangements.
 These base structures are the building blocks for more complex layouts.

#### Row Layout

The `layout layout--row` classes create a horizontal layout.
 Items are arranged horizontally from left to right, with center alignment as the default positioning.

Item 1

Item 2

Item 3

LayoutHorizontal

    <div class="layout layout--row">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Column Layout

The `layout layout--col` classes create a vertical layout.
 Items are arranged vertically from top to bottom, with center alignment as the default positioning.

Item 1

Item 2

Item 3

LayoutVertical

    <div class="layout layout--col">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

### Alignment Modifiers

Once you've chosen a base layout structure, you can apply these modifier classes to control how items are aligned
 within their container. The system provides both directional alignment (top/bottom/left/right) and centering options.

#### Horizontal Alignment

Use `layout--left`, `layout--center-x`, or `layout--right` to control horizontal alignment.

Left

LayoutLeft Alignment

    <div class="layout layout--left">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Vertical Alignment

Use `layout--top`, `layout--center-y`, or `layout--bottom` to control vertical alignment.

Top

LayoutTop Alignment

    <div class="layout layout--row layout--top">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Center Alignment

Use `layout--center` to center items both horizontally and vertically,
 or use `layout--center-x` and `layout--center-y` for individual axis control.

Center

LayoutCenter Alignment

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

### Stretch Modifiers

Stretch modifiers allow you to control how child elements fill the available space within a layout.
 You can apply these modifiers either to the layout container or to individual child elements.

#### Container Stretch

Use `layout--stretch` to make all children stretch in both directions.
 You can also use `layout--stretch-x` and `layout--stretch-y` for individual axis control.
 These modifiers work with both row and column layouts.

#### Row Layout Stretch

Examples of stretch behavior in row layouts. Use `layout--stretch` for both directions, `layout--stretch-x` for horizontal, or `layout--stretch-y` for vertical stretch.

Item 1

Item 2

Item 3

Row LayoutFull Stretch

    <div class="layout layout--row layout--stretch">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

Item 1

Item 2

Item 3

Row LayoutHorizontal Stretch

    <div class="layout layout--row layout--stretch-x">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

Item 1

Item 2

Item 3

Row LayoutVertical Stretch

    <div class="layout layout--row layout--stretch-y">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Column Layout Stretch

Examples of stretch behavior in column layouts. The same modifiers work consistently regardless of layout direction.

Item 1

Item 2

Item 3

Column LayoutFull Stretch

    <div class="layout layout--col layout--stretch">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

Item 1

Item 2

Item 3

Column LayoutHorizontal Stretch

    <div class="layout layout--col layout--stretch-x">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

Item 1

Item 2

Item 3

Column LayoutVertical Stretch

    <div class="layout layout--col layout--stretch-y">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

#### Child Element Stretch

Use `stretch-x` and `stretch-y` classes on individual elements to control their stretch behavior
 within row or column layouts.

Item 1

Item 2 (stretched)

Item 3

LayoutRow + Individual Stretch

    <div class="layout layout--row">
      <div>Item 1</div>
      <div class="stretch-x">Stretched Item</div>
      <div>Item 3</div>
    </div>

Item 1

Item 2  
(stretched)

Item 3

LayoutColumn + Individual Stretch

    <div class="layout layout--col">
      <div>Item 1</div>
      <div class="stretch-y">Stretched Item</div>
      <div>Item 3</div>
    </div>

Previous

[View Show your plugin in different sizes with Mashup view containers](/framework/docs/3.1/view)

Next

[Title Bar Standardized title bar with plugin information and instance details](/framework/docs/3.1/title_bar)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/title_bar.md
     ============================================================ -->

# Title Bar

The Title Bar component provides a consistent header for terminal-like interfaces, displaying application information such as icons, titles, and instance details.

Place Title Bar as a sibling of Layout inside a View. Both `layout` and `title_bar` should be direct children of the view.

Don't nest Title Bar inside Layout. `title_bar` and `layout` must be siblings, not parent and child.

    <!-- view view--full (platform-provided) -->
    <div class="layout">...</div>
    <div class="title_bar">...</div>
    <!-- /view -->

    <!-- view view--full (platform-provided) -->
    <div class="layout">
      <div class="title_bar">...</div>
    </div>
    <!-- /view -->

### Base Structure

The Title Bar[Title Bar](/framework/docs/3.1/title_bar) consists of three main elements: an icon [Image](/framework/docs/3.1/image) , a title [Title](/framework/docs/3.1/title) , and an optional instance label [Label](/framework/docs/3.1/label) . These elements are arranged horizontally and automatically spaced.

#### Basic Title Bar

The basic Title Bar includes an icon and title. Use the `title_bar` class [Title Bar](/framework/docs/3.1/title_bar) for the container.

Basic Title Bar

    <div class="title_bar">
      <img class="image" src="/images/plugins/trmnl--render.svg">
      <span class="title">Basic Title Bar</span>
    </div>

#### Title Bar with Instance

Add an instance label using the `instance` class
 to display additional context.

Title Bar with InstanceProduction

    <div class="title_bar">
      <img class="image" src="/images/plugins/trmnl--render.svg">
      <span class="title">Title Bar with Instance</span>
      <span class="instance">Production</span>
    </div>

### Title Bar in Mashups

When the Title Bar is placed inside a[Mashup](/framework/docs/3.1/mashup) , it automatically receives different styling. Inside a view with a mashup layout (`view--half_vertical`, `view--half_horizontal`, or `view--quadrant`), the title bar uses a reduced height, a smaller icon, and no top or side border radius, with rounded bottom corners only so it aligns with the view's bordered outline.

#### Example

The same `title_bar` markup is used; the framework applies the compact styling automatically when the title bar is inside a mashup view.

Plugin A

Calendar

Plugin B

RSS

    <div class="mashup mashup--1Lx1R">
      <div class="view view--half_vertical">
        <div class="layout">
          <span class="label">Plugin A</span>
        </div>
        <div class="title_bar">
          <img class="image" src="/images/plugins/trmnl--render.svg">
          <span class="title">Calendar</span>
        </div>
      </div>
      <div class="view view--half_vertical">
        <div class="layout">
          <span class="label">Plugin B</span>
        </div>
        <div class="title_bar">
          <img class="image" src="/images/plugins/trmnl--render.svg">
          <span class="title">RSS</span>
        </div>
      </div>
    </div>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
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

Previous

[Layout Primary container for organizing plugin content](/framework/docs/3.1/layout)

Next

[Columns Implement zero-config column layouts for content organization](/framework/docs/3.1/columns)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/columns.md
     ============================================================ -->

# Columns

The Columns system handles lots of same-type data. You provide the items; it distributes them into columns and manages overflow, so you can display as few or as many items as there are in any given situation. For other layout needs, use Grid or Flex.

Columns go inside Layout. Use them in your plugin markup to organize content into balanced columns.

Same rules apply. Columns go inside Layout, which you provide as part of the full hierarchy.

    <!-- view view--full (platform-provided) -->
    <div class="layout">
      <div class="columns">
        <div class="column">...</div>
        <div class="column">...</div>
      </div>
    </div>
    <div class="title_bar">...</div>
    <!-- /view -->

    <div class="view view--full">
      <div class="layout">
        <div class="columns">
          <div class="column">...</div>
          <div class="column">...</div>
        </div>
      </div>
      <div class="title_bar">...</div>
    </div>

### When to Use Columns

Use Columns when you have a lot of same-type data to show and you want to display as few or as many items as there are in any given situation. The Columns system takes care of the layout: it distributes content into columns, adapts column count to the available space, and handles overflow when content exceeds the viewport.

#### Variable Data, Automatic Layout

You provide the items; Columns figures out how to fit them. It distributes content into multiple columns based on available screen real estate, adapts column count when the viewport or orientation changes, and works seamlessly with the framework's overflow and clamping systems. Set a maximum column count or let the system choose the best fit.

#### Overflow Handling

When content exceeds the available height, Columns doesn't break or overflow. It gracefully hides items that don't fit and, when configured, adds an "and X more" indicator so users know there's additional content. See the[Overflow](/framework/docs/3.1/overflow) page for details.

#### Item Grouping and Flow

Items can be grouped (for example, by date or category), and the Columns system keeps those groups together as they flow into columns. Group headers stay with their items, so you don't end up with orphaned headings or broken visual hierarchy when space is limited.

#### Compared to Grid and Flex

Choose Columns when you have lists or feeds of same-type items and want the system to handle distribution and overflow. If you need strict grid alignment with fixed column spans, use[Grid](/framework/docs/3.1/grid) . If you need flexible, content-sized row or column arrangements (toolbars, inline groups, etc.), use [Flex](/framework/docs/3.1/flex) .

### Basic Column Layout

The basic column layout is flexible - you can add as many columns as needed depending on your content needs.

Column 1

Item

Item

Item

Item

Column 2

Item

Item

Column 3

Item

Columns

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

Previous

[Title Bar Standardized title bar with plugin information and instance details](/framework/docs/3.1/title_bar)

Next

[Mashup Assemble multiple plugin views into a single interface](/framework/docs/3.1/mashup)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/mashup.md
     ============================================================ -->

# Mashup

A Mashup arranges multiple plugin views within a single screen. The mashup modifier (e.g. `mashup--1Lx1R`, `mashup--2x2`) controls how the views are positioned, while each view's own modifier determines how much space it occupies.

You don't specify the Mashup. When you configure multiple plugins on a single screen, the platform provides the appropriate Mashup container automatically.

You provide the Mashup yourself. Include the `mashup` container with the appropriate layout class in your markup (e.g. `mashup--1Lx1R`, `mashup--2x2`).

    <!-- mashup mashup--1Lx1R (platform-provided) -->
    <!-- view view--half_vertical (platform-provided) -->
    <div class="layout">...</div>
    <div class="title_bar">...</div>
    <!-- /view -->
    <!-- /mashup -->

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

### Mashup Layouts

Mashup modifiers control how[View](/framework/docs/3.1/view) instances are arranged within the screen, while each view's own modifier determines how much space it occupies.
 The following layouts are available.

#### 1 Left, 1 Right

In the 1Lx1R layout, the first plugin occupies the left column while the second occupies the right column.

Plugin A

Plugin B

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

#### 1 Top, 1 Bottom

In the 1Tx1B layout, one plugin spans the top row while the other occupies the bottom row.

Plugin A

Plugin B

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

#### 1 Left, 2 Right

In the 1Lx2R layout, one plugin occupies the left column while two plugins stack in the right column.

Plugin A

Plugin B

Plugin C

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

#### 2 Left, 1 Right

The 2Lx1R layout stacks two plugins in the left column, with a single plugin in the right column.

Plugin A

Plugin B

Plugin C

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

#### 2 Top, 1 Bottom

In the 2Tx1B layout, two plugins are presented side by side in the top row, with a single plugin in the bottom row.

Plugin A

Plugin B

Plugin C

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

#### 1 Top, 2 Bottom

The 1Tx2B layout places one plugin in the top row, with two plugins side by side in the bottom row.

Plugin A

Plugin B

Plugin C

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

#### 2 x 2 Grid

The 2x2 grid arranges four plugins in a grid pattern.

Plugin A

Plugin B

Plugin C

Plugin D

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

Previous

[Columns Implement zero-config column layouts for content organization](/framework/docs/3.1/columns)

Next

[Title Style headings with consistent typography](/framework/docs/3.1/title)


