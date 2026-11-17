import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { parse } from "yaml";
import sharp from "sharp";
import config from "../astro.config.mjs";
import {
  validateMetadata,
  validateImage,
  readHead,
  requiredProperties,
} from "./ogp/validate.mjs";
import {
  chooseTitle,
  loadTokens,
  loadFonts,
  hash,
  textPaths,
  textWidth,
} from "./ogp/render.mjs";
const base = new URL(config.base.replace(/\/$/, "") + "/", config.site);
const routes = JSON.parse(
  await readFile("design/review-map.json", "utf8"),
).pages;
const manifest = JSON.parse(await readFile("design/ogp/manifest.json", "utf8"));
async function lesson(id) {
  const raw = await readFile(`src/content/lessons/${id}.mdx`, "utf8");
  return parse(raw.split(/^---\s*$/m)[1]);
}
test("every built page has exact OGP values, absolute base URLs and a real 1200×630 PNG/JPEG", async () => {
  for (const route of routes) {
    const html = await readFile(`dist/${route}index.html`, "utf8");
    const id = /^learn\/([^/]+)\/$/.exec(route)?.[1];
    const updateId = /^updates\/([^/]+)\/$/.exec(route)?.[1];
    const data = id ? await lesson(id) : updateId ? JSON.parse(await readFile(`src/data/security-updates/${updateId}.json`,"utf8")) : undefined;
    const meta = validateMetadata(html, {
      url: new URL(route, base).href,
      article: !!id || !!updateId,
      title: data?.title,
      summary: data?.summary,
    });
    const image = new URL(meta.get("og:image"));
    assert.equal(image.origin, base.origin);
    assert(image.pathname.startsWith(base.pathname + "ogp/"));
    assert.equal(
      image.pathname,
      base.pathname +
        `ogp/${id && !manifest.fallbacks.includes(id) ? id : "default"}.png`,
    );
    const file = resolve("dist", image.pathname.slice(base.pathname.length));
    assert(!relative(resolve("dist"), file).startsWith(".."));
    validateImage(await sharp(await readFile(file)).metadata(), file);
  }
});
test("generation manifest keeps approved sources, current tokens, fixed glyphs and legible safe-area titles", async () => {
  const css = await readFile("src/styles/tokens.css"),
    font = await readFile(manifest.font.file);
  assert.equal(hash(css), manifest.tokensHash);
  assert.equal(hash(font), manifest.font.sha256);
  assert(
    (await readFile("design/ogp/fonts/OFL.txt", "utf8")).includes(
      "SIL OPEN FONT LICENSE",
    ),
  );
  const fonts = loadFonts(font),
    tokens = loadTokens(css.toString());
  assert.equal(tokens.paper, "#f5f1e6");
  assert.equal(tokens.orange, "#ff4b00");
  const ids = (await readdir("src/content/lessons"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.slice(0, -4));
  assert.deepEqual(
    [...manifest.cards.map((c) => c.id), ...manifest.fallbacks].sort(),
    ["default", ...ids].sort(),
  );
  for (const card of manifest.cards) {
    assert(card.fontSize >= 56);
    assert(card.lines.length <= 3);
    assert(
      card.lines.every((l) => textWidth(l, fonts.bold, card.fontSize) <= 580),
    );
    assert.equal(hash(await readFile(card.source)), card.sourceHash);
    assert.equal(hash(await readFile(card.file)), card.pngHash);
    validateImage(await sharp(card.file).metadata(), card.file);
    if (card.id !== "default") {
      const data = await lesson(card.id);
      assert([data.title, data.shortTitle].includes(card.title));
      const scene = readHead(
        await readFile(`dist/learn/${card.id}/index.html`, "utf8"),
      );
      assert.equal(scene.meta.get("og:title"), data.title);
      assert(card.source.startsWith("public/images/"));
    } else
      assert.equal(card.source, "design/assets/cat-compass-logo-source.png");
  }
});
test("missing metadata, relative URLs, wrong type and unsupported dimensions or format fail closed", async () => {
  const html = await readFile("dist/index.html", "utf8"),
    expected = { url: base.href, article: false };
  validateMetadata(html, expected);
  for (const property of [...requiredProperties, "twitter:card"])
    assert.throws(
      () =>
        validateMetadata(
          html.replace(
            new RegExp(`<meta (?:property|name)="${property}"[^>]*>`),
            "",
          ),
          expected,
        ),
      property,
    );
  assert.throws(() =>
    validateMetadata(
      html.replace(/(property="og:url" content=")[^"]+/, "$1/relative/"),
      expected,
    ),
  );
  assert.throws(() =>
    validateMetadata(
      html.replace('content="website"', 'content="article"'),
      expected,
    ),
  );
  for (const meta of [
    { format: "webp", width: 1200, height: 630 },
    { format: "png", width: 1199, height: 630 },
    { format: "jpeg", width: 1200, height: 600 },
  ])
    assert.throws(() => validateImage(meta, "fixture"));
  const font = loadFonts(await readFile(manifest.font.file)).bold;
  assert.throws(() => chooseTitle("あ".repeat(100), undefined, font));
  assert.equal(
    chooseTitle("あ".repeat(100), "短い見出し", font).text,
    "短い見出し",
  );
  assert.throws(() => textPaths("\u{10ffff}", font, 56, 100, 300, "#191919"));
});

test("logo transparency and the single orange band survive PNG composition", async () => {
  for (const card of manifest.cards) {
    const { data, info } = await sharp(card.file)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const pixel = (x, y) => [
      ...data.subarray((y * info.width + x) * 3, (y * info.width + x) * 3 + 3),
    ];
    assert.deepEqual(
      pixel(100, 108),
      [245, 241, 230],
      `${card.id}: logo corner keeps paper background`,
    );
    for (let x = 0; x < 1200; x++)
      assert.deepEqual(pixel(x, 0), [255, 75, 0], card.id);
    for (let y = 12; y < 630; y++)
      for (let x = 0; x < 1200; x++) {
        const [r, g, b] = pixel(x, y);
        assert(
          r - g <= 6 && g - b <= 12,
          `${card.id}: only ink/paper tones below band`,
        );
      }
  }
});

test("every lesson OGP uses its own exact list-card scene and an explicit valid focal point", async () => {
  const library = await readFile("dist/library/index.html", "utf8");
  const sources = new Set();
  for (const card of manifest.cards.filter((c) => c.id !== "default")) {
    const block = [
      ...library.matchAll(/<article[^>]*data-catalog-item[\s\S]*?<\/article>/g),
    ].find((m) => m[0].includes(`/learn/${card.id}/`))?.[0];
    assert(block, card.id);
    const src = /<img[^>]*src="([^"]+)"/.exec(block)?.[1];
    assert.equal(
      "public/" +
        src
          .replace("/ai-security-playbook/", "")
          .replace("-480.webp", "-960.webp"),
      card.source,
    );
    assert(card.focalX >= 0 && card.focalX <= 1, card.id);
    sources.add(card.source);
  }
  assert.equal(sources.size, manifest.cards.length - 1);
});
