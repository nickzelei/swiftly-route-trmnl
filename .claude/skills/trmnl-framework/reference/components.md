<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/rich_text.md
     ============================================================ -->

# Rich Text

The Rich Text component provides a flexible container for displaying text content with consistent styling and layout options. It's commonly used for paragraphs, articles, and other formatted text content that needs to maintain readability and visual hierarchy.

### Understanding Richtext Components

The richtext system consists of two key parts working together: the parent `.richtext` container and its natural child `.content`[Content Limiter](/framework/docs/3.1/content_limiter) component.

The parent `.richtext` container is designed for flexibility and can hold any content. It controls the overall placement and spacing of the component within your layout.

The `.content` component is where your actual text content lives. It provides additional styling and formatting options specific to text.

Both components have separate alignment modifiers that serve different purposes. The table below summarizes each modifier:

| Class | Modifiers | Applies To | Controls | Example |
| --- | --- | --- | --- | --- |
| `richtext` | `left`,  `center`,  `right` | Container (`.richtext`) | Aligns the richtext container within its parent | `richtext--center` |
| `content` | `left`,  `center`,  `right` | Child content (`.content`) | Aligns the content block within the richtext container | `content--right` |
| `text` | `left`,  `center`,  `right` | Text elements inside `.content` | Aligns inline text within the content block | `text--center` |

This multi-level alignment system provides maximum flexibility for positioning both the component and its content independently.

### Rich Text Alignment

The Rich Text component can be aligned in three different ways: left, center, or right.
 Each alignment option provides different text positioning to suit various design needs.

#### Left Aligned

Left alignment is the default and most readable format for longer text content, ideal for paragraphs and articles.

This is an example of left-aligned rich text content. This alignment is generally best for readability with longer paragraphs of text.

Multiple paragraphs will maintain the same alignment, making it easy to read through longer content while maintaining visual consistency.

Rich TextLeft Aligned

    <div class="richtext richtext--left gap--large">
      <img class="image" src="/assets/trmnl--glyph-black-large.svg">
      <div class="content content--left gap text--left">
        <p>This is an example of left-aligned rich text content.</p>
        <p>Multiple paragraphs will maintain the same alignment.</p>
      </div>
    </div>

#### Center Aligned

Center alignment is ideal for headings, quotes, or shorter text that needs to be highlighted or visually balanced within the layout.

This is an example of center-aligned rich text content.

Centered text works well for quotes, headings, or highlighted information that needs visual emphasis.

Rich TextCenter Aligned

    <div class="richtext richtext--center gap--large">
      <img class="image" src="/assets/trmnl--glyph-black-large.svg">
      <div class="content content--center gap text--center">
        <p>This is an example of center-aligned rich text content.</p>
        <p>Centered text works well for quotes or highlighted information.</p>
      </div>
    </div>

#### Right Aligned

Right alignment is less common but can be useful for specific design scenarios or to create visual tension in layouts.

This is an example of right-aligned rich text content.

Right alignment can be used for captions, sidebars, or to create visual interest through contrasting alignments.

Rich TextRight Aligned

    <div class="richtext richtext--right gap--large">
      <img class="image" src="/assets/trmnl--glyph-black-large.svg">
      <div class="content content--right gap text--right">
        <p>This is an example of right-aligned rich text content.</p>
        <p>Right alignment can be used for captions or sidebars.</p>
      </div>
    </div>

### Content Size Variants

The Rich Text component offers six size variants: `small`, `base`, `large`, `xlarge`, `xxlarge`,
 and `xxxlarge`.
 The `content` class without size modifiers
 and the `content--base` class both produce the same visual result.
 Use `content--base` when you need to explicitly set the base size
 in responsive contexts. All size variants support responsive prefixes like `sm:`, `md:`, `lg:`,
 and `portrait:`.

This is xxxlarge size rich text content.

This is xxlarge size rich text content.

This is xlarge size rich text content.

This is large size rich text content.

This is base size rich text content.

This is small size rich text content.

Rich TextSize Variants

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

### Controlling Width

