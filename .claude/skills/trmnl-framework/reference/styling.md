<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/background
     ============================================================ -->

# Background

Use the color palette defined in [Colors](https://trmnl.com/framework/docs/3.2/colors). Apply these shades with bg--{token} for backgrounds. On 1-bit displays, grayscale uses dither patterns; on 2-bit and 4-bit+, solid colors render.

### Grayscale

Grayscale background shades only, including the center spacer between 40 and 45.

**Dark Mode Notice:** The color palette appears inverted because dark mode remaps the framework tokens: black and white swap, grays and chromatic steps mirror. Images are not affected unless they opt in via `image--adaptive`. Themed screens are exempt from dark mode entirely.

### Base Colors

Full base palettes for background tokens: grayscale and all chromatic hues with every shade step.

### Usage

Use the `bg--{shade}` utility classes to apply these background patterns to any element. The shade comes from one of three schemes (see [Colors](https://trmnl.com/framework/docs/3.2/colors)):

- **Grayscale:** `bg--black`, `bg--gray-10` through `bg--gray-75`, and `bg--white`. 
- **Chromatic:** `bg--{hue}` for the pure color (e.g. bg--red, bg--green), or `bg--{hue}-{step}` for a step on that hue's ladder (e.g. bg--red-50, bg--blue-40). 
- **Semantic:** `bg--primary`, `bg--success`, `bg--error`, and `bg--warning`. 
- **Surface roles:** `bg--canvas`, `bg--surface`, and `bg--backdrop` paint the screen's own background roles.
The surface roles resolve through the theme slot chain, so a theme repaints them. Reach for them when a block should follow the screen instead of pinning a shade a theme cannot move. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) .

```html
<div class="bg--black">Black</div>
<div class="bg--gray-10">Gray 10</div>
<div class="bg--gray-15">Gray 15</div>
<div class="bg--gray-20">Gray 20</div>
<div class="bg--gray-25">Gray 25</div>
<div class="bg--gray-30">Gray 30</div>
<div class="bg--gray-35">Gray 35</div>
<div class="bg--gray-40">Gray 40</div>
<div class="bg--gray-45">Gray 45</div>
<div class="bg--gray-50">Gray 50</div>
<div class="bg--gray-55">Gray 55</div>
<div class="bg--gray-60">Gray 60</div>
<div class="bg--gray-65">Gray 65</div>
<div class="bg--gray-70">Gray 70</div>
<div class="bg--gray-75">Gray 75</div>
<div class="bg--white">White</div>
```

**Device Preview tip:** Use the Device Preview (top right) to switch between grayscale and color palettes. Try Inky Impression 7.3 (color-7a) or Tidbyt (color-24bit) to see chromatic colors.

#### Chromatic tokens

Use `bg--{hue}-{step}` and `text--{hue}-{step}` for color backgrounds and text.

```html
<div class="bg--red">Pure red</div>
<div class="bg--red-50">Red 50</div>
<div class="bg--blue-40">Blue 40</div>
<div class="bg--green-60">Green 60</div>
<div class="text--red-50">Red text</div>
```

#### Semantic tokens

Use `bg--{role}` and `text--{role}` for intent-based colors. Roles: primary, success, error, warning. See [Colors](https://trmnl.com/framework/docs/3.2/colors) for the full mapping.

```html
<div class="bg--primary text--white">Primary</div>
<div class="bg--success text--white">Success</div>
<div class="bg--error text--white">Error</div>
<div class="text--warning">Warning text</div>
```

### Related APIs

#### Reading background paint from JavaScript

The `bg(token, { el })` resolver returns the exact paint a `bg--{token}` utility would apply, as a canonical Fill read from the live cascade with bit depth, dark mode, and theme resolved. Apply it to canvases, SVGs, or chart options. See [Painting Colors](https://trmnl.com/framework/docs/3.2/paint_colors) for every resolver and the Fill shape.

```javascript
var fill = TRMNLPaint.bg("gray-30", { el: "my-node" });
```

Previous

[Visibility Control element visibility based on display bit depth](https://trmnl.com/framework/docs/3.2/visibility)

Next

[Border Apply border patterns that create the illusion of different border intensities](https://trmnl.com/framework/docs/3.2/border)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/border
     ============================================================ -->

# Border

Draw a horizontal or vertical rule on any element with the border--h and border--v utilities, named on the same 10 to 75 shade scale as backgrounds. On 1-bit displays a step renders as a dither pattern of black and white pixels, so a rule can read as gray. 4-bit and full-color screens draw all 14 steps; the other rails pair them onto seven levels.

### Usage

Use directional step selectors: `border--h-{step}` and `border--v-{step}` with steps 10 to 75 (the background utility shade scale), plus semantic `border--h-black` / `border--h-white`. Borders render grayscale by default; themes repaint the whole rail.

4-bit and full-color screens give each of the 14 steps its own art. Everywhere else (the default rail, 1-bit, 2-bit, and the limited palettes) the steps pair onto the seven border levels, so `border--h-40` and `border--h-45` draw the same line.

Pick steps two apart when two rules have to read differently on a 1-bit panel.

The numbered level classes (`border--h-1` through `border--h-7`, and their vertical counterparts) are deprecated and will be removed in Framework 4.0. Prefer step selectors in new markup.

#### Horizontal Borders

**Dark Mode Notice:** The color palette appears inverted because dark mode remaps the framework tokens: black and white swap, grays and chromatic steps mirror. Images are not affected unless they opt in via `image--adaptive`. Themed screens are exempt from dark mode entirely.

```html
<div class="border--h-10">Dark border</div>
<div class="border--h-45">Mid border</div>
<div class="border--h-75">Light border</div>
```

#### Vertical Borders

```html
<div class="border--v-20">Vertical border</div>
<div class="border--v-65">Vertical border</div>
```

### Themed Borders

There are no per-hue border classes: the step rail renders the classic patterns by default, and a theme recolors them (and `.divider`) without changing their geometry via `theme-slots.utility-remap-border-grayscale($hue, $side)`. The `dark` side paints black-on-hue, `bright` paints hue-on-white. Pick a Style in the screen picker to watch the rails above repaint.

The 2-bit rail is the exception: its four tones are literal in the line data, so a hue remap leaves it black, white and two grays. That is deliberate, since a hue quantizes to gray on a 4-tone panel anyway.

A theme that wants to move the 2-bit rail names levels instead, with `theme-slots.utility-border-level($level, $dir, $from-level)`, the way the shipped Dark theme does. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) .

```html
@include theme-slots.utility-remap-border-grayscale("yellow", $side: "dark");
@include theme-slots.utility-remap-border-grayscale("red", $side: "bright");
```

### Black & White Borders

Semantic `border--h-black` / `border--h-white` borders adapt to themes automatically. They resolve through framework semantic fill tokens, so they always represent the strongest and softest fill in the current theme context.

```html
<div class="border--h-black">Black border (strongest fill)</div>
<div class="border--h-white">White border (softest fill)</div>
<div class="border--v-black">Black vertical border</div>
<div class="border--v-white">White vertical border</div>
```

### Borders in JavaScript

Border rails are readable from JS through the paint API: `TRMNLPaint.border(spec, { dir })` resolves a step, or the literal `'black'` / `'white'` rails straight from the live cascade (theme tinting, bit depth and dark mode included), and `applyBorder()` paints it onto a node. Because these fill-backed utilities carry real ink in every mode, they are the reliable hairline source for JS-drawn visuals like chart grids. See [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders) .

Previous

[Background Apply color tokens as backgrounds with bg--{token}](https://trmnl.com/framework/docs/3.2/background)

Next

[Rounded Control element rounding with predefined values](https://trmnl.com/framework/docs/3.2/rounded)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/rounded
     ============================================================ -->

# Rounded

Utility classes for corner radius. Predefined sizes, per-corner control, and arbitrary pixel values.

### Size Variants

The rounded system includes predefined base sizes and arbitrary pixel values. These standardized radii help maintain consistent corner rounding across your application's components.

#### Base

The base `rounded` class without size modifiers and the `rounded--base` class both produce the same visual result, providing the standard border radius (10px). Use `rounded--base` when you need to explicitly set the base size in responsive contexts. See the [Responsive Rounded](#responsive-rounded) section for examples.

```html
<!-- Available rounded sizes from sharp to pill -->
<div class="rounded--none">...</div>     <!-- 0px -->
<div class="rounded--xsmall">...</div>   <!-- 5px -->
<div class="rounded--small">...</div>    <!-- 7px -->
<div class="rounded">...</div>           <!-- 10px (default) -->
<div class="rounded--base">...</div>     <!-- 10px (explicit base) -->
<div class="rounded--medium">...</div>   <!-- 15px -->
<div class="rounded--large">...</div>    <!-- 20px -->
<div class="rounded--xlarge">...</div>   <!-- 25px -->
<div class="rounded--xxlarge">...</div>  <!-- 30px -->
<div class="rounded--full">...</div>     <!-- 9999px (pill shape) -->

<!-- Or using the base modifier -->
<div class="rounded--base">...</div>
```

#### Arbitrary

Use `rounded--[Npx]` syntax to specify exact pixel values from **0px to 50px**. This rounds all four corners and does not support responsive variants. Corner-specific utilities take the named sizes only.

```html
<!-- Custom rounded values from 0px to 50px (no responsive support) -->
<div class="rounded--[0px]">...</div>
<div class="rounded--[10px]">...</div>
<div class="rounded--[20px]">...</div>
<div class="rounded--[30px]">...</div>
<div class="rounded--[40px]">...</div>
<div class="rounded--[50px]">...</div>

<!-- Corner-specific utilities take the named sizes -->
<div class="rounded-t--large">...</div>
```

Arbitrary rounded values using the `rounded--[Npx]` syntax do not support responsive variants. Use predefined rounded classes if you need responsive behavior.

### Corner-Specific Rounding

Apply border radius to specific corners or sides of an element. This allows for more complex shapes and asymmetric designs while maintaining consistency.

#### Individual Corners

Target specific corners with `rounded-{corner}`, where corner is tl (top-left), tr (top-right), br (bottom-right), or bl (bottom-left). Add a size with a second double dash: `rounded-tl--large`.

Every corner takes the full size scale, the same one the all-corners class uses: bare (base), `--base`, `--none`, `--xsmall`, `--small`, `--medium`, `--large`, `--xlarge`, `--xxlarge`, and `--full`.

#### Side Rounding

Round entire sides with `rounded-{side}`, where side is t (top), r (right), b (bottom), or l (left). Sides take the same size scale as the corners, so `rounded-t` is the base radius and `rounded-t--xxlarge` is the widest.

```html
<!-- Individual corners -->
<div class="rounded-tl--large">Top left corner</div>
<div class="rounded-tr--large">Top right corner</div>
<div class="rounded-br--large">Bottom right corner</div>
<div class="rounded-bl--large">Bottom left corner</div>

<!-- Entire sides -->
<div class="rounded-t--large">Top corners</div>
<div class="rounded-r--large">Right corners</div>
<div class="rounded-b--large">Bottom corners</div>
<div class="rounded-l--large">Left corners</div>
```

### Responsive Rounded

Rounded utilities support size-based breakpoints, orientation variants, and their combination. Use prefixes like `md:`, `portrait:`, and `md:portrait:` to target conditions.

#### Base Examples

Apply different border radius values at different breakpoints using the size-based responsive system. The framework follows a mobile-first approach where larger breakpoints inherit smaller ones. The `--base` modifier is particularly useful for resetting to the default size at specific breakpoints.

```html
<!-- Orientation example -->
<div class="rounded--xlarge portrait:rounded--small">
  Xlarge in landscape, small in portrait
</div>
```

#### Corner-Specific Examples

Corner-specific rounding utilities support responsive variants just like base rounded utilities. Use prefixes like `md:`, `portrait:`, and `md:portrait:` to apply different corner rounding at different breakpoints.

```html
<!-- Orientation example -->
<div class="rounded-tl--xlarge portrait:rounded-tl--small">
  Xlarge in landscape, small in portrait
</div>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--progress-bar-radius` | calc(10px * var(--ui-scale)) | - | - | - |
| `--rounded-full` | 9999px | - | - | - |
| `--rounded-large` | 20px | - | - | - |
| `--rounded-medium` | 15px | - | - | - |
| `--rounded-none` | 0px | - | - | - |
| `--rounded-small` | 7px | - | - | - |
| `--rounded-xlarge` | 25px | - | - | - |
| `--rounded-xsmall` | 5px | - | - | - |
| `--rounded-xxlarge` | 30px | - | - | - |
| `--title-bar-border-radius` | calc(10px * var(--ui-scale)) | calc(10px * var(--ui-scale)) | - | calc(10px * var(--ui-scale)) |

Previous

[Border Apply border patterns that create the illusion of different border intensities](https://trmnl.com/framework/docs/3.2/border)

Next

[Outline Pixel-perfect dotted rounded borders drawn with CSS gradients on 1-bit displays](https://trmnl.com/framework/docs/3.2/outline)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/outline
     ============================================================ -->

# Outline

The Outline utility draws a pixel-perfect dotted rounded border on any element. On 1-bit displays it places single-pixel dots at exact integer coordinates with pure CSS gradients; on 2-bit and 4-bit displays it falls back to a standard CSS border with border-radius.

### Basic Usage

The outline utility applies a pixel-perfect dotted rounded border to any element. On 1-bit displays, it uses pure CSS gradients to place single-pixel dots at exact integer coordinates along a rounded rectangle path. On 2-bit and 4-bit displays, it falls back to a standard CSS border with border-radius.

#### Applying an Outline

Add the `outline` class to any element to give it a pixel-perfect rounded border.

```html
<!-- Add outline to any element -->
<div class="outline">
  Content with pixel-perfect rounded border
</div>
```

### How It Works

The outline utility uses 56 CSS background layers to place each dot at an exact integer pixel coordinate. Four edge layers use `repeating-linear-gradient` for a 1px dot every 4px, and 16 corner layers use individual `linear-gradient` blocks sized to 1x1px and positioned with pixel-precise offsets. The remaining 36 layers are corner fill-ins that stay transparent until a device with a dither pixel ratio of 2 or more turns them on.

`dither-pixel-ratio` is a separate profile field from `pixel-ratio`. TRMNL V2 previews at pixel ratio 1.8 and still renders its art at double density, so it gets the fill-ins.

#### CSS Gradient Dots

No images are used. Each dot is computed mathematically by the CSS engine, guaranteeing pixel-grid alignment at any element size.

The dot color resolves in three steps: `--framework-semantic-border-strong-border-color`, then `--framework-outline-strong`, then `--framework-border-strong`. A theme repoints the first step through `theme-slots.semantic-border`, so dark mode and themes recolor the outline without separate assets.

```html
/* How the CSS works internally (simplified) */
.outline::after {
    background:
        /* Edges: repeating 1px dot every 4px */
        repeating-linear-gradient(to right, black 0 1px, transparent 1px 4px)
            12px 0 / calc(100% - 24px) 1px no-repeat,
        /* ... 3 more edges ... */
        /* Corners: individual 1x1px dots */
        linear-gradient(black, black) 8px 0 / 1px 1px no-repeat,
        linear-gradient(black, black) 4px 1px / 1px 1px no-repeat,
        /* ... 14 more corner dots ... */
        /* ... 36 high-DPI corner fill-ins ... */
}
```

### Bit-Depth Behavior

The outline utility adapts to different display bit-depths automatically. On 1-bit displays, it uses CSS gradient dots for pixel-perfect rendering. On 2-bit and 4-bit displays, it falls back to standard CSS borders with border-radius for smoother rendering.

#### 1-bit Displays

Uses pure CSS gradients to place sparse single-pixel dots at exact integer coordinates. Dark mode works automatically because `--framework-semantic-border-strong-border-color` flips to white.

#### 2-bit and 4-bit Displays

Falls back to a standard 1px solid border for smoother rendering that takes advantage of the additional grayscale capabilities. The corner radius is 7px, scaled by the content scale.

```html
/* 1-bit: CSS gradient dots (via outline-dots mixin) */
.outline::after {
    @include outline-dots;
}

/* 2-bit and 4-bit: Falls back to CSS border */
.screen--2bit .outline::after,
.screen--4bit .outline::after {
    background: none;
    border: 1px solid var(--framework-semantic-border-strong-border-color,
        var(--framework-outline-strong, var(--framework-border-strong)));
    border-radius: calc(7px * var(--content-scale, 1));
}
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--rounded-full` | 9999px | - | - | - |
| `--rounded-large` | 20px | - | - | - |
| `--rounded-medium` | 15px | - | - | - |
| `--rounded-none` | 0px | - | - | - |
| `--rounded-small` | 7px | - | - | - |
| `--rounded-xlarge` | 25px | - | - | - |
| `--rounded-xsmall` | 5px | - | - | - |
| `--rounded-xxlarge` | 30px | - | - | - |

Previous

[Rounded Control element rounding with predefined values](https://trmnl.com/framework/docs/3.2/rounded)

Next

[Image Optimize images using dithering techniques for 1-bit rendering](https://trmnl.com/framework/docs/3.2/image)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/image
     ============================================================ -->

# Image

Place images on a screen and control their size, object fit, and inversion. On 1-bit displays, dithering arranges black and white pixels so an image still reads as shades of gray.

### Dithering

Add `image-dither` to a raster image to have it dithered to the screen's palette. The dithering itself is a platform behavior: TRMNL applies it when it renders the screen, and no rule in `plugins.css` or `plugins.js` reads the class.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You mark the image and the platform dithers it to the target device's palette at render time.

You dither the image yourself before you serve it. A released build from the CDN and a build compiled from this source both ship the same CSS, and neither one dithers.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- Full-color source, dithered by the platform -->
<img class="image image-dither rounded" src="path to the image file">
```

div]:flex-1 [&>div]:min-h-0">

```html
<!-- Pre-dithered source, served as-is -->
<img class="image rounded" src="path to the dithered image file">
```

The demo below picks a source photo per bit depth with visibility utilities; every other mode falls back to the full-color source. The docs preview simulates the dithered look with a docs-only helper, so it approximates what the platform renders.

### Sizes

Two utilities cap the width of an `img` that carries the `image` class: `image--small` at 80px and `image--xsmall` at 40px. Both follow the screen's content scale, and both set a maximum, so a narrower source keeps its own width and the aspect ratio is never touched.

For any other dimension, use a width or height utility from [Size](https://trmnl.com/framework/docs/3.2/size) .

```html
<img class="image image--small" src="path to image">
<img class="image image--xsmall" src="path to image">
```

### Object Fit

Control how images are displayed when not shown in their original aspect ratio.

#### Options

- **Fill:** The image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit. 
- **Contain:** The image keeps its aspect ratio, but is resized to fit within the given dimension. 
- **Cover:** The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit.

```html
<img class="image image--fill" src="path to image">
<img class="image image--contain" src="path to image">
<img class="image image--cover" src="path to image">
```

### Invert

Use `invert` to flip every pixel to its opposite: black becomes white, white becomes black. It rescues artwork authored for the opposite background, such as a white-on-black glyph placed on a light screen.

It composes with [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) . The pixels flip first, so the ring keeps the color its shade modifier names.

```html
<img class="image invert" src="path to the image file">
```

### Adaptive Icons

Use `image--adaptive` to repaint a monochrome silhouette icon with the screen's icon paint. Only the icon's alpha channel is used: the shape stays, the source pixels' own colors are ignored. The paint follows the same bit-depth, dark-mode, Raw/Preview, and theme cascade as framework text, so one set of icons works everywhere.

The icons below are SVG silhouettes from the plugin weather set, originally solid black glyphs on a transparent background. A PNG with transparency works the same way, since only the alpha shape is read. To watch them adapt, switch the device, dark mode, or Style in the screen picker (top right): the icons repaint to match the screen, while a plain `image` would keep its original pixels.

```html
<!-- Monochrome silhouette icon (shape on a transparent background; SVG or PNG) -->
<img class="image--adaptive" src="path/to/icon.svg">

<!-- Without the framework JS runtime, arm the icon manually -->
<img class="image--adaptive" data-adaptive="true"
     style="--framework-icon-src: url('path/to/icon.svg')"
     src="path/to/icon.svg">
```

#### How it works

- The framework runtime (`plugins.js`) reads the icon and hands it to the stylesheet as a mask; CSS supplies the paint. 
- The public icon paint channel is `--framework-semantic-icon-{color,image,under}`. It mirrors semantic text-primary by default; themes override it with `theme-slots.semantic-icon`. 
- Silhouettes only. The image is flattened to its alpha shape, so never use it on photos or multi-color logos; use [Image Stroke](https://trmnl.com/framework/docs/3.2/image_stroke) to keep those legible instead. 
- Composes with `image-stroke` (the stroke outlines the recolored shape). Not meaningful with `image-dither` or `invert`.

**Icon must be readable.** Recoloring uses a CSS mask, which the browser only permits for same-origin icons or hosts that send `Access-Control-Allow-Origin`. An icon on an arbitrary third-party host stays a plain image in its own colors, so serve recolorable icons from your own origin, or inline the SVG with `fill="currentColor"` to recolor with no classes and no hosting constraint.

### Related APIs

#### Adaptive icons under themes

An icon carrying `image--adaptive` is repainted with the screen's icon paint, keeping only its alpha channel, so it follows the active theme with no markup changes. Pick a Style in the screen picker to watch the icons on this page repaint. See [Themes](https://trmnl.com/framework/docs/3.2/themes) for what else a theme re-points.

Previous

[Outline Pixel-perfect dotted rounded borders drawn with CSS gradients on 1-bit displays](https://trmnl.com/framework/docs/3.2/outline)

Next

[Image Stroke Legible images when displayed on shaded backgrounds](https://trmnl.com/framework/docs/3.2/image_stroke)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/image_stroke
     ============================================================ -->

# Image Stroke

Outline a vector or transparent raster image so it stays legible on a shaded background. Set the stroke width and color with the image stroke utilities.

### Usage

Preset size modifiers set the stroke width on an image. The default stroke is 1.5px white, with additional options for base (1.5px, equivalent to default), small (1px), medium (2px), large (2.5px), and extra large (3px). The `image-stroke--base` modifier explicitly sets the default stroke width and is useful for responsive layouts.

Image Stroke is the right tool for photos and multi-color logos that cannot be recolored. It also composes with `image--adaptive`, outlining the recolored shape (see [Image](https://trmnl.com/framework/docs/3.2/image) ).

```html
<img src="path to image">
<img class="image-stroke image-stroke--small" src="path to image">
<img class="image-stroke image-stroke--base" src="path to image">
<img class="image-stroke" src="path to image">
<img class="image-stroke image-stroke--medium" src="path to image">
<img class="image-stroke image-stroke--large" src="path to image">
<img class="image-stroke image-stroke--xlarge" src="path to image">
```

### Stroke Colors

Use the `image-stroke--{shade}` modifier to change the stroke color, black for images on dark backgrounds. The shades are the same palette tokens the background scale uses:

- `image-stroke--black` and `image-stroke--white`. 
- `image-stroke--gray-10` through `image-stroke--gray-75`, in steps of five, plus the legacy `gray-1` to `gray-7` aliases. 
- Ten hues (red, orange, yellow, lime, green, cyan, blue, violet, purple, pink) as a bare name such as `image-stroke--red` and on the same 10 to 75 steps, so `image-stroke--red-40` works on a color panel.
For the shade scale and how it adapts across bit depths, see [Background](https://trmnl.com/framework/docs/3.2/background) .

A shade modifier and a width modifier combine: `image-stroke image-stroke--black image-stroke--small` is a 1px black ring. Both take the bit-depth prefixes, so `2bit:image-stroke--gray-30` restyles the ring on 2-bit screens only.

A shade class also draws on its own: a lone `image-stroke--black` is the default 1.5px ring in black. [Text Stroke](https://trmnl.com/framework/docs/3.2/text_stroke) differs here, where a shade class only colors a stroke that `text-stroke` or a width modifier applies.

```html
<img src="path to light image">
<img class="image-stroke image-stroke--black image-stroke--small" src="path to light image">
<img class="image-stroke image-stroke--black image-stroke--base" src="path to light image">
<img class="image-stroke image-stroke--black" src="path to light image">
<img class="image-stroke image-stroke--black image-stroke--medium" src="path to light image">
<img class="image-stroke image-stroke--black image-stroke--large" src="path to light image">
<img class="image-stroke image-stroke--black image-stroke--xlarge" src="path to light image">
```

Previous

[Image Optimize images using dithering techniques for 1-bit rendering](https://trmnl.com/framework/docs/3.2/image)

Next

[Scale Scale interface to affect content density and readability](https://trmnl.com/framework/docs/3.2/scale)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/scale
     ============================================================ -->

# Scale

Scale the whole interface from one screen modifier by changing the UI scale factor. Use it to match content density to viewing distance or user preference.

### Basic Usage

Apply scale modifiers to the `screen` element to scale all interface elements proportionally. The selected scale changes typography, component dimensions, gaps, and pixel-based utilities while leaving screen dimensions and relative units unchanged. Scale carries no bit-depth gate, so it works on every screen.

#### Available Scale Levels

The framework provides seven predefined scale levels:

| Class | Scale Factor | Use Case |
| --- | --- | --- |
| `screen--scale-xxsmall` | 0.66 (66%) | Dynamic mashup content density |
| `screen--scale-xsmall` | 0.75 (75%) | Maximum content density |
| `screen--scale-small` | 0.875 (87.5%) | Increased content density |
| `screen--scale-regular` | 1.0 (100%) | Default scale, no scaling applied |
| `screen--scale-large` | 1.125 (112.5%) | Increased size for better readability |
| `screen--scale-xlarge` | 1.25 (125%) | Large scale for increased readability |
| `screen--scale-xxlarge` | 1.5 (150%) | Maximum scale for accessibility needs |

Scale names its neutral tier `regular`, while utility families name theirs `base` (`gap--base`, `rounded--base`, `text--base`), so there is no `screen--scale-base`. Text Scale runs four tiers against Scale's seven, so read the tier list from the page you are on instead of assuming one shared ladder.

### Scale Examples

The following examples demonstrate how scale levels affect the same content layout. Notice how all elements scale proportionally.

#### Extra Small Scale (75%)

Maximum content density: useful when viewing up close or when you need to fit more information on screen.

```html
<div class="screen screen--scale-xsmall">
  <!-- Your content here -->
</div>
```

#### Small Scale (87.5%)

Reduced scale for fitting more content while maintaining good readability.

```html
<div class="screen screen--scale-small">
  <!-- Your content here -->
</div>
```

#### Regular Scale (100%)

Default scale: the baseline that all other scale levels are relative to.

```html
<div class="screen screen--scale-regular">
  <!-- Your content here -->
</div>
```

#### Large Scale (112.5%)

Increased size for better readability

```html
<div class="screen screen--scale-large">
  <!-- Your content here -->
</div>
```

#### Extra Large Scale (125%)

Large scale for increased readability

```html
<div class="screen screen--scale-xlarge">
  <!-- Your content here -->
</div>
```

#### Extra Extra Large Scale (150%)

Maximum scale for accessibility needs

```html
<div class="screen screen--scale-xxlarge">
  <!-- Your content here -->
</div>
```

### How It Works

Scale modifiers set `--modifier-scale`. The screen composes it with `--device-ui-scale` for component typography and geometry, while `--content-scale` applies the modifier to plugin content.

Use [Text Scale](https://trmnl.com/framework/docs/3.2/text_scale) when typography needs an additional factor without applying it to the rest of the interface.

#### Affected Properties

When you apply a scale modifier, it scales the following properties:

- Font sizes and line heights 
- Component dimensions such as title bars and progress indicators 
- Framework gaps and pixel-based spacing utilities 
- Pixel-based size, flex basis, grid minimum, and image presets 
- Framework radii, text strokes, and image strokes 
- Custom properties that reference `var(--ui-scale)` or `var(--content-scale)`

**Note:** Screen dimensions, percentages, container units, and physical one-pixel rails remain unchanged. Fixed pixel values emitted by framework utilities follow the selected content scale.

#### Scaling Custom Values

Use framework utilities for fixed dimensions whenever possible. For custom CSS, multiply pixel values by `--content-scale`; for JavaScript, resolve them with `TRMNLPaint.px()`.

```html
<!-- Framework utilities scale automatically. -->
<div class="h--[40px] w--[80px] rounded--[6px]"></div>

<style>
  .custom-panel {
    height: calc(40px * var(--content-scale));
  }
</style>

<script>
  var height = TRMNLPaint.px(40, { el: "my-panel" });
</script>
```

Inline pixel styles, HTML width and height attributes, intrinsic image dimensions, and chart-library numbers do not scale by themselves. Convert those values explicitly or replace them with scale-aware framework utilities.

### Combining with Device Configurations

Scale modifiers multiply the device's native UI scale instead of replacing it. Plugin content follows the selected modifier, while framework components also retain the device density adjustment. Every modifier except Regular also resolves typography to Inter Variable on low-density displays, because pixel bundles only render correctly at their native sizes.

| Class Combination | Description |
| --- | --- |
| `screen screen--v2` | Uses device default scale |
| `screen screen--v2 screen--scale-small` | Uses 87.5% content scale and 87.5% of the device UI scale |
| `screen screen--amazon_kindle_2024 screen--scale-large` | Uses 112.5% content scale and 112.5% of the device UI scale |

```html
<!-- Use device default UI scale -->
<div class="screen screen--v2">
  <!-- Content -->
</div>

<!-- Override device scale with scale modifier -->
<div class="screen screen--v2 screen--scale-small">
  <!-- Content at 87.5% scale -->
</div>

<!-- Combine with any device configuration -->
<div class="screen screen--amazon_kindle_2024 screen--scale-large">
  <!-- Kindle device with 112.5% scale -->
</div>
```

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--content-scale` | 1 | - | - | - |
| `--device-ui-scale` | 1 | - | - | - |
| `--gap-large` | 20px | - | - | - |
| `--gap-medium` | 16px | - | - | - |
| `--gap-scale` | 1 | - | - | - |
| `--gap-small` | 7px | - | - | - |
| `--gap-xlarge` | 30px | - | - | - |
| `--gap-xsmall` | 5px | - | - | - |
| `--gap-xxlarge` | 40px | - | - | - |
| `--list-gap-small` | 8px | - | - | - |
| `--modifier-scale` | 1 | - | - | - |
| `--ui-scale` | 1 | - | - | - |

### Related APIs

#### Reading scale factors from JavaScript

The `scale({ el })` and `px(value, { el, kind })` helpers read the resolved scale factors from the live screen, so JavaScript-drawn visuals follow the factors this page documents. `px()` scales by the content scale by default; pass `kind: "ui"` for framework geometry. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

```javascript
var inset = TRMNLPaint.px(6, { el: "my-chart", kind: "ui" });
```

Previous

[Image Stroke Legible images when displayed on shaded backgrounds](https://trmnl.com/framework/docs/3.2/image_stroke)

Next

[Inverse Apply inverse framework colors to an element and its descendants](https://trmnl.com/framework/docs/3.2/inverse)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/colors
     ============================================================ -->

# Colors

The Colors system defines the complete palette for the framework: grayscale, chromatic hues, and semantic roles (primary, success, error, warning). Use these tokens with bg--, text--, and other utilities. See Background and Text Color for usage examples.

### Grayscale Palette

The complete range of grayscale shades available in the framework, from pure black to pure white. These tokens use the same lightness scale as the chromatic palette.

black

black

10

gray-10

15

gray-15

20

gray-20

25

gray-25

30

gray-30

35

gray-35

40

gray-40

45

gray-45

50

gray-50

55

gray-55

60

gray-60

65

gray-65

70

gray-70

75

gray-75

white

white

**Dark Mode Notice:** The color palette appears inverted because dark mode remaps the framework tokens: black and white swap, grays and chromatic steps mirror. Images are not affected unless they opt in via `image--adaptive`. Themed screens are exempt from dark mode entirely.

### Chromatic Palette

The framework offers 10 hues × 14 lightness steps (red, orange, yellow, lime, green, cyan, blue, violet, purple, pink), using the same steps as grayscale (10, 15, 20, …, 75). Select a color device (e.g. Inky Impression 7.3, Tidbyt) from the Device Preview above to see these colors in action. Use the Raw Colors / Preview Colors toggle to compare full-bright tokens vs device-representative rendering.

red

red-10

red-15

red-20

red-25

red-30

red-35

red-40

red

red-45

red-50

red-55

red-60

red-65

red-70

red-75

orange

orange-10

orange-15

orange-20

orange-25

orange-30

orange-35

orange-40

orange

orange-45

orange-50

orange-55

orange-60

orange-65

orange-70

orange-75

yellow

yellow-10

yellow-15

yellow-20

yellow-25

yellow-30

yellow-35

yellow-40

yellow

yellow-45

yellow-50

yellow-55

yellow-60

yellow-65

yellow-70

yellow-75

lime

lime-10

lime-15

lime-20

lime-25

lime-30

lime-35

lime-40

lime

lime-45

lime-50

lime-55

lime-60

lime-65

lime-70

lime-75

green

green-10

green-15

green-20

green-25

green-30

green-35

green-40

green

green-45

green-50

green-55

green-60

green-65

green-70

green-75

cyan

cyan-10

cyan-15

cyan-20

cyan-25

cyan-30

cyan-35

cyan-40

cyan

cyan-45

cyan-50

cyan-55

cyan-60

cyan-65

cyan-70

cyan-75

blue

blue-10

blue-15

blue-20

blue-25

blue-30

blue-35

blue-40

blue

blue-45

blue-50

blue-55

blue-60

blue-65

blue-70

blue-75

violet

violet-10

violet-15

violet-20

violet-25

violet-30

violet-35

violet-40

violet

violet-45

violet-50

violet-55

violet-60

violet-65

violet-70

violet-75

purple

purple-10

purple-15

purple-20

purple-25

purple-30

purple-35

purple-40

purple

purple-45

purple-50

purple-55

purple-60

purple-65

purple-70

purple-75

pink

pink-10

pink-15

pink-20

pink-25

pink-30

pink-35

pink-40

pink

pink-45

pink-50

pink-55

pink-60

pink-65

pink-70

pink-75

**Device Preview tip:** Use the Device Preview (top right) to switch between grayscale and color palettes, then toggle Raw Colors / Preview Colors to compare full-bright and device-accurate previews. Try Inky Impression 7.3 (color-7a) or Tidbyt (color-24bit) to see chromatic colors. [Color Palettes](https://trmnl.com/framework/docs/3.2/color_palettes) lists the palette classes and how each token resolves on them.

### Semantic Colors

Semantic color roles map meaning to base hues: use `bg--primary`, `text--success`, and similar utilities for intent-based styling. These alias underlying tokens (e.g. primary → blue) and inherit all device/bit-depth behavior. Themes repaint these roles through the semantic channels [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) (`theme-slots.semantic-bg`, `theme-slots.semantic-text`), never by setting `--color-{role}` directly.

Primary

bg--primary

→ blue

Success

bg--success

→ green

Error

bg--error

→ red

Warning

bg--warning

→ orange

| Role | Underlying Token | Use |
| --- | --- | --- |
| primary | `blue` | Main actions, accents |
| success | `green` | Confirmations, positive states |
| error | `red` | Errors, destructive actions |
| warning | `orange` | Cautions, alerts |

### Token Syntax

Apply these color tokens with utility prefixes. The [Background](https://trmnl.com/framework/docs/3.2/background) page documents `bg--{token}`; the [Text Color](https://trmnl.com/framework/docs/3.2/text_color) page documents `text--{token}`. Other utilities (border, outline, etc.) may use the same tokens where applicable.

| Utility | Example | Use |
| --- | --- | --- |
| bg-- | `bg--gray-50`, `bg--red-40` | Background colors |
| text-- | `text--gray-50`, `text--blue-60`, `text--success` | Text colors |
| bg-- / text-- (semantic) | `bg--primary`, `text--error`, `text--success` | Semantic roles (primary, success, error, warning) |

Three naming schemes make up the token set. A fourth, the legacy gray-1 to gray-7 names, is covered under Backward Compatibility below.

- **Grayscale:** `black`, `gray-10` through `gray-75`, and `white`. 
- **Chromatic:** `{hue}` for the pure color, or `{hue}-{step}` for a step on that hue's ladder (e.g. red-50, blue-40). 
- **Semantic:** `primary`, `success`, `error`, and `warning` alias the base hues.

### Backward Compatibility

For backward compatibility, the original shade names (`gray-1` through `gray-7`) are still supported but deprecated. These map to equivalent extended shades:

gray-1 (deprecated)

gray-1

gray-2 (deprecated)

gray-2

gray-3 (deprecated)

gray-3

gray-4 (deprecated)

gray-4

gray-5 (deprecated)

gray-5

gray-6 (deprecated)

gray-6

gray-7 (deprecated)

gray-7

```html
<!-- Deprecated (but still works) -->
<div class="bg--gray-1">Gray 1</div>
<div class="bg--gray-2">Gray 2</div>

<!-- Preferred (new naming) -->
<div class="bg--gray-10">Gray 10</div>
<div class="bg--gray-20">Gray 20</div>
```

### Resolved Color Manifest

Releases publish `framework_colors.resolved.json`, this palette resolved to plain data. It ships with 3.2.0 and every release after it, plus 3.1.2. It carries the hex value of every chromatic token, the shade steps, the limited color palettes, and the fallback maps that pick a gray for every color token.

The manifest is what the framework's own generators read: the Sass color tokens and the dither bitmaps are built from it, and the TRMNL server loads it for its palette definitions. Read it when you quantize colors outside the browser, so your renderer uses the framework's numbers instead of a copy.

Download it from the asset list on [Releases](https://trmnl.com/framework/releases), at `/framework/colors/{version}/framework_colors.resolved.json`. The zip for those releases carries the same file at its root.

### Related Tokens

These tokens are automatically mapped to this page by token prefix.

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Semantic |
| `--black` | #000000 | - | - | - |
| `--color-error` | var(--red) | - | - | - |
| `--color-primary` | var(--blue) | - | - | - |
| `--color-success` | var(--green) | - | - | - |
| `--color-warning` | var(--orange) | - | - | - |
| `--white` | #FFFFFF | - | - | - |
| Grayscale |
| `--gray-10` | #111111 | - | - | - |
| `--gray-15` | #222222 | - | - | - |
| `--gray-20` | #333333 | - | - | - |
| `--gray-25` | #444444 | - | - | - |
| `--gray-30` | #555555 | - | - | - |
| `--gray-35` | #666666 | - | - | - |
| `--gray-40` | #777777 | - | - | - |
| `--gray-45` | #888888 | - | - | - |
| `--gray-50` | #999999 | - | - | - |
| `--gray-55` | #AAAAAA | - | - | - |
| `--gray-60` | #BBBBBB | - | - | - |
| `--gray-65` | #CCCCCC | - | - | - |
| `--gray-70` | #DDDDDD | - | - | - |
| `--gray-75` | #EEEEEE | - | - | - |
| Legacy Grayscale |
| `--gray-1` | #111111 | - | - | - |
| `--gray-2` | #333333 | - | - | - |
| `--gray-3` | #555555 | - | - | - |
| `--gray-4` | #777777 | - | - | - |
| `--gray-5` | #999999 | - | - | - |
| `--gray-6` | #BBBBBB | - | - | - |
| `--gray-7` | #DDDDDD | - | - | - |

### Related APIs

#### Reading the palette from JavaScript

The `bg(token, { el })` resolver returns the exact paint a `bg--{token}` utility would apply, as a canonical Fill read from the live cascade with bit depth, dark mode, and theme resolved. Apply it to canvases, SVGs, or chart options. See [Painting Colors](https://trmnl.com/framework/docs/3.2/paint_colors) for every resolver and the Fill shape.

```javascript
var fill = TRMNLPaint.bg("red-55", { el: "my-chart" });
```

#### Remapping the palette from a theme

A theme can re-point the raw palette utilities (`bg--*`, `text--*`, `text-stroke--*`) at its own hue, in bulk or one token at a time, so plugin markup that names gray tokens follows the theme without edits. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) for the remap mixins and the two shipped examples.

```scss
@include theme-slots.utility-remap-grayscale("red", $side: "bright");
```

Previous

[CSS Variables The CSS variable contract: which families are public, which are internal, and who reads, re-points, and generates them](https://trmnl.com/framework/docs/3.2/variables_api)

Next

[Color Palettes Every palette a screen can carry: grayscale tiers, limited ink sets, and full color, with the class each one maps to](https://trmnl.com/framework/docs/3.2/color_palettes)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/color_palettes
     ============================================================ -->

# Color Palettes

A palette tells a screen which inks its panel can print. Four grayscale palettes map onto the bit-depth classes, five limited color palettes dither every framework token down to a fixed ink set, and screen--color-full paints every token at its actual hex on 12-bit and 24-bit displays.

### Grayscale palettes

Four palettes cover the panels that print no color. Each one maps onto a bit-depth class on the [Screen](https://trmnl.com/framework/docs/3.2/screen) element, so a grayscale screen carries `screen--1bit`, `screen--2bit`, or `screen--4bit` instead of a palette class.

- `bw` (2 levels) renders as `screen--1bit`. Every token resolves to a black and white dither pattern. 
- `gray-4` (4 grays) renders as `screen--2bit`. 
- `gray-16` (16 grays) renders as `screen--4bit`, where the gray tokens land on solids. 
- `gray-256` renders as `screen--4bit` too. It is a delivery format, not a fifth tier.

#### Two ways to deliver 16 levels

`gray-16` and `gray-256` share a class because they share the glass: 16 panel levels either way. They differ in who reduces the image.

- `gray-16`: the platform posterizes and dithers to those 16 levels before it sends the screen. 
- `gray-256`: the platform sends a smooth 8-bit PNG and the device quantizes it to its own 16 levels.
Its registry name, Smooth Grayscale (device-quantized), describes that delivery. It is not a claim of 256 displayable grays, and it renders at the 4-bit tier, so author against `screen--4bit`.

### Color palette classes

Every color panel the framework supports has a palette class on the [Screen](https://trmnl.com/framework/docs/3.2/screen) element. Five classes cover the limited-ink e-paper panels; `screen--color-full` covers displays that render arbitrary color.

A device can support more than one palette. Inky Impression 7.3 carries six: black and white, 7-color, 6-color, 4-ink B/W/R/Y, 3-ink B/W/R, and 3-ink B/W/Y. The selected mode picks the class.

| Class | Inks | Panels |
| --- | --- | --- |
| `screen--color-3bwr` | Black, white, red | Waveshare 7.5" B/W/R |
| `screen--color-3bwy` | Black, white, yellow | No native B/W/Y panel yet, but nine profiles offer it as a mode (Inky Impression 7.3 and 13.3, Seeed E1002 and E1004, and others) |
| `screen--color-4bwry` | Black, white, red, yellow | TRMNL OG (B/W/R/Y), Waveshare 7.5" B/W/R/Y |
| `screen--color-6a` | Black, white, red, green, blue, yellow | Inky Impression 7.3 and 13.3, Seeed E1002 and E1004 |
| `screen--color-7a` | Black, white, red, green, blue, yellow, orange | Inkplate 6COLOR, Inky Impression 7.3 |
| `screen--color-full` | Whatever the display can show | 12-bit and 24-bit displays: Onyx BOOX Nova Air C, Tidbyt |

### Full color

`screen--color-full` is a first-class mode, not a fallback. The CSS paints every framework color token at its actual hex, with no ink remap and no dithering.

- `color-24bit` (16.7 million colors) covers LCD, OLED, browser, and virtual screens. The render ships as lossless sRGB: no remap, no dithering, no posterize. 
- `color-12bit` (4096 colors) covers Kaleido-class color e-paper. It shares the class, and the platform posterizes the render to those 4096 colors.
Both publish `--framework-bit-depth: 12`, the lower of the two, so nothing reading the depth over-promises what a Kaleido panel prints. Every color the framework paints is sRGB.

```html
<div class="screen screen--generic_16_9 screen--color-full">
  <div class="view view--full">
    <!-- bg--red-60 is a solid red here, a dither on every limited palette -->
    <div class="layout bg--red-60">
      <span class="title">Delayed</span>
    </div>
  </div>
</div>
```

### Every palette and its class

The device registry assigns each device the palettes it can render, and a selected palette resolves to one framework class. That class also publishes its paint depth as `--framework-bit-depth`, which [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) reads.

| Palette | Registry name | Framework class | Published depth |
| --- | --- | --- | --- |
| `bw` | Black & White (1-bit) | `screen--1bit` | 1 |
| `gray-4` | 4 Grays (2-bit) | `screen--2bit` | 2 |
| `gray-16` | 16 Grays (4-bit) | `screen--4bit` | 4 |
| `gray-256` | Smooth Grayscale (device-quantized) | `screen--4bit` | 4 |
| `color-3bwr` | Color (3 colors) | `screen--color-3bwr` | 4 |
| `color-3bwy` | Color (3 colors) | `screen--color-3bwy` | 4 |
| `color-4bwry` | Color (4 colors) | `screen--color-4bwry` | 4 |
| `color-6a` | Color (6 colors) | `screen--color-6a` | 4 |
| `color-7a` | Color (7 colors) | `screen--color-7a` | 4 |
| `color-12bit` | Color (4096 colors) | `screen--color-full` | 12 |
| `color-24bit` | Color (16777216 colors) | `screen--color-full` | 12 |

Depth describes the paint rail, not the panel's storage. The limited palettes print solid inks the way the 4-bit rail prints solid tokens, so they publish 4.

**The numeric variants stop at 4bit:.** Grayscale glass stops at 16 levels, so `1bit:`, `2bit:`, and `4bit:` cover every grayscale palette. Color is a separate axis with its own classes, and no numeric variant matches it; the mode-by-mode story is [Rendering Modes](https://trmnl.com/framework/docs/3.2/rendering_modes) .

### How tokens resolve

A limited palette prints solid inks and nothing in between, so the framework dithers every token in the [Colors](https://trmnl.com/framework/docs/3.2/colors) palette down to the inks that panel carries. Your markup does not change: the same `bg--` and `text--` utilities resolve differently per palette.

- **Grays dither in black and white.** On every limited palette, `bg--gray-50` is a 1-bit pattern rather than a solid gray. 
- **Hues snap to the closest ink.** On `screen--color-3bwr` every hue prints red, so blue and green stop reading as separate categories. `screen--color-7a` carries its own orange ink. 
- **Shade steps dither the ink.** `bg--red-20` mixes red with black and `bg--red-60` mixes red with white, which is how one ink covers a ladder of shades. 
- **Full color skips dithering.** `screen--color-full` paints every token as a solid color.
**Device Preview tip:** Pick a color device in the Device Preview (top right) to see the palette applied to every demo on this site.

### Applying a palette

The palette class sits on the screen, next to the device class. Grayscale palettes use the same slot for their bit-depth class. Who puts it there depends on where the screen is rendered.

TRMNL Platform trmnl.com

Custom Stack BYOS, trmnlp, ...

You don't write the palette class. The platform renders your layout against the device's own profile, so one plugin covers 1-bit panels and 7-color panels alike.

You add the palette class to the screen yourself, next to the device class, and the framework repaints every token for that ink set.

div]:flex-1 [&>div]:min-h-0">

```html
<!-- Your layout; the platform supplies the screen and its classes -->
<div class="layout">
  <span class="title">Northbound</span>
  <span class="label label--primary">On time</span>
</div>
```

div]:flex-1 [&>div]:min-h-0">

```html
<div class="screen screen--inky_impression_7_3 screen--color-7a">
  <div class="view view--full">
    <div class="layout">
      <span class="title">Northbound</span>
      <span class="label label--primary">On time</span>
    </div>
  </div>
</div>
```

### Preview modes

Panel inks are darker and flatter than the same hex on a monitor. Two modifiers repaint a limited palette with device-accurate values so a preview on a screen matches the print.

- `screen--preview-colors`: swaps the full-bright inks for the muted ones the panel actually prints. 
- `screen--preview-white-limited`: mutes white to the panel's off-white. Add it alongside `screen--preview-colors` for panels whose white is not paper white.
The Device Preview's Raw Colors and Preview Colors toggle sets both for you. Rendered output on a device uses neither.

```html
<!-- Device-accurate preview of a 6-color panel -->
<div class="screen screen--color-6a screen--preview-colors screen--preview-white-limited">
  ...
</div>
```

### Targeting a palette in SCSS

Custom SCSS scopes rules to a palette with the same mixins the framework uses. The mixin ids drop the `color-` prefix the class carries: `'3bwr'`, `'3bwy'`, `'4bwry'`, `'6a'`, and `'7a'`.

- `for-color-palette($id)`: scopes to one limited palette. 
- `for-color-full`: scopes to full-color displays. 
- `for-preview-color-palette($id)`: scopes to the device-accurate preview of one limited palette. 
- `for-1bit`, `for-2bit`, `for-4bit`: scope to a grayscale tier.

```scss
@use 'framework/mixins' as trmnl;

.legend-swatch {
    width: 12px;
    height: 12px;

    // Three-ink panels print every hue in the same accent, so carry the
    // distinction in shape instead of color.
    @include trmnl.for-color-palette('3bwr') {
        border-radius: 50%;
    }

    @include trmnl.for-color-full {
        border-radius: 0;
    }
}
```

The full mixin surface is documented on [Sass Mixins](https://trmnl.com/framework/docs/3.2/sass_mixins) , and [Custom Devices](https://trmnl.com/framework/docs/3.2/sass_devices) covers adding a device profile that selects a palette.

### Palettes from JavaScript

TRMNLPaint resolves color by reading the live cascade, so JavaScript needs no palette handling of its own. A Fill resolved on a 7-color screen already carries that palette's dither, and the same call on a full-color screen returns a solid. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

Previous

[Colors Complete palette definition: grayscale, chromatic hues, and semantic roles](https://trmnl.com/framework/docs/3.2/colors)

Next

[Tokens Complete CSS variable reference with root defaults, density, and bit-depth overrides](https://trmnl.com/framework/docs/3.2/tokens)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/tokens
     ============================================================ -->

# Tokens

The Tokens reference lists every Framework CSS variable from `_variables_root.scss` and display overrides in `_variables_overrides.scss`. Use it to understand defaults, 2-bit visual/layout behavior, high-density typography, and 4-bit-and-up scaling.

### How To Read This Table

Each row is a CSS custom property token. `Root` comes from `_variables_root.scss`. `2-bit`, `density 2x`, and `4-bit and up` come from mixins in `_variables_overrides.scss`.

### Palette

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Semantic |
| `--black` | #000000 | - | - | - |
| `--color-error` | var(--red) | - | - | - |
| `--color-primary` | var(--blue) | - | - | - |
| `--color-success` | var(--green) | - | - | - |
| `--color-warning` | var(--orange) | - | - | - |
| `--white` | #FFFFFF | - | - | - |
| Grayscale |
| `--gray-10` | #111111 | - | - | - |
| `--gray-15` | #222222 | - | - | - |
| `--gray-20` | #333333 | - | - | - |
| `--gray-25` | #444444 | - | - | - |
| `--gray-30` | #555555 | - | - | - |
| `--gray-35` | #666666 | - | - | - |
| `--gray-40` | #777777 | - | - | - |
| `--gray-45` | #888888 | - | - | - |
| `--gray-50` | #999999 | - | - | - |
| `--gray-55` | #AAAAAA | - | - | - |
| `--gray-60` | #BBBBBB | - | - | - |
| `--gray-65` | #CCCCCC | - | - | - |
| `--gray-70` | #DDDDDD | - | - | - |
| `--gray-75` | #EEEEEE | - | - | - |
| Legacy Grayscale |
| `--gray-1` | #111111 | - | - | - |
| `--gray-2` | #333333 | - | - | - |
| `--gray-3` | #555555 | - | - | - |
| `--gray-4` | #777777 | - | - | - |
| `--gray-5` | #999999 | - | - | - |
| `--gray-6` | #BBBBBB | - | - | - |
| `--gray-7` | #DDDDDD | - | - | - |

### Scaling

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--content-scale` | 1 | - | - | - |
| `--device-ui-scale` | 1 | - | - | - |
| `--modifier-scale` | 1 | - | - | - |
| `--modifier-text-scale` | 1 | - | - | - |
| `--text-ui-scale` | 1 | - | - | - |
| `--ui-scale` | 1 | - | - | - |

### Description

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

### Other

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--font-base-font-family` | "NicoClean" | "NicoClean" | "Inter Variable", Inter | - |
| `--font-base-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | - |
| `--font-base-font-smoothing` | none | none | auto | - |
| `--font-base-line-height` | 1.25 | 1.25 | calc(22px * var(--text-ui-scale)) | - |
| `--font-giga-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-giga-font-size` | calc(96px * var(--text-ui-scale)) | - | - | - |
| `--font-giga-font-smoothing` | auto | - | - | - |
| `--font-giga-line-height` | calc(108px * var(--text-ui-scale)) | - | - | - |
| `--font-large-font-family` | "BlockKie" | "BlockKie" | "Inter Variable", Inter | - |
| `--font-large-font-size` | calc(26px * var(--text-ui-scale)) | calc(26px * var(--text-ui-scale)) | calc(21px * var(--text-ui-scale)) | - |
| `--font-large-font-smoothing` | none | none | auto | - |
| `--font-large-line-height` | 1 | 1 | 1.2 | - |
| `--font-mega-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-mega-font-size` | calc(74px * var(--text-ui-scale)) | - | - | - |
| `--font-mega-font-smoothing` | auto | - | - | - |
| `--font-mega-line-height` | calc(86px * var(--text-ui-scale)) | - | - | - |
| `--font-peta-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-peta-font-size` | calc(170px * var(--text-ui-scale)) | - | - | - |
| `--font-peta-font-smoothing` | auto | - | - | - |
| `--font-peta-line-height` | calc(180px * var(--text-ui-scale)) | - | - | - |
| `--font-small-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--font-small-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--font-small-font-smoothing` | none | none | auto | - |
| `--font-small-line-height` | 1 | 1 | calc(18px * var(--text-ui-scale)) | - |
| `--font-tera-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-tera-font-size` | calc(128px * var(--text-ui-scale)) | - | - | - |
| `--font-tera-font-smoothing` | auto | - | - | - |
| `--font-tera-line-height` | calc(128px * var(--text-ui-scale)) | - | - | - |
| `--font-xlarge-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-xlarge-font-size` | calc(26px * var(--text-ui-scale)) | - | - | - |
| `--font-xlarge-font-smoothing` | auto | - | - | - |
| `--font-xlarge-line-height` | calc(29px * var(--text-ui-scale)) | - | - | - |
| `--font-xxlarge-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-xxlarge-font-size` | calc(38px * var(--text-ui-scale)) | - | - | - |
| `--font-xxlarge-font-smoothing` | auto | - | - | - |
| `--font-xxlarge-line-height` | calc(42px * var(--text-ui-scale)) | - | - | - |
| `--font-xxxlarge-font-family` | "Inter Variable", Inter | - | - | - |
| `--font-xxxlarge-font-size` | calc(58px * var(--text-ui-scale)) | - | - | - |
| `--font-xxxlarge-font-smoothing` | auto | - | - | - |
| `--font-xxxlarge-line-height` | calc(70px * var(--text-ui-scale)) | - | - | - |

### Layout

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--full-h` | calc(var(--screen-h) - var(--gap) * 2) | - | - | - |
| `--full-w` | calc(var(--screen-w) - var(--gap) * 2) | - | - | - |
| `--half_horizontal-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--half_horizontal-w` | calc((var(--screen-w) - var(--gap) * 2)) | - | - | - |
| `--half_vertical-h` | calc((var(--screen-h) - var(--gap) * 2)) | - | - | - |
| `--half_vertical-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--quadrant-h` | calc((var(--screen-h) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--quadrant-w` | calc((var(--screen-w) - var(--gap) * 2) / 2 - var(--gap) / 2) | - | - | - |
| `--screen-h` | 480px | - | - | - |
| `--screen-h-original` | 480px | - | - | - |
| `--screen-w` | 800px | - | - | - |
| `--screen-w-original` | 800px | - | - | - |

### Spacing

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--gap` | 10px | - | - | - |
| `--gap-large` | 20px | - | - | - |
| `--gap-medium` | 16px | - | - | - |
| `--gap-scale` | 1 | - | - | - |
| `--gap-small` | 7px | - | - | - |
| `--gap-xlarge` | 30px | - | - | - |
| `--gap-xsmall` | 5px | - | - | - |
| `--gap-xxlarge` | 40px | - | - | - |
| `--list-gap-small` | 8px | - | - | - |

### Item

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--item-index-font-family` | "NicoPups" | "NicoPups" | "Inter Variable", Inter | - |
| `--item-index-font-size` | calc(16px * var(--text-ui-scale)) | calc(16px * var(--text-ui-scale)) | calc(13px * var(--text-ui-scale)) | - |
| `--item-index-font-smoothing` | none | none | auto | - |
| `--item-index-font-weight` | 400 | 400 | 600 | - |
| `--item-index-line-height` | 1 | 1 | 1 | - |
| `--item-meta-width` | calc(10px * var(--ui-scale)) | calc(10px * var(--ui-scale)) | - | calc(10px * var(--ui-scale)) |

### Label

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

### Progress

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--progress-bar-height` | calc(24px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-large` | calc(32px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-small` | calc(12px * var(--ui-scale)) | - | - | - |
| `--progress-bar-height-xsmall` | calc(6px * var(--ui-scale)) | - | - | - |
| `--progress-bar-radius` | calc(10px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size` | calc(16px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-large` | calc(20px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-small` | calc(12px * var(--ui-scale)) | - | - | - |
| `--progress-dot-size-xsmall` | calc(8px * var(--ui-scale)) | - | - | - |

### Rich Text

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

### Rounded

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| `--rounded` | 10px | - | - | - |
| `--rounded-full` | 9999px | - | - | - |
| `--rounded-large` | 20px | - | - | - |
| `--rounded-medium` | 15px | - | - | - |
| `--rounded-none` | 0px | - | - | - |
| `--rounded-small` | 7px | - | - | - |
| `--rounded-xlarge` | 25px | - | - | - |
| `--rounded-xsmall` | 5px | - | - | - |
| `--rounded-xxlarge` | 30px | - | - | - |

### Table

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

### Title Bar

| Token | 1-bit | 2-bit | Density 2x | 4-bit and up |
| --- | --- | --- | --- | --- |
| Base |
| `--title-bar-border-radius` | calc(10px * var(--ui-scale)) | calc(10px * var(--ui-scale)) | - | calc(10px * var(--ui-scale)) |
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

### Title

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

### Value

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

### Related APIs

#### Reading variables from JavaScript

`cssVar(name, { el })` reads any variable on this page back from the live cascade, theme and mode overrides included. The CSS stays the source of truth; nothing is duplicated in JavaScript. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) for the full paint surface.

```javascript
var gap = TRMNLPaint.cssVar("--gap", { el: "my-chart" });
```

#### Variables a theme may re-point

A theme re-points token references through the slot mixins and never sets paint values directly. The framework-owned paint variables (`--bg-*`, `--text-*`, `--border-*`) stay untouched, and the theme linter enforces that boundary. See [Authoring Themes](https://trmnl.com/framework/docs/3.2/theme_authoring) for the contract and workflow.

#### Where variables are defined

The SCSS source emits every variable on this page: root defaults from `_variables_root.scss`, per-mode overrides from `_variables_overrides.scss`. A custom build can reconfigure or extend the set. See [Sass API](https://trmnl.com/framework/docs/3.2/sass_api) for the source layout and its public surface.

Previous

[Color Palettes Every palette a screen can carry: grayscale tiers, limited ink sets, and full color, with the class each one maps to](https://trmnl.com/framework/docs/3.2/color_palettes)

Next

[Structure The framework's exact div hierarchy and how Screen, View, Layout, Title Bar, Columns, and Mashup work together](https://trmnl.com/framework/docs/3.2/structure)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/inverse
     ============================================================ -->

# Inverse

The Inverse utility applies the framework inverse color scheme to one element and its descendants. Use it for greater visual control, or to distinguish an active element and communicate a state transition without changing its siblings.

### Usage

Add `inverse` to a container to apply the opposite of the screen's color scheme to that container and its descendants. Use it as a visual treatment, or apply it semantically to identify the active item, selected row, or current state.

```html
<div class="item inverse">
  <div class="content">
    <span class="title">Active item</span>
  </div>
</div>
```

### Active Collection Rows

Invert individual rows to make active resources scannable inside a longer collection. The row background, text, item metadata, and other framework paint change together.

```html
<!-- Active row -->
<div class="item inverse item--emphasis-3 rounded--xsmall">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Desk M1</span>
    <span class="description">Occupied</span>
  </div>
</div>

<!-- Inactive sibling -->
<div class="item bg--white rounded--xsmall">
  <div class="meta"></div>
  <div class="content">
    <span class="title title--small">Desk M3</span>
    <span class="description">Available</span>
  </div>
</div>
```

### Active Collection Cards

Use inverse cards when several resources share the same grid and only some need attention. The stronger surface separates occupied rooms from available rooms without changing the grid structure.

```html
<div class="grid grid--cols-2 gap--small">
  <div class="bg--white rounded--xsmall p--3">
    <div class="title">Available</div>
  </div>

  <div class="inverse rounded--xsmall p--3">
    <div class="title">Marketing Sync</div>
    <div class="description">11:00 - 12:30</div>
  </div>
</div>
```

### State Transitions

Apply inverse to a larger status surface when a state transition should change the whole composition. For example, an occupied meeting room can invert its schedule, dividers, and attendee details as one semantic state.

```html
<div class="view view--full">
  <div class="layout layout--col gap--large p--16 inverse rounded">
    <div class="flex flex--col flex--center gap--large h--full">
      <div class="text--large font--regular">11:00 - 12:30</div>
      <div class="divider w--full"></div>
      <div class="text--mega font--bold text--center">Marketing Sync</div>
      <div class="divider w--full"></div>
      <div class="text--large font--regular"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="35595440475475504d54584559501b565a58">[email&#160;protected]</a> & 5 more</div>
    </div>
  </div>
</div>
```

### Paint and Cascade Behavior

Inverse flips framework background, text, border, stroke, semantic, icon, chart, and component-slot paint for the element subtree. It applies dark paint on a light screen and light paint on a dark-mode screen without changing siblings.

A slot value declared directly on the element overrides the inverse default, and a theme can define its own inverse treatment with `.screen--theme- .inverse`. See [Theme Slots](https://trmnl.com/framework/docs/3.2/theme_slots) and [Themes](https://trmnl.com/framework/docs/3.2/themes) .

Unlike the `invert` image filter, inverse changes semantic framework paint instead of flipping pixels. `dark:` utilities still require `screen--dark-mode`; inverse changes paint, not variant activation.

Previous

[Scale Scale interface to affect content density and readability](https://trmnl.com/framework/docs/3.2/scale)

Next

[Font Family Switch between Classic and TRMNL font bundles per device](https://trmnl.com/framework/docs/3.2/font_family)
