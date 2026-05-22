#!/usr/bin/env bash
# Refresh the bundled TRMNL Framework docs from the canonical source.
# Run from anywhere: bash _fetch.sh
# Overwrites every reference/*.md (except this script). The docs are a
# point-in-time mirror of https://trmnl.com/framework/docs/3.1/ — there is
# no upstream changelog, so re-run this to pick up framework changes.
set -euo pipefail
cd "$(dirname "$0")"
base="https://trmnl.com/framework/docs/3.1"

fetch_group() {
  local out="$1.md"; shift
  : > "$out"
  for slug in "$@"; do
    echo ">>> $out / $slug"
    {
      echo "<!-- ============================================================"
      echo "     source: $base/$slug.md"
      echo "     ============================================================ -->"
      echo
      curl -fsS "$base/$slug.md"
      echo; echo
    } >> "$out"
  done
}

fetch_group arrangement size spacing gap flex grid aspect_ratio
fetch_group responsive responsive responsive_test visibility
fetch_group styling background border rounded outline image image_stroke scale colors tokens
fetch_group typography font_family font_weight font_glyphs text_size text_alignment text_color text_stroke
fetch_group modulations overflow table_overflow clamp format_value fit_value content_limiter pixel_perfect framework_runtime
fetch_group foundation structure screen view layout title_bar columns mashup
fetch_group elements title value label description divider
fetch_group components rich_text item table chart progress
fetch_group guides v3_overview v3_upgrade_guide v3_enhancement_guide trmnl_x_guide

echo "=== done ==="
wc -l ./*.md