By default, the Rich Text content takes up as much space as it needs and is centered in the layout, expanding up to a maximum width.
 However, you can precisely control the width of content using Size utility classes[Size](/framework/docs/3.1/size) .

This Rich Text content has a fixed width of 240 pixels using utility classes.

Notice how the text is constrained to this specific width regardless of the container size.

Rich TextFixed Width: 240px

    <div class="richtext richtext--center gap--large">
      <div class="content w--[240px] text--center gap">
        <p>This Rich Text content has a fixed width of 240 pixels using utility classes.</p>
        <p>Notice how the text is constrained to this specific width regardless of the container size.</p>
      </div>
    </div>

You can use any of the Size system's fixed sizes (`w--32`, `w--64`, etc.),
 arbitrary sizes (`w--[250px]`), or responsive sizes (`w--full`, `w--auto`).
 This flexibility lets you create perfectly sized text blocks for any layout need.

### Responsive Features

The `content` component supports all three responsive systems: size-based, orientation-based, and bit-depth variants.
 This enables precise control over content text size across different device configurations.

#### Breakpoint Prefixes

Use breakpoint prefixes like `sm:`, `md:`, `lg:` to apply different content sizes at different screen widths.

Responsive content

Base by default, xxlarge on lg screens

Rich TextResponsive

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

#### Orientation and Size+Orientation

Content sizes can adapt to orientation with `portrait:` and `landscape:`, and can be combined
 with size breakpoints (e.g., `md:portrait:`).

Orientation variant content

Large by default, small in portrait.

Rich TextOrientation

    <!-- Large by default, small in portrait -->
    <div class="richtext gap--large">
      <div class="content content--large portrait:content--small">
        <p>Orientation variant content</p>
      </div>
    </div>

    <!-- Caption describing the responsive behavior -->
    <div class="content content--small">Large by default, small in portrait.</div>

#### Bit-Depth Responsive

Use bit-depth prefixes like `1bit:`, `2bit:`, and `4bit:` to optimize content text size
 for different display color capabilities.

Display optimized content

Large (1bit) → XLarge (2bit) → XXLarge (4bit)

Selective sizing

Base (1bit) → XLarge (4bit)

Rich TextBit-Depth Responsive

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

#### Combined Responsive Features

Combine multiple responsive systems for highly targeted content sizing. Use size, orientation,
 and bit-depth modifiers together following the pattern: `size:orientation:bit-depth:content--size`.

Advanced targeting

Complex responsive combinations

Multi-condition content

Multiple responsive conditions

Rich TextCombined Responsive

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

### Integration with Content Limiter

The Rich Text component works seamlessly with the Content Limiter utility[Content Limiter](/framework/docs/3.1/content_limiter) to handle overflowing text. When combined,
 it automatically adjusts text size to fit the available space, which is particularly useful in constrained layouts.

Simply add the `data-content-limiter="true"` attribute to your richtext content element. You can also specify a custom maximum height using the `data-content-max-height` attribute (e.g., `data-content-max-height="140"`).

When `data-content-limiter="true"` is present, the limiter auto-measures the available height in the nearest container and adjusts text to fit. You can override the auto height by specifying `data-content-max-height` with a pixel value.

Automatically resize text when content exceeds height limits

[View Content Limiter Documentation](/framework/docs/3.1/content_limiter)  

The Rich Text component with Content Limiter will automatically adjust text size when content exceeds the auto-measured available height. This is particularly useful for views with limited vertical space such as quadrants or half-horizontal layouts.  

Notice how this text is rendered smaller to fit within the quadrant view. Without Content Limiter, this text would overflow the container.

Rich TextWith Content Limiter

    <div class="richtext richtext--left gap--large">
      <div class="content" data-content-limiter="true">
        <p class="text--left">
          The Rich Text component with Content Limiter will automatically
          adjust text size when content exceeds the height threshold.
          This is particularly useful for views with limited vertical space.
        </p>
      </div>
    </div>

### Integration with Pixel Perfect

