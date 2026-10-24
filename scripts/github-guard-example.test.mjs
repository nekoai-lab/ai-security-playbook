import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent, coverageKeys } from "./check-content.mjs";
const article = readFileSync("src/content/lessons/github-guards.mdx", "utf8");
const source = article.match(/```js\n([\s\S]*?)```/)[1];
function run() {
  const lines = [];
  const c = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source, c, { timeout: 1000 });
  return { lines, evidence: c.evidence };
}
test("published check records separate old success, current success and a missing test", () => {
  assert.deepEqual(run().lines, [
    "古い成功: 必要な記録が足りない",
    "今の成功: この差分の検査記録がそろった",
    "testがない: 必要な記録が足りない",
  ]);
});
test("absent policy, stale records and non-success states do not satisfy the exercise", () => {
  const { evidence } = run();
  const required = ["build", "test"];
  const rows = required.map((name) => ({
    name,
    commit: "B",
    state: "success",
  }));
  assert.equal(evidence("B", [], rows), "検査条件が未確認");
  assert.equal(evidence("", required, rows), "検査条件が未確認");
  assert.equal(evidence("A", required, rows), "必要な記録が足りない");
  assert.equal(evidence("B", required, []), "必要な記録が足りない");
  for (const state of ["pending", "failure", "skipped", undefined])
    assert.equal(
      evidence("B", required, [rows[0], { ...rows[1], state }]),
      "検査は未完了",
    );
});
test("GitHub guard lesson preserves all coverage and requires mechanism figure, code and result", () => {
  assert.deepEqual(validateContent("github-guards", article).errors, []);
  for (const key of coverageKeys)
    assert(
      validateContent(
        "future",
        article.replace(new RegExp(`^  ${key}: .+\\n`, "m"), ""),
      ).errors.length,
      key,
    );
  for (const bad of [
    article.replace(/<GuardVisual\b[^>]*\/>/g, ""),
    article.replace(/```js\n[\s\S]*?```/g, ""),
    article.replace(/```text\n[\s\S]*?```/g, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
