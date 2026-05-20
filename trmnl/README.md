# TRMNL Liquid templates

Markup for the ferry plugin's e-ink display. Built on the
[TRMNL framework](https://usetrmnl.com/framework) classes.

## Files

| File | TRMNL layout | Shows |
|---|---|---|
| `full.liquid` | Full (800x480) | Up to 4 sailing times per direction |
| `half_horizontal.liquid` | Half Horizontal (800x240) | Next sailing time per direction |
| `half_vertical.liquid` | Half Vertical (400x480) | Up to 3 sailing times per direction, stacked |
| `quadrant.liquid` | Quadrant (400x240) | Next sailing time per direction, stacked |

The two 800-wide layouts arrange the directions as side-by-side `columns`; the
two 400-wide layouts stack them top/bottom as `rows`. `quadrant.liquid`
abbreviates the sailing kind to `DEP`/`ARR` to fit the tight space.

## Data shape

These templates expect the JSON the Cloudflare Worker returns. With TRMNL's
**Polling** strategy, the top-level JSON keys become Liquid variables directly:

```json
{
  "agency": "sfbay-ferry",
  "route_id": "19417",
  "route_name": "Alameda Seaplane",
  "updated_at": "7:11 PM",
  "sections": [
    {
      "title": "To San Francisco Ferry Building Gate F",
      "direction_id": "1",
      "groups": [
        {
          "time": "7:11 PM",
          "mins": 12,
          "sailings": [
            { "kind": "departure", "vehicle": "Cetus", "stop": "Alameda Seaplane Lagoon Ferry Terminal" }
          ]
        }
      ]
    }
  ]
}
```

`sections` is a list with one entry per route **direction** — the templates
iterate it (`{% for sec in sections limit: 2 %}`) and use `sec.title` as the
column/row heading. Each section's `groups` is a list of **time groups**,
soonest-first. A group holds every vessel sailing at that clock time
(`{% for s in g.sailings %}`), so the template shows `{{ g.time }}` once as a
hero number with each `s.kind` / `s.vehicle` under it. The absolute `time` is
shown rather than the `mins` countdown — `mins` goes stale between TRMNL's slow
refreshes, the clock time does not.

When `sections` is empty (the Worker returns `error` for a missing/invalid
input), the templates render that message instead. The title bar shows
`route_name`.

## Installing

1. In the TRMNL plugin's **Markup** editor, pick the layout tab (Full, Half
   Horizontal, ...).
2. Paste the matching `.liquid` file's contents.
3. Use the editor's live preview to check spacing — e-ink rendering differs
   from a browser, and framework classes may need small tweaks.

The sailing lists are already sorted soonest-first by the Worker, and capped
with `limit:` in the template, so no sorting is needed here.