For optimal text rendering on ePaper displays, the Rich Text component can be enhanced with the Pixel Perfect utility[Pixel Perfect](/framework/docs/3.1/pixel_perfect) .
 This ensures text is rendered with crisp edges by aligning precisely to the pixel grid, preventing blurry or inconsistent text weight.

Simply add the `data-pixel-perfect="true"` attribute to your richtext content element.

Ensure crisp text rendering on 1-bit displays

[View Pixel Perfect Documentation](/framework/docs/3.1/pixel_perfect)  

This text is rendered with pixel perfect alignment, ensuring that each character aligns precisely with the pixel grid. Notice how the text appears crisp and clear with consistent weight.

Pixel Perfect is especially important for ePaper displays that use a 1-bit color space (just black and white), where anti-aliased gray pixels are forced to become either fully black or fully white.

Rich TextWith Pixel Perfect

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

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

Previous

[Divider Create horizontal or vertical dividers between elements](/framework/docs/3.1/divider)

Next

[Item Build standardized list items and content blocks](/framework/docs/3.1/item)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/item.md
     ============================================================ -->

# Item

The Item component provides a flexible container for displaying content with optional metadata and indexing. It's commonly used for lists, schedules, and other content that needs consistent formatting.

### Item Variants

Items can be displayed in four variants: with meta and index, with meta only, with meta emphasis levels, or in a simple format.
 Each variant provides different levels of visual hierarchy and information density.

#### With Meta

This variant includes a meta section without an index, providing space for optional metadata while maintaining a clean appearance.

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

Code ReviewReview pull requests for Project Beta

3:30 PM - 4:30 PMHigh Priority

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

ItemWith Meta

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

#### With Meta Emphasis

Apply `item--emphasis-1`, `item--emphasis-2` or `item--emphasis-3` to progressively darken the meta bar and draw attention. Level 1 is the default styling.

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

Code ReviewReview pull requests for Project Beta

3:30 PM - 4:30 PMHigh Priority

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

ItemEmphasis Levels

    <div class="item item--emphasis-1">
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

#### With Meta and Index

The most detailed variant includes both a meta section and an index number, useful for ordered lists or when additional context is needed.

1

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

2

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

3

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

4

Code ReviewReview pull requests for Project Beta

3:30 PM - 4:30 PMHigh Priority

1

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

2

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

3

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

ItemWith Meta and Index

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

#### Simple

The simplest variant focuses purely on content, ideal for basic lists or when metadata isn't needed.

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

Code ReviewReview pull requests for Project Beta

3:30 PM - 4:30 PMHigh Priority

Team MeetingWeekly team sync-up

9:00 AM - 10:00 AMConfirmed

Client PresentationQuarterly review with XYZ Corp

2:00 PM - 3:30 PMTentative

Project DeadlineSubmit final deliverables for Project Alpha

11:59 PMImportant

ItemSimple

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

#### With Icon

Add an `icon` div between meta and content to display an icon alongside the item.

72°Temperature

12 mphWind Speed

6UV Index

SunnyToday

Partly CloudyTomorrow

RainyWednesday

ItemWith Icon

    <div class="layout">
      <div class="item">
        <div class="meta"></div>
        <div class="icon">
          <img src="path/to/icon.svg" class="w--[6cqw] h--[6cqw] portrait:w--[10cqw] portrait:h--[10cqw]" />
        </div>
        <div class="content">
          <span class="value value--small">72°</span>
          <span class="label">Temperature</span>
        </div>
      </div>
    </div>

### List component (deprecated)

The `.list` class is deprecated. Prefer a column component, flex column, grid column, or a layout wrapper with a [Gap](/framework/docs/3.1/gap) utility instead. The [Overflow](/framework/docs/3.1/overflow) engine still supports legacy `.list` for backward compatibility.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--item-index-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | — |
| `--item-index-font-size` | 16px | 16px | calc(13px * var(--ui-scale)) | — |
| `--item-index-font-smoothing` | none | none | auto | — |
| `--item-index-font-weight` | 400 | 400 | 600 | — |
| `--item-index-line-height` | 1 | 1 | 1 | — |
| `--item-meta-width` | 10px | 10px | — | calc(10px * var(--ui-scale)) |

