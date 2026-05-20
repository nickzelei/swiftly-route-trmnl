// Throwaway: invokes the Worker handler directly against the live API.
// Node ignores the `cf:` fetch option, so the handler runs as-is.
//
// Run with:
//   SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts
//   SWIFTLY_API_KEY=... mise exec -- node _smoketest.ts <agency> <route>
import worker from "./src/index.ts";

const agency = process.argv[2] ?? "sfbay-ferry";
const route = process.argv[3] ?? "19417";
const key = process.env.SWIFTLY_API_KEY;
if (!key) {
  console.error("set SWIFTLY_API_KEY in the environment");
  process.exit(1);
}

const req = new Request(`https://test.local/?agency=${agency}&route=${route}`);
const resp = await worker.fetch(req, { SWIFTLY_API_KEY: key } as any);
console.log("status:", resp.status);
console.log(await resp.text());
