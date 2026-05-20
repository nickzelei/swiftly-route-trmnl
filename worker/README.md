# Swiftly → TRMNL proxy (Cloudflare Worker)

TRMNL's "Polling" strategy fetches a URL and renders the raw JSON — it does no
filtering. The Swiftly trip-updates feed is agency-wide and Swiftly forbids
client-side requests to it. This Worker sits in between: it pulls the feed for
a given agency + route, sculpts it down to the upcoming sailings grouped by
direction, and serves a small JSON payload TRMNL can render.

The agency and route are **per-request inputs** (see below), so one deployed
Worker serves any Swiftly agency and route. This plugin is single-tenant:
whoever uses the recipe self-hosts the Worker, so the Swiftly API key is a
Worker secret rather than a form input.

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
npx wrangler secret put SWIFTLY_API_KEY   # required; your Swiftly key
npx wrangler secret put PROXY_SECRET      # optional; any random string

npm run deploy
```

You get a URL like `https://swiftly-trmnl.<subdomain>.workers.dev`.

## Inputs

The Worker reads, per request:

| Input | Where | Example |
|---|---|---|
| `agency` | query param | `sfbay-ferry` |
| `route` | query param | `19417` |

The Swiftly API key is **not** a request input — it is the `SWIFTLY_API_KEY`
Worker secret set above. The timezone is also not an input: the Worker fetches
it from Swiftly's agency info so the display uses the agency's own local time.

Swiftly API keys are account-scoped: a key only returns data for the agencies
its account is authorized for. A request for an agency the key doesn't cover
comes back as `Swiftly rejected the API key for this agency`.

## Use in TRMNL

Set the plugin Strategy to **Polling**. Add custom form fields for `agency` and
`route`, then configure:

```
URL: https://swiftly-trmnl.<subdomain>.workers.dev/?agency={{agency}}&route={{route}}
```

If you set `PROXY_SECRET`, add a polling header:

```
Authorization: Bearer <PROXY_SECRET>
```

## Response shape

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

`sections` has one entry per route **direction**, in the order Swiftly lists
them; `title` is Swiftly's direction title. Each direction holds a list of
**time groups**, sorted soonest-first — every vessel sailing at the same clock
time shares one group, so the display shows the time once with each vessel
under it. `kind` is `"arrival"` or `"departure"` (the feed often carries only
one per stop, so the Worker reports whichever it gets). `mins` is the countdown
at fetch time; the templates show `time`, which does not go stale between
TRMNL refreshes.

On a bad request the Worker still returns `{ "error": "...", "sections": [] }`
so the template can render a message instead of breaking.

## Config

- `wrangler.toml` has no `[vars]` — agency and route are per-request inputs.
- Secrets: `SWIFTLY_API_KEY` (required), `PROXY_SECRET` (optional).
- Swiftly responses are edge-cached (agency/route info 1 h, the live feed 25 s),
  so polling more often is harmless.

## Local test

Quick check — runs the handler directly against the live API (no wrangler;
Node 24 strips the TypeScript types natively):

```sh
SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts                  # sfbay-ferry / 19417
SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts sfbay-ferry 11114 # another route
npm run typecheck                                                    # tsc, no emit
```

Full local server (put `SWIFTLY_API_KEY=...` in `worker/.dev.vars` first):

```sh
npx wrangler dev
# then: curl 'localhost:8787/?agency=sfbay-ferry&route=19417'
```
