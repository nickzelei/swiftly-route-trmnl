#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.9"
# dependencies = []
# ///
"""Show live ferry positions from the GTFS-rt vehicle-positions feed.

    uv run vehicle_positions.py                  # all vehicles
    uv run vehicle_positions.py --route 19417    # one route only

Useful later for a "ferry is underway" indicator on the TRMNL display.
"""

import argparse
import time

from swiftly import AGENCY_KEY, get_json, pick


def vehicles(feed):
    """Yield dicts describing each vehicle in the feed."""
    for entity in feed.get("entity", []):
        v = pick(entity, "vehicle")
        if not v:
            continue
        trip = pick(v, "trip") or {}
        pos = pick(v, "position") or {}
        inner = pick(v, "vehicle") or {}
        ts = pick(v, "timestamp")
        yield {
            "vehicle_id": str(pick(inner, "id") or pick(entity, "id") or ""),
            "label": pick(inner, "label") or "",
            "route_id": str(pick(trip, "routeId", "route_id") or ""),
            "lat": pick(pos, "latitude", "lat"),
            "lon": pick(pos, "longitude", "lon"),
            "speed": pick(pos, "speed"),
            "status": pick(v, "currentStatus", "current_status") or "",
            "stop_id": str(pick(v, "stopId", "stop_id") or ""),
            "timestamp": int(ts) if ts else None,
        }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--route", help="filter to this route id")
    args = parser.parse_args()

    feed = get_json(f"/real-time/{AGENCY_KEY}/gtfs-rt-vehicle-positions", format="json")
    now = int(time.time())

    rows = [v for v in vehicles(feed) if not args.route or v["route_id"] == args.route]
    if not rows:
        print("No vehicles match the filters.")
        return

    print(f"{'vehicle':<10} {'route':<8} {'position':<24} {'speed':<8} {'status':<14} age")
    for v in sorted(rows, key=lambda x: x["vehicle_id"]):
        loc = f"{v['lat']}, {v['lon']}" if v["lat"] is not None else "(no fix)"
        speed = f"{v['speed']:.1f}" if isinstance(v["speed"], (int, float)) else "-"
        age = f"{(now - v['timestamp'])}s" if v["timestamp"] else "-"
        status = v["status"]
        if v["stop_id"]:
            status = f"{status}@{v['stop_id']}"
        print(f"{v['vehicle_id']:<10} {v['route_id']:<8} {loc:<24} {speed:<8} {status:<14} {age}")


if __name__ == "__main__":
    main()