Previous

[Rich Text Display formatted paragraphs with alignment and size variants](/framework/docs/3.1/rich_text)

Next

[Table Create data tables optimized for 1-bit rendering](/framework/docs/3.1/table)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/table.md
     ============================================================ -->

# Table

The Table system provides structured data presentation with consistent styling and various size options. It's designed to display information in a clear, scannable format while maintaining visual hierarchy.

### Base Structure

Tables are built using standard HTML table elements with additional classes for styling.
 The base structure includes headers and data cells with consistent spacing and typography.

#### Default Table

The `table` class provides
 the standard table styling with comfortable spacing and clear visual hierarchy.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableRegular

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

#### Indexed Table

Add an opt‑in index column by placing a meta block in the cells you want indexed: `td .meta > span.index`. Add `table--indexed` to dock the meta block to the left and add padding for that column.

|  | Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| 2 | Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| 3 | Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| 4 | Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| 5 | Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| 6 | Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| 7 | Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| 8 | Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| 9 | Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| 10 | Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| 11 | Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| 12 | Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| 13 | Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| 14 | Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| 15 | Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| 16 | Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| 17 | Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| 18 | Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| 19 | Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| 20 | Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| 21 | Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| 22 | Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| 23 | David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| 24 | Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| 25 | Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| 26 | Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| 27 | Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| 28 | Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| 29 | Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| 30 | Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableIndexed

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

### Size Variants

Tables support five sizes: Base, Large, XLarge, Small, and XSmall. Use modifier classes to change row heights.

#### Base

The `table` class without size modifiers
 and the `table--base` class both produce the same visual result,
 providing the standard table styling with comfortable spacing and clear visual hierarchy.
 Use `table--base` when you need to explicitly set the base size
 in responsive contexts, such as `table--small lg:table--base`.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableBase

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

#### Large

Use `table--large` to increase row heights for more spacious tables.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableLarge

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

#### XLarge

Use `table--xlarge` for larger screens. Pairs well with larger font-sizes.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableXLarge

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

#### Small

Use `table--small` for a compact table with reduced row heights. The older `table--condensed` class remains supported as a backward-compatible alias.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableSmall

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

#### XSmall

Use `table--xsmall` for the most compact row heights.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableXSmall

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

### Overflow Engine

Demonstrates the Overflow behavior[Table Overflow](/framework/docs/3.1/table_overflow) and trailing “and X more” row when content exceeds the height budget.

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableOverflow

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

### Clamp Engine

Apply `data-clamp`[Clamp](/framework/docs/3.1/clamp) to each cell’s content to ensure consistent single-line truncation with ellipsis. This works with the Table Overflow behavior [Table Overflow](/framework/docs/3.1/table_overflow) .

