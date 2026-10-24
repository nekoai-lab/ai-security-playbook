import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { readerJourneys } from "../src/data/reader-journeys.ts";
import { levels, normalizeLevel } from "../src/data/catalog.ts";
const records = new Map(
  readdirSync("src/content/lessons")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const header = readFileSync("src/content/lessons/" + f, "utf8").split(
        "---",
      )[1];
      return [
        f.slice(0, -4),
        {
          level: /^level: "([^"]+)"$/m.exec(header)?.[1],
          note: /^prerequisiteNote: "([^"]+)"$/m.exec(header)?.[1],
        },
      ];
    }),
);
test("three reader journeys cover real lessons, introductory first reads and all three meaningful stages", () => {
  assert.deepEqual(
    readerJourneys.map((j) => j.id),
    ["use-ai", "build-apps", "operate-services"],
  );
  const linked = new Set();
  for (const j of readerJourneys) {
    assert.equal(new Set(j.ids).size, j.ids.length);
    assert(j.ids.includes(j.firstLesson));
    assert.equal(records.get(j.firstLesson).level, "入門");
    for (const id of j.ids) {
      assert(records.has(id), id);
      linked.add(id);
    }
    for (const stage of levels)
      assert(
        j.ids.some((id) => records.get(id).level === stage),
        `${j.id}: ${stage}`,
      );
  }
  assert.deepEqual([...linked].sort(), [...records.keys()].sort());
});
test("every lesson has explicit level and concrete prerequisite rather than a hidden generic label", () => {
  for (const [id, r] of records) {
    assert(levels.includes(r.level), id);
    assert(r.note?.length >= 20, id);
  }
  const article = readFileSync("src/pages/learn/[...id].astro", "utf8");
  assert(
    article.indexOf("data-reading-readiness") <
      article.indexOf('<details class="article-preparation">'),
  );
});
test("previous level query bookmarks retain their meaning", () => {
  assert.equal(normalizeLevel("基本知識が必要"), "実践");
  assert.equal(normalizeLevel("実務経験が必要"), "発展");
  assert.equal(normalizeLevel("入門"), "入門");
  assert.equal(normalizeLevel("実践"), "実践");
});
test("production routes include reader hubs and exclude guide while preview coverage preserves the guide", () => {
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  for (const j of readerJourneys) assert(map.pages.includes(`start/${j.id}/`));
  assert(!map.pages.includes("design-system/"));
  assert.deepEqual(map.guidePreview.pages, ["design-system/"]);
  const home = readFileSync("dist/index.html", "utf8");
  assert.equal((home.match(/data-reader-entry=/g) || []).length, 3);
  assert.equal((home.match(/data-featured-lesson=/g) || []).length, 8);
  assert(!home.includes("home-reading-title"));
  assert(!home.includes('href="/ai-security-playbook/design-system/"'));
});
