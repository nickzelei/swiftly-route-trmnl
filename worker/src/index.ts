/**
 * Swiftly -> TRMNL polling backend.
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
 *   BACKEND_SECRET  - optional secret; if set, callers must send
 *                     `Authorization: Bearer <BACKEND_SECRET>`
 */

interface Env {
  SWIFTLY_API_KEY: string;
  BACKEND_SECRET?: string;
}

// One stop on a trip: where the ferry calls and when.
interface TripStop {
  name: string;
  time: string;
  mins: number;
}

// One logical sailing: a vessel running an ordered chain of stops. The
// templates render this as a single row (stop names, then times).
interface Trip {
  vehicle: string;
  stops: TripStop[];
}

// One direction of the route, with its upcoming trips. The route's two
// directions become the two display columns/rows in the TRMNL templates.
interface Section {
  title: string;
  direction_id: string;
  trips: Trip[];
}

interface SwiftlyData {
  agencyData: any;
  routeData: any;
  feed: any;
}

interface ErrorBody {
  error: string;
  detail?: string;
  sections: [];
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

// Thrown by fetchSwiftlyData; carries the status + body to return verbatim.
class SwiftlyError extends Error {
  status: number;
  body: ErrorBody;
  constructor(status: number, body: ErrorBody) {
    super(body.error);
    this.status = status;
    this.body = body;
  }
}

// Optional shared-secret gate via `Authorization: Bearer <BACKEND_SECRET>`.
// Returns a 401 Response when the caller fails the check, null otherwise.
function authorize(request: Request, env: Env): Response | null {
  if (!env.BACKEND_SECRET) return null;
  const auth = request.headers.get("Authorization") ?? "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (bearer !== env.BACKEND_SECRET) {
    return jsonResponse({ error: "unauthorized", sections: [] }, 401);
  }
  return null;
}

// Issue the three Swiftly calls in parallel, map non-OK responses to a
// caller-friendly error, and parse the JSON. Throws SwiftlyError on any
// failure so the handler can translate it back into a Response.
async function fetchSwiftlyData(
  agency: string,
  routeId: string,
  key: string,
): Promise<SwiftlyData> {
  const ag = encodeURIComponent(agency);
  const agencyUrl = `${SWIFTLY_BASE}/info/${ag}?format=json`;
  const routeUrl =
    `${SWIFTLY_BASE}/info/${ag}/routes` +
    `?route=${encodeURIComponent(routeId)}&verbose=true&format=json`;
  const feedUrl = `${SWIFTLY_BASE}/real-time/${ag}/gtfs-rt-trip-updates?format=json`;

  let agencyResp: Response, routeResp: Response, feedResp: Response;
  try {
    [agencyResp, routeResp, feedResp] = await Promise.all([
      swiftlyFetch(agencyUrl, key, 3600),
      swiftlyFetch(routeUrl, key, 3600),
      swiftlyFetch(feedUrl, key, 25),
    ]);
  } catch (e) {
    throw new SwiftlyError(502, { error: "fetch failed", detail: String(e), sections: [] });
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
      throw new SwiftlyError(502, { error: msg, detail: await resp.text(), sections: [] });
    }
  }

  try {
    const [agencyData, routeData, feed] = await Promise.all([
      agencyResp.json(),
      routeResp.json(),
      feedResp.json(),
    ]);
    return { agencyData, routeData, feed };
  } catch (e) {
    throw new SwiftlyError(502, {
      error: "bad JSON from Swiftly",
      detail: String(e),
      sections: [],
    });
  }
}

// stop id -> human name, gathered from every direction's stop list. The
// trip-updates feed only carries stop ids; route info supplies the names.
function buildStopNames(directions: any[]): Map<string, string> {
  const stopNames = new Map<string, string>();
  for (const dir of directions) {
    for (const s of pick(dir, "stops") ?? []) {
      stopNames.set(String(pick(s, "id") ?? ""), String(pick(s, "name") ?? ""));
    }
  }
  return stopNames;
}

