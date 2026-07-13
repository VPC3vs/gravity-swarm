import assert from "node:assert/strict";
import test from "node:test";

import { render } from "../src/cli.mjs";

test("JSON export is not implemented yet", () => {
  assert.throws(() => render([{ name: "alpha", count: 2 }], "json"), /Unsupported format: json/);
});
