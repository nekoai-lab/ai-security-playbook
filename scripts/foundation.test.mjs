import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { validateContent, coverageKeys } from "./check-content.mjs";
import { topicGuides } from "../src/data/topic-guides.ts";
import { topicIds } from "../src/data/catalog.ts";
const ids = [
  "ai-data-boundaries",
  "app-architecture",
  "access-control",
  "incident-response",
];
const read = (id) => readFileSync(`src/content/lessons/${id}.mdx`, "utf8");
const code = (id) => read(id).match(/```js\n([\s\S]*?)```/)[1];
function execute(source, extra = "") {
  const lines = [];
  const context = { console: { log: (...args) => lines.push(args.join(" ")) } };
  vm.runInNewContext(source + "\n" + extra, context, { timeout: 1000 });
  return lines;
}
test("pseudonymizing a name does not remove other fields; the brief selects only needed conditions", () => {
  assert.deepEqual(execute(code(ids[0])), [
    "名前を変えた後も電話項目がある: true",
    '必要な条件だけ: {"task":"日程変更の返信案","tone":"丁寧"}',
  ]);
});
test("the browser response leaves out the internal memo", () => {
  assert.deepEqual(execute(code(ids[1])), [
    '返す内容: {"id":"demo-1","time":"10:00"}',
    "内部メモが含まれる: false",
  ]);
});
test("ownership example returns only the authorized record; another user and no session get no content", () => {
  const src = code(ids[2]);
  assert.equal(
    execute(src, 'console.log(JSON.stringify(readMemo({id:"A"}, null)));').at(
      -1,
    ),
    "null",
  );
  assert.deepEqual(execute(src), [
    'A: {"id":"note-1","text":"架空の旅メモ"}',
    "B: null",
    "未ログイン: null",
  ]);
  assert.equal(
    execute(
      src,
      'console.log(JSON.stringify(readMemo({id:"B"}, {...memo, ownerId:"B"})));',
    ).at(-1),
    '{"id":"note-1","text":"架空の旅メモ"}',
  );
});
test("restore comparison exposes updates absent from the selected backup without mutating inputs", () => {
  assert.deepEqual(
    execute(code(ids[3]), "console.log(backupIds.length, currentIds.length);"),
    ["控えにない予約: demo-3, demo-4", "戻す前に扱いを決める件数: 2", "2 4"],
  );
});
test("four revised narratives retain all coverage and require mechanism figures, code and observed output", () => {
  for (const id of ids) {
    const s = read(id);
    assert.deepEqual(validateContent(id, s).errors, []);
    for (const key of coverageKeys)
      assert(
        validateContent(id, s.replace(new RegExp(`^  ${key}: .+\\n`, "m"), ""))
          .errors.length,
        `${id} ${key}`,
      );
    for (const bad of [
      s.replace(/<FoundationVisual\b[^>]*\/>/g, ""),
      s.replace(/```js\n[\s\S]*?```/g, ""),
      s.replace(/```text\n[\s\S]*?```/g, ""),
    ])
      assert(validateContent(id, bad).errors.length, id);
  }
});
test("every theme has a valid featured lesson, distinct questions and existing in-article targets", () => {
  assert.deepEqual(Object.keys(topicGuides).sort(), [...topicIds].sort());
  for (const [id, g] of Object.entries(topicGuides)) {
    assert.match(read(g.feature), new RegExp(`^topic: "${id}"$`, "m"));
    assert(g.questions.length >= 3);
    assert.equal(
      new Set(g.questions.map((q) => q.title)).size,
      g.questions.length,
    );
    for (const q of g.questions) {
      const s = read(q.lesson);
      if (q.anchor) assert(s.includes(`id="${q.anchor}"`), `${id} ${q.anchor}`);
    }
    for (const neighbor of g.related) {
      assert(topicIds.includes(neighbor));
      assert.notEqual(neighbor, id);
    }
  }
});
