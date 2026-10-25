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
          topic: /^topic: "([^"]+)"$/m.exec(header)?.[1],
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
  assert.equal((home.match(/data-reader-entry=/g) || []).length, 0);
  assert.equal((home.match(/data-discovery-topic=/g) || []).length, 8);
  assert.equal((home.match(/data-home-default="true"/g) || []).length, 3);
  assert.equal((home.match(/data-home-update/g) || []).length, 5);
  assert(home.includes("data-inline-discovery"));
  assert(
    home
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, "")
      .includes("AIと社会のこれからを、ともに探究する。"),
  );
  assert.equal((home.match(/data-featured-lesson=/g) || []).length, 9);
  assert(!home.includes("home-reading-title"));
  assert(!home.includes('href="/ai-security-playbook/design-system/"'));
});

test("every theme lists all of its real lessons before the deeper questions", () => {
  const linked = new Set();
  for (const topic of new Set([...records.values()].map((r) => r.topic))) {
    const html = readFileSync(`dist/topics/${topic}/index.html`, "utf8");
    const actual = [
      ...html.matchAll(/data-discovery-lesson[^>]*data-id="([^"]+)"/g),
    ].map((m) => m[1]);
    const expected = [...records]
      .filter(([, r]) => r.topic === topic)
      .map(([id]) => id);
    assert.deepEqual([...actual].sort(), expected.sort(), topic);
    assert.equal(new Set(actual).size, actual.length, topic);
    assert(
      html.indexOf('id="topic-articles"') <
        html.indexOf('id="topic-questions"'),
      topic,
    );
    actual.forEach((id) => linked.add(id));
  }
  assert.deepEqual([...linked].sort(), [...records.keys()].sort());
});

test("library provides one illustration per lesson without duplicating search records or a publisher signature", () => {
  const html = readFileSync("dist/library/index.html", "utf8");
  assert.equal((html.match(/data-catalog-item/g) || []).length, records.size);
  assert.equal((html.match(/data-card-art=/g) || []).length, records.size);
  assert.equal(
    (html.match(/<article[^>]*catalog-card--poster/g) || []).length,
    records.size,
  );
  const cards = [
    ...html.matchAll(/<article[^>]*data-catalog-item[\s\S]*?<\/article>/g),
  ];
  assert.equal(cards.length, records.size);
  for (const [card] of cards) assert(!card.includes("Tsukineko"));
  assert(html.includes("data-site-publisher"));
});

test("the publisher is identified in the shared footer, not repeated in topic cards", () => {
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  for (const route of map.pages) {
    const html = readFileSync(`dist/${route}index.html`, "utf8");
    assert.equal((html.match(/data-site-publisher/g) || []).length, 1, route);
    assert(/data-site-publisher[^>]*>制作・運営：Tsukineko/.test(html), route);
  }
  const html = readFileSync("dist/index.html", "utf8");
  for (const [card] of html.matchAll(
    /<article[^>]*data-discovery-topic[\s\S]*?<\/article>/g,
  ))
    assert(!card.includes("Tsukineko"));
});

test("theme compositions mix scenes and approved poses without repeating a single template", () => {
  const html = readFileSync("dist/index.html", "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]*data-discovery-topic[\s\S]*?<\/article>/g),
  ].map((m) => m[0]);
  assert.equal(cards.length, 8);
  const layouts = cards.map((c) => /composition--([a-z-]+)/.exec(c)?.[1]);
  assert(new Set(layouts).size >= 5);
  const arts = cards.map((c) => /data-card-art="([^"]+)"/.exec(c)?.[1]);
  assert.equal(new Set(arts).size, 8);
  assert.equal(cards.filter((c) => c.includes("data-cat-pose=")).length, 5);
  for (const card of cards) {
    assert(!card.includes("data-topic-action"));
    assert.equal((card.match(/data-topic-destination/g) || []).length, 1);
    assert.equal((card.match(/<img /g) || []).length, 1);
  }
});

test("all library illustrations come from approved deliveries, with varied poses and real links", () => {
  const catalog = JSON.parse(
    readFileSync("design/assets/illustration-library/catalog.json", "utf8"),
  );
  const approved = new Set(
    catalog.assets
      .flatMap((a) => [a.preview, ...(a.deliveries ?? []).map((d) => d.path)])
      .filter(Boolean),
  );
  const html = readFileSync("dist/library/index.html", "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]*data-catalog-item[\s\S]*?<\/article>/g),
  ].map((m) => m[0]);
  const poses = new Set();
  for (const card of cards) {
    assert.equal((card.match(/data-card-art=/g) || []).length, 1);
    const src = /<img[^>]*src="([^"]+)"/.exec(card)?.[1];
    assert(src);
    const file = "public/" + src.replace("/ai-security-playbook/", "");
    assert(approved.has(file), file);
    assert(readFileSync(file).length > 0);
    const pose = /data-cat-pose="([^"]+)"/.exec(card)?.[1];
    if (pose) poses.add(pose);
    assert(/href="\/ai-security-playbook\/learn\/[^"#]+\//.test(card));
  }
  assert(poses.size >= 8);
});

test("scene entry cards have one meaningful destination and stages remain on destination hubs", () => {
  const html = readFileSync("dist/paths/index.html", "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]*data-reader-entry[\s\S]*?<\/article>/g),
  ].map((m) => m[0]);
  assert.equal(cards.length, 3);
  assert.equal(
    new Set(cards.map((c) => /data-cat-pose="([^"]+)"/.exec(c)?.[1])).size,
    3,
  );
  cards.forEach((c) => assert.equal((c.match(/<a /g) || []).length, 1));
  assert(!html.includes("入門・実践・発展から選ぶ"));
  for (const j of readerJourneys) {
    const hub = readFileSync(`dist/start/${j.id}/index.html`, "utf8");
    for (const i of [1, 2, 3]) assert(hub.includes(`href="#stage-${i}"`));
  }
});
