import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { parse } from "yaml";
import config from "../astro.config.mjs";
import { readHead } from "./ogp/validate.mjs";
const root = new URL(config.base.replace(/\/$/, "") + "/", config.site);
async function htmlFiles(dir = "dist", route = "") {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory())
      out.push(...(await htmlFiles(`${dir}/${e.name}`, `${route}${e.name}/`)));
    else if (e.name === "index.html")
      out.push({ route, html: await readFile(`${dir}/${e.name}`, "utf8") });
  }
  return out;
}
const pages = await htmlFiles();
test("every emitted public page has unique metadata and matching structured data", async () => {
  const titles = new Set(),
    descs = new Set();
  for (const { route, html } of pages) {
    const { title, meta } = readHead(html),
      canonical = new URL(route, root).href;
    assert(title.trim());
    assert(meta.get("description")?.trim());
    assert(!titles.has(title), route);
    assert(!descs.has(meta.get("description")), route);
    titles.add(title);
    descs.add(meta.get("description"));
    assert.equal(meta.get("og:url"), canonical);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    const blocks = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ];
    assert.equal(blocks.length, 1, route);
    const data = JSON.parse(blocks[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"],
      node = (t) => graph.find((n) => n["@type"] === t),
      page = node("WebPage"),
      person = node("Person");
    assert.equal(page.url, canonical);
    assert.equal(page.description, meta.get("description"));
    assert.equal(person.name, "月ねこ｜Tsukineko");
    assert.equal(person.sameAs.length, 3);
    assert.equal(node("WebSite").url, root.href);
    const id = /^learn\/([^/]+)\/$/.exec(route)?.[1],
      article = node("Article");
    if (id) {
      const raw = await readFile(`src/content/lessons/${id}.mdx`, "utf8"),
        front = parse(raw.split(/^---\s*$/m)[1]);
      assert.equal(article.headline, front.title);
      assert.equal(article.description, front.summary);
      assert.equal(article.datePublished, front.published);
      assert.equal(article.dateModified, front.updated);
      assert.equal(article.author["@id"], person["@id"]);
      assert.equal(article.image.url, meta.get("og:image"));
      assert.equal(article.image.width, 1200);
      assert.equal(article.image.height, 630);
    } else assert(!article, route);
    const crumbs = node("BreadcrumbList");
    if (crumbs) {
      assert(crumbs.itemListElement.length > 1);
      for (const [i, c] of crumbs.itemListElement.entries()) {
        assert.equal(c.position, i + 1);
        assert(
          html.includes(c.name),
          `${route}: invisible breadcrumb ${c.name}`,
        );
        assert(c.item.startsWith(root.href));
      }
    }
  }
});
test("sitemap contains exactly emitted canonical pages and only factual article dates", async () => {
  const xml = await readFile("dist/sitemap.xml", "utf8");
  assert(xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  const entries = [
    ...xml.matchAll(
      /<url><loc>(.*?)<\/loc>(?:<lastmod>(.*?)<\/lastmod>)?<\/url>/g,
    ),
  ];
  assert.equal(entries.length, pages.length);
  assert.deepEqual(
    entries.map((e) => e[1]).sort(),
    pages.map((p) => new URL(p.route, root).href).sort(),
  );
  for (const [, url, date] of entries) {
    const id = /\/learn\/([^/]+)\/$/.exec(url)?.[1];
    if (id) {
      const raw = await readFile(`src/content/lessons/${id}.mdx`, "utf8");
      assert.equal(date, parse(raw.split(/^---\s*$/m)[1]).updated);
    } else assert.equal(date, undefined);
  }
});
test("JSON-LD serialization prevents script termination", () => {
  const result = execFileSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "--input-type=module",
      "-e",
      `import {serializeStructuredData} from './src/data/seo.ts';console.log(serializeStructuredData({text:'</script><script>alert(1)</script>'}));`,
    ],
    { encoding: "utf8" },
  ).trim();
  assert(!result.includes("<"));
  assert.equal(JSON.parse(result).text, "</script><script>alert(1)</script>");
});
test("AVIF deliveries preserve dimensions, verified source hashes, and smaller file size", async () => {
  const { files } = JSON.parse(
    await readFile("public/images/avif-delivery.json", "utf8"),
  );
  assert(Object.keys(files).length > 0);
  const hash = (b) => createHash("sha256").update(b).digest("hex");
  for (const [source, entry] of Object.entries(files)) {
    const original = await readFile(`public/images/${source}`),
      converted = await readFile(`public/images/${entry.path}`);
    assert.equal(hash(original), entry.sourceHash);
    assert.equal(hash(converted), entry.sha256);
    assert(converted.length < original.length);
    const a = await sharp(original).metadata(),
      b = await sharp(converted).metadata();
    assert.equal(b.format, "heif");
    assert.equal(b.width, a.width);
    assert.equal(b.height, a.height);
    assert.equal(b.width, entry.width);
    assert.equal(b.height, entry.height);
  }
  const home = pages.find((p) => !p.route).html;
  assert(home.includes('type="image/avif"'));
  assert(home.includes("field-notes-hero-768.webp"));
  assert(home.includes("field-notes-hero-768.avif"));
});
