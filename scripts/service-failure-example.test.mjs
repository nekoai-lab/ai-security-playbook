import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent, coverageKeys } from "./check-content.mjs";
const article = readFileSync(
  "src/content/lessons/external-service-failures.mdx",
  "utf8",
);
const source = article.match(/```js\n([\s\S]*?)```/)[1];
function run(extra = "") {
  const lines = [];
  const c = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source + "\n" + extra, c, { timeout: 1000 });
  return { lines, message: c.message };
}
test("published fixture distinguishes data, empty, timeout, access, unavailable, format and throttling", () => {
  assert.deepEqual(run().lines, [
    "正常: 案内 1件",
    "空の結果: 掲載はありません",
    "時間切れ: 取得できませんでした",
    "アクセス: この情報を表示できません",
    "一時停止: 一時的に取得できません",
    "形式不正: 情報を読み取れませんでした",
    "利用制限: 時間をおいて確認してください",
  ]);
});
test("failure paths never become an empty result; unknown status and malformed payloads are rejected", () => {
  const { message } = run();
  for (const status of [401, 403, 404, 429, 500, 503])
    assert.notEqual(
      message({ kind: "response", status, items: [] }),
      "掲載はありません",
    );
  for (const kind of ["network", "timeout", "invalid"])
    assert.notEqual(message({ kind }), "掲載はありません");
  for (const items of [undefined, null, {}, ["wrong"], [{ title: 3 }], [null]])
    assert.equal(
      message({ kind: "response", status: 200, items }),
      "情報を読み取れませんでした",
    );
  for (const status of [undefined, NaN, "200", 0, 600])
    assert.equal(
      message({ kind: "response", status, items: [] }),
      "情報を読み取れませんでした",
    );
  assert.equal(
    message({
      kind: "response",
      status: 200,
      items: [{ title: "架空の案内" }],
    }),
    "案内 1件",
  );
});
test("the new lesson retains nine coverage points and rejects missing diagrams, code and output", () => {
  assert.deepEqual(
    validateContent("external-service-failures", article).errors,
    [],
  );
  for (const key of coverageKeys)
    assert(
      validateContent(
        "future",
        article.replace(new RegExp(`^  ${key}: .+\\n`, "m"), ""),
      ).errors.length,
      key,
    );
  for (const bad of [
    article.replace(/<ServiceFailureVisual\b[^>]*\/>/g, ""),
    article.replace(/```js\n[\s\S]*?```/g, ""),
    article.replace(/```text\n[\s\S]*?```/g, ""),
  ])
    assert(validateContent("future", bad).errors.length);
});
