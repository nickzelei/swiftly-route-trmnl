#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.9"
# dependencies = []
# ///
"""Show upcoming ferry arrivals from the GTFS-rt trip-updates feed.

    uv run trip_updates.py                              # all upcoming arrivals
    uv run trip_updates.py --route 19417                # one route only
    uv run trip_updates.py --stops 12345                # one stop
    uv run trip_updates.py --stops 72011,72012,72013    # SF Ferry Building (all gates)
    uv run trip_updates.py --route 19417 --stops 72011,72012,72013

This is the core query your TRMNL plugin will run on a schedule.
"""

import argparse
import time

from swiftly import AGENCY_KEY, get_json, pick


def stop_time_updates(feed):
    """Yield (route_id, trip_id, vehicle_id, stop_id, kind, epoch) rows."""
    for entity in feed.get("entity", []):
        tu = pick(entity, "tripUpdate", "trip_update")
        if not tu:
            continue
        trip = pick(tu, "trip") or {}
        route_id = str(pick(trip, "routeId", "route_id") or "")
        trip_id = str(pick(trip, "tripId", "trip_id") or "")
        vehicle = pick(tu, "vehicle") or {}
        vehicle_id = str(pick(vehicle, "id") or "")
        for stu in pick(tu, "stopTimeUpdate", "stop_time_update") or []:
            stop_id = str(pick(stu, "stopId", "stop_id") or "")
            for kind in ("arrival", "departure"):
                event = pick(stu, kind) or {}
                epoch = pick(event, "time")
                if epoch:
                    yield route_id, trip_id, vehicle_id, stop_id, kind, int(epoch)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--route", help="filter to this route id")
    parser.add_argument(
        "--stops", help="filter to these stop ids (comma-separated)"
    )
    args = parser.parse_args()

    stop_filter = (
        {s.strip() for s in args.stops.split(",") if s.strip()} if args.stops else None
    )

    feed = get_json(f"/real-time/{AGENCY_KEY}/gtfs-rt-trip-updates", format="json")
    now = int(time.time())

    rows = []
    for route_id, trip_id, vehicle_id, stop_id, kind, epoch in stop_time_updates(feed):
        if args.route and route_id != args.route:
            continue
        if stop_filter and stop_id not in stop_filter:
            continue
        if epoch < now:
            continue  # already happened
        rows.append((epoch, route_id, stop_id, kind, vehicle_id, trip_id))

    rows.sort()
    if not rows:
        print("No upcoming arrivals match the filters.")
        return

    print(f"{'when':>8}  {'route':<8} {'stop':<10} {'event':<10} {'vehicle':<8} trip")
    for epoch, route_id, stop_id, kind, vehicle_id, trip_id in rows:
        mins = (epoch - now) / 60
        clock = time.strftime("%H:%M", time.localtime(epoch))
        print(
            f"{mins:5.0f}min  {route_id:<8} {stop_id:<10} "
            f"{kind:<10} {vehicle_id:<8} {trip_id}  ({clock})"
        )


if __name__ == "__main__":
    main()
