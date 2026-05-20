// Throwaway: invokes the Worker handler directly against the live API.
// Node ignores the `cf:` fetch option, so the handler runs as-is.
// Run with: SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts
import worker from "./src/index.ts";

const env = {
  AGENCY_KEY: "sfbay-ferry",
  ROUTE_ID: "19417",
  TIMEZONE: "America/Los_Angeles",
  SWIFTLY_API_KEY: process.env.SWIFTLY_API_KEY!,
};

const resp = await worker.fetch(new Request("https://test.local/"), env as any);
console.log("status:", resp.status);
console.log(await resp.text());
