import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateContent } from "./check-content.mjs";
const good = readFileSync("src/content/lessons/api-keys.mdx", "utf8");
test("a new lesson cannot omit roles, evidence checks or case classification", () => {
  assert.deepEqual(validateContent("future", good).errors, []);
  for (const bad of [
    good.replace("## 誰が何を確認するか", "## その他"),
    good.replace("**分類：事故の公表。**", ""),
    good.replace("qualityVersion: 1", ""),
    good.replace(/^- \*\*.+?：\*\*.*$/gm, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
test("only the named migration baseline is reported separately", () => {
  assert.equal(validateContent("basics", "").status, "legacy-review");
  assert.equal(
    validateContent("basics", good).status,
    "structured-review-required",
  );
  assert.equal(validateContent("future", "").status, "failed");
});
