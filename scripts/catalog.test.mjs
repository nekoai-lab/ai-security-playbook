import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import {
  topics,
  topicIds,
  levels,
  formats,
  series,
  matchesSearch,
} from "../src/data/catalog.ts";
import { learningPaths } from "../src/data/learning-paths.ts";
const records = readdirSync("src/content/lessons")
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => {
    const text = readFileSync(`src/content/lessons/${file}`, "utf8").split(
      "---",
    )[1];
    const field = (name) =>
      new RegExp(`^${name}: "([^"]+)"$`, "m").exec(text)?.[1];
    return { id: file.slice(0, -4), field, text };
  });
test("taxonomy, prerequisite and format stay separate; all references resolve", () => {
  assert.deepEqual(
    topics.map((t) => t.id),
    [...topicIds],
  );
  for (const r of records) {
    assert(topicIds.includes(r.field("topic")));
    assert(levels.includes(r.field("level")));
    assert(formats.includes(r.field("format")));
    assert(!r.text.includes("order:"));
  }
  for (const group of [...series, ...learningPaths]) {
    assert(group.ids.length);
    assert.equal(new Set(group.ids).size, group.ids.length);
    for (const id of group.ids)
      assert(
        records.some((r) => r.id === id),
        `${group.id}: ${id}`,
      );
  }
  for (const path of learningPaths) {
    const total = path.ids.reduce(
      (sum, id) =>
        sum +
        Number(
          /^minutes: (\d+)$/m.exec(records.find((r) => r.id === id).text)[1],
        ),
      0,
    );
    assert.equal(path.time, `約${total}分`);
  }
});
test("publication, content update, evidence review and changes have valid independent dates", () => {
  for (const r of records) {
    for (const key of ["published", "updated", "reviewed"]) {
      const d = r.field(key);
      assert.equal(new Date(d).toISOString().slice(0, 10), d);
      assert(d >= r.field("published"));
    }
    for (const m of r.text.matchAll(/  - date: "([^"]+)"/g))
      assert(m[1] >= r.field("published") && m[1] <= r.field("updated"));
  }
  const command = records.find((r) => r.id === "commands");
  assert.notEqual(command.field("updated"), command.field("reviewed"));
});
test("search normalizes fullwidth and case, combines terms and treats punctuation literally", () => {
  assert(matchesSearch("Node.js MCP 実行環境 更新", "ＮＯＤＥ.ＪＳ mcp"));
  assert(matchesSearch("Node.js MCP 実行環境 更新", "MCP　更新"));
  assert(!matchesSearch("Node.js MCP", "MCP クラウド"));
  assert(matchesSearch("Node.js MCP", "   "));
  assert(!matchesSearch("Node.js MCP", "<script>"));
});

test("prerequisites and related lesson IDs resolve and prerequisites have no cycles", () => {
  const links = new Map(
    records.map((r) => [
      r.id,
      JSON.parse(/^prerequisites: (.+)$/m.exec(r.text)?.[1] ?? "[]"),
    ]),
  );
  for (const r of records)
    for (const key of ["prerequisites", "related"]) {
      const ids = JSON.parse(
        new RegExp(`^${key}: (.+)$`, "m").exec(r.text)?.[1] ?? "[]",
      );
      for (const id of ids)
        assert(
          id !== r.id && records.some((item) => item.id === id),
          `${r.id}: ${id}`,
        );
    }
  const visit = (id, seen = new Set()) => {
    assert(!seen.has(id), `Prerequisite cycle: ${id}`);
    for (const next of links.get(id) ?? []) visit(next, new Set([...seen, id]));
  };
  for (const id of links.keys()) visit(id);
});
