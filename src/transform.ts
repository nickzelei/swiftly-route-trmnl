/**
 * Swiftly -> TRMNL serverless transform.
 *
 * TRMNL polls three Swiftly endpoints directly (see src/settings.yml's
 * newline-separated polling_url): trip updates, agency info, and verbose
 * route info. This transform runs server-side afterward (locally via trmnlp,
 * or on TRMNL's hosted microVM daemon in production), buckets the already-
 * polled feed's sailings by direction, and returns the small JSON payload
 * the Liquid templates render directly. It performs no network requests, so
 * Swiftly latency does not consume the transform's five-second runtime limit.
 *
 * This is the TypeScript source of truth — it is compiled (not bundled; it
 * has no imports, so tsc's output stays a plain global-scope script) to
 * src/transform.js, the file trmnlp/TRMNL actually execute. Run `npm run
 * build:transform` after editing this file. See README.md.
 *
 * Runs in a sandboxed Node subprocess with no npm install step.
 */

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

// The plugin's install-time form field values (src/settings.yml
// custom_fields), as delivered to the transform under
// input.trmnl.plugin_settings.custom_fields_values.
interface CustomFieldsValues {
  agency: string;
  route: string;
}

interface TripUpdatesFeed {
  header?: unknown;
  entity?: unknown[];
}

// Multiple polling URLs arrive as IDX_0, IDX_1, and IDX_2 in declaration
// order, plus the trmnl namespace the transform pipeline always adds. Feed
// entities are typed loosely — the feed tolerates camelCase/snake_case keys,
// so pick() reads them defensively rather than the type system enforcing a
// shape Swiftly doesn't guarantee.
interface TransformInput {
  IDX_0?: TripUpdatesFeed;
  IDX_1?: unknown;
  IDX_2?: unknown;
  trmnl: {
    plugin_settings: {
      custom_fields_values: CustomFieldsValues;
    };
  };
}

interface SuccessOutput {
  agency: string;
  route_id: string;
  route_name: string;
  updated_at: string;
  sections: Section[];
}

interface ErrorOutput {
  error: string;
  detail?: string;
  sections: [];
}

const DEFAULT_TZ = "America/Los_Angeles";

// Tolerate camelCase / snake_case keys in the JSON feed.
function pick(obj: unknown, ...keys: string[]): any {
  if (!obj || typeof obj !== "object") return undefined;
  for (const k of keys) if (k in obj) return (obj as Record<string, unknown>)[k];
  return undefined;
}

function clockTime(epochMs: number, timeZone: string): string {
  return new Date(epochMs).toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });
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
  feed: TripUpdatesFeed,
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

async function run(input: TransformInput): Promise<SuccessOutput | ErrorOutput> {
  // trmnlp always runs the transform when src/transform.js exists — even
  // when .trmnlp.yml's static `variables:` fixture is active for offline
  // preview — and the transform's return value replaces the data wholesale,
  // not merges with it. So without this, the offline fixture would get
  // silently overwritten by a live (or failing) Swiftly call. A real
  // multi-URL Swiftly response never has a `sections` array, so its presence
  // unambiguously means "static fixture" — pass it through untouched.
  if (Array.isArray((input as any).sections)) return input as unknown as SuccessOutput;

  const fields = input.trmnl?.plugin_settings?.custom_fields_values;
  const agency = (fields?.agency ?? "").trim();
  const routeId = String(fields?.route ?? "").trim();

  const missing = [!agency && "agency", !routeId && "route"].filter(Boolean);
  if (missing.length) {
    return { error: `missing required input: ${missing.join(", ")}`, sections: [] };
  }

  const feed = input.IDX_0;
  const agencyData = input.IDX_1;
  const routeData = input.IDX_2;

  if (!feed || !pick(feed, "header")) {
    return {
      error: "Swiftly trip updates unavailable",
      detail: "Check the Swiftly API key and agency.",
      sections: [],
    };
  }
  if (!pick(agencyData, "data")) {
    return {
      error: "Swiftly agency info unavailable",
      detail: "Check the Swiftly API key and agency.",
      sections: [],
    };
  }

  const tz = String(pick(pick(agencyData, "data") ?? {}, "timezone") || DEFAULT_TZ);

  const route = (pick(pick(routeData, "data") ?? {}, "routes") ?? [])[0];
  if (!route) {
    return { error: `route ${routeId} not found for agency ${agency}`, sections: [] };
  }
  const routeName = String(pick(route, "longName", "name", "shortName") ?? routeId);
  const directions: any[] = pick(route, "directions") ?? [];

  const stopNames = buildStopNames(directions);
  const now = Math.floor(Date.now() / 1000);
  const sections = buildSections(directions, feed, routeId, stopNames, now, tz);

  return {
    agency,
    route_id: routeId,
    route_name: routeName,
    updated_at: clockTime(Date.now(), tz),
    sections,
  };
}
