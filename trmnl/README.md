# TRMNL plugin

Markup for the ferry plugin's e-ink display. Built on the
[TRMNL framework](https://usetrmnl.com/framework) classes.

This directory is a [trmnlp](https://github.com/usetrmnl/trmnlp) plugin
project — `trmnlp` is a self-hosted dev server that renders the Liquid
templates locally with the real TRMNL Design System and can deploy them to
TRMNL.

## Files

| File | TRMNL layout | Shows |
|---|---|---|
| `src/full.liquid` | Full (800x480) | Up to 4 sailing times per direction |
| `src/half_horizontal.liquid` | Half Horizontal (800x240) | Next sailing time per direction |
| `src/half_vertical.liquid` | Half Vertical (400x480) | Up to 3 sailing times per direction, stacked |
| `src/quadrant.liquid` | Quadrant (400x240) | Next sailing time per direction, stacked |
| `src/settings.yml` | — | Plugin config (strategy, polling URL, form fields) |
| `.trmnlp.yml` | — | Dev-server config + static preview data (not uploaded) |

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

## Developing

`trmnlp` is installed by `mise install` at the repo root (see the root README
and CLAUDE.md). Run all commands below from this `trmnl/` directory.

- `trmnlp serve` — dev server with live reload at <http://localhost:4567>.
  Edit any `src/*.liquid` file and the preview updates.
- `trmnlp build` — render all four layouts to static HTML in `_build/`.
- `trmnlp push` — deploy `src/` (templates + `settings.yml`) to TRMNL.

e-ink rendering differs from a browser, and framework classes may need small
tweaks — `trmnlp` renders with the real TRMNL Design System so the preview is
faithful.

### Preview data

By default the preview uses the static sample payload in `.trmnlp.yml`'s
`variables:` block — no Swiftly API key needed, works offline. (`trmnlp`
still attempts the live poll and may print a harmless `401` until you set
`PROXY_SECRET`; the static `variables:` override is what actually renders.)

To preview against **live** data, comment out the `variables:` block in
`.trmnlp.yml`. `polling_url` is built from the `api_url` custom field
(`{{ api_url }}?agency=...&route=...`), which `.trmnlp.yml` fills from the
`PROXY_URL` env var. Copy `.env.example` to `.env` at the repo root (mise loads
it — see the root `mise.toml`) and set `PROXY_URL` to either:
- the deployed Worker (and set `PROXY_SECRET` so the proxy auth header
  resolves), or
- a local Worker (`cd ../worker && npm run dev`) at `http://localhost:8787`.

## Deploying

`trmnlp push` uploads `src/` to a TRMNL private plugin. It needs:
- an `id:` in `src/settings.yml` (the plugin's id — run `trmnlp pull` once to
  populate it, or copy it from the plugin's dashboard URL), and
- authentication: either `trmnlp login` once, or a `TRMNL_API_KEY` env var.

On merge to `main`, `.github/workflows/trmnl.yml` runs `trmnlp push`
automatically — set the `TRMNL_API_KEY` repo secret to enable it.

The sailing lists are already sorted soonest-first by the Worker, and capped
with `limit:` in the template, so no sorting is needed here.
