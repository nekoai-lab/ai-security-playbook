import { readdir, readFile, access } from "node:fs/promises";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";
const root = resolve("dist");
const base = "/ai-security-playbook";
async function walk(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      files.map((f) =>
        f.isDirectory() ? walk(join(dir, f.name)) : [join(dir, f.name)],
      ),
    )
  ).flat();
}
await access(join(root,"design-system/index.html")).then(()=>assert.fail("Authoring guide must not be built into dist"),()=>{});
// Google ownership proof is a fixed protocol response, not a reader-facing HTML page.
// Validate this exact file before separating it from the page/metadata review.
const verificationName = "googlee620038b07449b77.html";
const verificationFile = join(root, verificationName);
const verification = await readFile(verificationFile);
assert.equal(
  verification.toString("utf8"),
  `google-site-verification: ${verificationName}`,
  "Search Console ownership proof must preserve Google's exact response",
);
assert.deepEqual(
  verification,
  await readFile(join("public", verificationName)),
  "Build must copy the supplied ownership proof without alteration",
);
const pages = (await walk(root)).filter(
  (f) => f.endsWith(".html") && f !== verificationFile,
);
assert(pages.length >= 7, "Expected public learning pages");
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert(html.includes('lang="ja"'), `${file}: missing language`);
  assert(/<title>[^<]+<\/title>/.test(html), `${file}: missing title`);
  for (const m of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const raw = m[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|data:)/.test(raw)) continue;
    const url = new URL(
      raw,
      `https://nekoai-lab.github.io${base}/${file.slice(root.length + 1).replace(/index\.html$/, "")}`,
    );
    assert(
      url.pathname.startsWith(base + "/"),
      `Missing base: ${raw} in ${file}`,
    );
    let target = join(
      root,
      decodeURIComponent(url.pathname.slice(base.length)),
    );
    if (url.pathname.endsWith("/")) target = join(target, "index.html");
    await access(target).catch(() =>
      assert.fail(`Broken local link ${raw} in ${file}`),
    );
    if (url.hash && target.endsWith(".html")) {
      const dest = await readFile(target, "utf8");
      assert(
        dest.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Broken anchor ${raw}`,
      );
    }
  }
}
console.log(
  `Verified ${pages.length} pages: Japanese metadata, base paths, local assets and anchors.`,
);

const reviewMap = JSON.parse(await readFile("design/review-map.json", "utf8"));
assert.deepEqual(
  pages
    .map((f) =>
      f
        .slice(root.length + 1)
        .replace(/index\.html$/, "")
        .trim(),
    )
    .sort(),
  [...reviewMap.pages].sort(),
  "Every generated route must be included in FULL design review",
);
