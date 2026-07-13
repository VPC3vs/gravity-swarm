import assert from "node:assert/strict";
import test from "node:test";

import { greeting } from "./greet.mjs";

test("prints the configured greeting", () => {
  assert.equal(greeting, "Hello");
});
