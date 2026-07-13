import assert from "node:assert/strict";
import test from "node:test";

import { render } from "../src/cli.mjs";

test("renders text", () => {
  assert.equal(render([{ name: "alpha", count: 2 }]), "alpha: 2");
});
