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
| `src/full.liquid` | Full (800x480) | Up to 4 trips per direction |
| `src/half_horizontal.liquid` | Half Horizontal (800x240) | Next trip per direction |
| `src/half_vertical.liquid` | Half Vertical (400x480) | Up to 2 trips per direction, stacked |
| `src/quadrant.liquid` | Quadrant (400x240) | Next trip per direction, stacked |
| `src/settings.yml` | — | Plugin config (strategy, polling URL, form fields) |
| `src/transform.js` | — | The serverless transform trmnlp/TRMNL execute. **Generated** — see below, don't edit directly. |
| `transform-src/transform.ts` | — | The type-safe source for `src/transform.js`. Edit this. |
| `.trmnlp.yml` | — | Dev-server config + static preview data (not uploaded) |

The two 800-wide layouts arrange the directions as side-by-side `columns`; the
two 400-wide layouts stack them top/bottom as `rows`. Each trip renders as one
row: the stop-name chain over the matching time chain, with the vessel below.

## How the data gets here

TRMNL's **Polling** strategy fetches a URL and hands the raw JSON to a
**serverless transform** before Liquid ever sees it — a script TRMNL runs
server-side (locally via `trmnlp`, or on TRMNL's hosted microVM daemon in
production). `polling_url`/`polling_headers` in `src/settings.yml` hit
Swiftly's `gtfs-rt-trip-updates` feed directly (agency-wide and large, so it
needs filtering before it's fit to render); `src/transform.js` then makes two
more Swiftly calls (agency info for the timezone, verbose route info for the
route's directions + stop names), buckets the feed's sailings by direction,
and returns the small JSON payload below. No backend to deploy — the plugin
form fields (agency, route, your own Swiftly API key) are all it needs.

`src/transform.js` is **generated** from `transform-src/transform.ts` — write
type-safe TypeScript there, then compile:

```sh
npm install               # one time
npm run build:transform   # transform-src/transform.ts -> src/transform.js
```

Run this after every edit to `transform-src/transform.ts`, before
`trmnlp serve`/`build`/`push` — none of them know about the `.ts` source, they
only ever read `src/transform.js`. `npm run typecheck:transform` checks types
without emitting, if you just want a fast type check. The compiled file has no
imports (tsc emits a plain global-scope script — required, since the
transform runs as a standalone file with no npm install step), so
`transform.ts` must never import anything beyond Node/JS builtins.

## Data shape

With TRMNL's **Polling** strategy, the top-level JSON keys the transform
returns become Liquid variables directly:

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
      "trips": [
        {
          "vehicle": "Cetus",
          "stops": [
            { "name": "Alameda Seaplane Lagoon Ferry Terminal", "time": "7:11 PM", "mins": 12 },
            { "name": "San Francisco Ferry Building Gate F", "time": "7:27 PM", "mins": 28 }
          ]
        }
      ]
    }
  ]
}
```

`sections` is a list with one entry per route **direction** — the templates
iterate it (`{% for sec in sections limit: 2 %}`) and use `sec.title` as the
column/row heading. Each section's `trips` is a list of sailings, soonest-first
by origin departure. A trip is a `vehicle` plus an ordered `stops` chain
(origin → any intermediate stops → destination); the template renders the
`stop.name` chain over the `stop.time` chain (`{% for stop in trip.stops %}`).
The absolute `time` is shown rather than the `mins` countdown — `mins` goes
stale between TRMNL's slow refreshes, the clock time does not. The trip lists
are already sorted soonest-first and capped with `limit:` in the template, so
no sorting is needed there.

When `sections` is empty (the transform returns `error` for a missing/invalid
input, e.g. a bad route id or a rejected API key), the templates render that
message instead. The title bar shows `route_name`.

## Developing

`trmnlp` is installed by `mise install` at the repo root (see the root README
and CLAUDE.md). Run all commands below from this `trmnl/` directory.

- `trmnlp serve` — dev server with live reload at <http://localhost:4567>.
  Edit any `src/*.liquid` file and the preview updates. (Editing
  `transform-src/transform.ts` needs a manual `npm run build:transform` first
  — `trmnlp serve` only watches `src/`.)
- `trmnlp build` — render all four layouts to static HTML in `_build/`.
- `trmnlp lint` — checks the plugin against TRMNL best practices.
- `trmnlp push` — deploy `src/` (templates + `settings.yml` + `transform.js`)
  to TRMNL.

e-ink rendering differs from a browser, and framework classes may need small
tweaks — `trmnlp` renders with the real TRMNL Design System so the preview is
faithful.

### Preview data

By default the preview uses the static sample payload in `.trmnlp.yml`'s
`variables:` block — no Swiftly API key needed, works offline.

To preview against **live** data, comment out the `variables:` block in
`.trmnlp.yml` and set `SWIFTLY_API_KEY` in a repo-root `.env` (mise loads it —
see the root `.env.example`). `polling_url` hits Swiftly directly and
`src/transform.js` (make sure it's built — see above) makes the rest of the
calls.

Local trmnlp quirk: it resolves `.trmnlp.yml`'s `{{ env.X }}` templating for
`polling_url`/`polling_headers`, but hands the transform the *raw* templated
string for `custom_fields_values` — so `transform-src/transform.ts` has a
`process.env.SWIFTLY_API_KEY` fallback for exactly this case. Real installs
never hit that branch: TRMNL passes the transform the plain value installers
type into the form field, not a template.

## Deploying

`trmnlp push` uploads `src/` to a TRMNL private plugin. It needs:
- an `id:` in `src/settings.yml` (the plugin's id — run `trmnlp pull` once to
  populate it, or copy it from the plugin's dashboard URL),
- authentication: either `trmnlp login` once, or a `TRMNL_API_KEY` env var,
  and
- `src/transform.js` built and up to date (`npm run build:transform`) — it's
  what actually gets uploaded, not `transform-src/transform.ts`.

CI (`.github/workflows/trmnl.yml`) builds the transform and runs
`trmnlp lint`/`build` on every PR; the `push` job (commented out) would do the
same plus `trmnlp push` on merge to `main` — enable it by uncommenting and
setting the `TRMNL_API_KEY` repo secret.
