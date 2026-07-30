# Swiftly API exploration

Scratch scripts for poking the Swiftly real-time feeds. Originally used to
find the Alameda Seaplane route's stop ids before building the TRMNL
arrival-times plugin — **this is also the easiest way for anyone installing
the plugin to find their own agency's route id** (the `route` field in the
TRMNL form).

## Setup

```sh
cp .env.example .env   # fill in SWIFTLY_API_KEY and AGENCY_KEY
```

`AGENCY_KEY` is your Swiftly agency key (Swiftly includes it alongside your
API key). `.env` is gitignored.

## Finding your route id

```sh
uv run explore_routes.py                # list every route for your agency, with ids
uv run explore_routes.py --route 19417  # (optional) see that route's stops
```

Pick the `id=` of the route you want and use it as the `route` value in the
TRMNL plugin form.

## Other scripts

Also run with `uv` (each script declares its own metadata, no venv needed).
Useful for debugging the live feed once you know your route/stop ids:

```sh
uv run trip_updates.py --route 19417    # upcoming arrivals/departures
uv run trip_updates.py --stops 72011,72012,72013   # SF Ferry Building (all gates)
uv run vehicle_positions.py --route 19417   # live vehicle positions
```

`swiftly.py` is the shared client (auth header, JSON helper). All calls pass
`format=json`, so there's no protobuf to parse.
