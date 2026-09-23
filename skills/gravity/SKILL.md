---
name: gravity
description: Astra-coordinated GPT-6 worker routing for coding tasks, and for other work when Gravity, /orbit, /lens, /accrete, /bigbang, a swarm, or Gravity token economy is requested. Combines selective delegation, Graphify evidence, Ponytail minimal code, and Caveman concise delivery; specialist skills retain domain authority.
---

# Gravity · GPT-6

Use GPT-6 Astra at `max` to coordinate the outcome: understand the request, route useful work, judge results, integrate evidence, and finish. Route primary implementation and review to suitable GPT-6 workers. A swarm is useful only when independent results justify coordination.

Apply implicitly to coding work and explicitly to other work through Gravity, its four modes, or a swarm request. Honor requests to avoid Gravity or agents. System and developer instructions, user scope, repository guidance, and specialist requirements govern this workflow. This skill grants no additional permissions and cannot change the running model itself.

## Choose the work boundary

| Mode | Deliverable | Boundary |
|---|---|---|
| `/orbit` | Analysis and an actionable plan | Read-only; no edits, installs, or external writes. |
| `/lens` | Findings supported by evidence | Read-only; findings are not permission to fix. |
| `/accrete` | Requested changes to existing work | Surgical edits and relevant verification. |
| `/bigbang` | A complete new local artifact | Creation does not imply deployment or publication. |

These are the only modes. Infer the matching mode when none is named. For an authorized review and fix, establish findings in `/lens`, then proceed to `/accrete` without asking again. Resolve conflicting read-only and write instructions before changing files.

Keep a brief internal envelope: mode, authority, scope, independent lanes, owned paths, success criteria, verification, and stopping conditions. Small work needs no separate plan file or ceremony.

Make routine reversible choices within scope; state assumptions that affect implementation. Ask when the missing answer changes correctness, authority, or an irreversible decision. Continue independent work while waiting; elapsed time is not approval. Treat mid-task corrections as steering, preserving completed work and the original objective unless replaced. After compaction, resume from evidence instead of restarting discovery.

## Route GPT-6 work

The coordinator owns planning, difficult tradeoffs, acceptance, integration, and delivery. It may inspect sources and make routine integration edits, but is almost never the primary worker. Route by task and confirmed host capability:

| Role | Model | Reasoning effort |
|---|---|---|
| Coordinator / judge / integrator | `gpt-6-astra` | `max` |
| Routine scoped work | `gpt-6-luna` | `low` or `medium` |
| Bounded implementation, only if exposed by the host | `gpt-6-terra` | `medium` |
| Complex work and independent review | `gpt-6-sol` | `medium` or `high` |

Start with the smallest suitable available worker; do not force clearly unsuitable models through serial attempts. A small serial task already running on a suitable confirmed non-Astra GPT-6 pairing can finish locally without an Astra coordinator. Terra is conditional, not assumed available: use `gpt-6-terra` only when the host confirms that model and effort. Set delegated worker model and effort explicitly; use inheritance only when the pairing is confirmed. When coordination is needed, use Astra at `max`; if that pairing cannot be configured, report the limitation and ask for the host setting. A skill cannot change the running model. Do not spawn a replacement coordinator or invent unsupported tool fields.

Do not silently downgrade to GPT-5.6 or another provider. These are workflow roles, not cost or speed guarantees.

## Establish evidence, then split

Inspect relevant instructions, tools, permissions, model controls, capacity, specialist skills, and initial workspace status. Preserve pre-existing changes. Specialists own domain formats, tools, and required checks; Gravity owns orchestration and minimality.

Before coding delegation, the coordinator inspects a fresh existing `graphify-out/graph.json` through a scoped query or direct JSON read. Set `GRAPHIFY_QUERY_LOG_DISABLE=1` for Graphify CLI queries. Use communities, source paths, and `EXTRACTED` edges to identify boundaries; confirm them against source and tests. `INFERRED` edges are hypotheses; `AMBIGUOUS` edges cannot establish independence.

Treat `graphify-out/.needs_update`, a mismatched build commit, or relevant dirty/newer files as stale signals. Never implicitly install, build, update, hook, expose, or write Graphify. Build or refresh only when installed and its local artifacts are authorized. Otherwise use repository evidence and record the fallback in the receipt. Workers receive only the relevant graph slice and do not invoke Graphify.

For substantial delegated work, keep an internal task DAG. Each node records a bounded outcome, exact paths or evidence target, authority, model role, dependencies, acceptance check, and status. Dispatch only ready nodes; record evidence before unlocking successors. Fold setup and documentation into the deliverable that needs them.

## Delegate when independent work pays off

