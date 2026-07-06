<p align="center">
  <img src="assets/gravity-banner.png" alt="Derpy hand-drawn Gravity banner" width="900">
</p>

<h1 align="center">Gravity</h1>

<p align="center">
  <em>A token-lean Codex skill for keeping smart orchestration, tiny code, and product taste in orbit.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/skill-Codex-111111?style=flat-square" alt="Codex skill">
  <img src="https://img.shields.io/badge/models-GPT--5.5%2B-111111?style=flat-square" alt="GPT-5.5 plus">
  <img src="https://img.shields.io/badge/modes-4-111111?style=flat-square" alt="Four modes">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

Gravity is a Codex skill for work that benefits from a strong orchestrator and a lean swarm. It combines:

- Caveman-style compression for working notes and subagent prompts.
- Ponytail-style minimal coding rules, always on for coding tasks.
- Open Design-style product-design workflow when the task is a product artifact.
- Ogre-style orchestration: the strongest available model plans, delegates, judges, retries, and integrates.

It does not route below `gpt-5.5`. If a cheaper path is needed, Gravity lowers reasoning effort instead of dropping model family.

## Modes

| Mode | Name | Use it for |
|---|---|---|
| `/bigbang` | Create | Blank-slate creation from a sharper internal brief. |
| `/accrete` | Build | Add functionality while sticking to existing patterns. |
| `/lens` | Review | Bug/security/logic review, findings first. |
| `/orbit` | Plan | Assumptions, success criteria, subtasks, verification, and risks. |

## The ladder

Before writing code, Gravity applies the Ponytail ladder:

```text
1. Does this need to exist?
2. Does this already exist here?
3. Can the standard library solve it?
4. Can the native platform solve it?
5. Can an installed dependency solve it?
6. Can one line solve it correctly?
7. Only then write the minimum code that works.
```

Lazy about code volume. Not lazy about reading, security, accessibility, or validation.

## Microbenchmark

Initial local run on 2026-07-06, one paired trial per prompt in a live Codex thread:

| Prompt | Baseline LOC | Gravity LOC | Change | Notes |
|---|---:|---:|---:|---|
| Date picker | 177 | 177 | 0.0% | Both used native `input[type="date"]`; no deps. |
| Color picker | 222 | 241 | +8.6% | Both used native `input[type="color"]`; no deps. |
| City picker | 289 | 261 | -9.7% | Both met suggestion/preview/save requirements; no deps. |
| **Total** | **688** | **679** | **-1.3%** | Small pilot, not a billing benchmark. |

This run supports a modest claim: Gravity preserved the desired native/no-dependency choices and was slightly smaller overall in this tiny sample. It does not prove universal speed, token, or cost savings. See [`benchmarks/`](benchmarks/) for prompts, criteria, and the recorded result.

## Install

From this repository, install the skill path:

```bash
python ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo VPC3vs/gravity-swarm \
  --path skills/gravity
```

Or copy `skills/gravity` into your local Codex skills directory:

```text
~/.codex/skills/gravity
```

Restart Codex after installing.

## What ships

```text
skills/gravity/SKILL.md
skills/gravity/agents/openai.yaml
assets/gravity-banner.png
benchmarks/
```

## Credit

Gravity was shaped around public ideas from Caveman, Ponytail, Open Design, and a local Ogre-style orchestrator skill. The banner is original derpy paint-style art generated for this repo.