// Parse one feed entity into a Trip plus the direction it belongs to.
// Returns null when the entity is for another route, has no timed stops,
// or its origin departure has already passed (no longer catchable).
function buildTrip(
  entity: any,
  routeId: string,
  stopNames: Map<string, string>,
  now: number,
  tz: string,
): { directionId: string; trip: Trip } | null {
  const tu = pick(entity, "tripUpdate", "trip_update");
  if (!tu) return null;
  const tripInfo = pick(tu, "trip") ?? {};
  if (String(pick(tripInfo, "routeId", "route_id") ?? "") !== routeId) return null;

  const directionId = String(pick(tripInfo, "directionId", "direction_id") ?? "");
  const vehicleId = String(pick(pick(tu, "vehicle") ?? {}, "id") ?? "");

  // Each feed entity is one trip: collect its stops, in feed order, into
  // a single chain the templates render as one row.
  const stops: TripStop[] = [];
  for (const stu of pick(tu, "stopTimeUpdate", "stop_time_update") ?? []) {
    const stopId = String(pick(stu, "stopId", "stop_id") ?? "");

    // Prefer the arrival time; the ferry feed often carries only a
    // departure time (e.g. at origin gates), so fall back to that.
    const arrivalTime = pick(pick(stu, "arrival") ?? {}, "time");
    const departureTime = pick(pick(stu, "departure") ?? {}, "time");
    const epoch = arrivalTime ?? departureTime;
    if (!epoch) continue;

    stops.push({
      name: stopNames.get(stopId) || stopId,
      time: clockTime(Number(epoch) * 1000, tz),
      mins: Math.round((Number(epoch) - now) / 60),
    });
  }

  if (stops.length === 0 || stops[0].mins < 0) return null;
  return { directionId, trip: { vehicle: vehicleId, stops } };
}

// Bucket feed entities by direction, sort each bucket by next-departure,
// and emit one section per direction in the route info's direction order.
function buildSections(
  directions: any[],
  feed: any,
  routeId: string,
  stopNames: Map<string, string>,
  now: number,
  tz: string,
): Section[] {
  const byDirection = new Map<string, Trip[]>();
  for (const dir of directions) byDirection.set(String(pick(dir, "id") ?? ""), []);

  for (const entity of feed.entity ?? []) {
    const parsed = buildTrip(entity, routeId, stopNames, now, tz);
    if (!parsed) continue;
    const bucket = byDirection.get(parsed.directionId);
    if (!bucket) continue;
    bucket.push(parsed.trip);
  }

  return directions.map((dir) => {
    const id = String(pick(dir, "id") ?? "");
    const trips = byDirection.get(id) ?? [];
    trips.sort((a, b) => a.stops[0].mins - b.stops[0].mins);
    return {
      title: String(pick(dir, "title") ?? `Direction ${id}`),
      direction_id: id,
      trips,
    };
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const unauthorized = authorize(request, env);
    if (unauthorized) return unauthorized;

    if (!env.SWIFTLY_API_KEY) {
      return jsonResponse({ error: "SWIFTLY_API_KEY not configured", sections: [] }, 500);
    }

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

    let data: SwiftlyData;
    try {
      data = await fetchSwiftlyData(agency, routeId, env.SWIFTLY_API_KEY);
    } catch (e) {
      if (e instanceof SwiftlyError) return jsonResponse(e.body, e.status);
      throw e;
    }

    const tz = String(pick(pick(data.agencyData, "data") ?? {}, "timezone") || DEFAULT_TZ);

    const route = (pick(pick(data.routeData, "data") ?? {}, "routes") ?? [])[0];
    if (!route) {
      return jsonResponse(
        { error: `route ${routeId} not found for agency ${agency}`, sections: [] },
        404,
      );
    }
    const routeName = String(pick(route, "longName", "name", "shortName") ?? routeId);
    const directions: any[] = pick(route, "directions") ?? [];

    const stopNames = buildStopNames(directions);
    const now = Math.floor(Date.now() / 1000);
    const sections = buildSections(directions, data.feed, routeId, stopNames, now, tz);

    return jsonResponse({
      agency,
      route_id: routeId,
      route_name: routeName,
      updated_at: clockTime(Date.now(), tz),
      sections,
    });
  },
};