| Employee | Role | Pranks | Sales | Score | Fun Fact |
| --- | --- | --- | --- | --- | --- |
| Dwight Schrute | Assistant to the Regional Manager | 24 | 44 | 12.91 | Owns a beet farm |
| Jim Halpert | Sales Rep | 42 | 21 | 8.69 | Dwight hates him |
| Stanley Hudson | Sales Rep | 0 | 28 | 5.83 | Only smiles on Pretzel Day |
| Phyllis Vance | Sales Rep | 0 | 18 | 3.79 | Married to Bob Vance |
| Andy Bernard | Sales Rep | 2 | 14 | 3.18 | Cornell graduate |
| Creed Bratton | Quality Assurance | ??? | ??? | ??? | ??? |
| Karen Filippelli | Sales / Utica Manager | 0 | 12 | 2.57 | Jim’s ex from Stamford |
| Michael Scott | Regional Manager | 15 | 0 | 1.65 | World’s Best Boss mug |
| Todd Packer | Traveling Salesman | 0 | 6 | 1.34 | Terrible human being |
| Ryan Howard | Temp / VP / Janitor | 1 | 2 | 0.63 | Pitched the Sabre Pyramid |
| Pam Beesly | Receptionist / Office Admin | 3 | 0 | 0.43 | Art school dreamer |
| Meredith Palmer | Supplier Relations | 0 | 1 | 0.32 | Exchanged paper for steak |
| Holly Flax | HR (Nashua) | 2 | 0 | 0.32 | Michael’s soulmate |
| Darryl Philbin | Warehouse Foreman | 1 | 0 | 0.22 | Started a band |
| Kevin Malone | Accountant | 1 | 0 | 0.22 | Spilled the chili |
| Erin Hannon | Receptionist | 1 | 0 | 0.22 | Dates Gabe, then Andy |
| Kelly Kapoor | Customer Service | 0 | 0 | 0.00 | Obsessed with Ryan |
| Angela Martin | Accountant | 0 | 0 | 0.00 | Owns 12 cats |
| Oscar Martinez | Accountant | 0 | 0 | 0.00 | “Actually...” guy |
| Roy Anderson | Warehouse | 0 | 0 | 0.00 | Pam’s ex-fiancé |
| Toby Flenderson | HR | 0 | 0 | 0.00 | Michael hates him |
| Jan Levinson | Corporate | 0 | 0 | 0.00 | Serenity by Jan |
| David Wallace | CFO | 0 | 0 | 0.00 | Invented “Suck It” |
| Robert California | CEO | 0 | 0 | 0.00 | The Lizard King |
| Nellie Bertram | Special Projects Manager | 0 | 0 | 0.00 | Took Andy’s job |
| Deangelo Vickers | Regional Manager | 0 | 0 | 0.00 | Juggled invisible balls |
| Charles Miner | Corporate VP | 0 | 0 | 0.00 | Hated Jim’s pranks |
| Gabe Lewis | Sabre Liaison | 0 | 0 | 0.00 | Tall, awkward, hates horror movies |
| Clark Green | Sales | 0 | 0 | 0.00 | Mini Dwight |
| Pete Miller | Sales | 0 | 0 | 0.00 | Nickname: Plop |

TableClamp: 1 line

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

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

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

Previous

[Item Build standardized list items and content blocks](/framework/docs/3.1/item)

Next

[Chart Visualize data optimized for 1-bit rendering](/framework/docs/3.1/chart)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/chart.md
     ============================================================ -->

# Chart

With careful, minimal styling choices, TRMNL can display a variety of numerical or time centric content as charts and graphs.

### Usage

Any CDN-enabled JavaScript library may be used to develop charting interfaces,
 however the examples below leverage [Highcharts](https://highcharts.com) and [Chartkick](https://chartkick.com).

If you set the `height: null` within your highchart's settings, the chart will automatically expand to fill the available space.

Take care to disable animation effects, otherwise your chart may be only partially captured by TRMNL's screenshot rendering service.

#### Line Chart

Line charts effectively display trends over time. This example shows a simple line chart with customized styling to match the TRMNL aesthetic.

25,388Pageviews

4,771Visitors

2.23Mins on Page

![TRMNL Logo](https://trmnl.com/images/plugins/trmnl--render.svg)ChartsLine Chart

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
        <img class="image" src="https://trmnl.com/images/plugins/simple-analytics--render.svg" alt="Simple Analytics Logo">
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

      // recommended configs to achieve the TRMNL Framework aesthetic
      var createChart = function() {
        new Chartkick["LineChart"](
        "chart-123",
        data,
        {
          adapter: "highcharts", // chartjs, google, etc available
          prefix: "",
          thousands: ",",
          points: false,
          colors: ["black"],
          curve: true,
          library: {
            chart: {
              height: 260,
              backgroundColor: 'transparent'
            },
            plotOptions: {
              series: {
                animation: false,
                lineWidth: 4
              }
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: "16px",
                  color:"#000000"
                }
              },
              gridLineDashStyle: "shortdot",
              gridLineWidth: 1,
              gridLineColor: "#000000",
              tickAmount: 5
            },
            xAxis: {
              type: "daytime",
              labels: {
                style: {
                  fontSize: "16px",
                  color: "#000000"
                }
              },
              lineWidth: 0,
              gridLineDashStyle: "dot",
              tickWidth: 1,
              tickLength: 0,
              gridLineWidth: 1,
              gridLineColor: "#000000",
              tickPixelInterval: 120
            }
          }
        });
      };

      // ensure your chart loads before plugin render is generated
      if ("Chartkick" in window) {
        createChart();
      } else {
        window.addEventListener("chartkick:load", createChart, true);
      }
    </script>

