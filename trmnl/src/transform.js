"use strict";
/**
 * Swiftly -> TRMNL serverless transform.
 *
 * TRMNL polls Swiftly's gtfs-rt-trip-updates feed directly (see
 * src/settings.yml's polling_url/polling_headers); this transform runs
 * server-side afterward (locally via trmnlp, or on TRMNL's hosted microVM
 * daemon in production) and does the rest: fetches agency info (for the
 * timezone) and verbose route info (for the route's directions + stop
 * names), then buckets the polled feed's sailings by direction and returns
 * the small JSON payload the Liquid templates render directly.
 *
 * This is the TypeScript source of truth — it is compiled (not bundled; it
 * has no imports, so tsc's output stays a plain global-scope script) to
 * src/transform.js, the file trmnlp/TRMNL actually execute. Run `npm run
 * build:transform` after editing this file. See trmnl/README.md.
 *
 * Runs in a sandboxed Node subprocess with no npm install step, so this
 * file must not import anything outside Node/JS builtins.
 */
const SWIFTLY_BASE = "https://api.goswift.ly";
const DEFAULT_TZ = "America/Los_Angeles";
// Tolerate camelCase / snake_case keys in the JSON feed.
function pick(obj, ...keys) {
    if (!obj || typeof obj !== "object")
        return undefined;
    for (const k of keys)
        if (k in obj)
            return obj[k];
    return undefined;
}
function clockTime(epochMs, timeZone) {
    return new Date(epochMs).toLocaleTimeString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
    });
}
function swiftlyFetch(url, key) {
    return fetch(url, { headers: { Authorization: key } });
}
class SwiftlyError extends Error {
    detail;
    constructor(message, detail) {
        super(message);
        this.detail = detail;
    }
}
// Issue the agency-info and verbose route-info calls in parallel (the
// trip-updates feed is already in `input` — TRMNL polled it directly).
async function fetchSwiftlyData(agency, routeId, key) {
    const ag = encodeURIComponent(agency);
    const agencyUrl = `${SWIFTLY_BASE}/info/${ag}?format=json`;
    const routeUrl = `${SWIFTLY_BASE}/info/${ag}/routes` +
        `?route=${encodeURIComponent(routeId)}&verbose=true&format=json`;
    let agencyResp, routeResp;
    try {
        [agencyResp, routeResp] = await Promise.all([
            swiftlyFetch(agencyUrl, key),
            swiftlyFetch(routeUrl, key),
        ]);
    }
    catch (e) {
        throw new SwiftlyError("fetch failed", String(e));
    }
    for (const [name, resp] of [
        ["agency", agencyResp],
        ["route", routeResp],
    ]) {
        if (!resp.ok) {
            const msg = resp.status === 401 || resp.status === 403
                ? "Swiftly rejected the API key for this agency"
                : name === "route" && resp.status === 400
                    ? `route ${routeId} not found for agency ${agency}`
                    : `swiftly ${name} request failed (${resp.status})`;
            throw new SwiftlyError(msg, await resp.text());
        }
    }
    try {
        const [agencyData, routeData] = await Promise.all([agencyResp.json(), routeResp.json()]);
        return { agencyData, routeData };
    }
    catch (e) {
        throw new SwiftlyError("bad JSON from Swiftly", String(e));
    }
}
// stop id -> human name, gathered from every direction's stop list. The
// trip-updates feed only carries stop ids; route info supplies the names.
function buildStopNames(directions) {
    const stopNames = new Map();
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
function buildTrip(entity, routeId, stopNames, now, tz) {
    const tu = pick(entity, "tripUpdate", "trip_update");
    if (!tu)
        return null;
    const tripInfo = pick(tu, "trip") ?? {};
    if (String(pick(tripInfo, "routeId", "route_id") ?? "") !== routeId)
        return null;
    const directionId = String(pick(tripInfo, "directionId", "direction_id") ?? "");
    const vehicleId = String(pick(pick(tu, "vehicle") ?? {}, "id") ?? "");
    // Each feed entity is one trip: collect its stops, in feed order, into
    // a single chain the templates render as one row.
    const stops = [];
    for (const stu of pick(tu, "stopTimeUpdate", "stop_time_update") ?? []) {
        const stopId = String(pick(stu, "stopId", "stop_id") ?? "");
        // Prefer the arrival time; the ferry feed often carries only a
        // departure time (e.g. at origin gates), so fall back to that.
        const arrivalTime = pick(pick(stu, "arrival") ?? {}, "time");
        const departureTime = pick(pick(stu, "departure") ?? {}, "time");
        const epoch = arrivalTime ?? departureTime;
        if (!epoch)
            continue;
        stops.push({
            name: stopNames.get(stopId) || stopId,
            time: clockTime(Number(epoch) * 1000, tz),
            mins: Math.round((Number(epoch) - now) / 60),
        });
    }
    if (stops.length === 0 || stops[0].mins < 0)
        return null;
    return { directionId, trip: { vehicle: vehicleId, stops } };
}
// Bucket feed entities by direction, sort each bucket by next-departure,
// and emit one section per direction in the route info's direction order.
function buildSections(directions, feed, routeId, stopNames, now, tz) {
    const byDirection = new Map();
    for (const dir of directions)
        byDirection.set(String(pick(dir, "id") ?? ""), []);
    for (const entity of feed.entity ?? []) {
        const parsed = buildTrip(entity, routeId, stopNames, now, tz);
        if (!parsed)
            continue;
        const bucket = byDirection.get(parsed.directionId);
        if (!bucket)
            continue;
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
async function run(input) {
    // trmnlp always runs the transform when src/transform.js exists — even
    // when .trmnlp.yml's static `variables:` fixture is active for offline
    // preview — and the transform's return value replaces the data wholesale,
    // not merges with it. So without this, the offline fixture would get
    // silently overwritten by a live (or failing) Swiftly call. A real
    // Swiftly feed response never has a `sections` array, so its presence
    // unambiguously means "static fixture" — pass it through untouched.
    if (Array.isArray(input.sections))
        return input;
    const fields = input.trmnl?.plugin_settings?.custom_fields_values;
    const agency = (fields?.agency ?? "").trim();
    const routeId = String(fields?.route ?? "").trim();
    // trmnlp's local dev-preview resolves {{ env.X }} custom-field templates
    // for polling_url/polling_headers, but not for the raw values it hands to
    // this transform — so an unresolved `{{ env.SWIFTLY_API_KEY }}` string
    // here (never a real key, which can't contain "{{") falls back to reading
    // the env var directly. Real installs never hit this: TRMNL stores the
    // plain value installers type into the form field.
    const rawKey = fields?.swiftly_api_key ?? "";
    const swiftlyKey = rawKey.includes("{{") ? process.env.SWIFTLY_API_KEY ?? "" : rawKey;
    const missing = [!agency && "agency", !routeId && "route", !swiftlyKey && "swiftly_api_key"].filter(Boolean);
    if (missing.length) {
        return { error: `missing required input: ${missing.join(", ")}`, sections: [] };
    }
    let agencyData, routeData;
    try {
        ({ agencyData, routeData } = await fetchSwiftlyData(agency, routeId, swiftlyKey));
    }
    catch (e) {
        if (e instanceof SwiftlyError)
            return { error: e.message, detail: e.detail, sections: [] };
        throw e;
    }
    const tz = String(pick(pick(agencyData, "data") ?? {}, "timezone") || DEFAULT_TZ);
    const route = (pick(pick(routeData, "data") ?? {}, "routes") ?? [])[0];
    if (!route) {
        return { error: `route ${routeId} not found for agency ${agency}`, sections: [] };
    }
    const routeName = String(pick(route, "longName", "name", "shortName") ?? routeId);
    const directions = pick(route, "directions") ?? [];
    const stopNames = buildStopNames(directions);
    const now = Math.floor(Date.now() / 1000);
    const sections = buildSections(directions, input, routeId, stopNames, now, tz);
    return {
        agency,
        route_id: routeId,
        route_name: routeName,
        updated_at: clockTime(Date.now(), tz),
        sections,
    };
}
