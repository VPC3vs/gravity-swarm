<p align="center">
  <img src="assets/gravity-banner.png" alt="Hand-drawn black hole with colorful orbiting agents on notebook paper" width="1000">
</p>

# Gravity · Astra

A lean orchestration skill for GPT-6 Astra. Keep the outcome in one coordinator's hands; delegate bounded work when independence makes it worthwhile.

Gravity preserves its four modes and core disciplines: Graphify-informed task dependencies, selective multi-agent work, one writer, evidence-based acceptance, Shadow Review, Ponytail minimal implementation, Caveman concise delivery, and specialist-led product verification.

## Four modes, clear authority

| Mode | Work | Boundary |
|---|---|---|
| `/orbit` | Analyze and plan | Read-only. |
| `/lens` | Review with evidence | No implicit fixes. |
| `/accrete` | Modify existing work | Only requested changes and relevant checks. |
| `/bigbang` | Create a local artifact | No implicit publication or deployment. |

Gravity applies automatically to coding tasks. For other work, name Gravity, use a mode, or request a swarm. An authorized review-and-fix proceeds from findings to changes without another permission round. Specialist skills retain control of their domain tools, formats, and verification.

## Built around Astra

The coordinator handles scope, tradeoffs, integration, and acceptance. Routine reversible choices proceed within the user's request; material ambiguity gets a focused question while independent work continues. Mid-task corrections steer the active objective, and completed work survives compaction.

| Role | Model | Reasoning effort |
|---|---|---|
| Coordinator / judge | `gpt-6-astra` | `ultra` |
| Substantial bounded worker / Shadow Review | `gpt-6-astra` | `medium` |
| Routine scout / short coding loop | `gpt-6-astra` | `low` |

Gravity uses Astra only, with no other-model fallback. “Mid” means `medium`. Select Astra at `ultra` for the coordinator in the host; installing the skill cannot switch the running model. Workers use explicit model and effort controls or confirmed matching inheritance. When worker settings cannot be guaranteed, the Astra coordinator handles their work at `ultra`. If the coordinator pairing itself cannot be established, Gravity reports the limitation and asks for the host setting rather than substituting another model or effort.

The revision follows [OpenAI's Astra guidance](https://developers.openai.com/api/docs/guides/latest-model) on explicit delegation criteria, autonomous follow-through, concise writing, and proportionate verification. Routing is a project policy, not an official cost recommendation. No token, latency, or quality improvement is claimed without measurement.

## How work flows

Inspect instructions, capabilities, specialist requirements, and existing changes. Define observable success and use a small internal task envelope. For substantial delegation, keep a task DAG and dispatch only independent nodes whose dependencies have evidence.

A fresh existing `graphify-out/graph.json` helps identify ownership and dependencies. Confirm graph evidence against sources and tests. Disable CLI query logging with `GRAPHIFY_QUERY_LOG_DISABLE=1`; never implicitly install or rebuild Graphify. If absent or stale and no refresh is authorized, use source evidence and report the fallback.

Use agents for at least two substantial independent lanes, normally with at most two read-only scouts. A third requires a distinct lane and capacity. Keep one writer at a time and forbid nested spawning. Failed spawns return to the Astra coordinator. Insufficient read-only results at `low` may get one Astra retry at `medium`, then return to the coordinator at `ultra`; results already at `medium` return directly. High-risk changes receive one post-write read-only Shadow Review when supported; otherwise disclose local review.

## Keep the implementation small

Ponytail's order remains: skip unnecessary work, reuse existing code, use the standard library, prefer native platform features, use installed dependencies, use one line when clearest, then write only the minimum clear implementation.

Preserve security, data protection, accessibility, calibration, and explicit requirements. Match existing style, avoid unrelated cleanup, and inspect every added file for necessity. Reproduce meaningful bugs when practical and verify changed behavior. After relevant checks pass, expand testing only when new evidence warrants it.

For product artifacts, use existing design systems and brand assets, build the actual deliverable, and verify visually when possible. Create `DESIGN.md` only when requested, conventional, or itself the deliverable.

## Keep delivery clear

Caveman `full` means concise prose in the user's language, with filler, repeated facts, decorative formatting, emoji, arrow glyphs, and log dumps removed. Exact technical content and user-facing copy remain intact. Assumptions, authority, uncertainty, risks, blockers, and evidence always retain enough explanation.

Non-trivial work ends with a compact receipt: solo or swarm, graph evidence or fallback, outcome, fresh checks, and residual risk.

## Install

Install the published repository version with Codex's skill-installer:

```powershell
python "$env:USERPROFILE\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py" --repo VPC3vs/gravity-swarm --path skills/gravity
```

The installer refuses an existing destination. For a local revised checkout, validate `skills/gravity`, back up the old installation outside discovery directories, and replace it with that exact folder. A local revision is not available through the GitHub install command until published.

Keep the folder name `gravity` and invocation `$gravity`. The updated skill is available on the next turn in Codex. Other hosts may require a reload and use their available model controls.

## Validation and history

Run skill-creator's `scripts/quick_validate.py` against `skills/gravity` to validate its structure. This does not prove agent behavior.

The existing [v2 cases and fixtures](benchmarks/README.md) remain historical evaluation material. The checked-in unrun template is not a passing result, and the older HTML smoke sample establishes neither Astra performance nor token savings. This restyle does not rewrite those baselines.

## Credits

Gravity draws on Caveman, Ponytail, Open Design, Graphify, Superpowers, and a local Ogre-style orchestrator. The black-hole banner was generated in the original hand-drawn notebook style. MIT licensed; see [LICENSE](LICENSE).
