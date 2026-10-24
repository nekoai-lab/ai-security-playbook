import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateContent, coverageKeys } from "./check-content.mjs";
const v1 = readFileSync("src/content/lessons/access-control.mdx", "utf8");
const v2 = readFileSync("src/content/lessons/api-keys.mdx", "utf8");
test("v1 still requires roles, classified evidence and concrete checklist", () => {
  assert.deepEqual(validateContent("future", v1).errors, []);
  for (const bad of [
    v1.replace("## 誰が何を確認するか", "## その他"),
    v1.replace("**分類：脆弱性の公表。**", ""),
    v1.replace("qualityVersion: 1", ""),
    v1.replace(/^- \*\*.+?：\*\*.*$/gm, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
test("narrative v2 keeps all nine requirements and rejects missing or stale section mappings", () => {
  assert.deepEqual(validateContent("future", v2).errors, []);
  for (const key of coverageKeys) {
    const missing = v2.replace(new RegExp(`^  ${key}: .+\\n`, "m"), "");
    assert(validateContent("future", missing).errors.length, key);
    const stale = v2.replace(
      new RegExp(`^  ${key}: .+$`, "m"),
      `  ${key}: "存在しない節"`,
    );
    assert(validateContent("future", stale).errors.length, key);
  }
});
test("narrative v2 rejects omitted diagram, code, result, case evidence and checks", () => {
  for (const [label, bad] of [
    ["version", v2.replace("qualityVersion: 2", "")],
    ["diagram", v2.replace(/<ArticleVisual[^>]+\/>/g, "")],
    ["code", v2.replace(/```(?:js|javascript)[\s\S]*?```/g, "")],
    ["result", v2.replace(/```text[\s\S]*?```/g, "")],
    ["classification", v2.replace("**分類：事故の公表。**", "")],
    ["checklist", v2.replace(/^- \*\*.+?：\*\*.*$/gm, "")],
    ["roles", v2.replace(/^### [123]\. .+$/gm, "")],
  ])
    assert(validateContent("future", bad).errors.length, label);
});
test("only named pre-policy lessons are separate; migrated content still validates", () => {
  assert.equal(validateContent("basics", "").status, "legacy-review");
  assert.equal(
    validateContent("basics", v1).status,
    "structured-review-required",
  );
  assert.equal(
    validateContent("basics", v2).status,
    "structured-review-required",
  );
  assert.equal(validateContent("future", "").status, "failed");
});
