# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TRMNL e-ink plugin that displays transit arrival times for any Swiftly
agency + route. The agency and route id are TRMNL plugin inputs; the Swiftly
API key is a Worker secret (the plugin is single-tenant — whoever uses the
recipe self-hosts the Worker). It was built for SF Bay Ferry's Alameda Seaplane
route (agency `sfbay-ferry`, route id `19417`), still the default smoketest
target. Data originates from the Swiftly transit API.

## Architecture

The repo is three stages of one pipeline, each in its own directory:

```
Swiftly API  →  worker/ (Cloudflare Worker backend)  →  TRMNL polling  →  trmnl/ (Liquid templates)
explore/ = throwaway tooling used to discover route/stop ids
```

**Why the backend exists** — TRMNL's "Polling" strategy fetches a URL and renders
the raw JSON; it does no filtering or transformation. The Swiftly
`gtfs-rt-trip-updates` feed is agency-wide and large, and Swiftly forbids
client-side requests to it. The Worker sits between: it fetches the feed,
filters to one route, and returns a small sculpted JSON payload TRMNL can
render directly.

- **`worker/`** — the Cloudflare Worker (TypeScript). `src/index.ts` is the
  whole backend. Per request it reads `agency`/`route` query params and uses the
  `SWIFTLY_API_KEY` secret, then makes three Swiftly calls: agency info (for the
  timezone), verbose route info (for the route's directions + stop names), and
  the trip-updates feed. It buckets sailings by the trip's `directionId` and
  returns one `section` per route direction. The handler tolerates
  camelCase/snake_case feed keys via `pick()`.
- **`trmnl/`** — a [trmnlp](https://github.com/usetrmnl/trmnlp) plugin
  project. `src/` holds one Liquid template per TRMNL layout (`full`,
  `half_horizontal`, `half_vertical`, `quadrant`) plus `settings.yml` (plugin
  config — polling URL, form fields); `.trmnlp.yml` is the dev-server config
  and carries a static sample payload for offline preview. The Worker's
  top-level JSON keys (`route_name`, `updated_at`, `sections`) become Liquid
  variables directly; templates iterate `sections`. Sorting and capping happen
  in the Worker. `trmnlp serve` renders the templates locally; `trmnlp push`
  deploys `src/` to TRMNL.
  `custom_fields` entries support a `group: "Name"` key (clusters fields into
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

The three runtimes are independent: `explore/` is Python via `uv`, `worker/`
is Node via `npm`, `trmnl/` is Ruby via the `trmnl_preview` gem. There is no
shared build. `mise` provides `uv`, Node, and Ruby, so a single `mise install`
bootstraps the whole repo.

## Toolchain: mise

**`mise` is the version/tool manager for the whole repo** — it provides Node
(npm, npx, wrangler, tsc) for `worker/`, `uv` for `explore/`, and Ruby for
`trmnl/`. None are assumed to be on the system PATH; all are pinned in
`mise.toml` at the repo root. Do not install Node, uv, or Ruby globally or via
another manager; use mise.

- First time / after cloning: `mise install` at the repo root (run `mise trust`
  if prompted about the untrusted config). `trmnlp` comes from the
  `gem:trmnl_preview` entry in `mise.toml`'s `[tools]` — mise's `gem:` backend
  installs the gem and puts `trmnlp` on PATH, so `mise install` bootstraps it
  along with Node, uv, and Ruby.
- If mise is activated in the shell, `node`/`npm`/`npx`/`uv`/`trmnlp` resolve
  automatically anywhere in the repo.
- If it is not activated, prefix every command with `mise exec -- `
  (e.g. `mise exec -- npm run typecheck`, `mise exec -- uv run trip_updates.py`).

## Commands

### worker/ (run from `worker/`)

Node/npm come from `mise` — see the Toolchain section above.

- `npm install` — install deps (first time)
- `npm run typecheck` — `tsc`, no emit
- `SWIFTLY_API_KEY=... node _smoketest.ts [agency] [route]` — run the handler
  against the live API with no wrangler (Node 24 strips TS types natively);
  defaults to `sfbay-ferry 19417`
- `npm run dev` — local wrangler server on `localhost:8787`
- `npm run deploy` — deploy to Cloudflare

Secrets are set via `wrangler secret put` — never in `wrangler.toml`:
`SWIFTLY_API_KEY` (required) and `BACKEND_SECRET` (optional). `wrangler.toml` has
no `[vars]`.

### explore/ (run from `explore/`)

Scripts are run with `uv` and declare their own PEP 723 metadata (stdlib only).
Credentials come from `explore/.env` (`SWIFTLY_API_KEY`, `AGENCY_KEY`).

- `uv run explore_routes.py [--route ID]` — list routes, or dump a route's stops
- `uv run trip_updates.py [--route ID] [--stops a,b,c]` — upcoming arrivals
- `uv run vehicle_positions.py [--route ID]` — live vehicle positions

### trmnl/ (run from `trmnl/`)

`trmnlp` comes from `mise` — see the Toolchain section above.

- `trmnlp serve` — dev server with live reload at `localhost:4567`
- `trmnlp build` — render all layouts to static HTML in `_build/` (also the
  CI check — trmnlp 0.7.x has no `lint`)
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
  Tooling lives in `trmnl/package.json` purely for this — it isn't part of
  the plugin runtime.

Preview uses the static sample in `.trmnlp.yml`'s `variables:` block by
default; comment it out to poll live data, which needs `BACKEND_URL` (and
`BACKEND_SECRET` if the Worker gates) in the environment — mise loads these from
a gitignored root `.env` (see `.env.example`). `.github/workflows/trmnl.yml`
builds on every PR and pushes to TRMNL on merge to `main`.

Known templates limitation: `half_vertical` (and likely `quadrant`) overflow
on smaller devices like the original TRMNL — see
[`docs/TODO-responsive-layouts.md`](docs/TODO-responsive-layouts.md) for the
plan to make templates work across every device in `usetrmnl.com/api/models`.

## Key facts

- `SWIFTLY_BASE` and `DEFAULT_TZ` in `worker/src/index.ts` are intentionally
  hardcoded, not config gaps: there's one Swiftly API for everyone, and
  Swiftly's spec marks agency `timezone` as required, so the default is an
  unreachable-in-practice fallback. Don't add form fields for either.
- The Worker groups sailings by the route's **direction** (from verbose route
  info), not by stop — so multi-gate terminals (e.g. the SF Ferry Building's
  gates E/F/G) and multi-stop routes need no special handling.
- Swiftly endpoints all support `format=json`; the code never parses protobuf.
- Swiftly auth is an `Authorization: <api-key>` header (raw key, no scheme).
  Keys are account-scoped to specific agencies.
- Swiftly responses are edge-cached in the Worker — agency/route info 1 h, the
  live trip-updates feed 25 s — so frequent polling is harmless.
