# Taste
- Prefers rem-based units (16px = 1rem) over hardcoded px for layout values — widths, heights, padding, margin, gap, font-size, border-radius, positioning — so the whole site can be scaled globally via `html { font-size: X% }`. Confidence: 0.95
- Prefers normal (100%) font-size on mobile/tablet devices, with compact root-font scaling (e.g., 85%) reserved for desktop — handled via media queries on `html` in globals.css rather than per-component overrides. Confidence: 0.8
- Prefers normal (100%) font-size on mobile/tablet devices, with compact root-font scaling (e.g., 85%) reserved for desktop — handled via media queries on `html` in globals.css rather than per-component overrides. Confidence: 0.8
- Prefers conservative, well-scoped unit conversions that leave intentional exceptions untouched: border-widths, box-shadows, 1px hairlines, responsive breakpoints, and non-layout units (%, ch, vw, vh, blur radii) stay as-is. Confidence: 0.9
- Prefers full consistency within a unit system once adopted (e.g., converting letter-spacing to rem too rather than leaving fine-tuned px values behind). Confidence: 0.7
- Wants sweeping changes to shared/global files (e.g., globals.css) proposed and approved first — go file by file and ask before bulk-rewriting shared code. Confidence: 0.95
- Wants a summary/diff of all changed files for review before committing — do not silently rewrite large amounts of code. Confidence: 0.95
- Wants values inside third-party components, npm libraries, and SVGs flagged for separate review rather than auto-converted. Confidence: 0.9
