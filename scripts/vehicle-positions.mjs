#!/usr/bin/env node
// Show live ferry positions from the GTFS-rt vehicle-positions feed.
//
//   node scripts/vehicle-positions.mjs                  # all vehicles
//   node scripts/vehicle-positions.mjs --route 19417    # one route only
//
// Useful later for a "ferry is underway" indicator on the TRMNL display.

import { parseArgs } from 'node:util';
import { AGENCY_KEY, getJson, pick } from './swiftly.mjs';

const { values } = parseArgs({ options: { route: { type: 'string' } } });

// Yield objects describing each vehicle in the feed.
function* vehicles(feed) {
  for (const entity of feed.entity ?? []) {
    const v = pick(entity, 'vehicle');
    if (!v) continue;
    const trip = pick(v, 'trip') ?? {};
    const pos = pick(v, 'position') ?? {};
    const inner = pick(v, 'vehicle') ?? {};
    const ts = pick(v, 'timestamp');
    yield {
      vehicleId: String(pick(inner, 'id') ?? pick(entity, 'id') ?? ''),
      label: pick(inner, 'label') ?? '',
      routeId: String(pick(trip, 'routeId', 'route_id') ?? ''),
      lat: pick(pos, 'latitude', 'lat'),
      lon: pick(pos, 'longitude', 'lon'),
      speed: pick(pos, 'speed'),
      status: pick(v, 'currentStatus', 'current_status') ?? '',
      stopId: String(pick(v, 'stopId', 'stop_id') ?? ''),
      timestamp: ts ? Number(ts) : null,
    };
  }
}

const feed = await getJson(`/real-time/${AGENCY_KEY}/gtfs-rt-vehicle-positions`, {
  format: 'json',
});
const now = Math.floor(Date.now() / 1000);

const rows = [...vehicles(feed)].filter((v) => !values.route || v.routeId === values.route);
if (rows.length === 0) {
  console.log('No vehicles match the filters.');
  process.exit(0);
}

console.log(
  `${'vehicle'.padEnd(10)} ${'route'.padEnd(8)} ${'position'.padEnd(24)} ${'speed'.padEnd(8)} ${'status'.padEnd(14)} age`,
);
for (const v of rows.sort((a, b) => a.vehicleId.localeCompare(b.vehicleId))) {
  const loc = v.lat != null ? `${v.lat}, ${v.lon}` : '(no fix)';
  const speed = typeof v.speed === 'number' ? v.speed.toFixed(1) : '-';
  const age = v.timestamp ? `${now - v.timestamp}s` : '-';
  const status = v.stopId ? `${v.status}@${v.stopId}` : v.status;
  console.log(
    `${v.vehicleId.padEnd(10)} ${v.routeId.padEnd(8)} ${loc.padEnd(24)} ${speed.padEnd(8)} ${status.padEnd(14)} ${age}`,
  );
}
