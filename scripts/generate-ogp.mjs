import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { parse } from "yaml";
import { lessonVisuals } from "../src/data/lesson-visuals.ts";
import { topicTitle } from "../src/data/catalog.ts";
import {
  TITLE_SIZE,
  hash,
  loadTokens,
  loadFonts,
  renderCard,
} from "./ogp/render.mjs";
const read = (p) => readFile(new URL("../" + p, import.meta.url));
const css = await read("src/styles/tokens.css"),
  tokens = loadTokens(css.toString());
const font = await read("design/ogp/fonts/NotoSansJP.ttf"),
  fonts = loadFonts(font);
const logoPath = "design/assets/cat-compass-logo-source.png",
  logo = await read(logoPath);
const records = [];
const fallbacks = [];
async function generate(id, data, visual) {
  const source = visual ? `public/images/${visual.image}-960.webp` : logoPath;
  const scene = visual ? await read(source) : undefined;
  const { output, selected } = await renderCard({
    tokens,
    fonts,
    logo,
    scene,
    position: visual?.image === "node-runtime-scene" ? "left" : "centre",
    title: { text: data.title, shortTitle: data.shortTitle },
    theme: data.topic ? topicTitle(data.topic) : "FIELD NOTES",
  });
  const file = `public/ogp/${id}.png`;
  await writeFile(new URL("../" + file, import.meta.url), output);
  records.push({
    id,
    file,
    title: selected.text,
    lines: selected.lines,
    fontSize: TITLE_SIZE,
    theme: data.topic ? topicTitle(data.topic) : "FIELD NOTES",
    source,
    position: visual?.image === "node-runtime-scene" ? "left" : "centre",
    sourceHash: hash(scene ?? logo),
    pngHash: hash(output),
  });
}
await mkdir(new URL("../public/ogp/", import.meta.url), { recursive: true });
await generate("default", { title: "AIの安全を、\n解き明かそう。" });
for (const file of (
  await readdir(new URL("../src/content/lessons/", import.meta.url))
)
  .filter((f) => f.endsWith(".mdx"))
  .sort()) {
  const id = file.slice(0, -4),
    raw = (await read("src/content/lessons/" + file)).toString();
  const data = parse(raw.split(/^---\s*$/m)[1]);
  const visual = lessonVisuals[id];
  if (!visual) {
    fallbacks.push(id);
    continue;
  }
  await generate(id, data, visual);
}
await writeFile(
  new URL("../design/ogp/manifest.json", import.meta.url),
  JSON.stringify(
    {
      version: 1,
      width: 1200,
      height: 630,
      tokensHash: hash(css),
      font: {
        file: "design/ogp/fonts/NotoSansJP.ttf",
        sha256: hash(font),
        sourceCommit: "66a36c8c94b1a5d992ee4e7f392fccfe4945767c",
        license: "SIL OFL 1.1",
        fallbackFor: tokens.sans,
      },
      fallbacks,
      cards: records,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Generated ${records.length} PNG cards (1200×630); glyph paths, no system font fallback.`,
);
