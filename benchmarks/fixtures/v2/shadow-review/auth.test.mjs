import assert from "node:assert/strict";
import test from "node:test";

import { runProtected } from "./auth.mjs";

test("runs a protected handler for an active session", () => {
  assert.equal(runProtected({ revoked: false }, () => "ok"), "ok");
});

test("rejects a missing session", () => {
  assert.throws(() => runProtected(null, () => "no"), /Authentication required/);
});
