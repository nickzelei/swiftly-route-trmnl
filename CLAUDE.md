# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TRMNL e-ink plugin that displays SF Bay Ferry arrival times for the Alameda
Seaplane route (Swiftly route id `19417`), which runs between Seaplane Lagoon
and the SF Ferry Building. Data originates from the Swiftly transit API.

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
filters to one route + a fixed set of stops, and returns a small sculpted JSON
payload TRMNL can render directly.

- **`worker/`** — the Cloudflare Worker (TypeScript). `src/index.ts` is the
  whole proxy: fetch feed → filter by `ROUTE_ID` and the `STOPS` map → compute
  minutes-until → return JSON. The `STOPS` map (stop id → terminal + label) is
  the single source of truth for which stops appear; edit it to change coverage.
  The handler tolerates both camelCase and snake_case feed keys via `pick()`.
- **`trmnl/`** — Liquid templates, one per TRMNL layout (`full`,
  `half_horizontal`). The Worker's top-level JSON keys (`updated_at`,
  `ferry_building`, `seaplane`) become Liquid variables directly. Templates
  only iterate; sorting and capping happen in the Worker.
- **`explore/`** — Python scripts (uv) for poking the Swiftly API.
  `swiftly.py` is the shared client; the rest are standalone. Already served
  their purpose (finding stop ids), but `trip_updates.py` /
  `vehicle_positions.py` remain useful for debugging the live feed.

The two runtimes are independent: `explore/` is Python via `uv`, `worker/` is
Node via `npm`. There is no shared build. `mise` provides both `uv` and Node,
so a single `mise install` bootstraps the whole repo.

## Toolchain: mise

**`mise` is the version/tool manager for the whole repo** — it provides Node
(npm, npx, wrangler, tsc) for `worker/` and `uv` for `explore/`. Neither is
assumed to be on the system PATH; both are pinned in `mise.toml` at the repo
root. Do not install Node or uv globally or via another manager; use mise.

- First time / after cloning: `mise install` at the repo root (run `mise trust`
  if prompted about the untrusted config).
- If mise is activated in the shell, `node`/`npm`/`npx`/`uv` resolve
  automatically anywhere in the repo.
- If it is not activated, prefix every command with `mise exec -- `
  (e.g. `mise exec -- npm run typecheck`, `mise exec -- uv run trip_updates.py`).

## Commands

### worker/ (run from `worker/`)

Node/npm come from `mise` — see the Toolchain section above.

- `npm install` — install deps (first time)
- `npm run typecheck` — `tsc`, no emit
- `SWIFTLY_API_KEY=... node _smoketest.ts` — run the handler against the live
  API with no wrangler (Node 24 strips TS types natively)
- `npm run dev` — local wrangler server on `localhost:8787`
- `npm run deploy` — deploy to Cloudflare

Secrets are set via `wrangler secret put SWIFTLY_API_KEY` (and optional
`PROXY_SECRET`) — never in `wrangler.toml`. Plain config (`AGENCY_KEY`,
`ROUTE_ID`, `TIMEZONE`) lives in `wrangler.toml` `[vars]`.

### explore/ (run from `explore/`)

Scripts are run with `uv` and declare their own PEP 723 metadata (stdlib only).
Credentials come from `explore/.env` (`SWIFTLY_API_KEY`, `AGENCY_KEY`).

- `uv run explore_routes.py [--route ID]` — list routes, or dump a route's stops
- `uv run trip_updates.py [--route ID] [--stops a,b,c]` — upcoming arrivals
- `uv run vehicle_positions.py [--route ID]` — live vehicle positions

## Key facts

- The SF Ferry Building is **not a route** — it is a set of stops (gates E/F/G:
  `72011`, `72013`, `72012`). Seaplane Lagoon is stop `7207`. All four are stops
  on route `19417`.
- Swiftly endpoints all support `format=json`; the code never parses protobuf.
- Swiftly auth is an `Authorization: <api-key>` header (raw key, no scheme).
- Swiftly responses are edge-cached 25s in the Worker, so frequent polling is
  harmless.
