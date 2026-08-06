<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/title
     ============================================================ -->

# Title

Headings for a plugin screen. Five size variants from small to xxlarge, each with responsive prefixes for breakpoints and orientation.

### Size Variations

The Title system offers five size variants: small, base (default), large, xlarge, and xxlarge.

```html
<!-- Small: compact headings for secondary content -->
<span class="title title--small">Small Title</span>

<!-- Base: default size, most common usage -->
<span class="title">Base Title</span>
<span class="title title--base">Base Title</span>

<!-- Large: prominent headers -->
<span class="title title--large">Large Title</span>

<!-- Extra Large: hero sections -->
<span class="title title--xlarge">Extra Large Title</span>

<!-- Extra Extra Large: maximum impact -->
<span class="title title--xxlarge">XXL Title</span>

<!-- Responsive example -->
<span class="title title--small lg:title--base">Small by default, base on large screens</span>
```

### Responsive Titles

The Title system supports responsive variants using breakpoint prefixes.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes per device size class.

```html
<!-- Small by default, xlarge on lg screens -->
<span class="title title--small lg:title--xlarge">
  Responsive Title
</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label">Base by default, xlarge on lg screens</span>
```

#### Orientation and Size+Orientation

Title sizes can adapt to orientation with `portrait:` and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Large by default, small in portrait -->
<span class="title title--large portrait:title--small">Orientation Variant</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label">Large by default, small in portrait.</span>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--title-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | - |
| `--title-font-size` | calc(26px * var(--text-ui-scale)) | calc(26px * var(--text-ui-scale)) | calc(21px * var(--text-ui-scale)) | - |
| `--title-font-smoothing` | none | none | auto | - |
| `--title-font-weight` | 400 | 400 | 400 | - |
| `--title-line-height` | 1 | 1 | 1.2 | - |
| Small |
| `--title-small-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--title-small-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--title-small-font-smoothing` | none | none | auto | - |
| `--title-small-font-weight` | 400 | 400 | 700 | - |
| `--title-small-line-height` | 1 | 1 | 1.2 | - |
| Large |
| `--title-large-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--title-large-font-size` | calc(30px * var(--text-ui-scale)) | - | calc(30px * var(--text-ui-scale)) | - |
| `--title-large-font-smoothing` | auto | - | auto | - |
| `--title-large-font-weight` | 425 | - | 425 | - |
| `--title-large-line-height` | 1.2 | - | 1.2 | - |
| Xlarge |
| `--title-xlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--title-xlarge-font-size` | calc(35px * var(--text-ui-scale)) | - | calc(35px * var(--text-ui-scale)) | - |
| `--title-xlarge-font-smoothing` | auto | - | auto | - |
| `--title-xlarge-font-weight` | 400 | - | 400 | - |
| `--title-xlarge-line-height` | 1.2 | - | 1.2 | - |
| Xxlarge |
| `--title-xxlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--title-xxlarge-font-size` | calc(40px * var(--text-ui-scale)) | - | calc(40px * var(--text-ui-scale)) | - |
| `--title-xxlarge-font-smoothing` | auto | - | auto | - |
| `--title-xxlarge-font-weight` | 375 | - | 375 | - |
| `--title-xxlarge-line-height` | 1.2 | - | 1.2 | - |

Previous

