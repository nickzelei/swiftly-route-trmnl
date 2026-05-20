# SF Bay Ferry — Swiftly API exploration

Scratch scripts for understanding the Swiftly real-time feeds before building
the TRMNL arrival-times plugin.

## Setup

Credentials live in `.env` (`SWIFTLY_API_KEY`, `AGENCY_KEY`). Already filled in.

## Scripts

Run with `uv` (each script declares its own metadata, no venv needed):

```sh
uv run explore_routes.py                # list all routes
uv run explore_routes.py --route 19417  # stops on the Seaplane Lagoon route
uv run trip_updates.py --route 19417    # upcoming arrivals/departures
uv run trip_updates.py --stops 72011,72012,72013   # SF Ferry Building (all gates)
uv run vehicle_positions.py --route 19417   # live vehicle positions
```

## Workflow

1. `explore_routes.py --route 19417` → find the `stop_id` for **Seaplane Lagoon**
   and **SF Ferry Building**.
2. `trip_updates.py --route 19417 --stop <ferry-building-id>` → the exact query
   the TRMNL plugin runs on a timer.

`swiftly.py` is the shared client (auth header, JSON helper). All calls pass
`format=json`, so there's no protobuf to parse.
