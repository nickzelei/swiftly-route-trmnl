/**
 * Swiftly -> TRMNL polling proxy.
 *
 * TRMNL polls this Worker with an agency key and a route id supplied as plugin
 * inputs. It fetches Swiftly's agency-wide GTFS-rt trip-updates feed, filters
 * to the requested route, buckets sailings by the route's direction, and
 * returns a small JSON payload the TRMNL Liquid templates can render directly.
 *
 * Inputs (per request):
 *   ?agency=<key>&route=<id>  - query params
 *
 * This plugin is single-tenant: whoever uses the recipe self-hosts the Worker,
 * so the Swiftly API key is a Worker secret rather than a per-request input.
 *
 * Bindings (see wrangler.toml + README):
 *   SWIFTLY_API_KEY - secret; the Swiftly API key (wrangler secret put)
 *   PROXY_SECRET    - optional secret; if set, callers must send
 *                     `Authorization: Bearer <PROXY_SECRET>`
 */

interface Env {
  SWIFTLY_API_KEY: string;
  PROXY_SECRET?: string;
}

interface Sailing {
  kind: "arrival" | "departure";
  vehicle: string;
  stop: string;
}

// One Sailing as collected from the feed, before same-time grouping.
interface Arrival extends Sailing {
  mins: number;
  time: string;
}

// Sailings that share a clock time, so the display can show the time once
// with each vehicle listed under it.
interface TimeGroup {
  time: string;
  mins: number;
  sailings: Sailing[];
}

// One direction of the route, with its upcoming sailings. The route's two
// directions become the two display columns/rows in the TRMNL templates.
interface Section {
  title: string;
  direction_id: string;
  groups: TimeGroup[];
}

const SWIFTLY_BASE = "https://api.goswift.ly";
const DEFAULT_TZ = "America/Los_Angeles";

// Tolerate camelCase / snake_case keys in the JSON feed.
function pick(obj: unknown, ...keys: string[]): any {
  if (!obj || typeof obj !== "object") return undefined;
  for (const k of keys) if (k in obj) return (obj as Record<string, unknown>)[k];
  return undefined;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

// Collapse sailings sharing a clock time into one group. Input is assumed
// sorted soonest-first, so groups come out in that order too.
function groupByTime(list: Arrival[]): TimeGroup[] {
  const byTime = new Map<string, TimeGroup>();
  for (const a of list) {
    let g = byTime.get(a.time);
    if (!g) {
      g = { time: a.time, mins: a.mins, sailings: [] };
      byTime.set(a.time, g);
    }
    g.sailings.push({ kind: a.kind, vehicle: a.vehicle, stop: a.stop });
  }
  // Arrivals before departures, so a shared-time group always reads the same
  // regardless of the order the feed happened to list them in.
  const groups = [...byTime.values()];
  for (const g of groups) {
    g.sailings.sort((a, b) =>
      a.kind === b.kind ? 0 : a.kind === "arrival" ? -1 : 1,
    );
  }
  return groups;
}

function clockTime(epochMs: number, timeZone: string): string {
  return new Date(epochMs).toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });
}

