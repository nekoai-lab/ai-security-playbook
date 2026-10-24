import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent } from "./check-content.mjs";
const read = (id) => readFileSync(`src/content/lessons/${id}.mdx`, "utf8");
const code = (id) => read(id).match(/```js\n([\s\S]*?)```/)[1];
function run(source) {
  const lines = [];
  const context = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source, context, { timeout: 1000 });
  return { lines, context };
}
test("log example selects fields without exposing the dummy token", () => {
  const { lines } = run(code("ai-work-logs"));
  assert.deepEqual(lines, [
    "全文ログにダミー値が残る: true",
    '項目を選んだ記録: {"operation":"summarize","characters":5}',
  ]);
  assert(!lines.join("\n").includes("DEMO_TOKEN_DO_NOT_USE"));
});
test("release example selects only the intended payload and fails on a missing required file", () => {
  const src = code("release-artifacts");
  assert.deepEqual(run(src).lines, [
    "作業用: 4 公開用: 2",
    "guide.txt\nsample.csv",
  ]);
  assert.throws(
    () =>
      run(
        src.replace(
          "const release =",
          'workspace.delete("guide.txt");\nconst release =',
        ),
      ),
    /公開用ファイルが足りません/,
  );
});
test("new narrative lessons require explanatory figures in the mechanism section", () => {
  for (const id of ["ai-work-logs", "release-artifacts"]) {
    const s = read(id);
    assert.deepEqual(validateContent(id, s).errors, []);
    assert(
      validateContent(
        id,
        s.replace(/<PracticeVisual\b[^>]*\/>/g, ""),
      ).errors.some((e) => e.includes("explanatory figure")),
    );
  }
});
