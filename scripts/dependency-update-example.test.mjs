import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent, coverageKeys } from "./check-content.mjs";
const article = readFileSync(
  "src/content/lessons/dependency-updates.mdx",
  "utf8",
);
const source = article.match(/```js\n([\s\S]*?)```/)[1];
function run() {
  const lines = [];
  const c = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source, c, { timeout: 1000 });
  return { lines, progress: c.progress };
}
test("published release records keep pending production separate from verified staging", () => {
  assert.deepEqual(run().lines, [
    "本番: 反映待ち",
    "確認環境: 反映を照合済み",
    "別プロジェクト: 検査の確認が必要",
  ]);
});
test("unknown scan, target and running release cannot become delivery confirmation", () => {
  const { progress } = run();
  const good = {
    scan: "ok",
    targetRelease: "B",
    runningRelease: "B",
    prMerged: true,
  };
  assert.equal(progress(good), "反映を照合済み");
  for (const scan of ["failed", "unknown", undefined])
    assert.equal(progress({ ...good, scan }), "検査の確認が必要");
  assert.equal(progress({ ...good, targetRelease: undefined }), "目標が未確認");
  assert.equal(
    progress({ ...good, runningRelease: undefined }),
    "稼働先が未確認",
  );
  assert.equal(progress({ ...good, prMerged: false }), "修正を確認中");
  assert.equal(progress({ ...good, runningRelease: "A" }), "反映待ち");
});
test("dependency lesson keeps nine coverage points and requires diagrams, exercise and result", () => {
  assert.deepEqual(validateContent("dependency-updates", article).errors, []);
  for (const key of coverageKeys)
    assert(
      validateContent(
        "future",
        article.replace(new RegExp(`^  ${key}: .+\\n`, "m"), ""),
      ).errors.length,
      key,
    );
  for (const bad of [
    article.replace(/<UpdateVisual\b[^>]*\/>/g, ""),
    article.replace(/```js\n[\s\S]*?```/g, ""),
    article.replace(/```text\n[\s\S]*?```/g, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
