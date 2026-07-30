# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TRMNL e-ink plugin that displays transit arrival times for any Swiftly
agency + route. The agency, route id, and Swiftly API key are all TRMNL
plugin form fields — there is no backend to deploy; TRMNL runs the plugin's
serverless transform on its own infrastructure. It was built for SF Bay
Ferry's Alameda Seaplane route (agency `sfbay-ferry`, route id `19417`),
still the default smoketest target. Data originates from the Swiftly transit
API.

## Architecture

The repo is two stages of one pipeline, each in its own directory:

```
Swiftly API  →  TRMNL polling + serverless transform (trmnl/)  →  Liquid templates (trmnl/)
explore/ = throwaway tooling used to discover route/stop ids
```

**Why a transform exists** — TRMNL's "Polling" strategy fetches a URL and
hands the raw JSON to a **serverless transform** (a script TRMNL runs
server-side — locally via `trmnlp` in dev, on TRMNL's hosted microVM daemon
in production) before Liquid ever sees it. The Swiftly `gtfs-rt-trip-updates`
feed is agency-wide and large, so polling hits it directly and the transform
does the rest: two more Swiftly calls, then filtering + bucketing into a
small sculpted JSON payload Liquid can render directly. This replaced an
earlier self-hosted Cloudflare Worker (see git history) once TRMNL added
serverless transforms — a transform can make its own outbound HTTP calls, so
there's no need for a separately-hosted backend anymore.