// Fetch a Swiftly endpoint with the caller's key. Swiftly responses are
// edge-cached so rapid polls don't pile up: agency/route info is static
// (long TTL), the live feed changes constantly (short TTL).
function swiftlyFetch(url: string, key: string, cacheTtl: number): Promise<Response> {
  return fetch(url, {
    headers: { Authorization: key },
    cf: { cacheTtl, cacheEverything: true },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Optional shared-secret gate via `Authorization: Bearer <PROXY_SECRET>`.
    if (env.PROXY_SECRET) {
      const auth = request.headers.get("Authorization") ?? "";
      const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : null;
      if (bearer !== env.PROXY_SECRET) {
        return jsonResponse({ error: "unauthorized", sections: [] }, 401);
      }
    }

    if (!env.SWIFTLY_API_KEY) {
      return jsonResponse({ error: "SWIFTLY_API_KEY not configured", sections: [] }, 500);
    }
    const swiftlyKey = env.SWIFTLY_API_KEY;

    // agency + route come from the TRMNL plugin's form fields as query params.
    const url = new URL(request.url);
    const agency = (url.searchParams.get("agency") ?? "").trim();
    const routeId = (url.searchParams.get("route") ?? "").trim();

    const missing = [!agency && "agency", !routeId && "route"].filter(Boolean);
    if (missing.length) {
      return jsonResponse(
        { error: `missing required input: ${missing.join(", ")}`, sections: [] },
        400,
      );
    }

    const ag = encodeURIComponent(agency);
    const agencyUrl = `${SWIFTLY_BASE}/info/${ag}?format=json`;
    const routeUrl =
      `${SWIFTLY_BASE}/info/${ag}/routes` +
      `?route=${encodeURIComponent(routeId)}&verbose=true&format=json`;
    const feedUrl = `${SWIFTLY_BASE}/real-time/${ag}/gtfs-rt-trip-updates?format=json`;

    // The three Swiftly calls have no inter-dependency, so issue them together.
    let agencyResp: Response, routeResp: Response, feedResp: Response;
    try {
      [agencyResp, routeResp, feedResp] = await Promise.all([
        swiftlyFetch(agencyUrl, swiftlyKey, 3600),
        swiftlyFetch(routeUrl, swiftlyKey, 3600),
        swiftlyFetch(feedUrl, swiftlyKey, 25),
      ]);
    } catch (e) {
      return jsonResponse({ error: "fetch failed", detail: String(e), sections: [] }, 502);
    }

    for (const [name, resp] of [
      ["agency", agencyResp],
      ["route", routeResp],
      ["trip-updates", feedResp],
    ] as const) {
      if (!resp.ok) {
        // Swiftly answers an unknown route id with a 400 on the route lookup.
        const msg =
          resp.status === 401 || resp.status === 403
            ? "Swiftly rejected the API key for this agency"
            : name === "route" && resp.status === 400
              ? `route ${routeId} not found for agency ${agency}`
              : `swiftly ${name} request failed (${resp.status})`;
        return jsonResponse({ error: msg, detail: await resp.text(), sections: [] }, 502);
      }
    }

    let agencyData: any, routeData: any, feed: any;
    try {
      [agencyData, routeData, feed] = await Promise.all([
        agencyResp.json(),
        routeResp.json(),
        feedResp.json(),
      ]);
    } catch (e) {
      return jsonResponse({ error: "bad JSON from Swiftly", detail: String(e), sections: [] }, 502);
    }

    const tz = String(pick(pick(agencyData, "data") ?? {}, "timezone") || DEFAULT_TZ);

    const route = (pick(pick(routeData, "data") ?? {}, "routes") ?? [])[0];
    if (!route) {
      return jsonResponse(
        { error: `route ${routeId} not found for agency ${agency}`, sections: [] },
        404,
      );
    }
    const routeName = String(pick(route, "longName", "name", "shortName") ?? routeId);
    const directions: any[] = pick(route, "directions") ?? [];

    // stop id -> human name, gathered from every direction's stop list. The
    // trip-updates feed only carries stop ids; route info supplies the names.
    const stopNames = new Map<string, string>();
    for (const dir of directions) {
      for (const s of pick(dir, "stops") ?? []) {
        stopNames.set(String(pick(s, "id") ?? ""), String(pick(s, "name") ?? ""));
      }
    }

    // Bucket sailings by the trip's direction id; only directions the route
    // info knows about get a bucket (and therefore a display section).
    const byDirection = new Map<string, Arrival[]>();
    for (const dir of directions) byDirection.set(String(pick(dir, "id") ?? ""), []);

    const now = Math.floor(Date.now() / 1000);
    for (const entity of feed.entity ?? []) {
      const tu = pick(entity, "tripUpdate", "trip_update");
      if (!tu) continue;
      const trip = pick(tu, "trip") ?? {};
      if (String(pick(trip, "routeId", "route_id") ?? "") !== routeId) continue;

      const bucket = byDirection.get(String(pick(trip, "directionId", "direction_id") ?? ""));
      if (!bucket) continue;

      const vehicle = pick(tu, "vehicle") ?? {};
      const vehicleId = String(pick(vehicle, "id") ?? "");

      for (const stu of pick(tu, "stopTimeUpdate", "stop_time_update") ?? []) {
        const stopId = String(pick(stu, "stopId", "stop_id") ?? "");

        // Prefer the arrival time; the ferry feed often carries only a
        // departure time (e.g. at origin gates), so fall back to that.
        const arrivalTime = pick(pick(stu, "arrival") ?? {}, "time");
        const departureTime = pick(pick(stu, "departure") ?? {}, "time");
        const epoch = arrivalTime ?? departureTime;
        if (!epoch) continue;

        const mins = Math.round((Number(epoch) - now) / 60);
        if (mins < 0) continue; // already happened

        bucket.push({
          vehicle: vehicleId,
          stop: stopNames.get(stopId) || stopId,
          kind: arrivalTime ? "arrival" : "departure",
          mins,
          time: clockTime(Number(epoch) * 1000, tz),
        });
      }
    }

    // One section per direction, in the route info's direction order.
    const sections: Section[] = directions.map((dir) => {
      const id = String(pick(dir, "id") ?? "");
      const list = byDirection.get(id) ?? [];
      list.sort((a, b) => a.mins - b.mins);
      return {
        title: String(pick(dir, "title") ?? `Direction ${id}`),
        direction_id: id,
        groups: groupByTime(list),
      };
    });

    return jsonResponse({
      agency,
      route_id: routeId,
      route_name: routeName,
      updated_at: clockTime(Date.now(), tz),
      sections,
    });
  },
};
