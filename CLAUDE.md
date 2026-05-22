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
Swiftly API  →  worker/ (Cloudflare Worker proxy)  →  TRMNL polling  →  trmnl/ (Liquid templates)
explore/ = throwaway tooling used to discover route/stop ids
```

**Why the proxy exists** — TRMNL's "Polling" strategy fetches a URL and renders
the raw JSON; it does no filtering or transformation. The Swiftly
`gtfs-rt-trip-updates` feed is agency-wide and large, and Swiftly forbids
client-side requests to it. The Worker sits between: it fetches the feed,
filters to one route, and returns a small sculpted JSON payload TRMNL can
render directly.

- **`worker/`** — the Cloudflare Worker (TypeScript). `src/index.ts` is the
  whole proxy. Per request it reads `agency`/`route` query params and uses the
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
- **`explore/`** — Python scripts (uv) for poking the Swiftly API.
  `swiftly.py` is the shared client; the rest are standalone. Already served
  their purpose (finding stop ids), but `trip_updates.py` /
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
  if prompted about the untrusted config). A `postinstall` hook also runs
  `bundle install` for `trmnl/Gemfile`, which pins the `trmnl_preview` gem
  (it provides `trmnlp`, exposed as the committed `trmnl/bin/trmnlp` binstub so
  the bare command works without `bundle exec`) — mise's `gem:` backend
  mis-resolves its dependencies, hence Bundler via a hook. Hooks need
  `experimental = true`, set project-locally in `mise.toml`.
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
`SWIFTLY_API_KEY` (required) and `PROXY_SECRET` (optional). `wrangler.toml` has
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

Preview uses the static sample in `.trmnlp.yml`'s `variables:` block by
default; comment it out to poll live data, which needs `PROXY_URL` (and
`PROXY_SECRET` if the Worker gates) in the environment — mise loads these from
a gitignored root `.env` (see `.env.example`). `.github/workflows/trmnl.yml`
builds on every PR and pushes to TRMNL on merge to `main`.

## Key facts

- The Worker groups sailings by the route's **direction** (from verbose route
  info), not by stop — so multi-gate terminals (e.g. the SF Ferry Building's
  gates E/F/G) and multi-stop routes need no special handling.
- Swiftly endpoints all support `format=json`; the code never parses protobuf.
- Swiftly auth is an `Authorization: <api-key>` header (raw key, no scheme).
  Keys are account-scoped to specific agencies.
- Swiftly responses are edge-cached in the Worker — agency/route info 1 h, the
  live trip-updates feed 25 s — so frequent polling is harmless.
