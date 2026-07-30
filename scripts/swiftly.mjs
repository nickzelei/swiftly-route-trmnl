// Shared Swiftly API client for the exploration scripts.
//
// Node builtins only. Credentials come from process.env (SWIFTLY_API_KEY,
// AGENCY_KEY) — mise loads the repo-root .env for every command that runs
// through it (see mise.toml's [env] block), so there's no per-script .env
// parsing to do. Every call requests JSON so callers never have to touch
// protobuf.

const BASE_URL = 'https://api.goswift.ly';

export const AGENCY_KEY = process.env.AGENCY_KEY || 'sfbay-ferry';

const API_KEY = process.env.SWIFTLY_API_KEY || '';

// GET a Swiftly endpoint and return parsed JSON.
// `path` is everything after BASE_URL, e.g. "/info/sfbay-ferry/routes".
// `params` become query params (undefined/null values are dropped).
export async function getJson(path, params = {}) {
  if (!API_KEY || API_KEY.startsWith('replace-with')) {
    console.error('ERROR: set SWIFTLY_API_KEY in .env before running.');
    process.exit(1);
  }

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) query.set(key, value);
  }
  const qs = query.toString();
  const url = `${BASE_URL}${path}${qs ? `?${qs}` : ''}`;

  let res;
  try {
    res = await fetch(url, { headers: { Authorization: API_KEY } });
  } catch (e) {
    console.error(`Network error for ${url}: ${e.message}`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`HTTP ${res.status} for ${url}\n${await res.text()}`);
    process.exit(1);
  }
  return res.json();
}

// Return the first present key from an object, tolerating camelCase/snake_case.
export function pick(obj, ...keys) {
  if (!obj || typeof obj !== 'object') return undefined;
  for (const key of keys) if (key in obj) return obj[key];
  return undefined;
}