#### Multi-Series Line Chart

For comparing data across multiple time periods or categories, multi-series line charts are ideal. This example demonstrates a comparison between current and previous period data with distinct styling for each series.

$85,240Total Sales

32Pending Orders

Jul 01 - Jul 15 Current

$128AOV

665Fulfilled Orders

Jun 15 - Jun 30 Previous

![TRMNL Logo](https://trmnl.com/images/plugins/trmnl--render.svg)ChartsMulti-Series Line Chart

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
                    <div class="w--14 h--1.5 mb--2 bg--black" style="border-radius: 20px;"></div>
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
                    <div class="w--14 h--1.5 mb--2 bg--gray-5"></div>
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

          // Initialize chart with multiple series
          Highcharts.chart("multi-series-chart", {
            chart: {
              type: "spline",
              height: 203,
              width: null,
              animation: false,
              spacing: [10, 10, 5, 10],
              backgroundColor: "transparent"
            },
            title: {
              text: null
            },
            plotOptions: {
              series: {
                animation: false,
                enableMouseTracking: false,
                states: {
                  hover: { enabled: false }
                },
                marker: {
                  enabled: false
                }
              }
            },
            // Define series with different styles
            series: [{
              data: formattedData[0].data,
              lineWidth: 4,
              color: "#000000",
              name: formattedData[0].name,
              zIndex: 2  // Higher zIndex brings this series to front
            }, {
              data: formattedData[1].data,
              lineWidth: 5,
              name: formattedData[1].name,
              zIndex: 1,
              // Pattern fill for second series
              color: {
                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-5.png",
                  width: 12,
                  height: 12
                }
              }
            }],
            tooltip: { enabled: false },
            legend: { enabled: false },
            yAxis: {
              labels: {
                style: { fontSize: "16px", color: "#000000" }
              },
              gridLineDashStyle: "shortdot",
              gridLineWidth: 1,
              gridLineColor: "#000000",
              tickAmount: 5,
              title: {
                text: null
              }
            },
            xAxis: {
              type: "datetime",
              labels: {
                style: { fontSize: "16px", color: "#000000" },
                padding: 5,
                y: 25
              },
              lineWidth: 0,
              gridLineDashStyle: "dot",
              tickWidth: 1,
              tickLength: 0,
              gridLineWidth: 1,
              gridLineColor: "#000000",
              tickPixelInterval: 120,
              title: {
                text: null
              }
            },
            credits: {
              enabled: false
            }
          });
        </script>
      </div>

      <div class="title_bar">
        <img class="image" src="https://trmnl.com/images/plugins/trmnl--render.svg">
        <span class="title">Charts</span>
        <span class="instance">Multi-Series Line Chart</span>
      </div>
    </div>

#### Bar Chart

Bar charts are ideal for comparing discrete categories side by side. This example displays four different metrics across multiple time periods.

$31,883Revenue

$22,910Expenses

$8,990Marketing

$14,930Operations

