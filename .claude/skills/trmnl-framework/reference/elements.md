<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/title.md
     ============================================================ -->

# Title

The Title system provides consistent text headings with different size variants. It helps maintain visual hierarchy and readability throughout the interface.

### Size Variations

The Title system offers five size variants: small, base (default), large, xlarge, and xxlarge.

Small TitleBase TitleLarge TitleExtra Large TitleXXL Title

TitleSize Variations

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

### Responsive Titles

The Title system supports responsive variants using breakpoint prefixes.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes at different screen widths.

Responsive TitleSmall by default, xlarge on lg screens

TitleResponsive

    <!-- Small by default, xlarge on lg screens -->
    <span class="title title--small lg:title--xlarge">
      Responsive Title
    </span>

    <!-- Caption describing the responsive behavior (optional) -->
    <span class="label">Base by default, xlarge on lg screens</span>

#### Orientation and Size+Orientation

Title sizes can adapt to orientation with `portrait:` and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation VariantLarge by default, small in portrait.

TitleOrientation

    <!-- Large by default, small in portrait -->
    <span class="title title--large portrait:title--small">Orientation Variant</span>

    <!-- Caption describing the responsive behavior (optional) -->
    <span class="label">Large by default, small in portrait.</span>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

Previous

[Mashup Assemble multiple plugin views into a single interface](/framework/docs/3.1/mashup)

Next

[Value Display data values with consistent formatting](/framework/docs/3.1/value)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/value.md
     ============================================================ -->

# Value

The Value system provides consistent text styling for displaying numerical and textual values, with various size options and support for tabular numbers. It ensures readability and visual hierarchy across different contexts.

### Size Variants

The Value system offers twelve size variants, from XXSmall to Peta.

#### XXSmall

The `value--xxsmall` class creates the smallest text size.

Example48,206.62

ValueXXSmall

    <span class="value value--xxsmall">Example</span>
    <span class="value value--xxsmall value--tnums">48,206.62</span>

#### XSmall

The `value--xsmall` class provides a size slightly larger than XXSmall.

Example48,206.62

ValueXSmall

    <span class="value value--xsmall">Example</span>
    <span class="value value--xsmall value--tnums">48,206.62</span>

#### Small

The `value--small` class creates a smaller text size.

Example48,206.62

ValueSmall

    <span class="value value--small">Example</span>
    <span class="value value--small value--tnums">48,206.62</span>

#### Base

