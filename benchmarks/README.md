# Gravity validation

Gravity ships two deliberately different validation surfaces: a focused v2 behavior check and a historical HTML smoke check.

## Focused v2 validation

The focused harness evaluates recorded fresh-thread evidence. It does not launch Codex, select models, or infer hidden behavior.

Files:

- `v2-cases.json`: eight prompts, reproducible setup contracts, and required observable checks.
- `fixtures/v2/`: dependency-free inputs copied into a fresh workspace for each applicable case.
- `score-v2.mjs`: dependency-free validator and scorer.
- `results/v2-focused-unrun.json`: explicit unrun template with the current skill hash and unobserved values set to `null`.

Workflow:

1. Apply each case's `setup` in a fresh temporary workspace. Copy the named fixture or create an empty directory, and actually provide or remove capabilities as declared. Case 7 requires a real controlled spawn failure; if the runner cannot cause one, leave affected checks unobserved.
2. Send only `prompt` to a fresh thread. Never reveal `setup` or `expect`.
3. Snapshot files and relevant external state before and after. Retain the thread, diff, command output, and subagent tree.
4. Copy the unrun template to a dated result file. Record the skill SHA-256; model, effort, and token usage when exposed; successful delegated-agent count; workspace root; side effects; checks; and evidence linked to every check.
5. Score the result:

```bash
node benchmarks/score-v2.mjs benchmarks/results/<dated-result>.json
```

Record side effects as objects with `type`, `target`, and `authorized`. Workspace-write targets are relative to the fresh workspace. The scorer rejects unexpected side-effect categories, unauthorized effects, and workspace targets that escape the workspace. Record model, effort, or token usage as `null` only when the runtime does not expose them. Count successful delegated agents only; exclude the orchestrator and failed spawn attempts.

Every `true` check needs at least one concise evidence string. For `caveman_output_compliant`, verify the output preserved the prompt language; removed filler, hedging, repetition, unnecessary tool narration, decorative tables, emoji, causal arrows, and long logs; used no invented abbreviations or theatrical caveman labels; and kept code, commands, paths, APIs, errors, user copy, assumptions, authority, risks, blockers, and evidence clear and exact. Normal clarity for warnings or ambiguity is compliant.

The scorer exits `0` only when all eight cases pass, `1` for valid recorded failures or unobserved checks, and `2` for malformed input. Acceptance requires all eight cases to pass, no concurrent writers, and no unauthorized side effects. The scorer validates recorded observations and evidence presence; it does not launch Codex or independently prove that evidence is true. Inspect the retained threads and artifacts before accepting a run. This repository does not turn the unrun template into synthetic passing evidence.

## Historical HTML smoke check (2026-07-06)

This is a small historical pilot, not a broad claim.

Environment: live Codex desktop thread  
Trials: one baseline output and one Gravity-loaded output for each prompt  
Metric: non-empty lines inside the returned HTML code block, plus simple source-text feature checks

### Prompts

#### Date Picker

Create a date picker widget for a settings form. It needs a label, min date `2026-01-01`, max date `2026-12-31`, selected-date preview text, and a Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

#### Color Picker

Create a theme color picker for a profile settings page. It needs a label, live preview swatch, visible hex value, Reset button, and Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

#### City Picker

Create a searchable city picker for a shipping form. It needs a label, suggestions for Rome, Milan, Naples, Turin, Palermo, a selected-city preview text, and a Save button. Use plain HTML, CSS, and JavaScript only. Make it usable and accessible enough for a small settings page.

### Scoring

- Count non-empty lines in a saved HTML file.
- Count external dependencies from HTTP(S) script or link imports.
- Detect native date and color inputs.
- Detect requested labels, preview text, buttons, and city names by source text.

Run:

```bash
node benchmarks/score-html.mjs path/to/output.html
```

### Recorded result

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
- Recorded difference: -9 LOC, or -1.3%

Observed only: all six stored outputs used no external dependencies; both date outputs used the native date input and both color outputs used the native color input. Baseline and Gravity matched on these checks, so the run does not isolate a Gravity-specific effect. It does not measure tokens, hidden reasoning, latency, API cost, or general quality.