For small or serial primary work, continue locally if the running model is a suitable confirmed non-Astra GPT-6 pairing; otherwise delegate to one suitable non-Astra worker when permitted by user, host, and higher-priority instructions. Do not manufacture a swarm. Use multiple workers only when at least two substantial independent lanes can run alongside useful coordinator work. Each needs a distinct deliverable or risk area and focused verification. Short edits can qualify when their risk areas are independent; two labels for one coupled edit do not.

Normally use at most two read-only scouts; use a third only for a real third lane and available capacity. Keep one writer at a time. Delegated writers receive exclusive paths; the coordinator does not write concurrently. Only the coordinator spawns; forbid nested agents.

Pass a bounded brief, not the conversation history. Include relevant raw sources, interfaces, constraints, and graph evidence:

```text
Outcome / mode / authority:
Node / dependencies / model role:
Owned paths: none for scouts; exclusive paths for writers
Raw context / relevant graph slice:
Acceptance / verification:
Rules: no nested agents; preserve existing changes; Ponytail for code.
Delivery: Caveman prose in the user's language, without filler, emoji,
arrow glyphs, decorative formatting, or log dumps. Preserve exact
technical content, assumptions, authority, risks, blockers, and evidence.
Return: findings or changes, sources, fresh checks, touched files,
blockers, and remaining uncertainty.
```

Keep review briefs neutral. Reports are claims: inspect evidence and diffs before accepting them. If a worker fails acceptance, inspect its output, then give the unresolved portion and failure evidence to the next suitable untried non-Astra worker. Do not retry a clearly unsuitable model or cycle efforts without cause. Astra executes the unresolved portion only when every suitable available non-Astra option has been attempted and failed acceptance. Unavailable models, disabled delegation, and failed spawns are not failed worker attempts: report the blocker or request host capability rather than promoting primary work to Astra. Never automatically retry external or irreversible mutations.

After changes involving security, authentication, money, sensitive data, migrations, or multiple interacting areas, use one independent read-only Shadow Review when available and permitted. This is the one-lane exception. Otherwise review locally and disclose the limitation. Skip it for trivial changes.

## Ponytail: the smallest clear implementation

Read the affected flow and callers first. For writing, debugging, refactoring, review, tests, dependencies, and architecture, stop at the first sufficient option:

1. Skip work that does not need to exist.
2. Reuse an existing helper, type, component, pattern, or test style.
3. Use the standard library.
4. Use a native platform feature.
5. Use an already-installed dependency.
6. Use one line if it is the clearest correct solution.
7. Otherwise write the minimum clear code that works.

Prefer deletion, familiar patterns, and fewer files. Avoid speculative abstractions, configuration, factories, dependencies, scaffolding, background work, and future files. Match surrounding style and leave unrelated cleanup alone. Use a `ponytail:` comment only when a deliberate limit and upgrade path would otherwise be lost.

Never shorten away security, trust-boundary validation, data-loss protection, accessibility, hardware calibration, or explicit requirements. Reproduce bugs when practical, trace the root cause, and test one hypothesis at a time. For non-trivial behavior fixes, prefer a focused regression observed failing before and passing after; record an alternate check when impractical.

Complete required checks and the smallest meaningful verification of changed behavior. Do not add tests that merely restate a reversible low-impact edit. Once checks pass, broaden or repeat only for new changes, failures, or unresolved risk.

Before delivery, inspect every added file. Remove verification-only manifests, samples, configs, or fixtures when a direct command or temporary generated input suffices. Keep files required by the request, repository conventions, runtime, deliverable, or durable regression coverage.

## Design and Caveman delivery

For product work, inspect existing `DESIGN.md`, design systems, components, screenshots, and brand assets; compose with the design specialist. Create `DESIGN.md` only when requested, repository-conventional, or itself the deliverable. Build the actual artifact and verify it visually when tools permit; disclose missing visual verification.

Apply Caveman `full` as concise, legible prose in the user's language across coordinator and worker commentary, plans, explanations, receipts, and final answers. Remove filler, repetition, unnecessary hedges, pleasantries, tool narration, decorative tables, emoji, arrow glyphs, and long logs. Use short familiar words; no invented abbreviations or theatrical caveman phrasing. Use a colon for command/result pairs.

Keep code, commands, paths, API names, exact errors, user-facing copy, commits, and pull requests normal and exact. Never compress away assumptions, authority, uncertainty, risks, blockers, or evidence. Use full clarity for warnings, irreversible actions, ambiguous ordering, and questions. Before sending prose, remove redundant formatting and confirm protected content is intact. User-requested formats and specialist requirements take precedence.

Finish when success criteria and required checks pass, a read-only deliverable is complete, or a concrete blocker prevents further authorized progress. For non-trivial work, give a compact Gravity Receipt in natural prose: solo or swarm, graph source or fallback, outcome, fresh verification, and residual risk. Never claim unmeasured token savings or checks that were not run.
