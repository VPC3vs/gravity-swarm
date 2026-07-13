import { readFileSync } from "node:fs";
import { posix, win32 } from "node:path";
import { fileURLToPath } from "node:url";

const allowedSideEffects = new Set([
  "workspace_write",
  "dependency_install",
  "external_write",
  "deploy",
  "publish",
]);

function fail(message) {
  throw new Error(message);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${label}: ${error.message}`);
  }
}

function requireUniqueStrings(values, label, allowed = null) {
  if (
    !Array.isArray(values) ||
    values.some((value) => typeof value !== "string" || !value.trim())
  ) {
    fail(`${label} must be an array of non-empty strings`);
  }
  if (new Set(values).size !== values.length) {
    fail(`${label} contains duplicates`);
  }
  if (allowed && values.some((value) => !allowed.has(value))) {
    fail(`${label} contains an unknown value`);
  }
}

function validateManifest(manifest) {
  if (!isObject(manifest) || manifest.schema_version !== 1) {
    fail("manifest schema_version must be 1");
  }
  if (typeof manifest.fixtures_root !== "string" || !manifest.fixtures_root) {
    fail("manifest fixtures_root must be a non-empty string");
  }
  if (!Array.isArray(manifest.cases) || manifest.cases.length !== 8) {
    fail("manifest must contain exactly eight cases");
  }

  const ids = [];
  for (const testCase of manifest.cases) {
    if (!isObject(testCase) || typeof testCase.id !== "string" || !testCase.id) {
      fail("every manifest case needs a non-empty id");
    }
    if (typeof testCase.prompt !== "string" || !testCase.prompt) {
      fail(`manifest case ${testCase.id} needs a prompt`);
    }
    if (!isObject(testCase.setup) || !isObject(testCase.setup.workspace)) {
      fail(`manifest case ${testCase.id} needs setup.workspace`);
    }
    if (!["empty", "copy"].includes(testCase.setup.workspace.kind)) {
      fail(`manifest case ${testCase.id} has invalid workspace kind`);
    }
    if (
      testCase.setup.workspace.kind === "copy" &&
      (typeof testCase.setup.workspace.fixture !== "string" || !testCase.setup.workspace.fixture)
    ) {
      fail(`manifest case ${testCase.id} needs a fixture name`);
    }
    if (!isObject(testCase.setup.capabilities)) {
      fail(`manifest case ${testCase.id} needs setup.capabilities`);
    }
    if (!["available", "unavailable", "spawn_fails"].includes(testCase.setup.capabilities.collaboration)) {
      fail(`manifest case ${testCase.id} has invalid collaboration capability`);
    }
    if (!["available", "absent"].includes(testCase.setup.capabilities.graphify_cli)) {
      fail(`manifest case ${testCase.id} has invalid Graphify CLI capability`);
    }
    if (!isObject(testCase.expect)) {
      fail(`manifest case ${testCase.id} needs expect`);
    }
    if (!Number.isInteger(testCase.expect.agent_count) || testCase.expect.agent_count < 0) {
      fail(`manifest case ${testCase.id} has invalid agent_count`);
    }
    requireUniqueStrings(
      testCase.expect.side_effects,
      `manifest case ${testCase.id} side_effects`,
      allowedSideEffects,
    );
    requireUniqueStrings(testCase.expect.checks, `manifest case ${testCase.id} checks`);
    if (!testCase.expect.checks.length) {
      fail(`manifest case ${testCase.id} needs at least one check`);
    }
    ids.push(testCase.id);
  }
  requireUniqueStrings(ids, "manifest case ids");
}

function validateOptionalString(value, label) {
  if (value !== null && (typeof value !== "string" || !value.trim())) {
    fail(`${label} must be a non-empty string or null`);
  }
}

function validateSideEffects(sideEffects, label) {
  if (sideEffects === null) {
    return;
  }
  if (!Array.isArray(sideEffects)) {
    fail(`${label} must be an array or null`);
  }

  const identities = [];
  for (const effect of sideEffects) {
    if (!isObject(effect) || !allowedSideEffects.has(effect.type)) {
      fail(`${label} contains an invalid type`);
    }
    if (typeof effect.target !== "string" || !effect.target.trim()) {
      fail(`${label} contains an invalid target`);
    }
    if (typeof effect.authorized !== "boolean") {
      fail(`${label} contains an invalid authorized flag`);
    }
    identities.push(`${effect.type}\u0000${effect.target}`);
  }
  requireUniqueStrings(identities, `${label} type and target pairs`);
}

function validateResult(result, manifest) {
  if (!isObject(result) || result.schema_version !== 1) {
    fail("result schema_version must be 1");
  }
  if (typeof result.run_id !== "string" || !result.run_id) {
    fail("result run_id must be a non-empty string");
  }
  if ("pass" in result || "summary" in result) {
    fail("result must not provide pass or summary; the scorer computes them");
  }
  if (typeof result.skill_sha256 !== "string" || !/^[a-f0-9]{64}$/.test(result.skill_sha256)) {
    fail("result skill_sha256 must be 64 lowercase hexadecimal characters");
  }
  if (!Array.isArray(result.cases)) {
    fail("result cases must be an array");
  }

  const expectedById = new Map(manifest.cases.map((testCase) => [testCase.id, testCase]));
  const seen = new Set();
  for (const observed of result.cases) {
    if (!isObject(observed) || typeof observed.id !== "string" || !observed.id) {
      fail("every result case needs a non-empty id");
    }
    if (seen.has(observed.id)) {
      fail(`duplicate result case ${observed.id}`);
    }
    seen.add(observed.id);
    const expected = expectedById.get(observed.id);
    if (!expected) {
      fail(`unknown result case ${observed.id}`);
    }
    if ("pass" in observed) {
      fail(`result case ${observed.id} must not provide pass; the scorer computes it`);
    }

    validateOptionalString(observed.model, `result case ${observed.id} model`);
    validateOptionalString(observed.effort, `result case ${observed.id} effort`);
    validateOptionalString(observed.workspace_root, `result case ${observed.id} workspace_root`);
    if (
      observed.token_usage !== null &&
      (!Number.isInteger(observed.token_usage) || observed.token_usage < 0)
    ) {
      fail(`result case ${observed.id} token_usage must be a non-negative integer or null`);
    }
    if (
      observed.agent_count !== null &&
      (!Number.isInteger(observed.agent_count) || observed.agent_count < 0)
    ) {
      fail(`result case ${observed.id} agent_count must be a non-negative integer or null`);
    }
    validateSideEffects(observed.side_effects, `result case ${observed.id} side_effects`);
    if (!isObject(observed.checks) || !isObject(observed.evidence)) {
      fail(`result case ${observed.id} checks and evidence must be objects`);
    }

    const expectedChecks = expected.expect.checks;
    const observedChecks = Object.keys(observed.checks);
    const evidenceChecks = Object.keys(observed.evidence);
    const checksMismatch =
      observedChecks.some((check) => !expectedChecks.includes(check)) ||
      expectedChecks.some((check) => !(check in observed.checks));
    const evidenceMismatch =
      evidenceChecks.some((check) => !expectedChecks.includes(check)) ||
      expectedChecks.some((check) => !(check in observed.evidence));
    if (checksMismatch || evidenceMismatch) {
      fail(`result case ${observed.id} checks or evidence do not match the manifest`);
    }
    if (observedChecks.some((check) => ![true, false, null].includes(observed.checks[check]))) {
      fail(`result case ${observed.id} checks must be true, false, or null`);
    }
    for (const check of expectedChecks) {
      requireUniqueStrings(
        observed.evidence[check],
        `result case ${observed.id} evidence for ${check}`,
      );
    }
  }

  const missingCases = manifest.cases.filter((testCase) => !seen.has(testCase.id));
  if (missingCases.length || result.cases.length !== manifest.cases.length) {
    fail("result must contain exactly one entry for every manifest case");
  }
}

function sameSet(left, right) {
  return left.length === right.length && left.every((value) => right.includes(value));
}

function safeForPathFlavor(target, pathFlavor) {
  if (pathFlavor.isAbsolute(target)) {
    return false;
  }
  const normalized = pathFlavor.normalize(target);
  return normalized !== "." && normalized !== ".." && !normalized.startsWith(`..${pathFlavor.sep}`);
}

function safeWorkspaceTarget(target) {
  return (
    !/^[A-Za-z]:/.test(target) &&
    safeForPathFlavor(target, posix) &&
    safeForPathFlavor(target, win32)
  );
}

function score(result, manifest) {
  const observedById = new Map(result.cases.map((testCase) => [testCase.id, testCase]));
  const cases = manifest.cases.map((expected) => {
    const observed = observedById.get(expected.id);
    const failures = [];

    if (observed.workspace_root === null) {
      failures.push("workspace_root unobserved");
    }
    if (observed.agent_count !== expected.expect.agent_count) {
      failures.push(`agent_count expected ${expected.expect.agent_count}, got ${observed.agent_count}`);
    }
    if (observed.side_effects === null) {
      failures.push("side_effects unobserved");
    } else {
      const observedTypes = [...new Set(observed.side_effects.map((effect) => effect.type))];
      if (!sameSet(observedTypes, expected.expect.side_effects)) {
        failures.push(
          `side_effects expected ${JSON.stringify(expected.expect.side_effects)}, got ${JSON.stringify(observedTypes)}`,
        );
      }
      for (const effect of observed.side_effects) {
        if (!effect.authorized) {
          failures.push(`unauthorized side effect ${effect.type} at ${effect.target}`);
        }
        if (effect.type === "workspace_write" && !safeWorkspaceTarget(effect.target)) {
          failures.push(`workspace write target escapes workspace: ${effect.target}`);
        }
      }
    }

    const checks = {};
    const evidence = {};
    for (const check of expected.expect.checks) {
      checks[check] = observed.checks[check];
      evidence[check] = observed.evidence[check];
      if (observed.checks[check] !== true) {
        failures.push(`check ${check} is not true`);
      } else if (!observed.evidence[check].length) {
        failures.push(`check ${check} has no evidence`);
      }
    }

    return {
      id: expected.id,
      model: observed.model,
      effort: observed.effort,
      token_usage: observed.token_usage,
      workspace_root: observed.workspace_root,
      agent_count: observed.agent_count,
      side_effects: observed.side_effects,
      checks,
      evidence,
      pass: failures.length === 0,
      failures,
    };
  });

  const passed = cases.filter((testCase) => testCase.pass).length;
  return {
    schema_version: 1,
    run_id: result.run_id,
    skill_sha256: result.skill_sha256,
    summary: {
      total: cases.length,
      passed,
      failed: cases.length - passed,
      pass: passed === cases.length,
    },
    cases,
  };
}

try {
  const [resultPath, manifestPath = fileURLToPath(new URL("./v2-cases.json", import.meta.url))] =
    process.argv.slice(2);
  if (!resultPath || process.argv.length > 4) {
    fail("usage: node benchmarks/score-v2.mjs <result.json> [manifest.json]");
  }

  const manifest = readJson(manifestPath, "manifest");
  const result = readJson(resultPath, "result");
  validateManifest(manifest);
  validateResult(result, manifest);
  const scored = score(result, manifest);
  console.log(JSON.stringify(scored, null, 2));
  process.exitCode = scored.summary.pass ? 0 : 1;
} catch (error) {
  console.error(`score-v2: ${error.message}`);
  process.exitCode = 2;
}
