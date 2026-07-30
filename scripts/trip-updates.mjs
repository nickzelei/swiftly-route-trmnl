#!/usr/bin/env node
// Show upcoming ferry arrivals from the GTFS-rt trip-updates feed.
//
//   node scripts/trip-updates.mjs                             # all upcoming arrivals
//   node scripts/trip-updates.mjs --route 19417                # one route only
//   node scripts/trip-updates.mjs --stops 12345                # one stop
//   node scripts/trip-updates.mjs --stops 72011,72012,72013    # SF Ferry Building (all gates)
//   node scripts/trip-updates.mjs --route 19417 --stops 72011,72012,72013
//
// This is the core query the TRMNL plugin's transform (src/transform.ts)
// runs on a schedule.

import { parseArgs } from 'node:util';
import { AGENCY_KEY, getJson, pick } from './swiftly.mjs';

const { values } = parseArgs({
  options: {
    route: { type: 'string' },
    stops: { type: 'string' },
  },
});

const stopFilter = values.stops
  ? new Set(
      values.stops
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;

// Yield {routeId, tripId, vehicleId, stopId, kind, epoch} rows.
function* stopTimeUpdates(feed) {
  for (const entity of feed.entity ?? []) {
    const tu = pick(entity, 'tripUpdate', 'trip_update');
    if (!tu) continue;
    const trip = pick(tu, 'trip') ?? {};
    const routeId = String(pick(trip, 'routeId', 'route_id') ?? '');
    const tripId = String(pick(trip, 'tripId', 'trip_id') ?? '');
    const vehicle = pick(tu, 'vehicle') ?? {};
    const vehicleId = String(pick(vehicle, 'id') ?? '');
    for (const stu of pick(tu, 'stopTimeUpdate', 'stop_time_update') ?? []) {
      const stopId = String(pick(stu, 'stopId', 'stop_id') ?? '');
      for (const kind of ['arrival', 'departure']) {
        const event = pick(stu, kind) ?? {};
        const epoch = pick(event, 'time');
        if (epoch) yield { routeId, tripId, vehicleId, stopId, kind, epoch: Number(epoch) };
      }
    }
  }
}

const feed = await getJson(`/real-time/${AGENCY_KEY}/gtfs-rt-trip-updates`, { format: 'json' });
const now = Math.floor(Date.now() / 1000);

const rows = [];
for (const { routeId, tripId, vehicleId, stopId, kind, epoch } of stopTimeUpdates(feed)) {
  if (values.route && routeId !== values.route) continue;
  if (stopFilter && !stopFilter.has(stopId)) continue;
  if (epoch < now) continue; // already happened
  rows.push({ epoch, routeId, stopId, kind, vehicleId, tripId });
}

rows.sort((a, b) => a.epoch - b.epoch);
if (rows.length === 0) {
  console.log('No upcoming arrivals match the filters.');
  process.exit(0);
}

console.log(
  `${'when'.padStart(8)}  ${'route'.padEnd(8)} ${'stop'.padEnd(10)} ${'event'.padEnd(10)} ${'vehicle'.padEnd(8)} trip`,
);
for (const { epoch, routeId, stopId, kind, vehicleId, tripId } of rows) {
  const mins = Math.round((epoch - now) / 60);
  const d = new Date(epoch * 1000);
  const clock = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  console.log(
    `${String(mins).padStart(5)}min  ${routeId.padEnd(8)} ${stopId.padEnd(10)} ` +
      `${kind.padEnd(10)} ${vehicleId.padEnd(8)} ${tripId}  (${clock})`,
  );
}
