# TRMNL Liquid templates

Markup for the SF Bay Ferry plugin's e-ink display. Built on the
[TRMNL framework](https://usetrmnl.com/framework) classes.

## Files

| File | TRMNL layout | Shows |
|---|---|---|
| `full.liquid` | Full (800x480) | Up to 4 sailing times per terminal |
| `half_horizontal.liquid` | Half Horizontal (800x240) | Next sailing time per terminal |

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
    {
      "time": "7:11 PM",
      "mins": 12,
      "sailings": [
        { "kind": "departure", "vehicle": "Cetus", "stop": "Ferry Building Gate G" }
      ]
    }
  ],
  "seaplane": [
    {
      "time": "7:17 PM",
      "mins": 20,
      "sailings": [
        { "kind": "arrival", "vehicle": "Taurus", "stop": "Seaplane Lagoon" }
      ]
    }
  ]
}
```

Each terminal is a list of **time groups** (`{% for g in ferry_building %}`),
soonest-first. A group holds every vessel sailing at that clock time
(`{% for s in g.sailings %}`), so the template shows `{{ g.time }}` once as a
hero number with each `s.kind` / `s.vehicle` listed under it. The absolute
`time` is shown rather than the `mins` countdown — `mins` goes stale between
TRMNL's slow refreshes, the clock time does not.

## Installing

1. In the TRMNL plugin's **Markup** editor, pick the layout tab (Full, Half
   Horizontal, ...).
2. Paste the matching `.liquid` file's contents.
3. Use the editor's live preview to check spacing — e-ink rendering differs
   from a browser, and framework classes may need small tweaks.

The arrival lists are already sorted soonest-first by the Worker, and capped
with `limit:` in the template, so no sorting is needed here.
