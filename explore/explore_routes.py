#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.9"
# dependencies = []
# ///
"""List SF Bay Ferry routes, and dump the stops for a route.

    uv run explore_routes.py                  # list all routes
    uv run explore_routes.py --route 19417    # list stops on route 19417

Use this to discover the stop_id values for Seaplane Lagoon and the
SF Ferry Building, then hard-code them into trip_updates.py.
"""

import argparse

from swiftly import AGENCY_KEY, get_json, pick


def find_stops(node, found):
    """Recursively collect stop-like dicts (have an id and a lat/lon)."""
    if isinstance(node, dict):
        sid = pick(node, "id")
        lat = pick(node, "lat", "latitude")
        lon = pick(node, "lon", "longitude")
        if sid is not None and lat is not None and lon is not None:
            found[str(sid)] = {
                "id": str(sid),
                "name": pick(node, "name", "title") or "(unnamed)",
                "lat": lat,
                "lon": lon,
            }
        for value in node.values():
            find_stops(value, found)
    elif isinstance(node, list):
        for item in node:
            find_stops(item, found)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--route", help="route id; dumps that route's stops")
    args = parser.parse_args()

    if args.route:
        data = get_json(
            f"/info/{AGENCY_KEY}/routes", route=args.route, verbose="true", format="json"
        )
        routes = pick(data.get("data", {}), "routes") or []
        if not routes:
            print(f"No route {args.route} found.")
            return
        for route in routes:
            print(f"\nRoute {pick(route, 'id')}  {pick(route, 'name', 'longName')}")
            stops = {}
            find_stops(route, stops)
            for s in sorted(stops.values(), key=lambda x: x["name"]):
                print(f"  stop_id={s['id']:<10} {s['name']:<32} ({s['lat']}, {s['lon']})")
    else:
        data = get_json(f"/info/{AGENCY_KEY}/routes", format="json")
        routes = pick(data.get("data", {}), "routes") or []
        print(f"{len(routes)} routes for agency '{AGENCY_KEY}':\n")
        for route in sorted(routes, key=lambda r: str(pick(r, "id"))):
            print(
                f"  id={str(pick(route, 'id')):<10} "
                f"{pick(route, 'shortName') or '':<8} "
                f"{pick(route, 'longName') or pick(route, 'name') or ''}"
            )
        print("\nNext: uv run explore_routes.py --route <id>  to see its stops.")


if __name__ == "__main__":
    main()