![TRMNL Logo](https://trmnl.com/images/plugins/trmnl--render.svg)ChartsBar Chart

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
              <div class="w--14 h--1.5 mb--2 bg--black" style="border-radius: 20px;"></div>
              <span class="value value--tnums">$31,883</span>
              <span class="label">Revenue</span>
            </div>
          </div>
          <div class="item">
            <div class="meta"></div>
            <div class="content">
              <div class="w--14 h--1.5 mb--2 bg--gray-3"></div>
              <span class="value value--tnums">$22,910</span>
              <span class="label">Expenses</span>
            </div>
          </div>
          <div class="item">
            <div class="meta"></div>
            <div class="content">
              <div class="w--14 h--1.5 mb--2 bg--gray-5"></div>
              <span class="value value--tnums">$8,990</span>
              <span class="label">Marketing</span>
            </div>
          </div>
          <div class="item">
            <div class="meta"></div>
            <div class="content">
              <div class="w--14 h--1.5 mb--2 bg--gray-7"></div>
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

          // Initialize chart with bar/column configuration for 4 series
          Highcharts.chart("example-bar-chart", {
            chart: {
              type: "column",
              height: 284,
              width: null,
              animation: false,
              spacing: [10, 10, 5, 10],
              backgroundColor: "transparent"
            },
            title: {
              text: null
            },
            plotOptions: {
              series: {
                animation: false,
                enableMouseTracking: false,
                states: {
                  hover: { enabled: false }
                },
                pointPadding: 0.05,  // Reduced padding for more bars
                groupPadding: 0.1,
                borderWidth: 0
              }
            },
            // Define all four series with different styles
            series: [{
              data: formattedBarData[0].data,
              color: "#000000",
              name: formattedBarData[0].name,
              zIndex: 4  // Highest zIndex to keep this in front
            }, {
              data: formattedBarData[1].data,
              name: formattedBarData[1].name,
              zIndex: 3,
              color: {
                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-3.png",
                  width: 12,
                  height: 12
                }
              }
            }, {
              data: formattedBarData[2].data,
              name: formattedBarData[2].name,
              zIndex: 2,
              color: {
                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-5.png",
                  width: 12,
                  height: 12
                }
              }
            }, {
              data: formattedBarData[3].data,
              name: formattedBarData[3].name,
              zIndex: 1,
              color: {
                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-7.png",
                  width: 12,
                  height: 12
                }
              }
            }],
            tooltip: { enabled: false },
            legend: { enabled: false },
            yAxis: {
              labels: {
                style: { fontSize: "16px", color: "#000000" }
              },
              gridLineDashStyle: "shortdot",
              gridLineWidth: 1,
              gridLineColor: "#000000",
              tickAmount: 5,
              title: {
                text: null
              }
            },
            xAxis: {
              type: "category",
              labels: {
                style: { fontSize: "16px", color: "#000000" },
                padding: 5,
                y: 25
              },
              lineWidth: 0,
              gridLineDashStyle: "dot",
              tickWidth: 0,
              tickLength: 0,
              gridLineWidth: 1,
              gridLineColor: "#000000",
              title: {
                text: null
              }
            },
            credits: {
              enabled: false
            }
          });
        </script>
      </div>
    </div>

#### Gauge Chart

Gauge charts can effectively display single metrics or scores. This example shows multiple gauges in a row with a main summary gauge,
 perfect for displaying daily and weekly metrics like sleep quality scores.

Monday

Tuesday

Wednesday

Thursday

Friday

Saturday

Sunday

18%REM Sleep

23%Deep Sleep

12mTime to Sleep

7h 32minSleep Duration

8Toss & Turns

0.5%Snoring

