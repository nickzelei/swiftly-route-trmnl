<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/paint_api
     ============================================================ -->

# Paint API

TRMNLPaint is the framework's public JavaScript paint API. It reads the live CSS cascade (bit depth, dark mode, theme, limited palette, and tiles all resolved) and hands back a canonical Fill, so token mappings are never duplicated in JavaScript. Charts are just one consumer; any plugin can resolve framework colors from JS for any purpose.

### How it works

The framework paints every surface through per-mode CSS custom properties on the `.screen` element, and a theme is CSS that re-points those properties. `TRMNLPaint` is a reader of that live cascade, never a second definition of the color system.

Each resolver appends a hidden probe element inside the target element, applies the framework's own utility class (`bg--`, `text--`, ...), and reads back the browser-resolved computed style. Bit depth, dark mode, inverse subtrees that flip the screen scheme, themes, slot overrides, and limited palettes are all honoured automatically, with zero token mappings duplicated in JavaScript.

Every function is total: a missing `.screen` or an unknown token returns a Fill with null fields instead of throwing. Plugins render on a screenshot service, and a thrown error would mean a blank device screen.

### The paint domains

The resolvers are documented by what they paint. Every resolver takes an optional `{ el }`: the id or element whose local cascade supplies the paint, with device settings from its nearest `.screen`. Omit it on a single-screen plugin and the first screen on the page is used.

#### Painting Colors

*:last-child]:!mb-0"> Resolve background, text, stroke, and semantic tokens as Fills, and paint them onto nodes.

- `bg()`, `text()`, `stroke()` 
- `semantic()`, `textColor()` 
- `apply()`

Go to [Painting Colors](https://trmnl.com/framework/docs/3.2/paint_colors)

#### Painting Charts

*:last-child]:!mb-0"> Series colors from the screen's chart ramp, and the Highcharts fill adapter.

- `series()`, `ramp()` 
- `toHighcharts()`

Go to [Painting Charts](https://trmnl.com/framework/docs/3.2/paint_charts)

#### Painting Borders

*:last-child]:!mb-0"> Border and divider rails as BorderFills, for custom rails and Highcharts axes.

- `border()`, `divider()` 
- `applyBorder()` 
- `toHighchartsAxis()`, `applyHighchartsAxisPaint()`

Go to [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders)

#### Painting Typography

*:last-child]:!mb-0"> Text roles and stroke rings as TypeSpecs, for custom text and chart labels.

- `type()`, `strokeSpec()` 
- `applyType()` 
- `toHighchartsText()`

