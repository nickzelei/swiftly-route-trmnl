/**
 * SF Bay Ferry -> TRMNL polling proxy.
 *
 * TRMNL polls this Worker. It fetches the agency-wide Swiftly trip-updates
 * feed, filters to one route + the stops we care about, and returns a small
 * JSON payload the TRMNL Liquid template can render directly.
 *
 * Bindings (see wrangler.toml + README):
 *   AGENCY_KEY, ROUTE_ID, TIMEZONE   - plain vars
 *   SWIFTLY_API_KEY                  - secret (wrangler secret put)
 *   PROXY_SECRET                     - optional secret; if set, callers must
 *                                      send `Authorization: Bearer <PROXY_SECRET>`
 */

interface Env {
  AGENCY_KEY: string;
  ROUTE_ID: string;
  TIMEZONE: string;
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

const SWIFTLY_BASE = "https://api.goswift.ly";

// Stops we report on. Add/rename freely; gate labels are cosmetic.
const STOPS: Record<string, { place: "seaplane" | "ferry_building"; label: string }> = {
  "7207": { place: "seaplane", label: "Seaplane Lagoon" },
  "72011": { place: "ferry_building", label: "Ferry Building Gate E" },
  "72013": { place: "ferry_building", label: "Ferry Building Gate F" },
  "72012": { place: "ferry_building", label: "Ferry Building Gate G" },
};

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const tz = env.TIMEZONE || "America/Los_Angeles";

    // Optional shared-secret gate via `Authorization: Bearer <PROXY_SECRET>`.
    if (env.PROXY_SECRET) {
      const auth = request.headers.get("Authorization") ?? "";
      const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : null;
      if (bearer !== env.PROXY_SECRET) {
        return jsonResponse({ error: "unauthorized" }, 401);
      }
    }
    if (!env.SWIFTLY_API_KEY) {
      return jsonResponse({ error: "SWIFTLY_API_KEY not configured" }, 500);
    }

    const routeId = env.ROUTE_ID || "19417";
    const feedUrl =
      `${SWIFTLY_BASE}/real-time/${env.AGENCY_KEY}/gtfs-rt-trip-updates?format=json`;

    let feed: any;
    try {
      const resp = await fetch(feedUrl, {
        headers: { Authorization: env.SWIFTLY_API_KEY },
        // Cache Swiftly's response at the edge so rapid polls don't pile up.
        cf: { cacheTtl: 25, cacheEverything: true },
      });
      if (!resp.ok) {
        return jsonResponse(
          { error: `swiftly ${resp.status}`, detail: await resp.text() },
          502,
        );
      }
      feed = await resp.json();
    } catch (e) {
      return jsonResponse({ error: "fetch failed", detail: String(e) }, 502);
    }

    const now = Math.floor(Date.now() / 1000);
    const arrivals: Record<"ferry_building" | "seaplane", Arrival[]> = {
      ferry_building: [],
      seaplane: [],
    };

    for (const entity of feed.entity ?? []) {
      const tu = pick(entity, "tripUpdate", "trip_update");
      if (!tu) continue;
      const trip = pick(tu, "trip") ?? {};
      if (String(pick(trip, "routeId", "route_id") ?? "") !== routeId) continue;

      const vehicle = pick(tu, "vehicle") ?? {};
      const vehicleId = String(pick(vehicle, "id") ?? "");

      for (const stu of pick(tu, "stopTimeUpdate", "stop_time_update") ?? []) {
        const stopId = String(pick(stu, "stopId", "stop_id") ?? "");
        const stop = STOPS[stopId];
        if (!stop) continue;

        // Prefer the arrival time; the ferry feed often carries only a
        // departure time (e.g. at origin gates), so fall back to that.
        const arrivalTime = pick(pick(stu, "arrival") ?? {}, "time");
        const departureTime = pick(pick(stu, "departure") ?? {}, "time");
        const epoch = arrivalTime ?? departureTime;
        if (!epoch) continue;

        const mins = Math.round((Number(epoch) - now) / 60);
        if (mins < 0) continue; // already happened

        arrivals[stop.place].push({
          vehicle: vehicleId,
          stop: stop.label,
          kind: arrivalTime ? "arrival" : "departure",
          mins,
          time: clockTime(Number(epoch) * 1000, tz),
        });
      }
    }

    for (const list of Object.values(arrivals)) list.sort((a, b) => a.mins - b.mins);

    return jsonResponse({
      route_id: routeId,
      updated_at: clockTime(Date.now(), tz),
      ferry_building: groupByTime(arrivals.ferry_building),
      seaplane: groupByTime(arrivals.seaplane),
    });
  },
};
