import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("theme cards show eight complete approved worlds without pose-only placeholders", () => {
  const html = readFileSync("dist/index.html", "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]*data-discovery-topic[\s\S]*?<\/article>/g),
  ].map((m) => m[0]);
  assert.equal(cards.length, 8);
  const arts = cards.map((c) => /data-card-art="([^"]+)"/.exec(c)?.[1]);
  assert.equal(new Set(arts).size, 8);
  assert.equal(cards.filter((c) => c.includes("data-cat-pose=")).length, 0);
  assert(!html.includes("topic-visual-cues"));
  for (const id of [
    "app-workshop",
    "keys-and-records",
    "agent-field-tools",
    "maintenance-lookout",
  ])
    assert(arts.includes(id), id);
  const source = readFileSync("src/components/TopicCards.astro", "utf8");
  assert(source.includes("repeat(3, minmax(0, 1fr))"));
  assert(!source.includes("object-fit:"));
  assert(source.includes("image-card"));
  assert(!source.includes("position: absolute"));
  for (const card of cards) {
    assert(!card.includes("data-topic-action"));
    assert.equal((card.match(/data-topic-destination/g) || []).length, 1);
    assert.equal((card.match(/data-card-media/g) || []).length, 1);
  }
});

test("all library illustrations come from approved deliveries, with full scenes and real links", () => {
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
  const scenes = new Set();
  const imageFiles = new Set();
  const imageHashes = new Set();
  for (const card of cards) {
    assert.equal((card.match(/data-card-art=/g) || []).length, 1);
    const src = /<img[^>]*src="([^"]+)"/.exec(card)?.[1];
    assert(src);
    const file = "public/" + src.replace("/ai-security-playbook/", "");
    assert(approved.has(file), file);
    assert(readFileSync(file).length > 0);
    imageFiles.add(file);
    imageHashes.add(
      createHash("sha256").update(readFileSync(file)).digest("hex"),
    );
    assert(!card.includes("data-cat-pose="));
    scenes.add(/data-card-art="([^"]+)"/.exec(card)?.[1]);
    assert(/href="\/ai-security-playbook\/learn\/[^"#]+\//.test(card));
  }
  assert.equal(scenes.size, records.size);
  assert.equal(
    imageFiles.size,
    records.size,
    "each lesson needs its own illustration",
  );
  assert.equal(
    imageHashes.size,
    records.size,
    "renaming a duplicate image does not make a unique lesson illustration",
  );
});

test("scene entry cards have one meaningful destination and stages remain on destination hubs", () => {
  const html = readFileSync("dist/paths/index.html", "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]*data-reader-entry[\s\S]*?<\/article>/g),
  ].map((m) => m[0]);
  assert.equal(cards.length, 3);
  assert.equal(
    new Set(cards.map((c) => /data-card-art="([^"]+)"/.exec(c)?.[1])).size,
    3,
  );
  cards.forEach((c) => assert.equal((c.match(/<a /g) || []).length, 1));
  assert(!html.includes("入門・実践・発展から選ぶ"));
  for (const j of readerJourneys) {
    const hub = readFileSync(`dist/start/${j.id}/index.html`, "utf8");
    for (const i of [1, 2, 3]) assert(hub.includes(`href="#stage-${i}"`));
  }
});

test("all built pages use one shared header/footer and reader hubs keep the route navigation active", () => {
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  for (const route of map.pages) {
    const html = readFileSync(`dist/${route}index.html`, "utf8");
    assert.equal(
      (html.match(/<header class="header"/g) || []).length,
      1,
      route,
    );
    assert.equal((html.match(/<footer[ >]/g) || []).length, 1, route);
    const header = /<header class="header"[\s\S]*?<\/header>/.exec(html)[0];
    assert.equal((header.match(/<nav /g) || []).length, 1, route);
    assert(!header.includes("github.com"), route);
    const selected = [
      ...header.matchAll(/<a[^>]*aria-current="page"[^>]*>([\s\S]*?)<\/a>/g),
    ].map((m) => m[1].trim());
    const expected = /^(paths|start)\//.test(route)
      ? ["学習ルート"]
      : /^(library|topics|series|learn)\//.test(route)
        ? ["教材を探す"]
        : route.startsWith("updates/")
          ? ["新着・更新"]
          : [];
    assert.deepEqual(selected, expected, route);
  }
});

