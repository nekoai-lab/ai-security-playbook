import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { reviewContext } from "./design-context.mjs";
const map = JSON.parse(
  readFileSync(new URL("../design/review-map.json", import.meta.url), "utf8"),
);
test("lesson review includes its page and index while release covers all mapped pages", () => {
  const c = reviewContext(["src/content/lessons/commands.mdx"], map);
  assert.equal(c.diagnostic.coverage, "selected");
  assert.equal(c.diagnostic.pages.length, 4);
  assert(c.diagnostic.pages.includes("/ai-security-playbook/learn/commands/"));
  assert(c.diagnostic.pages.includes("/ai-security-playbook/library/"));
  assert(c.diagnostic.pages.includes("/ai-security-playbook/updates/"));
  assert.equal(c.release.pages.length, map.pages.length);
  assert.equal(c.diagnostic.releaseReady, false);
});
test("unknown, deleted/new lesson and empty changes fail back to all routes", () => {
  for (const files of [
    [],
    ["astro.config.mjs"],
    ["src/content/lessons/new.mdx"],
    ["../src/content/lessons/commands.mdx"],
  ]) {
    const c = reviewContext(files, map);
    assert.equal(c.diagnostic.coverage, "full-fallback");
    assert.equal(c.diagnostic.pages.length, map.pages.length);
  }
});
test("reference map paths and guide sections exist", () => {
  const guide = readFileSync(
    new URL("../src/design/DesignSystem.astro", import.meta.url),
    "utf8",
  );
  for (const p of [
    map.entry,
    ...map.contract,
    ...map.sections.flatMap((s) => s.references),
  ])
    assert(existsSync(new URL("../" + p, import.meta.url)), p);
  for (const a of map.sections.flatMap((s) => s.anchors))
    assert(guide.includes(`id="${a}"`), a);
});

test("release map covers the current lesson collection", () => {
  const routes = readdirSync(
    new URL("../src/content/lessons/", import.meta.url),
  )
    .filter((p) => p.endsWith(".mdx"))
    .map((p) => `learn/${p.slice(0, -4)}/`)
    .sort();
  assert.deepEqual(
    map.pages.filter((p) => p.startsWith("learn/")).sort(),
    routes,
    "Update review-map.json when adding a lesson",
  );
});

test("guide changes keep separate authoring coverage without a public guide route",()=>{
 const c=reviewContext(["src/design/DesignSystem.astro"],map);
 assert(c.guidePreview.pages.includes("design-system/"));
 assert(!c.release.pages.some(p=>p.endsWith("/design-system/")));
 assert(c.guideSections.every(p=>p.startsWith(c.guidePreview.baseUrl)));
});
