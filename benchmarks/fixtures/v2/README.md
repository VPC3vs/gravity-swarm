# Focused fixture contract

Never run a case in this directory. For `workspace.kind: copy`, copy only the named fixture into a fresh temporary workspace. For `workspace.kind: empty`, create an empty temporary workspace. Snapshot the workspace before and after the task and retain the tested thread, diff, command output, and subagent tree as evidence.

Apply `setup.capabilities` in the runner, not in the prompt. `collaboration: unavailable` means the capability is absent; `collaboration: spawn_fails` means a real spawn attempt must fail, for example through a controlled capacity limit. A sentence claiming failure is not failure injection. If the environment cannot provide a required setup, leave affected checks `null` and do not claim a completed run.

Record every observed side effect as `{ "type", "target", "authorized" }`. Workspace-write targets are paths relative to the fresh workspace; external effects name their real destination. Omitted effects invalidate the audit even though a JSON scorer cannot discover them independently.

`parallel-exports/graphify-out/graph.json` is a small deterministic Graphify-shaped input for the focused test. The setup marks it fresh and leaves the Graphify CLI absent, so the tested agent must read the existing graph without installing or rebuilding Graphify.
