# TRMNL Liquid templates

Markup for the SF Bay Ferry plugin's e-ink display. Built on the
[TRMNL framework](https://usetrmnl.com/framework) classes.

## Files

| File | TRMNL layout | Shows |
|---|---|---|
| `full.liquid` | Full (800x480) | Up to 4 arrivals per terminal |
| `half_horizontal.liquid` | Half Horizontal (800x240) | Next arrival per terminal |

For Half Vertical / Quadrant, copy `half_horizontal.liquid` and trim — the
data and class names are identical.

## Data shape

These templates expect the JSON the Cloudflare Worker returns. With TRMNL's
**Polling** strategy, the top-level JSON keys become Liquid variables directly:

```json
{
  "route_id": "19417",
  "updated_at": "7:11 PM",
  "ferry_building": [
    { "vehicle": "Cetus", "stop": "Ferry Building Gate G", "mins": 12, "time": "7:11 PM" }
  ],
  "seaplane": [
    { "vehicle": "Taurus", "stop": "Seaplane Lagoon", "mins": 20, "time": "7:17 PM" }
  ]
}
```

So `{{ updated_at }}`, `{% for a in ferry_building %}`, `{{ a.mins }}`, etc.

## Installing

1. In the TRMNL plugin's **Markup** editor, pick the layout tab (Full, Half
   Horizontal, ...).
2. Paste the matching `.liquid` file's contents.
3. Use the editor's live preview to check spacing — e-ink rendering differs
   from a browser, and framework classes may need small tweaks.

The arrival lists are already sorted soonest-first by the Worker, and capped
with `limit:` in the template, so no sorting is needed here.
