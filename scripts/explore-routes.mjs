#!/usr/bin/env node
// List SF Bay Ferry routes, and dump the stops for a route.
//
//   node scripts/explore-routes.mjs                  # list all routes
//   node scripts/explore-routes.mjs --route 19417    # list stops on route 19417
//
// Use this to discover stop ids, or — if you're installing the TRMNL
// plugin — to find your agency's numeric route id for the form's Route
// field.

import { parseArgs } from 'node:util';
import { AGENCY_KEY, getJson, pick } from './swiftly.mjs';

const { values } = parseArgs({ options: { route: { type: 'string' } } });

// Recursively collect stop-like objects (have an id and a lat/lon).
function findStops(node, found) {
  if (Array.isArray(node)) {
    for (const item of node) findStops(item, found);
    return;
  }
  if (!node || typeof node !== 'object') return;

  const id = pick(node, 'id');
  const lat = pick(node, 'lat', 'latitude');
  const lon = pick(node, 'lon', 'longitude');
  if (id != null && lat != null && lon != null) {
    found.set(String(id), {
      id: String(id),
      name: pick(node, 'name', 'title') || '(unnamed)',
      lat,
      lon,
    });
  }
  for (const value of Object.values(node)) findStops(value, found);
}

if (values.route) {
  const data = await getJson(`/info/${AGENCY_KEY}/routes`, {
    route: values.route,
    verbose: 'true',
    format: 'json',
  });
  const routes = pick(data.data ?? {}, 'routes') ?? [];
  if (routes.length === 0) {
    console.log(`No route ${values.route} found.`);
    process.exit(0);
  }
  for (const route of routes) {
    console.log(`\nRoute ${pick(route, 'id')}  ${pick(route, 'name', 'longName')}`);
    const stops = new Map();
    findStops(route, stops);
    for (const s of [...stops.values()].sort((a, b) => a.name.localeCompare(b.name))) {
      console.log(`  stop_id=${s.id.padEnd(10)} ${s.name.padEnd(32)} (${s.lat}, ${s.lon})`);
    }
  }
} else {
  const data = await getJson(`/info/${AGENCY_KEY}/routes`, { format: 'json' });
  const routes = pick(data.data ?? {}, 'routes') ?? [];
  console.log(`${routes.length} routes for agency '${AGENCY_KEY}':\n`);
  for (const route of [...routes].sort((a, b) =>
    String(pick(a, 'id')).localeCompare(String(pick(b, 'id'))),
  )) {
    console.log(
      `  id=${String(pick(route, 'id')).padEnd(10)} ` +
        `${(pick(route, 'shortName') || '').padEnd(8)} ` +
        `${pick(route, 'longName') || pick(route, 'name') || ''}`,
    );
  }
  console.log('\nNext: node scripts/explore-routes.mjs --route <id>  to see its stops.');
}