The base `value` class without size modifiers
 and the `value--base` class both produce the same visual result.
 See the [Responsive Values](#responsive-values) section for examples.

Example48,206.62

ValueBase

    <span class="value">Example</span>
    <span class="value value--tnums">48,206.62</span>

    <!-- Or using the base modifier -->
    <span class="value value--base">Example</span>
    <span class="value value--base value--tnums">48,206.62</span>

#### Large

The `value--large` class creates larger text.

Example48,206.62

ValueLarge

    <span class="value value--large">Example</span>
    <span class="value value--large value--tnums">48,206.62</span>

#### XLarge

The `value--xlarge` class provides larger text.

Example48,206.62

ValueXLarge

    <span class="value value--xlarge">Example</span>
    <span class="value value--xlarge value--tnums">48,206.62</span>

#### XXLarge

The `value--xxlarge` class creates very large text.

Example48,206.62

ValueXXLarge

    <span class="value value--xxlarge">Example</span>
    <span class="value value--xxlarge value--tnums">48,206.62</span>

#### XXXLarge

The `value--xxxlarge` class provides very large text.

Example48,206.62

ValueXXXLarge

    <span class="value value--xxxlarge">Example</span>
    <span class="value value--xxxlarge value--tnums">48,206.62</span>

#### Mega

The `value--mega` class creates extremely large text.

42

ValueMega

    <span class="value value--mega value--tnums">42</span>

#### Giga

The `value--giga` class provides massive text.

42

ValueGiga

    <span class="value value--giga value--tnums">42</span>

#### Tera

The `value--tera` class creates colossal text.

42

ValueTera

    <span class="value value--tera value--tnums">42</span>

#### Peta

The `value--peta` class provides the largest text.

42

ValuePeta

    <span class="value value--peta value--tnums">42</span>

### Numerical Display

The Value system includes special formatting options for numerical values.

#### Tabular Numbers

Add the `value--tnums` modifier to enable tabular numbers.

Regular: 48,206.62Tabular: 48,206.62

ValueTabular Numbers

    <span class="value value--large">Regular: 48,206.62</span>
    <span class="value value--large value--tnums">Tabular: 48,206.62</span>

### Responsive Values

The Value system supports responsive variants using breakpoint prefixes.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes at different screen widths.

Responsive Value1,234.56

ValueResponsive

    <!-- Small by default, large on md screens, xlarge on lg screens -->
    <span class="value value--small md:value--large lg:value--xlarge">
      Responsive Value
    </span>

    <!-- Progressive scaling with screen size -->
    <span class="value value--xsmall sm:value--small md:value--medium lg:value--large value--tnums">
      1,234.56
    </span>

    <!-- Using base modifier to reset to default size at breakpoint -->
    <span class="value value--small lg:value--base">
      Small by default, base on large screens
    </span>

#### Orientation and Size+Orientation

Value sizes can adapt to orientation with `portrait:` and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation Variant42,000.00

ValueOrientation

    <!-- Orientation only: smaller in portrait -->
    <span class="value value--large portrait:value--small">Orientation Variant</span>

    <!-- Size + orientation: xlarge only on md+ screens in portrait -->
    <span class="value value--small md:portrait:value--xlarge value--tnums">42,000.00</span>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

[Title Style headings with consistent typography](/framework/docs/3.1/title)

Next

[Label Create clear labels for unified content identification](/framework/docs/3.1/label)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/label.md
     ============================================================ -->

# Label

The Label system provides various styles for displaying text labels, with options for different visual treatments and sizes. The filled variant uses black (darkest) background; label--primary, label--success, etc. use semantic colors. Labels can be used to highlight text, show status, or create visual hierarchy in your interface.

### Size and Style Variants

Labels come in several style variants to suit different use cases. Each variant provides a distinct visual style
 that can be combined with any size modifier.

Small

Base

Large

XLarge

XXLarge

Default

Label

Label

Label

Label

Label

Outline

Label

Label

Label

Label

Label

Underline

Label

Label

Label

Label

Label

Gray

Label

Label

Label

Label

Label

Filled

Label

Label

Label

Label

Label

LabelStyle Variants

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

#### Semantic variants

Use `label--primary`, `label--success`, `label--error`, `label--warning` for intent-based colors. `label--filled` uses black (darkest). Success and warning use black text; warning uses yellow background. See [Colors](/framework/docs/3.1/colors) for the semantic mapping.

FilledPrimarySuccessErrorWarning

LabelSemantic Colors

### Text Overflow Behavior

Labels can handle longer text content through natural wrapping or text clamping. Understanding how labels behave with
 overflow content helps ensure your interface remains readable and visually balanced.

#### Multi-line Wrapping

By default, labels will wrap to multiple lines when content exceeds the available width,
 maintaining readability for longer text.

Small

Base

Large

Default

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

Underline

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

Filled

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

This longer label will wrap to multiple lines when it exceeds the width

LabelMulti-line

    <!-- Labels with longer text will wrap naturally -->
    <span class="label">This longer label will wrap to multiple lines when it exceeds the width</span>

#### Text Clamping

Use the framework's `data-clamp` attribute to limit labels to a specific number of lines with ellipsis overflow.

Small

Base

Large

1-line

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

2-line

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

Underline 1

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

Underline 2

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long label text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

LabelClamped

    <!-- data-clamp applies to any label size (small, base, large, xlarge, xxlarge) -->

    <!-- Single line clamping with data attribute -->
    <span class="label" data-clamp="1">
      This text will be clamped to one line
    </span>

    <!-- Two line clamping -->
    <span class="label" data-clamp="2">
      This text will be clamped to exactly two lines with ellipsis
    </span>

### Responsive Features

Label components support all three responsive systems: size-based, orientation-based, and bit-depth variants.
 This enables precise control over label appearance across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes and styles at different screen widths.

Responsive LabelSmall by default, xlarge on lg screens

LabelResponsive

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

#### Orientation and Size+Orientation

Label sizes can adapt to orientation with `portrait:` and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation VariantLarge by default, small in portrait.

LabelOrientation

    <!-- Large by default, small in portrait -->
    <span class="label label--large portrait:label--small">Orientation Variant</span>

    <!-- Caption describing the responsive behavior (optional) -->
    <span class="label label--small">Large by default, small in portrait.</span>

#### Bit-Depth Responsive

Use bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to optimize label appearance
 for different display color capabilities.

Display OptimizedFilled (1bit) → Outline (2bit) → Underline (4bit)

Selective StylingOutline (1bit) → Gray (4bit)

LabelBit-Depth Responsive

    <!-- Different styles for different bit-depth displays -->
    <span class="label 1bit:label--filled 2bit:label--outline 4bit:label--underline">
      Display Optimized
    </span>

    <!-- Selective bit-depth targeting -->
    <span class="label 1bit:label--outline 4bit:label--gray">
      Selective Styling
    </span>

#### Combined Responsive Features

Combine multiple responsive systems for highly targeted label styling. Use size, orientation,
 and bit-depth modifiers together following the pattern: `size:orientation:bit-depth:utility`.

Advanced TargetingComplex responsive combinations

Multi-ConditionMultiple responsive conditions

LabelCombined Responsive

    <!-- Highly targeted responsive combinations -->
    <span class="label md:portrait:2bit:label--filled lg:4bit:label--outline">
      Advanced Targeting
    </span>

    <!-- Multiple responsive conditions -->
    <span class="label sm:1bit:label--underline md:portrait:label--outline lg:4bit:label--gray">
      Multi-Condition
    </span>

### Backward Compatibility

The gray-out label variant has been renamed from `label--gray-out` to `label--gray`. The legacy class name still works and maps to the
 same bit-depth responsive styling. Prefer the new name going forward.

The inverted label has been renamed to `label--filled` (black background).
 Use `label--primary`, `label--success`, etc. for semantic colors. `label--inverted` remains as an alias for `label--filled`.

    <!-- Deprecated (but still works) -->
    <span class="label label--gray-out">Gray label (deprecated)</span>
    <span class="label label--inverted">Inverted (alias)</span>

    <!-- Preferred (new naming) -->
    <span class="label label--gray">Gray label (preferred)</span>
    <span class="label label--filled">Filled label (preferred)</span>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

Previous

[Value Display data values with consistent formatting](/framework/docs/3.1/value)

Next

[Description Format descriptive text with standardized styles](/framework/docs/3.1/description)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/description.md
     ============================================================ -->

# Description

The Description component provides a standardized way to display descriptive text content with consistent styling.

### Size Variants

Descriptions come in four size variants to suit different use cases. Each variant provides a distinct visual style
 that can be used for various content hierarchies.

Base

Large

XLarge

XXLarge

Description

Description

Description

Description

DescriptionSize Variants

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

### Text Overflow Behavior

Descriptions can handle longer text content through natural wrapping or text clamping. Understanding how descriptions behave with
 overflow content helps ensure your interface remains readable and visually balanced.

#### Multi-line Wrapping

By default, descriptions will wrap to multiple lines when content exceeds the available width,
 maintaining readability for longer text.

Base

Large

XLarge

XXLarge

This longer description will wrap to multiple lines when it exceeds the available width

This longer description will wrap to multiple lines when it exceeds the available width

This longer description will wrap to multiple lines when it exceeds the available width

This longer description will wrap to multiple lines when it exceeds the available width

DescriptionMulti-line

    <!-- Descriptions with longer text will wrap naturally -->
    <span class="description">This longer description will wrap to multiple lines when it exceeds the width</span>

#### Text Clamping

Use the framework's `data-clamp` attribute to limit descriptions to a specific number of lines with ellipsis overflow.

Base

Large

XLarge

XXLarge

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

This is a very long description text that would normally wrap to many lines but demonstrates how clamping behavior works with different variants and line limits to show ellipsis overflow

DescriptionClamped

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

### Responsive Features

Description components support all three responsive systems: size-based, orientation-based, and bit-depth variants.
 This enables precise control over description appearance across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different sizes at different screen widths.

Responsive DescriptionBase by default, xlarge on lg screens

DescriptionResponsive

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

#### Orientation and Size+Orientation

Description sizes can adapt to orientation with `portrait:` and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation VariantLarge by default, base in portrait.

DescriptionOrientation

    <!-- Large by default, base in portrait -->
    <span class="description description--large portrait:description--base">Orientation Variant</span>

    <!-- Caption describing the responsive behavior (optional) -->
    <span class="label label--small">Large by default, base in portrait.</span>

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

Previous

[Label Create clear labels for unified content identification](/framework/docs/3.1/label)

Next

[Divider Create horizontal or vertical dividers between elements](/framework/docs/3.1/divider)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/divider.md
     ============================================================ -->

# Divider

The Divider element provides a simple, standalone way to create visual separations in your layouts. Dividers automatically adapt to their background color for optimal visibility across four background types: white, light, dark, and black.

### Usage

Use `divider` or `divider--h` for horizontal dividers,
 and `divider--v` for vertical dividers.
 Dividers automatically detect their background and adjust their appearance for optimal contrast.

#### Automatic Background Detection

By default, dividers automatically detect whether they're on a white, light, dark, or black background and adjust their appearance accordingly.
 The system categorizes backgrounds into four types for optimal contrast:

- **White:** Very light backgrounds (gray-70 to gray-75 and pure white)
- **Light:** Light gray backgrounds (gray-50 to gray-65)
- **Dark:** Dark gray backgrounds (gray-30 to gray-45)
- **Black:** Very dark backgrounds (gray-10 to gray-25 and pure black)


White Background

Divider uses darkest style (level 7)

Light Background (gray-70)

Divider uses dark style (level 6)

Dark Background (gray-30)

Divider uses light style (level 3)

Black Background

Divider uses lightest style (level 1)

Auto Background Detection

    <!-- Dividers automatically detect their background -->
    <div class="bg--white">
      <div class="divider"></div> <!-- Automatically becomes divider--on-white -->
    </div>

    <div class="bg--gray-20">
      <div class="divider"></div> <!-- Automatically becomes divider--on-light -->
    </div>

    <div class="bg--gray-50">
      <div class="divider"></div> <!-- Automatically becomes divider--on-dark -->
    </div>

    <div class="bg--black">
      <div class="divider"></div> <!-- Automatically becomes divider--on-black -->
    </div>

#### Manual Background Control

You can manually specify the background type using `divider--on-white`, `divider--on-light`, `divider--on-dark`, or `divider--on-black` classes when automatic detection isn't suitable.

All variants on white

on-white (optimal)

on-light

on-dark

on-black (poor contrast)

All variants on black

on-white (poor contrast)

on-light

on-dark

on-black (optimal)

Manual Background Control

    <!-- Manually specify background type -->
    <div class="divider--on-white"></div>  <!-- For white backgrounds -->
    <div class="divider--on-light"></div>  <!-- For light backgrounds -->
    <div class="divider--on-dark"></div>   <!-- For dark backgrounds -->
    <div class="divider--on-black"></div>  <!-- For black backgrounds -->

    <!-- Works with vertical dividers too -->
    <div class="divider--v divider--on-white"></div>
    <div class="divider--v divider--on-light"></div>
    <div class="divider--v divider--on-dark"></div>
    <div class="divider--v divider--on-black"></div>

#### Vertical Dividers

Vertical dividers work the same way as horizontal dividers, with automatic background detection for all four background types.

Left SideWhite background

Right SideAuto-detected

Left SideBlack background

Right SideAuto-detected

Vertical Dividers

    <!-- Vertical divider with auto background detection -->
    <div class="divider--v"></div>

    <!-- Manually specified vertical dividers -->
    <div class="divider--v divider--on-white"></div>
    <div class="divider--v divider--on-light"></div>
    <div class="divider--v divider--on-dark"></div>
    <div class="divider--v divider--on-black"></div>

#### Common Usage Patterns

$1,234Revenue

42Orders

$29.38AOV

Section Separation

    <!-- Replacing common border--h-x w--full pattern -->
    <!-- Old way: -->
    <div class="border--h-6 w--full"></div>

    <!-- New way (with auto background detection): -->
    <div class="divider"></div>

    <!-- Or with manual specification: -->
    <div class="divider--on-light"></div>

Previous

[Description Format descriptive text with standardized styles](/framework/docs/3.1/description)

Next

[Rich Text Display formatted paragraphs with alignment and size variants](/framework/docs/3.1/rich_text)


