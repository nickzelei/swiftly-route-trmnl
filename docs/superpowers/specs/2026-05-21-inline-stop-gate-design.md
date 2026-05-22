# Inline stop name on each sailing — design

**Date:** 2026-05-21
**Status:** Approved

## Problem

The TRMNL templates render each sailing as `DEPARTS · <vessel>` / `ARRIVES ·
<vessel>` with no indication of *which stop* the time refers to. For a
multi-stop direction this is confusing:

- The SF Bay Ferry "Alameda Seaplane" route's SF-bound direction (`directionId
  1`) stops at the Alameda terminal, then a San Francisco Ferry Building gate.
  The Worker pushes one sailing per future `stopTimeUpdate` into the
  direction's bucket (`worker/src/index.ts:227`), so the "To San Francisco…"
  column can list both the Alameda *departure* and the SF *arrival* of the
  same boat.
- A `DEPARTS` row under the "To San Francisco…" heading is actually the boat
  leaving **Alameda** — the time is correct but reads as a mismatch.
- The SF Ferry Building has gates E/F/G and boats get reberthed, but the
  section title is fixed to Swiftly's static direction name ("…Gate F"), so
  the actual gate (E or G) is never visible.

## Goal

Show the real stop next to each `ARRIVES`/`DEPARTS` row so the times make
sense and the actual gate is visible — driven entirely by Swiftly data, with
no hardcoding, so it stays generic for any agency/route.

## Findings

- The Worker **already** resolves and emits the stop. Each sailing in the JSON
  carries `stop` — `stopNames.get(stopId) || stopId` (`worker/src/index.ts:243`),
  built generically from the route's verbose stop list. Confirmed in the live
  smoketest output. **No Worker change is needed.**
- The four Liquid templates (`full`, `half_vertical`, `quadrant`,
  `half_horizontal`) currently render `s.kind` and `s.vehicle` but not
  `s.stop`.
- A short label like "Gate E" cannot be derived generically — it would require
  hardcoding the word "Gate" or SF-specific knowledge. Swiftly gives one full
  string per stop (e.g. `"San Francisco Ferry Building Gate E"`); another
  agency might give `"Main St & 5th Ave"`. The generic, truthful label is the
  full stop name as Swiftly provides it.
- The section title stays unchanged: `dir.title` (e.g. "To San Francisco Ferry
  Building Gate F"). It is the cleanest single name Swiftly offers for a
  direction; the only other field, `headsigns`, is a list (one entry per gate)
  and does not fold into a tidy title.

## Design

Template-only change. In each of the four templates in `trmnl/src/`, append
the stop to the sailing label, guarded so an empty/absent `stop` renders
nothing extra:

```liquid
<span class="label label--small">
  {% if s.kind == "departure" %}DEPARTS{% else %}ARRIVES{% endif %}
  &middot; {{ s.vehicle }}{% if s.stop != blank %} &middot; {{ s.stop }}{% endif %}
</span>
```

`quadrant` uses the abbreviated `DEP`/`ARR` kind; keep that, only add the stop
clause. The existing per-template label markup and classes are otherwise
unchanged.

## Out of scope (YAGNI)

- Generic prefix-trimming to shorten the stop label (strip the part shared with
  the section title). Heuristic with agency-dependent edge cases; revisit only
  if the full name reads badly on the physical device.
- Any Worker change.
- Changing the section title.

## Testing / verification

- `trmnlp build` renders all four layouts to `_build/` and is the CI check.
- Preview with `trmnlp serve`; the static sample payload in `.trmnlp.yml`
  exercises the `stop` field. Confirm the stop appears on each row and that a
  sailing with an empty `stop` renders no trailing ` · `.
