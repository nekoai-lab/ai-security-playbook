import { readFile, access } from "node:fs/promises";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
const root = resolve(".design-preview");
const map = JSON.parse(await readFile("design/review-map.json", "utf8"));
await access(map.guidePreview.source);
for (const route of map.guidePreview.pages) {
  const file = join(root, route, "index.html");
  const html = await readFile(file, "utf8");
  assert.match(html, /<h1[^>]*>/);
  for (const anchor of new Set(map.sections.flatMap((s) => s.anchors)))
    assert(html.includes(`id="${anchor}"`), anchor);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|data:)/.test(raw)) continue;
    const url = new URL(raw, `https://example.invalid${map.basePath}${route}`);
    assert(url.pathname.startsWith(map.basePath), `Missing base: ${raw}`);
    const target = join(
      root,
      decodeURIComponent(url.pathname.slice(map.basePath.length)),
      url.pathname.endsWith("/") ? "index.html" : "",
    );
    await access(target).catch(() =>
      assert.fail(`Broken authoring link: ${raw}`),
    );
    if (url.hash && target.endsWith(".html"))
      assert(
        (await readFile(target, "utf8")).includes(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        ),
        raw,
      );
  }
}
await access("dist/design-system/index.html").then(
  () => assert.fail("Guide leaked into production output"),
  () => {},
);
console.log(
  "PASS authoring guide source, all anchors/assets/links, separate output; no production guide.",
);
