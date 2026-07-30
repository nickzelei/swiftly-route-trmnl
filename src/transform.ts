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
  agency?: string;
  route?: string | number;
}

// Swiftly's format=json GTFS-RT response uses protobuf JSON conventions:
// camelCase field names and strings for int64 timestamps. These names were
// verified against the live API; the bundled Swagger 2 spec documents some
// of them using their protobuf/snake_case names instead.
interface FeedHeader {
  gtfsRealtimeVersion: string;
}

interface StopTimeEvent {
  // Swiftly's live protobuf JSON encoder emits int64 values as strings; the
  // OpenAPI schema describes them as numbers. Accept both wire forms.
  time?: string | number;
}

interface StopTimeUpdate {
  stopId: string;
  arrival?: StopTimeEvent;
  departure?: StopTimeEvent;
}

interface TripDescriptor {
  routeId?: string;
  directionId?: number;
}

interface VehicleDescriptor {
  id?: string;
}

interface TripUpdate {
  trip: TripDescriptor;
  stopTimeUpdate: StopTimeUpdate[];
  vehicle?: VehicleDescriptor;
}

interface FeedEntity {
  tripUpdate?: TripUpdate;
}

interface TripUpdatesFeed {
  header: FeedHeader;
  entity: FeedEntity[];
}

interface SwiftlyResponse<T> {
  data: T;
  success: boolean;
}

interface AgencyInfo {
  timezone: string;
}

interface RouteStop {
  id: string;
  name: string;
}

interface RouteDirection {
  id: string;
  title: string;
  stops: RouteStop[];
}

interface SwiftlyRoute {
  name: string;
  shortName: string;
  longName: string;
  directions?: RouteDirection[];
}

interface RoutesInfo {
  routes?: SwiftlyRoute[];
}

// Multiple polling URLs arrive as IDX_0, IDX_1, and IDX_2 in declaration
// order, plus the trmnl namespace the transform pipeline always adds. The
// fields are optional because trmnlp/TRMNL substitutes an empty object when a
// poll fails; run() checks each response before using its typed payload.
interface TransformInput {
  IDX_0?: TripUpdatesFeed;
  IDX_1?: SwiftlyResponse<AgencyInfo>;
  IDX_2?: SwiftlyResponse<RoutesInfo>;
  trmnl?: {
    plugin_settings?: {
      custom_fields_values?: CustomFieldsValues;
    };
  };
  // Present only in .trmnlp.yml's trusted static preview fixture.
  agency?: string;
  route_id?: string;
  route_name?: string;
  updated_at?: string;
  sections?: Section[];
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

function clockTime(epochMs: number, timeZone: string): string {
  return new Date(epochMs).toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });
}

// stop id -> human name, gathered from every direction's stop list. The
// trip-updates feed only carries stop ids; route info supplies the names.
function buildStopNames(directions: RouteDirection[]): Map<string, string> {
  const stopNames = new Map<string, string>();
  for (const dir of directions) {
    for (const stop of dir.stops) {
      stopNames.set(stop.id, stop.name);
    }
  }
  return stopNames;
}

// Parse one feed entity into a Trip plus the direction it belongs to.
// Returns null when the entity is for another route, has no timed stops,
// or its origin departure has already passed (no longer catchable).
function buildTrip(
  entity: FeedEntity,
  routeId: string,
  stopNames: Map<string, string>,
  now: number,
  tz: string,
): { directionId: string; trip: Trip } | null {
  const tu = entity.tripUpdate;
  if (!tu) return null;
  if (tu.trip.routeId !== routeId || tu.trip.directionId === undefined) return null;

  const directionId = String(tu.trip.directionId);
  const vehicleId = tu.vehicle?.id ?? "";

  // Each feed entity is one trip: collect its stops, in feed order, into
  // a single chain the templates render as one row.
  const stops: TripStop[] = [];
  for (const stopUpdate of tu.stopTimeUpdate) {
    // Prefer the arrival time; the ferry feed often carries only a
    // departure time (e.g. at origin gates), so fall back to that.
    const epoch = stopUpdate.arrival?.time ?? stopUpdate.departure?.time;
    if (epoch === undefined) continue;
    const epochSeconds = Number(epoch);
    if (!Number.isFinite(epochSeconds)) continue;

    stops.push({
      name: stopNames.get(stopUpdate.stopId) || stopUpdate.stopId,
      time: clockTime(epochSeconds * 1000, tz),
      mins: Math.round((epochSeconds - now) / 60),
    });
  }

  if (stops.length === 0 || stops[0].mins < 0) return null;
  return { directionId, trip: { vehicle: vehicleId, stops } };
}

// Bucket feed entities by direction, sort each bucket by next-departure,
// and emit one section per direction in the route info's direction order.
function buildSections(
  directions: RouteDirection[],
  feed: TripUpdatesFeed,
  routeId: string,
  stopNames: Map<string, string>,
  now: number,
  tz: string,
): Section[] {
  const byDirection = new Map<string, Trip[]>();
  for (const direction of directions) byDirection.set(direction.id, []);

  for (const entity of feed.entity) {
    const parsed = buildTrip(entity, routeId, stopNames, now, tz);
    if (!parsed) continue;
    const bucket = byDirection.get(parsed.directionId);
    if (!bucket) continue;
    bucket.push(parsed.trip);
  }

  return directions.map((direction) => {
    const trips = byDirection.get(direction.id) ?? [];
    trips.sort((a, b) => a.stops[0].mins - b.stops[0].mins);
    return {
      title: direction.title || `Direction ${direction.id}`,
      direction_id: direction.id,
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
  if (Array.isArray(input.sections)) {
    return {
      agency: input.agency ?? "",
      route_id: input.route_id ?? "",
      route_name: input.route_name ?? "",
      updated_at: input.updated_at ?? "",
      sections: input.sections,
    };
  }

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

  if (!feed?.header || !Array.isArray(feed.entity)) {
    return {
      error: "Swiftly trip updates unavailable",
      detail: "Check the Swiftly API key and agency.",
      sections: [],
    };
  }
  if (!agencyData?.success || !agencyData.data) {
    return {
      error: "Swiftly agency info unavailable",
      detail: "Check the Swiftly API key and agency.",
      sections: [],
    };
  }

  const tz = agencyData.data.timezone || DEFAULT_TZ;

  if (!routeData?.success || !routeData.data) {
    return {
      error: "Swiftly route info unavailable",
      detail: "Check the Swiftly API key, agency, and route.",
      sections: [],
    };
  }

  const route = routeData.data.routes?.[0];
  if (!route) {
    return { error: `route ${routeId} not found for agency ${agency}`, sections: [] };
  }
  const routeName = route.longName || route.name || route.shortName || routeId;
  const directions = route.directions ?? [];

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
