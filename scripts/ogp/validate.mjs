import assert from "node:assert/strict";
export const requiredProperties = [
  "og:title",
  "og:description",
  "og:url",
  "og:site_name",
  "og:locale",
  "og:type",
  "og:image",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
];
const decode = (s) =>
  s.replace(
    /&(?:amp|quot|lt|gt|apos|#39|#x27|#\d+);/g,
    (e) =>
      ({
        "&amp;": "&",
        "&quot;": '"',
        "&lt;": "<",
        "&gt;": ">",
        "&apos;": "'",
        "&#39;": "'",
        "&#x27;": "'",
      })[e] ?? String.fromCodePoint(Number(e.slice(2, -1))),
  );
export function readHead(html) {
  const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html)?.[1];
  assert(head, "Missing head");
  const meta = new Map();
  for (const tag of head.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = Object.fromEntries(
      [...tag[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [
        m[1],
        decode(m[2]),
      ]),
    );
    const name = attrs.property ?? attrs.name;
    if (name) {
      assert(!meta.has(name), `Duplicate ${name}`);
      meta.set(name, attrs.content);
    }
  }
  return {
    meta,
    title: decode(/<title>([\s\S]*?)<\/title>/i.exec(head)?.[1] ?? ""),
  };
}
export function validateMetadata(html, { url, article, title, summary }) {
  const { meta, title: pageTitle } = readHead(html);
  for (const name of [...requiredProperties, "twitter:card"])
    assert(meta.get(name)?.trim(), `Missing ${name}`);
  for (const name of ["og:url", "og:image"]) {
    const value = meta.get(name);
    assert(/^https:\/\//.test(value), `Absolute HTTPS required: ${name}`);
    const u = new URL(value);
    assert(!u.hash && !u.search, `Canonical URL only: ${name}`);
  }
  assert.equal(meta.get("og:url"), url);
  assert.equal(meta.get("og:title"), article ? title : pageTitle);
  assert.equal(
    meta.get("og:description"),
    article ? summary : meta.get("description"),
  );
  assert.equal(meta.get("og:type"), article ? "article" : "website");
  assert.equal(meta.get("og:site_name"), "AI Security Playbook");
  assert.equal(meta.get("og:locale"), "ja_JP");
  assert.equal(meta.get("twitter:card"), "summary_large_image");
  assert.equal(meta.get("og:image:width"), "1200");
  assert.equal(meta.get("og:image:height"), "630");
  return meta;
}
export function validateImage(meta, file) {
  assert(["png", "jpeg"].includes(meta.format), `${file}: PNG/JPEG required`);
  assert.equal(meta.width, 1200, file);
  assert.equal(meta.height, 630, file);
}