- **`trmnl/`** — a [trmnlp](https://github.com/usetrmnl/trmnlp) plugin
  project.
  - `src/` holds one Liquid template per TRMNL layout (`full`,
    `half_horizontal`, `half_vertical`, `quadrant`), `settings.yml` (plugin
    config — polling URL/headers, form fields, `serverless_language: node`),
    and `transform.js` (**generated**, see below). `.trmnlp.yml` is the
    dev-server config and carries a static sample payload for offline
    preview.
  - `transform-src/transform.ts` is the type-safe source for
    `src/transform.js` — compiled via `npm run build:transform` (plain
    `tsc`, no bundler; the file has no imports so tsc's output stays a
    global-scope script, which is required since the transform runs
    standalone with no npm install step). It reads
    `input.trmnl.plugin_settings.custom_fields_values` for `agency`/`route`/
    `swiftly_api_key`, makes the agency-info + verbose-route-info Swiftly
    calls, buckets the already-polled trip-updates feed (`input.entity`) by
    the trip's `directionId`, and returns one `section` per route direction.
    Tolerates camelCase/snake_case feed keys via `pick()`.
  - The transform's top-level JSON keys (`route_name`, `updated_at`,
    `sections`) become Liquid variables directly; templates iterate
    `sections`. Sorting and capping happen in the transform. `trmnlp serve`
    renders the templates locally (does **not** watch `transform-src/` —
    rebuild manually after editing it); `trmnlp push` deploys `src/`
    (including the built `transform.js`) to TRMNL.
  - `custom_fields` entries support a `group: "Name"` key (clusters fields into
    a collapsible section on the install form) and `field_type: author_bio` (a
    README-like block rendered below the plugin's preview image, with its own
    `category`/`email_address`/`github_url`/`learn_more_url`/`youtube_url`
    keys) — see [TRMNL's form builder
    docs](https://help.trmnl.com/en/articles/10513740-custom-plugin-form-builder)
    for the full field-type/category reference. The plugin **icon/preview
    image** itself is uploaded in the TRMNL dashboard UI, not via
    `settings.yml`/`trmnlp`.
- **`explore/`** — Python scripts (uv) for poking the Swiftly API.
  `swiftly.py` is the shared client; the rest are standalone. Originally used
  to find stop ids, but `explore_routes.py` is now also the documented way
  for anyone installing the plugin to find their agency's route id (see
  `explore/README.md` and the root README's Quick Start); `trip_updates.py` /
  `vehicle_positions.py` remain useful for debugging the live feed.

The two runtimes are independent: `explore/` is Python via `uv`, `trmnl/` is
Ruby via the `trmnl_preview` gem, with a Node/TypeScript build scoped to its
`transform-src/` → `src/transform.js` compile step. There is no build shared
across directories. `mise` provides `uv`, Node, and Ruby, so a single
`mise install` bootstraps the whole repo.

## Toolchain: mise

**`mise` is the version/tool manager for the whole repo** — it provides Node
(npm, npx, tsc) for `trmnl/`'s transform build, `uv` for `explore/`, and Ruby
for `trmnl/`'s `trmnlp`. None are assumed to be on the system PATH; all are
pinned in `mise.toml` at the repo root. Do not install Node, uv, or Ruby
globally or via another manager; use mise.

- First time / after cloning: `mise install` at the repo root (run `mise trust`
  if prompted about the untrusted config). `trmnlp` comes from the
  `gem:trmnl_preview` entry in `mise.toml`'s `[tools]` — mise's `gem:` backend
  installs the gem and puts `trmnlp` on PATH, so `mise install` bootstraps it
  along with Node, uv, and Ruby.
- Ruby is pinned to `4.0` (not `3.x`) because `trmnl_preview >= 0.8.0`
  (needed for serverless transform support) depends on `trmnl-liquid ~> 0.7`,
  which requires Ruby >= 4.0. Don't downgrade either pin without checking that
  dependency chain again.
- If mise is activated in the shell, `node`/`npm`/`npx`/`uv`/`trmnlp` resolve
  automatically anywhere in the repo.
- If it is not activated, prefix every command with `mise exec -- `
  (e.g. `mise exec -- npm run build:transform`, `mise exec -- uv run trip_updates.py`).

## Commands

### explore/ (run from `explore/`)

Scripts are run with `uv` and declare their own PEP 723 metadata (stdlib only).
Credentials come from `explore/.env` (`SWIFTLY_API_KEY`, `AGENCY_KEY`).

- `uv run explore_routes.py [--route ID]` — list routes, or dump a route's stops
- `uv run trip_updates.py [--route ID] [--stops a,b,c]` — upcoming arrivals
- `uv run vehicle_positions.py [--route ID]` — live vehicle positions

### trmnl/ (run from `trmnl/`)

`trmnlp` comes from `mise` — see the Toolchain section above. Node/npm are
only needed for the transform build (`npm install` once, first time).

- `npm run build:transform` — compiles `transform-src/transform.ts` to
  `src/transform.js`. Run this after every edit to the `.ts` source and
  before `trmnlp serve`/`build`/`push` — none of them know about the `.ts`
  file, they only read `src/transform.js`.
- `npm run typecheck:transform` — same compile, `--noEmit`, for a fast type
  check without touching `src/transform.js`.
- `trmnlp serve` — dev server with live reload at `localhost:4567`
- `trmnlp build` — render all layouts to static HTML in `_build/`
- `trmnlp lint` — checks the plugin against TRMNL best practices (also a CI
  step)
- `trmnlp push` — deploy `src/` to TRMNL; needs an `id:` in `src/settings.yml`
  and auth (`trmnlp login` once, or `TRMNL_API_KEY`)
- `trmnlp pull` — overwrite `src/settings.yml` from the server
- `npm run screenshots` — render all four layouts to `docs/screenshots/*.png`
  via headless Chromium against `trmnlp serve` (the script spawns it if not
  running). **This is the visual feedback loop when editing `src/*.liquid`:
  edit a template, run this, then Read the PNG to see the change.** Routing
  through the dev server (not `trmnlp build`) is intentional — the static
  `_build/` HTML is missing the `<div class="trmnl">` design-system scope and
  the `screen_classes` CSS scoping, so it renders incorrectly. The script
  currently hardcodes TRMNL X (1040×780, `screen--v2 screen--lg`,
  16-grays palette); see `trmnl/scripts/screenshots.mjs` for the constants
  and the picker class mapping if you need to check a different device.

Preview uses the static sample in `.trmnlp.yml`'s `variables:` block by
default; comment it out to poll live data, which needs `SWIFTLY_API_KEY` in
the environment — mise loads it from a gitignored root `.env` (see
`.env.example`). trmnlp resolves `.trmnlp.yml`'s `{{ env.X }}` templating for
`polling_url`/`polling_headers`, but hands the transform the *raw* templated
string for `custom_fields_values` — a local-only quirk, which is why
`transform-src/transform.ts` has a `process.env.SWIFTLY_API_KEY` fallback for
exactly this case. Real installs never hit that branch: TRMNL passes the
transform the plain value installers type into the form field, not a
template. `.github/workflows/trmnl.yml` builds the transform and runs
`trmnlp lint`/`build` on every PR; the `push` job is present but commented
out (enable by uncommenting + setting the `TRMNL_API_KEY` repo secret).

Known templates limitation: `half_vertical` (and likely `quadrant`) overflow
on smaller devices like the original TRMNL — see
[`docs/TODO-responsive-layouts.md`](docs/TODO-responsive-layouts.md) for the
plan to make templates work across every device in `usetrmnl.com/api/models`.

## Key facts

- `SWIFTLY_BASE` and `DEFAULT_TZ` in `trmnl/transform-src/transform.ts` are
  intentionally hardcoded, not config gaps: there's one Swiftly API for
  everyone, and Swiftly's spec marks agency `timezone` as required, so the
  default is an unreachable-in-practice fallback. Don't add form fields for
  either.
- The transform groups sailings by the route's **direction** (from verbose
  route info), not by stop — so multi-gate terminals (e.g. the SF Ferry
  Building's gates E/F/G) and multi-stop routes need no special handling.
- Swiftly endpoints all support `format=json`; the code never parses protobuf.
- Swiftly auth is an `Authorization: <api-key>` header (raw key, no scheme).
  Keys are account-scoped to specific agencies.
- There's no caching layer in front of Swiftly (the old Worker had one) —
  each poll cycle costs three Swiftly calls per installed plugin instance.
  Fine at the default 15-minute `refresh_interval`; revisit if Swiftly ever
  pushes back on request volume.