![TRMNL Logo](https://trmnl.com/images/plugins/trmnl--render.svg)ChartsGauge Chart

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
            <div id="day_all" class="w-[340px] mt--5"></div>
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
          title: null,
          height: "80%",
          labels: {
            distance: 15,
            style: {
              fontSize: "16px"
            }
          },
          series: {
            fontSize: "3em"
          },
          yAxis: {
            title: textRating(score)
          }
        };

        Highcharts.chart(`day_${day}`, {
                            chart: {
            type: "gauge",
            height: opts.height,
            animation: false,
            backgroundColor: "transparent"
          },

                            title: {
            text: opts.title
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
                baseWidth: 0,
              },
            }
          },

          yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 0,
            tickColor: "#ffffff",
            tickLength: 40,
            tickPixelInterval: 40,
            tickWidth: 0,
            lineWidth: 0,
            title: {
              text: opts.yAxis.title,
              style: {
                color: "#000000",
                fontFamily: "NicoPups",
                fontSize: "16px"
              }
            },
            labels: {
              ...opts.labels,
              style: {
                fontSize: "16px"
              }
            },
            plotBands: [{
              from: 1,
              to: score,
                              color: {
                                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-2.png",
                                  width: 12,
                                  height: 12
                                }
              },
              innerRadius: "82%",
              borderRadius: "50%"
                            }, {
              from: score + 1,
              to: 100,
                              color: {
                                pattern: {
                  image: "https://trmnl.com/images/grayscale/gray-5.png",
                                  width: 12,
                                  height: 12
                }
              },
              innerRadius: "82%",
              borderRadius: "50%",
            }]
          },

          series: [{
            name: "Score",
            data: [score],
            dataLabels: {
              borderWidth: 0,
              style: {
                fontSize: opts.series.fontSize,
                fontWeight: opts.series.fontWeight || "400",
                fontFamily: opts.series.fontFamily || "inherit"
                                }
                              }
                            }],

          credits: {
            enabled: false
          }
        });
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

      // Create small daily gauges
      dailyScores.forEach((score, idx) => {
        let opts = {
          title: null,
          labels: { enabled: false },
          series: {
            fontSize: "16px",
            fontWeight: "400",
            fontFamily: "NicoClean"
          },
                            yAxis: {
            title: null
          }
        }
        createGauge(score, idx, opts);
      });

      // Create main weekly gauge
      createGauge(weeklyScore, "all", {
        title: null,
        height: "80%",
                              labels: {
          distance: 15
        },
        series: {
          fontSize: "3em",
          fontWeight: "550"
        },
        yAxis: {
          title: textRating(weeklyScore)
        }
      });
    </script>

Previous

[Table Create data tables optimized for 1-bit rendering](/framework/docs/3.1/table)

Next

[Progress Display progress bars in different styles](/framework/docs/3.1/progress)


<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.1/progress.md
     ============================================================ -->

# Progress

The Progress component provides visual indicators for completion status and step-based processes. Optimized for ePaper displays with bitmap patterns for 1-bit displays and solid colors for 4-bit+ displays.

### Progress Bar

Progress bars display continuous progress with a filled track. They support multiple sizes and emphasis levels for different visual weights and contexts.

#### Sizes

Progress bars come in five sizes: xsmall, small, base (default), regular (default, no modifier), and large. Use the `fill` element with inline width styling to set the progress percentage. The `progress-bar--base` modifier explicitly sets the default/regular size and is useful for responsive layouts.

Xsmall Progress25%

Small Progress25%

Base Progress50%

Regular Progress50%

Large Progress75%

ProgressBar Sizes

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

#### Emphasis

Progress bars support three emphasis levels: default, emphasis-2, and emphasis-3 for different visual weights.

Default Emphasis60%

Emphasis 260%

Emphasis 360%

ProgressBar Emphasis

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

### Progress Dots

Progress dots display discrete steps or stages in a process. They come in five sizes and show different states: filled (completed), current (active), and empty (upcoming).

#### Sizes

Progress dots come in five sizes: xsmall, small, base (default), regular (default, no modifier), and large. Each size maintains the same dot states and functionality. The `progress-dots--base` modifier explicitly sets the default/regular size and is useful for responsive layouts.

Xsmall Progress

Small Progress

Base Progress

Regular Progress

Large Progress

ProgressDots Sizes

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

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4/8/16-bit |
| --- | --- | --- | --- | --- |
| Base | | | | |
| `--progress-bar-height` | 24px | — | — | — |
| `--progress-bar-height-large` | 32px | — | — | — |
| `--progress-bar-height-small` | 12px | — | — | — |
| `--progress-bar-height-xsmall` | 6px | — | — | — |
| `--progress-dot-size` | 16px | — | — | — |
| `--progress-dot-size-large` | 20px | — | — | — |
| `--progress-dot-size-small` | 12px | — | — | — |
| `--progress-dot-size-xsmall` | 8px | — | — | — |

Previous

[Chart Visualize data optimized for 1-bit rendering](/framework/docs/3.1/chart)