Go to [Painting Typography](https://trmnl.com/framework/docs/3.2/paint_typography)

### Scale values

Resolve scale-aware JavaScript dimensions through `TRMNLPaint`. It reads the same custom properties as the CSS framework, so device density, Scale, and Text Scale stay in one source of truth.

- `scale({ el })`: returns `{ name, device, modifier, ui, content, textName, textModifier, textUi }` for the target screen. 
- `px(value, { el, kind })`: scales one number or an array of numbers. It uses content scale by default; pass `kind: "ui"` for framework geometry or `kind: "text"` for framework typography.
Use `px()` for numeric chart options, canvas dimensions, and other library configuration. Percentages, data values, zero-width rails, and physical one-pixel strokes should remain unchanged.

```javascript
var scale = TRMNLPaint.scale({ el: "my-chart" });
var height = TRMNLPaint.px(260, { el: "my-chart" });
var spacing = TRMNLPaint.px([10, 10, 5, 10], { el: "my-chart" });

// Framework-owned component geometry also includes device density.
var componentInset = TRMNLPaint.px(6, { el: "my-chart", kind: "ui" });

// Framework typography includes device density, Scale, and Text Scale.
var fontSize = TRMNLPaint.px(16, { el: "my-chart", kind: "text" });
```

### The Fill type

Every resolver returns a canonical `Fill`, a plain object describing paint independently of any charting library. A Fill with a `url` and `size` is a dither tile pattern; a Fill with only a `color` is a solid. Library-specific shaping lives in adapters, never in the Fill.

```javascript
Fill = {
  color: string | null,  // resolved "rgb(...)" flat / field color
  image: string | null,  // full resolved background-image; null when "none"
  url:   string | null,  // first url(...) from image; null for gradients / solids
  size:  number | null,  // tile size in px (falls back to --dither-bg-size)
}

// url && size  => a dither tile pattern
// color only   => a solid
```

Borders and typography have richer shapes: `BorderFill` is documented on [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders) and `TypeSpec` on [Painting Typography](https://trmnl.com/framework/docs/3.2/paint_typography) .

### Painting and reactivity

- `apply(node, fill)`: paints a node's background from a Fill, compositing the field color under the tile image with the same two-layer CSS the rest of the screen uses. 
- `watch(el, onChange, { immediate })`: runs `onChange` now (unless `immediate: false`) and again whenever the mode, dark or theme classes change on the screen or on a wrapper above it. Returns a `stop()` function. 
- `screen(el)`: the nearest `.screen` for a target element, or the first screen on the page.
`applyBorder()` and `applyType()` write border and typography longhands the same way; they are documented with their resolvers on [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders) and [Painting Typography](https://trmnl.com/framework/docs/3.2/paint_typography) .

### Extending a theme from JavaScript

Themes never ship JavaScript. A theme that needs to expose extra values to plugin code (a brand accent, a custom ramp) publishes additional public `--*` custom properties on the screen, and JS reads them back with `cssVar()`. No framework release and no JS bundle per theme: just CSS that both worlds read.

`cssVar(name, { el })` returns the trimmed computed value of any public custom property on the screen. It is the documented escape hatch for exactly these theme-published values.

Read public var families only. The CSS minifier renames private variables (`--_*`, `--framework-internal-*`, `--tile-*`, `--bline-*`, most of `--border-*` and `--tn-*`) in the released `plugins.min.css`; the readable `plugins.css` keeps the source names. Never read those families from JS. `cssVar("--border-step-40-h-color")` answers in the dev build and returns an empty string against every release. See [CSS Variables](https://trmnl.com/framework/docs/3.2/variables_api) for the families that survive.

```javascript
// A theme publishes a public var on .screen--theme-my-brand:
//   --my-brand-accent: var(--red-50);
// Read it back from JS, resolved for the active mode/theme:
var accent = TRMNLPaint.cssVar("--my-brand-accent", { el: "my-chart" });
```

### Where This Applies

These pages document the surfaces this API programs.

[
## Scale
](https://trmnl.com/framework/docs/3.2/scale) [
## Text Scale
](https://trmnl.com/framework/docs/3.2/text_scale) [
## Framework Runtime
](https://trmnl.com/framework/docs/3.2/framework_runtime) [
## Tokens
](https://trmnl.com/framework/docs/3.2/tokens) [
## Rendering Modes
](https://trmnl.com/framework/docs/3.2/rendering_modes)

Previous

[Pixel Perfect Ensure text renders with crisp edges by aligning to the pixel grid](https://trmnl.com/framework/docs/3.2/pixel_perfect)

Next

[Painting Colors Resolve background, text, stroke, and semantic tokens from JavaScript as canonical Fill objects](https://trmnl.com/framework/docs/3.2/paint_colors)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/paint_colors
     ============================================================ -->

# Painting Colors

The color resolvers read background, text, stroke, and semantic tokens from the live cascade and return canonical Fill objects. Use them when JavaScript needs the exact paint a CSS utility would produce.

### Color and token fills

Every resolver takes an optional `{ el }`: the id or element whose nearest `.screen` ancestor supplies the paint. Each returns a canonical `Fill`; the shape and the probe technique are documented on [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `bg(token, { el })`: a background token (`bg--`), e.g. `'black'`, `'gray-40'`, `'red-55'`. Solid modes yield a color-only Fill; dither modes yield a tile Fill. 
- `text(token, { el })`: a text token (`text--`). Text paints via background-clip, so both the ink color and the background image are read. 
- `stroke(token, { el })`: a stroke token (`text-stroke--`), re-exposed as a concrete `rgb` in a color-only Fill. 
- `semantic(slot, { el })`: a framework semantic slot. Slots with a public utility (`canvas`, `surface`, `text-primary`, `text-secondary`, `text-inverse`, `backdrop`) are probed through that utility. The rest (`border-strong`, `border-muted`, `fill-strong`, `fill-muted`, `fill-soft`, `stroke-contrast`, `icon`) are projected from their `--framework-semantic-*` channel, so image-backed paint is retained. 
- `textColor(token, { el })`: the effective one-color value of a named text utility (`'default'`, `'muted'`, ...) for SVG or canvas. When CSS clips a tile to the glyphs, it returns the tile's painted ink rather than its under-field.

```javascript
// Resolve a token for the current screen mode/theme.
var fill = TRMNLPaint.bg("red-55", { el: "my-chart" });
// => solid mode:  { color: "rgb(204, 0, 0)", image: null, url: null, size: null }
// => dither mode: { color: "rgb(255,255,255)", image: "url(...)", url: "data:...", size: 16 }

// One-color form of the semantic default text utility for SVG/canvas text.
var textColor = TRMNLPaint.textColor("default", { el: "my-chart" });
```

### Painting fills

A resolved Fill is painted back with one call. Wrap paints in `watch()` so they re-run when the screen's mode, dark or theme classes change; see [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `apply(node, fill)`: paints a node's background from a Fill, compositing the field color under the tile image with the same two-layer CSS the rest of the screen uses.

```javascript
var swatch = document.getElementById("legend-swatch");

TRMNLPaint.watch(swatch, function () {
  // Solid on 4-bit+ panels, a composited dither tile on 1- and 2-bit screens.
  TRMNLPaint.apply(swatch, TRMNLPaint.bg("gray-30", { el: swatch }));
});
```

### Where This Applies

These pages document the surfaces this API programs.

[
## Background
](https://trmnl.com/framework/docs/3.2/background) [
## Text Color
](https://trmnl.com/framework/docs/3.2/text_color) [
## Colors
](https://trmnl.com/framework/docs/3.2/colors)

Previous

[Paint API TRMNLPaint: read the live CSS cascade from JavaScript to resolve framework colors and tile patterns](https://trmnl.com/framework/docs/3.2/paint_api)

Next

[Painting Charts Chart series colors from the framework ramp, with Highcharts adapters](https://trmnl.com/framework/docs/3.2/paint_charts)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/paint_borders
     ============================================================ -->

# Painting Borders

The border resolvers read the framework border rails as BorderFill objects. Apply them to custom rails, or convert them for Highcharts axes and grid lines.

### Borders and dividers

Every resolver takes an optional `{ el }`: the id or element whose nearest `.screen` ancestor supplies the paint. The probe technique is documented on [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `border(spec, { dir, el })`: a border rail as a `BorderFill`. The `spec` is a shade step from 10 to 75 or the literal `'black'` / `'white'` rails; `dir` is `'h'` (default) or `'v'`. Framework borders paint as a background on a pseudo-element, so the resolved paint is read there. 
- `divider({ dir, el })`: the level-6 `.divider` rail as a `BorderFill`, probed on the element itself.
Dither-mode lines are multi-layer and list-valued, so `BorderFill` keeps `size`, `position` and `repeat` as verbatim computed strings. It also carries the renderer-ready SVG program declared by the same CSS rule; JavaScript never parses gradients or derives their geometry.

```javascript
BorderFill = {
  color:    string | null,  // resolved background-color (solid/black-white modes)
  image:    string | null,  // resolved background-image gradient(s); null when "none"
  url:      string | null,  // first url(...) ink tile (black/white rails); null otherwise
  size:     string | null,  // VERBATIM background-size string (dither lines are list-valued)
  position: string | null,  // VERBATIM background-position string
  repeat:   string | null,  // VERBATIM background-repeat string
  render: {                  // CSS-declared; copied verbatim by renderer adapters
    stroke:  string | null,
    width:   string | null,
    height:  string | null,
    viewBox: string | null,
    path1:   string | null,
    color1:  string | null,
    path2:   string | null,
    color2:  string | null,
  } | null,
  dir:      "h" | "v",      // which pseudo/orientation was probed
}
```

`border()` is the guaranteed-hairline path: it probes the fill-backed `.border--*` utilities, which carry real ink in every mode and pick up theme tinting for free. `semantic('border-strong')` and `semantic('border-muted')` describe the semantic role's token tile, not the directional rail art. Draw rails with `border()`; reach for `semantic('border-*')` only when you need the role as a Fill.

```javascript
// Framework rail utilities, resolved for the current mode/theme.
var gridRail = TRMNLPaint.border(65, { el: "my-chart" });     // -> BorderFill
var axisRail = TRMNLPaint.border("black", { dir: "v", el: "my-chart" });
var step40 = TRMNLPaint.border(40, { el: "my-chart" });
```

### Painting rails

A resolved rail is written back verbatim, so it paints exactly as the CSS `.border--*` utilities do. Wrap paints in `watch()` so rails re-resolve on mode, dark and theme changes; see [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `applyBorder(node, borderFill)`: writes a `BorderFill` onto a node as its five background longhands, verbatim, so a solid, a flat gradient and a multi-layer dither line all round-trip unchanged.

### Highcharts axes

The axis adapters copy a resolved rail into Highcharts' native options; the fill adapter and the adapter ground rules live on [Painting Charts](https://trmnl.com/framework/docs/3.2/paint_charts) .

- `toHighchartsAxis(borderFill)`: turns a `BorderFill` into a `{ gridLineColor, gridLineWidth, gridLineDashStyle, lineColor, tickColor }` block. 
- `applyHighchartsAxisPaint()`: carries the resolved BorderFill into Highcharts' render cycle and copies its CSS-declared SVG program onto the rendered grid, axis and tick paths. Flat modes declare a stroke; patterned modes declare their complete tile, paths and colors.

```javascript
// Rails into Highcharts axis/grid options.
var grid = TRMNLPaint.toHighchartsAxis(
  TRMNLPaint.border(65, { el: "my-chart" }));
// TRMNLCharts.options() applies the BorderFill pattern to rendered SVG paths.
```

### Live example

The separator under each schedule row is painted with `TRMNLPaint.border()` and `TRMNLPaint.applyBorder()`, wrapped in `TRMNLPaint.watch()`. Each row uses a different spec (shade steps 65 and 40, the literal black and white rails), labelled on the right. Change the device mode or Style in the picker and the rails re-resolve, picking up dither art and theme tinting.

```html
<div id="border-strip" class="flex flex--col w--full"></div>

<script type="text/javascript">
  // plugins.js bundles TRMNLPaint; wait for it before painting.
  function whenReady(cb) {
    if (window.TRMNLPaint) return cb();
    window.addEventListener("load", function () {
      if (window.TRMNLPaint) cb();
    }, { once: true });
  }

  whenReady(function () {
    var el = "border-strip";
    var SPECS = [65, 40, "black", "white"];
    // watch() re-resolves each rail whenever the screen device/scale/mode/dark/theme changes.
    TRMNLPaint.watch(el, function () {
      var box = document.getElementById(el);
      if (!box) return;
      box.innerHTML = "";
      SPECS.forEach(function (spec) {
        var row = document.createElement("div");
        row.style.cssText = "padding:12px 0;";
        row.textContent = "border(" + JSON.stringify(spec) + ")";
        var rail = document.createElement("div");
        rail.style.cssText = "height:2px;width:100%;";
        // applyBorder writes the five background longhands verbatim, so the
        // rail paints exactly as the CSS .border--* utilities do.
        TRMNLPaint.applyBorder(rail, TRMNLPaint.border(spec, { el: el }));
        box.appendChild(row);
        box.appendChild(rail);
      });
    });
  });
</script>
```

### Where This Applies

These pages document the surfaces this API programs.

[
## Border
](https://trmnl.com/framework/docs/3.2/border)

Previous

[Painting Charts Chart series colors from the framework ramp, with Highcharts adapters](https://trmnl.com/framework/docs/3.2/paint_charts)

Next

[Painting Typography Read text roles as TypeSpec objects for custom text and chart labels](https://trmnl.com/framework/docs/3.2/paint_typography)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/paint_typography
     ============================================================ -->

# Painting Typography

The typography resolver reads a text role or utility class as a TypeSpec: font, size, weight, paint, and optional stroke. Apply it to custom text, or convert it for Highcharts labels.

### Typography

Every resolver takes an optional `{ el }`: the id or element whose nearest `.screen` ancestor supplies the paint. The probe technique is documented on [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `type(classOrRole, { el, stroke })`: the resolved typography of a role or class as a `TypeSpec`. The role `'chart-label'` maps to `text--small`; `'value'`, `'label'`, `'title'` and `'description'` map to their own classes; any other string passes through as a literal class list (e.g. `'value value--xxlarge'`). Font family, size, weight and line-height follow the active font bundle and density, so they are always probed, never read from vars. Pass `stroke` (a size token, or `true` for the base ring) to also resolve a text-stroke onto the spec. 
- `strokeSpec(sizeToken, { el })`: the resolved text-stroke ring as `{ color, width, radius }`. The `sizeToken` is `'small'` / `'medium'` / `'large'` / `'xlarge'`, or `null` for the base `text-stroke`.

```javascript
TypeSpec = {
  fontFamily:      string | null,  // resolved family for the active bundle x density
  fontSize:        string | null,  // e.g. "38px" for .value
  fontWeight:      string | null,
  fontStyle:       string | null,
  fontVariantNumeric: string | null,
  fontVariationSettings: string | null,
  webkitFontSmoothing: string | null,
  letterSpacing:   string | null,
  lineHeight:      string | null,
  color:           string | null,  // exact computed color; transparent in clipped-tile modes
  backgroundColor: string | null,  // the text tile under-field
  backgroundImage: string | null,  // exact computed image; dither ink rides here
  backgroundSize:  string | null,
  backgroundPosition: string | null,
  backgroundRepeat:string | null,
  clip:            string | null,  // computed background-clip
  textShadow:      string | null,  // exact 16-ring program when stroke was requested
  filter:          string | null,
  overflow:        string | null,
  stroke:          null | { color, width, radius },  // present only when stroke was requested
}
```

```javascript
// The .value role, size/family/weight resolved for the active bundle + density.
var big = TRMNLPaint.type("value", { el: "my-chart" });       // -> TypeSpec
var axis = TRMNLPaint.type("chart-label", { el: "my-chart" });
```

### Painting type

A resolved spec is written back complete, so dither ink and stroke rings survive instead of collapsing to a solid color. Wrap paints in `watch()` so type re-resolves when the bundle, density or theme changes; see [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

- `applyType(node, typeSpec)`: writes a `TypeSpec`'s exact computed font, text paint, clipping and optional stroke longhands onto a node. Dither ink, its under-field and the full 16-ring text-shadow round-trip instead of being reduced to a solid color.

### Highcharts labels

The text adapter copies a resolved spec into Highcharts' label options; the fill adapter and the adapter ground rules live on [Painting Charts](https://trmnl.com/framework/docs/3.2/paint_charts) .

- `toHighchartsText(typeSpec)`: turns a `TypeSpec` into `{ color, textOutline, fontFamily?, fontSize?, ... }`. Font keys appear only when resolved, and `textOutline` is `'none'` unless a real opaque stroke was requested, which kills Highcharts' default white halo on data labels.

```javascript
// Typography into Highcharts label options.
var label = TRMNLPaint.toHighchartsText(
  TRMNLPaint.type("chart-label", { el: "my-chart" }));
// => { color, textOutline: "none", fontFamily, fontSize, fontWeight }
```

### Live example

The two stat tiles below are built from plain spans that carry no framework classes. `TRMNLPaint.type()` resolves the `value` role (the big-number face used by stat tiles) and the `chart-label` role (mapped to `text--small`), and `TRMNLPaint.applyType()` writes the resolved font and text-paint longhands onto them. Toggle the font bundle or density in the picker and the tiles follow, because family and size are probed from the live cascade rather than hardcoded.

```html
<div id="type-specimen" class="grid grid--cols-2 w--full"></div>

<script type="text/javascript">
  function whenReady(cb) {
    if (window.TRMNLPaint) return cb();
    window.addEventListener("load", function () {
      if (window.TRMNLPaint) cb();
    }, { once: true });
  }

  whenReady(function () {
    var el = "type-specimen";
    var TILES = [
      { value: "4,283", caption: "Reams Sold" },
      { value: "12", caption: "Dundie Awards" }
    ];
    // watch() re-resolves the typography whenever bundle/density/theme changes.
    TRMNLPaint.watch(el, function () {
      var grid = document.getElementById(el);
      if (!grid) return;
      grid.innerHTML = "";
      var big = TRMNLPaint.type("value", { el: el });
      var small = TRMNLPaint.type("chart-label", { el: el });
      TILES.forEach(function (t) {
        var cell = document.createElement("div");
        cell.className = "flex flex--col flex--center-x";
        var v = document.createElement("span");
        v.textContent = t.value;
        // applyType writes the complete TypeSpec; the spans themselves carry
        // no framework class.
        TRMNLPaint.applyType(v, big);
        var c = document.createElement("span");
        c.textContent = t.caption;
        TRMNLPaint.applyType(c, small);
        cell.appendChild(v);
        cell.appendChild(c);
        grid.appendChild(cell);
      });
    });
  });
</script>
```

Previous

[Painting Borders Read border rails as BorderFill objects for custom rails and Highcharts axes](https://trmnl.com/framework/docs/3.2/paint_borders)

Next

[Sass API The framework SCSS source: architecture, cascade layers, and what a custom stack can build from it](https://trmnl.com/framework/docs/3.2/sass_api)

<!-- ============================================================
     source: https://trmnl.com/framework/docs/3.2/paint_charts
     ============================================================ -->

# Painting Charts

The chart resolvers pick evenly spaced series colors from the framework chart ramp, resolved through the live cascade. Adapters convert the resulting Fills into Highcharts color options.

### Chart series

Every resolver takes an optional `{ el }`: the id or element whose nearest `.screen` ancestor supplies the paint. Each returns a canonical `Fill`; see [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) for the shape.

- `series(i, count, { el })`: the fill for series *i* of *count* from the screen's chart-series ramp, which opens on the screen's ink. Series are spread across the legible front of the ramp; the span is the public `--framework-chart-series-span` var, so a theme narrows it from CSS. 
- `ramp({ el })`: every chart-series slot as an array of Fills. CSS publishes how many there are in `--framework-chart-series-count`, so a longer ramp reaches JavaScript without a framework release. Slots past the end of a shorter ramp come back empty.
Full-color screens draw their series from a color ramp: the ink, then seven hues in a fixed order, with steps picked for the light and dark ground separately. Grayscale and limited-palette screens keep the shade ladder, and a theme still overrides both with its own ramp.

```javascript
// A single ramp step for series 1 of 4.
var s = TRMNLPaint.series(1, 4, { el: "my-chart" });

// Every ramp slot at once.
var fills = TRMNLPaint.ramp({ el: "my-chart" });
```

### Highcharts adapters

Adapters shape a resolved `Fill`, `BorderFill` or `TypeSpec` for one specific renderer. They copy resolved values into the renderer's native form; no adapter adds contrast heuristics, thresholds or substitute design rules.

- `toHighcharts(fill)`: a solid Fill returns a flat color string; a tile Fill returns a `{ pattern: { image, width, height, backgroundColor } }` object for the Highcharts pattern-fill module. The field color is composited into the pattern image beneath the ink paths, matching CSS layer order, so the tile is self-contained. An empty Fill returns `null`.
The axis and label adapters live with their resolvers: `toHighchartsAxis()` on [Painting Borders](https://trmnl.com/framework/docs/3.2/paint_borders) , `toHighchartsText()` on [Painting Typography](https://trmnl.com/framework/docs/3.2/paint_typography) .

`TRMNLCharts` (see the next section) is the Highcharts composition layer over TRMNLPaint: its `grid()`, `axisLine()` and `textStyle()` methods select the documented chart roles and delegate resolution and conversion here. Adapters for other libraries (a Chart.js `CanvasPattern`, a D3 ``) are a natural sibling shape. Until one ships, resolve a Fill and translate it yourself; the Fill already carries everything a library needs.

```javascript
// Highcharts: flat color on solid panels, a self-contained pattern tile
// on 1- and 2-bit screens.
var hc = TRMNLPaint.toHighcharts(TRMNLPaint.series(0, 4, { el: "my-chart" }));

// Any other library: resolve a Fill and translate it however you like.
var fill = TRMNLPaint.bg("gray-30", { el: "my-chart" });
var css = fill.image
  ? fill.image + " repeat"   // dither tile
  : fill.color;              // solid
```

### The TRMNLCharts API

`TRMNLCharts` ships in the same `plugins.js` runtime as `TRMNLPaint` and composes Highcharts options out of it. It resolves no paint of its own: every value it returns comes from a TRMNLPaint resolver and adapter. [Chart](https://trmnl.com/framework/docs/3.2/chart) puts it to work in line, bar, and gauge charts.

Every method takes the same optional `{ el }` as the resolvers: the chart container id or element whose nearest `.screen` supplies the paint. Omit it on a single-screen plugin.

#### Resolving chart paint

- `paint(token, { el })`: one palette token as a Highcharts fill, flat color in solid modes and a pattern object in dither modes. 
- `series(i, count, { el })`: the Highcharts fill for series *i* of *count* from the screen's chart-series ramp. 
- `applySwatches({ el })`: paints every element under the screen carrying `data-chart-series="i"` from that same ramp, so legend markers and series stay in lockstep. An optional `data-chart-series-count` sets the series total; it defaults to the number of tagged elements. Call it every time the chart builds.

#### Building the options

- `options({ el })`: the recommended Highcharts options for the TRMNL aesthetic, with a transparent background, no animation, no chrome, and framework-resolved axes and type. 
- `merge(base, overrides)`: a deep merge of two plain objects, where arrays and scalars replace. Layer your chart's own config over `options()` with it. 
- `grid({ el, dir })`: the grid-line options (`gridLineColor`, `gridLineWidth`, `gridLineDashStyle`) from the muted themed hairline, border step 65. `dir: 'h'` (the default) is the horizontal yAxis grid, `'v'` the vertical xAxis grid. 
- `axisLine({ el })`: the `lineColor` and `tickColor` options from the black border rail, which axis and ticks share. 
- `textStyle(role, { el })`: a Highcharts text style for one framework typography role. It carries the resolved font properties and an opaque ink color, and sets `textOutline: 'none'` to kill the default white halo on data labels. Pass `{ stroke: '' }` for an intentional outline.

#### Keeping the chart current

- `watch(el, buildFn)`: builds the chart now and again whenever the device, scale, mode, dark-mode or theme classes change on the screen or on a wrapper above it. `buildFn` creates and returns the chart instance; the previous one is destroyed before each rebuild. Returns a stop function.
Highcharts numbers do not read CSS, so resolve heights, spacing, and offsets with `TRMNLPaint.px()` inside the build function. See [Paint API](https://trmnl.com/framework/docs/3.2/paint_api) .

```javascript
var el = "my-chart";

// watch() rebuilds on every device, mode, dark-mode and theme change.
TRMNLCharts.watch(el, function () {
  var chart = Highcharts.chart(el, TRMNLCharts.merge(TRMNLCharts.options({ el: el }), {
    chart: { type: "column", height: TRMNLPaint.px(180, { el: el }) },
    xAxis: { categories: ["Mon", "Tue", "Wed"] },
    series: [
      { name: "Sent", data: [3, 5, 8], color: TRMNLCharts.series(0, 2, { el: el }) },
      { name: "Read", data: [2, 4, 6], color: TRMNLCharts.series(1, 2, { el: el }) }
    ]
  }));
  // Legend markers marked data-chart-series="0" / "1" pick up the same ramp.
  TRMNLCharts.applySwatches({ el: el });
  return chart;
});
```

### Live example

The bar rows below are painted with `TRMNLPaint.series()` and `TRMNLPaint.apply()`, wrapped in `TRMNLPaint.watch()`, with no charting library involved. Change the device mode or Style in the screen picker and the bars repaint from the live cascade: flat colors on solid panels, dither tiles on 1- and 2-bit screens.

```html
<!-- an empty, ID'd container to paint into -->
<div id="paint-strip" class="flex flex--col gap--small w--full"></div>

<script type="text/javascript">
  // plugins.js bundles TRMNLPaint; wait for it before painting.
  function whenReady(cb) {
    if (window.TRMNLPaint) return cb();
    window.addEventListener("load", function () {
      if (window.TRMNLPaint) cb();
    }, { once: true });
  }

  whenReady(function () {
    var el = "paint-strip";
    var DATA = [["Scranton", 12.4], ["Stamford", 9.8], ["Nashua", 8.6],
                ["Utica", 7.4], ["Albany", 6.2], ["Buffalo", 4.2]];
    // watch() repaints whenever the screen device/scale/mode/dark/theme classes change,
    // re-reading paint from the live cascade each time.
    TRMNLPaint.watch(el, function () {
      var box = document.getElementById(el);
      if (!box) return;
      box.innerHTML = "";
      DATA.forEach(function (d, i) {
        var row = document.createElement("div");
        row.className = "flex flex--row flex--center-y gap--small";
        var cap = document.createElement("span");
        cap.className = "label label--small";
        cap.style.cssText = "width:88px;flex:none;";
        cap.textContent = d[0];
        var rail = document.createElement("div");
        rail.style.cssText = "flex:1;height:16px;";
        var bar = document.createElement("div");
        bar.style.cssText = "height:100%;border-radius:4px;width:" + (d[1] / DATA[0][1] * 100) + "%;";
        // series(i, n) resolves the fill for series i from the screen's chart
        // ramp; apply() composites field + tile like the CSS pipeline.
        TRMNLPaint.apply(bar, TRMNLPaint.series(i, DATA.length, { el: el }));
        rail.appendChild(bar);
        row.appendChild(cap);
        row.appendChild(rail);
        box.appendChild(row);
      });
    });
  });
</script>
```

### Where This Applies

These pages document the surfaces this API programs.

[
## Rendering Modes
](https://trmnl.com/framework/docs/3.2/rendering_modes) [
## Chart
](https://trmnl.com/framework/docs/3.2/chart)

Previous

[Painting Colors Resolve background, text, stroke, and semantic tokens from JavaScript as canonical Fill objects](https://trmnl.com/framework/docs/3.2/paint_colors)

Next

[Painting Borders Read border rails as BorderFill objects for custom rails and Highcharts axes](https://trmnl.com/framework/docs/3.2/paint_borders)
