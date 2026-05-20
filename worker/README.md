# SF Bay Ferry → TRMNL proxy (Cloudflare Worker)

TRMNL's "Polling" strategy fetches a URL and renders the raw JSON — it does no
filtering. The Swiftly trip-updates feed is agency-wide and Swiftly forbids
client-side requests to it. This Worker sits in between: it pulls the feed,
sculpts it down to the arrivals we care about, and serves a small JSON payload
TRMNL can render.

## Why JavaScript, not Go

Cloudflare Workers run JS on V8 isolates with ~0 ms cold start. Go runs only as
WASM here, which is larger and slower to start. JS is the fast path on Workers.

## Deploy

Node is pinned via `mise.toml` (run `mise install` once; `mise trust` if prompted).
With mise activated in your shell, `npm`/`npx` below just work — otherwise prefix
each with `mise exec -- `.

```sh
cd worker
npm install
npx wrangler login                       # one time

# Secrets (never put these in wrangler.toml):
npx wrangler secret put SWIFTLY_API_KEY   # paste your Swiftly key
npx wrangler secret put PROXY_SECRET      # optional; any random string

npm run deploy
```

You get a URL like `https://sfbayferry-trmnl.<subdomain>.workers.dev`.

## Use in TRMNL

Set the plugin Strategy to **Polling** and the Polling URL to:

```
https://sfbayferry-trmnl.<subdomain>.workers.dev/
```

If you set `PROXY_SECRET`, add a polling **header** (TRMNL supports custom
headers on GET):

```
Authorization: Bearer <PROXY_SECRET>
```

(Omit the header if you didn't set `PROXY_SECRET`.)

## Response shape

```json
{
  "route_id": "19417",
  "updated_at": "7:11 PM",
  "ferry_building": [
    { "vehicle": "Cetus", "stop": "Ferry Building Gate G", "kind": "departure", "mins": 12, "time": "7:11 PM" }
  ],
  "seaplane": [
    { "vehicle": "Taurus", "stop": "Seaplane Lagoon", "kind": "arrival", "mins": 20, "time": "7:17 PM" }
  ]
}
```

Both lists are sorted soonest-first. The Liquid template iterates them.
`kind` is `"arrival"` or `"departure"` — the feed often carries only one per
stop, so the Worker reports whichever it gets.

## Config

- `wrangler.toml` vars: `AGENCY_KEY`, `ROUTE_ID`, `TIMEZONE`.
- Stops reported on: edit the `STOPS` map in `src/index.ts`.
- Swiftly responses are edge-cached 25 s, so polling more often is harmless.

## Local test

Quick check — runs the handler directly against the live API (no wrangler;
Node 24 strips the TypeScript types natively):

```sh
SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts
npm run typecheck     # tsc, no emit
```

Full local server:

```sh
SWIFTLY_API_KEY=... npx wrangler dev
# then: curl localhost:8787
```
