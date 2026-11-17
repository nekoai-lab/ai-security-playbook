import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent, coverageKeys } from "./check-content.mjs";
const article = readFileSync("src/content/lessons/ai-review-trust.mdx", "utf8");
const source = article.match(/```js\n([\s\S]*?)```/)[1];
const shown = article.match(/```text\n([\s\S]*?)```/)[1].trimEnd().split("\n");
function run() {
  const lines = [];
  const c = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source, c, { timeout: 1000 });
  // vm内の配列を、この環境の配列へ写して比べる
  return { lines, tally: (...args) => [...c.tally(...args)] };
}
test("published review tally matches the shown result", () => {
  assert.deepEqual(run().lines, shown);
  assert.deepEqual(shown.slice(-2), [
    "結論: 回によって割れた",
    "一度も見なかった観点: 状態、クライアントの値",
  ]);
});
test("a single run or an empty viewpoint list is not treated as a comparison", () => {
  const { tally } = run();
  const one = [{ verdict: "pass", found: [] }];
  assert.deepEqual(tally(["持ち主"], one), ["比べる記録が足りない"]);
  assert.deepEqual(tally([], [...one, ...one]), ["比べる記録が足りない"]);
});
test("unanimous passes still report viewpoints that no run looked at", () => {
  const { tally } = run();
  const runs = [
    { verdict: "pass", found: ["持ち主"] },
    { verdict: "pass", found: [] },
  ];
  assert.deepEqual(tally(["持ち主", "状態"], runs), [
    "持ち主: 1/2",
    "状態: 0/2",
    "結論: 2回ともpass",
    "一度も見なかった観点: 状態",
  ]);
  const all = [
    { verdict: "fail", found: ["持ち主"] },
    { verdict: "fail", found: ["持ち主"] },
  ];
  assert.equal(tally(["持ち主"], all).at(-1), "一度も見なかった観点: なし");
});
test("AI review lesson keeps all coverage and rejects missing figure, code or result", () => {
  assert.deepEqual(validateContent("ai-review-trust", article).errors, []);
  for (const key of coverageKeys)
    assert(
      validateContent(
        "future",
        article.replace(new RegExp(`^  ${key}: .+\\n`, "m"), ""),
      ).errors.length,
      key,
    );
  for (const bad of [
    article.replace(/<ReviewVisual\b[^>]*\/>/g, ""),
    article.replace(/```js\n[\s\S]*?```/g, ""),
    article.replace(/```text\n[\s\S]*?```/g, ""),
    article.replace("**分類：再現実験。**", ""),
    article.replace(/^### .+$/gm, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
