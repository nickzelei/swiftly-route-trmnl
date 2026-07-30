# Swiftly Routes — Transit arrivals on TRMNL

A [TRMNL](https://usetrmnl.com/) e-ink plugin that shows upcoming transit
arrivals for any Swiftly agency + route. Built for the SF Bay Ferry Alameda
Seaplane route (agency `sfbay-ferry`, route `19417` — the default smoketest
target), but the agency and route are TRMNL plugin inputs, so one install of
this recipe can be pointed at any route on any Swiftly agency you have an API
key for. Currently only optimized for TRMNL X resolutions.

## About Swiftly

[Swiftly](https://www.goswift.ly/) is a transit data platform that many
agencies (SF Bay Ferry among them) use to power real-time arrival
predictions, GTFS-RT feeds, and vehicle tracking. This plugin reads from
Swiftly's [Real-Time API](https://realtime-docs.goswift.ly/) — the same feed
agencies use to power their own rider-facing apps.

Access requires an API key, which is account-scoped to the agencies you're
authorized for. To request one, go to Swiftly's
[API license page](https://www.goswift.ly/api-license) and fill out the
linked Google form; Swiftly follows up by email with a key and further
details. There's no self-serve signup, so budget a few days for a human to
respond before you can deploy the Worker below.

## How it works

```
Swiftly API  →  worker/  (Cloudflare Worker proxy)  →  TRMNL polling  →  trmnl/  (Liquid templates)
```

TRMNL's **Polling** strategy fetches a URL and renders the raw JSON; it does
no filtering or transformation. The Swiftly `gtfs-rt-trip-updates` feed is
agency-wide, large, and Swiftly forbids client-side calls to it — so the
Worker sits between, fetches the feed, filters to one route, groups sailings
by direction, and returns a small sculpted payload the Liquid templates
render directly.

The plugin is **single-tenant**: whoever uses the recipe self-hosts the
Worker, which is why the Swiftly API key is a Worker secret (set once with
`wrangler secret put`) rather than a TRMNL form field. The plugin form fields
hold only the per-install bits: your Worker's URL, the agency, the route, and
an optional proxy auth key.

## Repo layout

| Directory | Runtime | What's in it |
|---|---|---|
| [`worker/`](worker/README.md) | Node / TypeScript on Cloudflare Workers | The Swiftly proxy. One file (`src/index.ts`) — fetches agency info, route info, and the trip-updates feed, then returns one `section` per route direction. |
| [`trmnl/`](trmnl/README.md) | Ruby / [`trmnlp`](https://github.com/usetrmnl/trmnlp) | The plugin itself: one Liquid template per TRMNL layout (`full`, `half_horizontal`, `half_vertical`, `quadrant`) plus `settings.yml`. |
| [`explore/`](explore/README.md) | Python / `uv` | Throwaway scripts that poked the Swiftly API to discover stop and route ids. Already served their purpose; `trip_updates.py` is still handy for debugging the live feed. |
| [`docs/`](docs/) | — | Reference material (the Swiftly OpenAPI spec). |

The three runtimes are independent — there is no shared build. `mise`
provides all of them, so a single `mise install` bootstraps the repo.

## Quick start

### 1. Bootstrap the toolchain

[`mise`](https://mise.jdx.dev/) is the version manager for the whole repo —
it provides Node, `uv`, Ruby, and `trmnlp` (via mise's `gem:` backend). All
versions are pinned in [`mise.toml`](mise.toml); nothing needs to be on the
system PATH.

```sh
mise install        # run `mise trust` first if prompted
```

With mise activated in your shell, `node` / `npm` / `npx` / `uv` / `trmnlp`
resolve automatically. If it is not activated, prefix every command below
with `mise exec --`.

### 2. Deploy the Worker

You need a Swiftly API key (see [About Swiftly](#about-swiftly) above for how
to request one) — it is account-scoped, so the same key only returns data for
the agencies your account is authorized for.

```sh
cd worker
npm install
npx wrangler login                          # one time
npx wrangler secret put SWIFTLY_API_KEY     # required
npx wrangler secret put PROXY_SECRET        # optional auth gate
npm run deploy
```

You get a URL like `https://swiftly-trmnl.<subdomain>.workers.dev`. See
[`worker/README.md`](worker/README.md) for the full request/response shape
and local dev.

### 3. Push the templates to TRMNL

Create a private plugin in TRMNL, copy its id into `trmnl/src/settings.yml`,
then:

```sh
cd trmnl
trmnlp login          # one time, or set TRMNL_API_KEY
trmnlp push           # uploads src/ to TRMNL
```

`.github/workflows/trmnl.yml` does the same automatically on merge to `main`
once `TRMNL_API_KEY` is set as a repo secret.

### 4. Configure the install

In the TRMNL dashboard, fill in the plugin form fields:

| Field | Example |
|---|---|
| Proxy API Url | `https://swiftly-trmnl.<subdomain>.workers.dev` |
| Agency | `sfbay-ferry` |
| Route | `19417` |
| Proxy API Key | (matches the Worker's `PROXY_SECRET`, if set) |

## Layouts

All four TRMNL sizes render from the same JSON payload — the templates differ
only in how many trips they show and whether directions are arranged in
columns or rows.

| Template | Size | Shows | Preview |
|---|---|---|---|
| `src/full.liquid` | 800×480 | Up to 4 trips per direction | [![full](docs/screenshots/full.png)](docs/screenshots/full.png) |
| `src/half_horizontal.liquid` | 800×240 | Next trip per direction | [![half_horizontal](docs/screenshots/half_horizontal.png)](docs/screenshots/half_horizontal.png) |
| `src/half_vertical.liquid` | 400×480 | Up to 2 trips per direction, stacked | [![half_vertical](docs/screenshots/half_vertical.png)](docs/screenshots/half_vertical.png) |
| `src/quadrant.liquid` | 400×240 | Next trip per direction, stacked | [![quadrant](docs/screenshots/quadrant.png)](docs/screenshots/quadrant.png) |

Previews are rendered from the sample payload in
[`trmnl/.trmnlp.yml`](trmnl/.trmnlp.yml) by `trmnlp build` and screenshotted
with headless Chromium. To regenerate after changing a template:

```sh
cd trmnl
npm install                          # one time
npx playwright install chromium      # one time
npm run screenshots                  # writes docs/screenshots/*.png
```

## Local development

```sh
# Worker — runs the handler against the live Swiftly API, no wrangler
cd worker
mise exec -- node _smoketest.ts                     # sfbay-ferry / 19417
mise exec -- node _smoketest.ts sfbay-ferry 11114   # another route
npm run typecheck

# Worker — full local server
cp .dev.vars.example .dev.vars   # fill in SWIFTLY_API_KEY
npx wrangler dev
curl 'localhost:8787/?agency=sfbay-ferry&route=19417'

# TRMNL templates — live-reloading preview at http://localhost:4567
cd trmnl
trmnlp serve
```

By default `trmnlp serve` uses the static sample payload in
`trmnl/.trmnlp.yml`, so previews work offline. To preview against a live
Worker, comment out the `variables:` block and set `PROXY_URL` (and
`PROXY_SECRET` if the Worker gates) in a repo-root `.env` — mise loads it.
See [`.env.example`](.env.example).

## Key facts

- The Worker groups sailings by the route's **direction** (from Swiftly's
  verbose route info), not by stop, so multi-gate terminals (e.g. SF Ferry
  Building gates E/F/G) and multi-stop routes need no special handling.
- All Swiftly endpoints support `format=json`; this repo never parses
  protobuf.
- Swiftly auth is an `Authorization: <api-key>` header — the raw key, no
  scheme.
- Swiftly responses are edge-cached in the Worker (agency/route info 1 h,
  the live trip-updates feed 25 s), so polling more often is harmless.
- The templates render the absolute `time` rather than the `mins` countdown,
  since `mins` goes stale between TRMNL's slow refreshes; the clock time
  does not.

## CI

- [`.github/workflows/trmnl.yml`](.github/workflows/trmnl.yml) builds the
  Liquid templates on every PR and runs `trmnlp push` on merge to `main`.
