# Gravity Microbenchmark

This is a small pilot benchmark, not a broad claim.

Run date: 2026-07-06  
Environment: live Codex desktop thread  
Trials: one baseline output and one Gravity-loaded output for each prompt  
Metric: non-empty lines inside the returned HTML code block, plus simple feature checks

## Prompts

### Date Picker

Create a date picker widget for a settings form. It needs a label, min date `2026-01-01`, max date `2026-12-31`, selected-date preview text, and a Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

### Color Picker

Create a theme color picker for a profile settings page. It needs a label, live preview swatch, visible hex value, Reset button, and Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

### City Picker

Create a searchable city picker for a shipping form. It needs a label, suggestions for Rome, Milan, Naples, Turin, Palermo, a selected-city preview text, and a Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

## Scoring

- Count non-empty lines inside the HTML code block.
- Count external dependencies by checking for external script/link imports.
- For date/color tasks, verify native platform inputs were used.
- Verify requested UI elements exist.

For saved HTML files, run:

```bash
node benchmarks/score-html.mjs path/to/output.html
```

## Result

| Trial | LOC | Native date | Native color | External deps | Required UI present |
|---|---:|---|---|---:|---|
| baseline-date | 177 | yes | no | 0 | yes |
| gravity-date | 177 | yes | no | 0 | yes |
| baseline-color | 222 | no | yes | 0 | yes |
| gravity-color | 241 | no | yes | 0 | yes |
| baseline-city | 289 | no | no | 0 | yes |
| gravity-city | 261 | no | no | 0 | yes |

Totals:

- Baseline: 688 LOC
- Gravity: 679 LOC
- Change: -9 LOC, or -1.3%

Interpretation: the first run was nearly neutral on size, with Gravity slightly smaller overall. The stronger result is behavioral: every Gravity trial kept the native/no-dependency choice that the skill is meant to reinforce. This benchmark does not measure tokens, hidden reasoning, latency, or API cost.