test("new world illustrations retain approved originals and responsive deliveries", async () => {
  const { default: sharp } = await import("sharp");
  const { createHash } = await import("node:crypto");
  const catalog = JSON.parse(
    readFileSync("design/assets/illustration-library/catalog.json", "utf8"),
  );
  for (const id of [
    "app-workshop",
    "keys-and-records",
    "agent-field-tools",
    "maintenance-lookout",
  ]) {
    const entry = catalog.assets.find((a) => a.id === id);
    assert(entry, id);
    assert.equal(entry.status, "approved-scene");
    assert.equal(entry.approvedAt, "2026-10-25");
    const original = readFileSync(entry.source);
    assert.equal(
      createHash("sha256").update(original).digest("hex"),
      entry.sha256,
    );
    for (const width of [480, 960]) {
      const meta = await sharp(`public/images/${id}-${width}.webp`).metadata();
      assert.equal(meta.width, width);
      assert.equal(meta.height, (width * 2) / 3);
      assert.equal(meta.format, "webp");
    }
  }
});

test("every image-bearing card uses the shared edge-to-edge media frame", async () => {
  const { default: sharp } = await import("sharp");
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  const files = new Set();
  for (const route of map.pages) {
    const html = readFileSync(`dist/${route}index.html`, "utf8");
    for (const card of html.matchAll(
      /<(?:article|a)[^>]*class="[^"]*image-card[^"]*"[\s\S]*?<\/(?:article|a)>/g,
    )) {
      assert.equal((card[0].match(/data-card-media/g) || []).length, 1, route);
      assert(!card[0].includes("data-cat-pose="), route);
      const src = /<img[^>]*src="([^"]+)"/.exec(card[0])?.[1];
      assert(src, route);
      files.add("public/" + src.replace("/ai-security-playbook/", ""));
    }
  }
  assert(files.size >= 12);
  for (const file of files) {
    const meta = await sharp(file).metadata();
    assert(meta.width >= 480 && meta.height > 0, file);
  }
  const media = readFileSync("src/components/CardArt.astro", "utf8");
  assert(media.includes("aspect-ratio: 1280 / 670"));
  assert(media.includes("object-fit: cover"));
});

test("card illustration attributes match the registered delivery dimensions", async () => {
  const { default: sharp } = await import("sharp");
  const html = readFileSync("dist/library/index.html", "utf8");
  for (const match of html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)) {
    const src = match[1];
    if (!src.includes("/images/")) continue;
    const target =
      "public/" +
      src
        .replace("/ai-security-playbook/", "")
        .replace("-480.webp", "-960.webp");
    const meta = await sharp(target).metadata();
    assert.equal(
      Number(/width="(\d+)"/.exec(match[0])?.[1]),
      meta.width,
      target,
    );
    assert.equal(
      Number(/height="(\d+)"/.exec(match[0])?.[1]),
      meta.height,
      target,
    );
  }
});

test("individual article links carry a decorative paw without marking theme navigation", () => {
  const html = readFileSync("dist/index.html", "utf8");
  for (const card of html.matchAll(
    /<article[^>]*data-discovery-topic[\s\S]*?<\/article>/g,
  )) {
    const destination = /<a[^>]*data-topic-destination[\s\S]*?<\/a>/.exec(
      card[0],
    )[0];
    assert(!destination.includes("data-article-label"));
    for (const example of card[0].matchAll(
      /<li[^>]*data-topic-example[\s\S]*?<\/li>/g,
    )) {
      assert(example[0].includes("data-article-label"));
      assert(example[0].includes("/brand/paw-orange-64.webp"));
    }
  }
  const label = readFileSync("src/components/ArticleLabel.astro", "utf8");
  assert(label.includes('alt=""'));
  assert(label.includes('aria-hidden="true"'));
  for (const route of ["library/", "topics/development/", "learn/api-keys/"])
    assert(
      readFileSync(`dist/${route}index.html`, "utf8").includes(
        "data-article-label",
      ),
      route,
    );
});

test("creator links and content terms are shared across every published page", () => {
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  assert(map.pages.includes("terms/"));
  const links = ["https://note.com/nekoai_lab", "https://zenn.dev/nekoai_lab", "https://x.com/nekoai_lab", "https://marcrevix.com/contact/"];
  for (const route of map.pages) {
    const html = readFileSync(`dist/${route}index.html`, "utf8");
    const footer = /<footer[ >][\s\S]*?<\/footer>/.exec(html)?.[0];
    assert(footer, route);
    for (const url of links) assert(footer.includes(`href="${url}"`), `${route}: ${url}`);
    assert(footer.includes('href="/ai-security-playbook/terms/"'), route);
    assert(!footer.includes('>MIT License<'), route);
    if (route.startsWith("learn/")) {
      assert(html.includes('rel="author"'), route);
      assert(html.includes("data-creator-profile"), route);
      assert(html.includes(`href="https://nekoai-lab.github.io/ai-security-playbook/${route}"`), route);
      assert(html.includes('name="author" content="月ねこ｜Tsukineko"'), route);
    }
  }
});