[Mashup Assemble multiple plugin views into a single interface](https://trmnl.com/framework/docs/3.2/mashup)

Next

[Value Display data values with consistent formatting](https://trmnl.com/framework/docs/3.2/value)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/value
     ============================================================ -->

# Value

Figures and readouts on a plugin screen. Twelve size variants from xxsmall to peta, plus value--tnums for tabular numbers that keep columns aligned.

### Size Variants

The Value system offers twelve size variants, from XXSmall to Peta.

#### Size Ladder

Each tier maps to one font size, and that size holds on every device, bit depth, and font bundle. A bare `value` renders at the Base tier. [Scale](https://trmnl.com/framework/docs/3.2/scale) and [Text Scale](https://trmnl.com/framework/docs/3.2/text_scale) multiply these sizes from the screen.

| Class | Font size |
| --- | --- |
| `value--xxsmall` | 16px |
| `value--xsmall` | 20px |
| `value--small` | 26px |
| `value--base` | 38px |
| `value--large` | 58px |
| `value--xlarge` | 74px |
| `value--xxlarge` | 96px |
| `value--xxxlarge` | 128px |
| `value--mega` | 170px |
| `value--giga` | 220px |
| `value--tera` | 290px |
| `value--peta` | 380px |

Value and the `text--` utilities share tier names but not sizes. `value--xlarge` is 74px where `text--xlarge` is 26px, and the utility that matches `value--xlarge` is `text--mega`.

#### XXSmall

The `value--xxsmall` class creates the smallest text size.

```html
<span class="value value--xxsmall">Example</span>
<span class="value value--xxsmall value--tnums">48,206.62</span>
```

#### XSmall

The `value--xsmall` class is one step larger than XXSmall.

```html
<span class="value value--xsmall">Example</span>
<span class="value value--xsmall value--tnums">48,206.62</span>
```

#### Small

The `value--small` class creates a smaller text size.

```html
<span class="value value--small">Example</span>
<span class="value value--small value--tnums">48,206.62</span>
```

#### Base

The base `value` class without size modifiers and the `value--base` class both produce the same visual result. See the [Responsive Values](#responsive-values) section for examples.

```html
<span class="value">Example</span>
<span class="value value--tnums">48,206.62</span>

<!-- Or using the base modifier -->
<span class="value value--base">Example</span>
<span class="value value--base value--tnums">48,206.62</span>
```

#### Large

The `value--large` class creates larger text.

```html
<span class="value value--large">Example</span>
<span class="value value--large value--tnums">48,206.62</span>
```

#### XLarge

The `value--xlarge` class provides larger text.

```html
<span class="value value--xlarge">Example</span>
<span class="value value--xlarge value--tnums">48,206.62</span>
```

#### XXLarge

The `value--xxlarge` class creates very large text.

```html
<span class="value value--xxlarge">Example</span>
<span class="value value--xxlarge value--tnums">48,206.62</span>
```

#### XXXLarge

The `value--xxxlarge` class provides very large text.

```html
<span class="value value--xxxlarge">Example</span>
<span class="value value--xxxlarge value--tnums">48,206.62</span>
```

#### Mega

The `value--mega` class creates extremely large text.

```html
<span class="value value--mega value--tnums">42</span>
```

#### Giga

The `value--giga` class provides massive text.

```html
<span class="value value--giga value--tnums">42</span>
```

#### Tera

The `value--tera` class creates colossal text.

```html
<span class="value value--tera value--tnums">42</span>
```

#### Peta

The `value--peta` class provides the largest text.

```html
<span class="value value--peta value--tnums">42</span>
```

### Numerical Display

The Value system includes special formatting options for numerical values.

#### Tabular Numbers

Add the `value--tnums` modifier to enable tabular numbers.

```html
<span class="value value--large">Regular: 48,206.62</span>
<span class="value value--large value--tnums">Tabular: 48,206.62</span>
```

### Responsive Values

The Value system supports responsive variants using breakpoint prefixes.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes per device size class.

```html
<!-- Small by default, large on md screens, xlarge on lg screens -->
<span class="value value--small md:value--large lg:value--xlarge">
  Responsive Value
</span>

<!-- Progressive scaling with screen size -->
<span class="value value--xsmall sm:value--small md:value--base lg:value--large value--tnums">
  1,234.56
</span>

<!-- Using base modifier to reset to default size at breakpoint -->
<span class="value value--small lg:value--base">
  Small by default, base on large screens
</span>
```

#### Orientation and Size+Orientation

Value sizes can adapt to orientation with `portrait:` and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Orientation only: smaller in portrait -->
<span class="value value--large portrait:value--small">Orientation Variant</span>

<!-- Size + orientation: xlarge only on md+ screens in portrait -->
<span class="value value--small md:portrait:value--xlarge value--tnums">42,000.00</span>
```

### Values in JavaScript

The value typography is readable from JS via `TRMNLPaint.type('value', { el })`, which probes the resolved font family, size, weight and line-height from the live cascade (so it follows the active font bundle and density automatically), and `applyType()` writes it onto a node. This is how JS-drawn visuals borrow the same big-number face as `.value` stat tiles (for example the chart gauge&rsquo;s weekly value). See [Painting Typography](https://trmnl.com/framework/docs/3.2/paint_typography) .

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--value-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--value-font-size` | calc(38px * var(--text-ui-scale)) | - | calc(38px * var(--text-ui-scale)) | - |
| `--value-font-smoothing` | auto | - | auto | - |
| `--value-font-weight` | 450 | - | 450 | - |
| `--value-line-height` | calc(42px * var(--text-ui-scale)) | - | calc(42px * var(--text-ui-scale)) | - |
| Xxsmall |
| `--value-xxsmall-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--value-xxsmall-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--value-xxsmall-font-smoothing` | none | none | auto | - |
| `--value-xxsmall-font-weight` | 400 | 400 | 700 | - |
| `--value-xxsmall-line-height` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(14px * var(--text-ui-scale)) | - |
| Xsmall |
| `--value-xsmall-font-size` | calc(20px * var(--text-ui-scale)) | - | calc(20px * var(--text-ui-scale)) | - |
| `--value-xsmall-font-weight` | 600 | - | 600 | - |
| `--value-xsmall-line-height` | calc(24px * var(--text-ui-scale)) | - | calc(24px * var(--text-ui-scale)) | - |
| Small |
| `--value-small-font-size` | calc(26px * var(--text-ui-scale)) | - | calc(26px * var(--text-ui-scale)) | - |
| `--value-small-font-weight` | 500 | - | 475 | - |
| `--value-small-line-height` | calc(29px * var(--text-ui-scale)) | - | calc(29px * var(--text-ui-scale)) | - |
| Large |
| `--value-large-font-size` | calc(58px * var(--text-ui-scale)) | - | calc(58px * var(--text-ui-scale)) | - |
| `--value-large-font-weight` | 400 | - | 400 | - |
| `--value-large-line-height` | calc(70px * var(--text-ui-scale)) | - | calc(70px * var(--text-ui-scale)) | - |
| Xlarge |
| `--value-xlarge-font-size` | calc(74px * var(--text-ui-scale)) | - | calc(74px * var(--text-ui-scale)) | - |
| `--value-xlarge-font-weight` | 375 | - | 375 | - |
| `--value-xlarge-line-height` | calc(86px * var(--text-ui-scale)) | - | calc(86px * var(--text-ui-scale)) | - |
| Xxlarge |
| `--value-xxlarge-font-size` | calc(96px * var(--text-ui-scale)) | - | calc(96px * var(--text-ui-scale)) | - |
| `--value-xxlarge-font-weight` | 350 | - | 350 | - |
| `--value-xxlarge-line-height` | calc(108px * var(--text-ui-scale)) | - | calc(108px * var(--text-ui-scale)) | - |
| Xxxlarge |
| `--value-xxxlarge-font-size` | calc(128px * var(--text-ui-scale)) | - | calc(128px * var(--text-ui-scale)) | - |
| `--value-xxxlarge-font-weight` | 300 | - | 300 | - |
| `--value-xxxlarge-line-height` | calc(128px * var(--text-ui-scale)) | - | calc(128px * var(--text-ui-scale)) | - |
| Mega |
| `--value-mega-font-size` | calc(170px * var(--text-ui-scale)) | - | calc(170px * var(--text-ui-scale)) | - |
| `--value-mega-font-weight` | 275 | - | 275 | - |
| `--value-mega-line-height` | calc(180px * var(--text-ui-scale)) | - | calc(180px * var(--text-ui-scale)) | - |
| Giga |
| `--value-giga-font-size` | calc(220px * var(--text-ui-scale)) | - | calc(220px * var(--text-ui-scale)) | - |
| `--value-giga-font-weight` | 250 | - | 250 | - |
| `--value-giga-line-height` | calc(230px * var(--text-ui-scale)) | - | calc(230px * var(--text-ui-scale)) | - |
| Tera |
| `--value-tera-font-size` | calc(290px * var(--text-ui-scale)) | - | calc(290px * var(--text-ui-scale)) | - |
| `--value-tera-font-weight` | 225 | - | 225 | - |
| `--value-tera-line-height` | calc(300px * var(--text-ui-scale)) | - | calc(300px * var(--text-ui-scale)) | - |
| Peta |
| `--value-peta-font-size` | calc(380px * var(--text-ui-scale)) | - | calc(380px * var(--text-ui-scale)) | - |
| `--value-peta-font-weight` | 200 | - | 200 | - |
| `--value-peta-line-height` | calc(390px * var(--text-ui-scale)) | - | calc(390px * var(--text-ui-scale)) | - |

Previous

[Title Style headings with consistent typography](https://trmnl.com/framework/docs/3.2/title)

Next

[Label Create clear labels for unified content identification](https://trmnl.com/framework/docs/3.2/label)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/label
     ============================================================ -->

# Label

Short captions and status chips for a plugin screen. Five sizes plus style variants (filled, outline, underline, inverted) and semantic variants such as label--success and label--error.

### Size and Style Variants

Labels come in several style variants. Each one combines with any size modifier.

```html
<!-- Default (plain) -->
<span class="label">Default Label</span>

<!-- Outline: bordered label -->
<span class="label label--outline">Outline Label</span>

<!-- Underline: underlined label -->
<span class="label label--underline">Underline Label</span>

<!-- Gray: muted/secondary label -->
<span class="label label--gray">Gray Label</span>

<!-- Filled: black (darkest) background -->
<span class="label label--filled">Filled</span>

<!-- Semantic: primary, success, error, warning -->
<span class="label label--primary">Primary</span>
<span class="label label--success">Success</span>
<span class="label label--error">Error</span>

<!-- Backwards compatible: label--inverted = label--filled -->
<span class="label label--inverted">Inverted (alias)</span>

<!-- Combine sizes with styles -->
<span class="label label--large label--outline">Large Outline Label</span>
<span class="label label--xlarge label--filled">XLarge Filled Label</span>
```

#### Semantic variants

Use `label--primary`, `label--success`, `label--error`, `label--warning` for intent-based colors. `label--filled` uses black (darkest), success and warning use black text, and warning uses a yellow background. See [Colors](https://trmnl.com/framework/docs/3.2/colors) for the semantic mapping.

### Text Overflow Behavior

Labels can handle longer text content through natural wrapping or text clamping. Understanding how labels behave with overflow content helps ensure your interface remains readable and visually balanced.

#### Multi-line Wrapping

By default, labels will wrap to multiple lines when content exceeds the available width, maintaining readability for longer text.

```html
<!-- Labels with longer text will wrap naturally -->
<span class="label">This longer label will wrap to multiple lines when it exceeds the width</span>
```

#### Text Clamping

Use the framework's `data-clamp` attribute to limit labels to a specific number of lines with ellipsis overflow.

```html
<!-- data-clamp applies to any label size (small, base, large, xlarge, xxlarge) -->

<!-- Single line clamping with data attribute -->
<span class="label" data-clamp="1">
  This text will be clamped to one line
</span>

<!-- Two line clamping -->
<span class="label" data-clamp="2">
  This text will be clamped to exactly two lines with ellipsis
</span>
```

### Responsive Features

Label components support all three responsive systems: size-based, orientation-based, and bit-depth variants. This enables precise control over label appearance across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes and styles per device size class.

```html
<!-- Small by default, xlarge on lg screens -->
<span class="label label--small lg:label--xlarge">
  Responsive Label
</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label label--small">Small by default, xlarge on lg screens</span>

<!-- Using base modifier to reset to default size at breakpoint -->
<span class="label label--small md:label--base">
  Small by default, base on medium+ screens
</span>

<!-- Progressive size scaling -->
<span class="label label--small sm:label--base md:label--large lg:label--xlarge">
  Progressive Label Sizing
</span>
```

#### Orientation and Size+Orientation

Label sizes can adapt to orientation with `portrait:` and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Large by default, small in portrait -->
<span class="label label--large portrait:label--small">Orientation Variant</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label label--small">Large by default, small in portrait.</span>
```

#### Bit-Depth Responsive

Use bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to optimize label appearance for different display color capabilities.

```html
<!-- Different styles for different bit-depth displays -->
<span class="label 1bit:label--filled 2bit:label--outline 4bit:label--underline">
  Display Optimized
</span>

<!-- Selective bit-depth targeting -->
<span class="label 1bit:label--outline 4bit:label--gray">
  Selective Styling
</span>
```

#### Combined Responsive Features

Combine multiple responsive systems for highly targeted label styling. Use size, orientation, and bit-depth modifiers together following the pattern: `size:orientation:bit-depth:utility`.

```html
<!-- Highly targeted responsive combinations -->
<span class="label md:portrait:2bit:label--filled lg:4bit:label--outline">
  Advanced Targeting
</span>

<!-- Multiple responsive conditions -->
<span class="label sm:1bit:label--underline md:portrait:label--outline lg:4bit:label--gray">
  Multi-Condition
</span>
```

### Backward Compatibility

The gray-out label variant has been renamed from `label--gray-out` to `label--gray`. The legacy class name still works and maps to the same bit-depth responsive styling. Prefer the new name going forward.

The inverted label has been renamed to `label--filled` (black background). Use `label--primary`, `label--success`, etc. for semantic colors. `label--inverted` remains as an alias for `label--filled`.

```html
<!-- Deprecated (but still works) -->
<span class="label label--gray-out">Gray label (deprecated)</span>
<span class="label label--inverted">Inverted (alias)</span>

<!-- Preferred (new naming) -->
<span class="label label--gray">Gray label (preferred)</span>
<span class="label label--filled">Filled label (preferred)</span>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--label-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--label-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--label-font-smoothing` | none | none | auto | - |
| `--label-font-weight` | 400 | 400 | 500 | - |
| `--label-line-height` | 1.25 | 1.25 | 1.25 | - |
| Small |
| `--label-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--label-small-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--label-small-font-smoothing` | none | none | auto | - |
| `--label-small-font-weight` | 400 | 400 | 500 | - |
| `--label-small-line-height` | 1 | 1 | 1 | - |
| Large |
| `--label-large-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--label-large-font-size` | calc(21px * var(--text-ui-scale)) | - | calc(21px * var(--text-ui-scale)) | - |
| `--label-large-font-smoothing` | auto | - | auto | - |
| `--label-large-font-weight` | 500 | - | 500 | - |
| `--label-large-line-height` | 1.2 | - | 1.2 | - |
| Xlarge |
| `--label-xlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--label-xlarge-font-size` | calc(26px * var(--text-ui-scale)) | - | calc(26px * var(--text-ui-scale)) | - |
| `--label-xlarge-font-smoothing` | auto | - | auto | - |
| `--label-xlarge-font-weight` | 475 | - | 475 | - |
| `--label-xlarge-line-height` | 1.2 | - | 1.2 | - |
| Xxlarge |
| `--label-xxlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--label-xxlarge-font-size` | calc(30px * var(--text-ui-scale)) | - | calc(30px * var(--text-ui-scale)) | - |
| `--label-xxlarge-font-smoothing` | auto | - | auto | - |
| `--label-xxlarge-font-weight` | 450 | - | 450 | - |
| `--label-xxlarge-line-height` | 1.2 | - | 1.2 | - |

### Related APIs

#### Theming the label

A theme can re-point the label's paint through its named slots (`label-gray`, `label-underline`) without touching geometry. Slots take palette token references, so the surface still resolves through the device mode at render time. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for every slot and mixin.

```scss
@include theme-slots.border-token-slot("label-underline", "yellow-30");
```

Previous

[Value Display data values with consistent formatting](https://trmnl.com/framework/docs/3.2/value)

Next

[Description Format descriptive text with standardized styles](https://trmnl.com/framework/docs/3.2/description)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/description
     ============================================================ -->

# Description

Supporting body text, sized to sit under a Title or a Value rather than compete with it. Four size variants from base to xxlarge, with wrapping or line clamping for longer copy.

### Size Variants

Descriptions come in four size variants. Pick the one that matches the weight the line should carry in the content hierarchy.

```html
<!-- Base (default) -->
<span class="description">Base Description</span>

<!-- Large: larger text for emphasis -->
<span class="description description--large">Large Description</span>

<!-- Extra Large: prominent descriptions -->
<span class="description description--xlarge">XLarge Description</span>

<!-- Extra Extra Large: maximum emphasis -->
<span class="description description--xxlarge">XXLarge Description</span>

<!-- Using base modifier to reset to default size at breakpoint -->
<span class="description description--large md:description--base">
  Large by default, base on medium+ screens
</span>
```

### Text Overflow Behavior

Descriptions can handle longer text content through natural wrapping or text clamping. Understanding how descriptions behave with overflow content helps ensure your interface remains readable and visually balanced.

#### Multi-line Wrapping

By default, descriptions will wrap to multiple lines when content exceeds the available width, maintaining readability for longer text.

```html
<!-- Descriptions with longer text will wrap naturally -->
<span class="description">This longer description will wrap to multiple lines when it exceeds the width</span>
```

#### Text Clamping

Use the framework's `data-clamp` attribute to limit descriptions to a specific number of lines with ellipsis overflow.

```html
<!-- data-clamp applies to any description size (base, large, xlarge, xxlarge) -->

<!-- Single line clamping with data attribute -->
<span class="description" data-clamp="1">
  This text will be clamped to one line
</span>

<!-- Two line clamping -->
<span class="description" data-clamp="2">
  This text will be clamped to exactly two lines with ellipsis
</span>

<!-- Three line clamping with large size -->
<span class="description description--large" data-clamp="3">
  This larger text will be clamped to three lines
</span>
```

### Responsive Features

Description components support all three responsive systems: size-based, orientation-based, and bit-depth variants. This enables precise control over description appearance across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes per device size class.

```html
<!-- Base by default, xlarge on lg screens -->
<span class="description lg:description--xlarge">
  Responsive Description
</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label label--small">Base by default, xlarge on lg screens</span>

<!-- Using base modifier to reset to default size at breakpoint -->
<span class="description description--large md:description--base">
  Large by default, base on medium+ screens
</span>

<!-- Progressive size scaling -->
<span class="description sm:description--large md:description--xlarge lg:description--xxlarge">
  Progressive Description Sizing
</span>
```

#### Orientation and Size+Orientation

Description sizes can adapt to orientation with `portrait:` and can be combined with size breakpoints (e.g., `md:portrait:`).

```html
<!-- Large by default, base in portrait -->
<span class="description description--large portrait:description--base">Orientation Variant</span>

<!-- Caption describing the responsive behavior (optional) -->
<span class="label label--small">Large by default, base in portrait.</span>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--description-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--description-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--description-font-smoothing` | none | none | auto | - |
| `--description-font-weight` | 400 | 400 | 400 | - |
| `--description-line-height` | 1 | 1 | 1.2 | - |
| Large |
| `--description-large-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--description-large-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--description-large-font-smoothing` | none | none | auto | - |
| `--description-large-font-weight` | 400 | 400 | 700 | - |
| `--description-large-line-height` | 1.25 | 1.25 | 1.2 | - |
| Xlarge |
| `--description-xlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--description-xlarge-font-size` | calc(21px * var(--text-ui-scale)) | - | calc(21px * var(--text-ui-scale)) | - |
| `--description-xlarge-font-smoothing` | auto | - | auto | - |
| `--description-xlarge-font-weight` | 500 | - | 500 | - |
| `--description-xlarge-line-height` | 1.2 | - | 1.2 | - |
| Xxlarge |
| `--description-xxlarge-font-family` | "Inter Variable", Inter | - | "Inter Variable", Inter | - |
| `--description-xxlarge-font-size` | calc(24px * var(--text-ui-scale)) | - | calc(24px * var(--text-ui-scale)) | - |
| `--description-xxlarge-font-smoothing` | auto | - | auto | - |
| `--description-xxlarge-font-weight` | 475 | - | 475 | - |
| `--description-xxlarge-line-height` | 1.2 | - | 1.2 | - |

Previous

[Label Create clear labels for unified content identification](https://trmnl.com/framework/docs/3.2/label)

Next

[Divider Create horizontal or vertical dividers between elements](https://trmnl.com/framework/docs/3.2/divider)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/divider
     ============================================================ -->

# Divider

The Divider element provides a simple, standalone shorthand for horizontal and vertical separators. It uses the same border-level rendering pipeline as the Border utility and defaults to level 6.

### Usage

Use `divider` or `divider--h` for horizontal dividers, and `divider--v` for vertical dividers. Divider uses the same rendering pipeline as border utilities and defaults to border level 6.

The background variants (`divider--on-white`, `divider--on-light`, `divider--on-dark`, `divider--on-black`) are deprecated and will be removed in Framework 4.0. Pick an explicit border level or token instead.

#### Border Shorthand

Divider is a convenience alias for the common separator pattern. Use it when you want a one-pixel horizontal or vertical separator without writing a full border utility class.

```html
<!-- Horizontal shorthand (same rendering intent as border--h-6) -->
<div class="divider"></div>

<!-- Explicit horizontal class -->
<div class="divider--h"></div>

<!-- Vertical shorthand -->
<div class="divider--v"></div>
```

#### Vertical Dividers

Vertical dividers use the same border-level pipeline as horizontal dividers.

```html
<!-- Vertical divider -->
<div class="divider--v"></div>
```

#### Common Usage Patterns

```html
<!-- Replacing common border--h-x w--full pattern -->
<!-- Old way: -->
<div class="border--h-6 w--full"></div>

<!-- New way: -->
<div class="divider"></div>
```

### Dividers in JavaScript

The divider rail is readable from JS via `TRMNLPaint.divider({ dir })`, which resolves the level-6 rail straight from the live cascade (theme, bit depth and dark mode included), and `applyBorder()` paints the returned `BorderFill` onto a node. Unlike the `.border--*` utilities, the divider paints on the element itself, so it is probed there rather than on a pseudo. See [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders) .

Previous

[Description Format descriptive text with standardized styles](https://trmnl.com/framework/docs/3.2/description)

Next

[Rich Text Display formatted paragraphs with alignment and size variants](https://trmnl.com/framework/docs/3.2/rich_text)