test("MIT text is retained while editorial scope, third-party terms and prior grants stay explicit", () => {
  const mit = readFileSync("LICENSE", "utf8");
  assert(mit.startsWith("MIT License\n\nCopyright (c) 2026 Tsukineko\n"));
  assert(mit.includes("Permission is hereby granted, free of charge"));
  assert(mit.includes("THE SOFTWARE IS PROVIDED \"AS IS\""));
  assert(mit.includes("LICENSE-CONTENT.md"));
  const rights = readFileSync("LICENSE-CONTENT.md", "utf8");
  for (const required of ["法令で認められる引用", "第三者", "オリジナルのサンプルコード", "遡って取り消すものではありません", "旧版の許諾", "著作物性や独占権が一律", "529f7b7ed8f5440db21a2b05f1d3dbbf5b1dba25"]) assert(rights.includes(required), required);
  const terms = readFileSync("dist/terms/index.html", "utf8");
  assert(terms.includes("旧版の許諾"));
  assert(terms.includes("https://marcrevix.com/contact/"));
});

import { runInNewContext } from "node:vm";

test("every public page contains one GA4 initializer, without standalone duplicate tags", () => {
  const map = JSON.parse(readFileSync("design/review-map.json", "utf8"));
  assert(map.pages.includes("privacy/"));
  for (const route of map.pages) {
    const html = readFileSync(`dist/${route}index.html`, "utf8");
    assert.equal((html.match(/<script\b[^>]*data-ga4\b/g) || []).length, 1, route);
    assert(html.includes('href="/ai-security-playbook/privacy/"'), route);
    assert(!/<script[^>]+src="https:\/\/www.googletagmanager.com/.test(html), route);
  }
});

test("GA4 runs only on the production origin and base and respects the standard opt-out flag", () => {
  const html = readFileSync("dist/index.html", "utf8");
  const code = /<script\b[^>]*data-ga4\b[^>]*>([\s\S]*?)<\/script>/.exec(html)?.[1];
  assert(code);
  const evaluate = (origin, pathname, disabled = false) => {
    const appended = [];
    const listeners = {};
    const window = { "ga-disable-G-Q83DQP6PS5": disabled };
    runInNewContext(code, { window, location: { origin, pathname }, Date, document: { addEventListener: (name, fn) => { listeners[name] = fn; }, createElement: () => ({ dataset: {} }), head: { appendChild: (e) => appended.push(e) } } });
    return { appended, calls: (window.dataLayer || []).map((a) => Array.from(a)), search: (query) => { listeners["playbook-search"]?.({ detail: { query } }); return (window.dataLayer || []).map((a) => Array.from(a)); } };
  };
  const prod = evaluate("https://nekoai-lab.github.io", "/ai-security-playbook/");
  assert.equal(prod.appended.length, 1);
  assert.equal(prod.appended[0].src, "https://www.googletagmanager.com/gtag/js?id=G-Q83DQP6PS5");
  assert.equal(prod.appended[0].async, true);
  assert.equal(prod.calls.length, 2);
  assert.equal(prod.calls[1][0], "config");
  assert.equal(prod.calls[1][1], "G-Q83DQP6PS5");
  assert.equal(prod.calls[1][2].allow_google_signals, false);
  assert.equal(prod.calls[1][2].allow_ad_personalization_signals, false);
  assert(!("send_page_view" in prod.calls[1][2]));
  assert.equal(prod.search("   ").length, 2);
  assert.equal(prod.search(null).length, 2);
  const searched = prod.search(" MCP ");
  assert.equal(searched.length, 3);
  assert.equal(searched[2][0], "event");
  assert.equal(searched[2][1], "search");
  assert.equal(searched[2][2].search_term, "MCP");
  assert.equal(prod.search("a".repeat(250))[3][2].search_term.length, 200);
  for (const sample of [["http://localhost:4321", "/ai-security-playbook/"], ["https://preview.example", "/ai-security-playbook/"], ["https://nekoai-lab.github.io", "/other/"], ["https://nekoai-lab.github.io", "/ai-security-playbook-other/"], ["https://nekoai-lab.github.io", "/ai-security-playbook/", true]]) {
    const result = evaluate(...sample);
    assert.equal(result.appended.length, 0, sample.join(" "));
    assert.equal(result.calls.length, 0);
  }
});
