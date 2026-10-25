import sharp from "sharp";
import { readdir, readFile, writeFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
const root = "public/images/",
  manifestPath = `${root}avif-delivery.json`;
const options = { quality: 70, effort: 4, chromaSubsampling: "4:4:4" };
const encoder = JSON.stringify(options);
const hash = (b) => createHash("sha256").update(b).digest("hex");
let previous = { files: {} };
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}
const files = {},
  names = (await readdir(root))
    .filter((n) => /-(480|768|960|1536)\.webp$/.test(n))
    .sort();
let sourceBytes = 0,
  outputBytes = 0,
  generated = 0;
for (const name of names) {
  const source = await readFile(root + name),
    sourceHash = hash(source),
    old = previous.files[name];
  sourceBytes += source.length;
  let encoded;
  if (old?.sourceHash === sourceHash && old.encoder === encoder) {
    try {
      const bytes = await readFile(root + old.path);
      if (hash(bytes) === old.sha256) encoded = bytes;
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
  }
  if (!encoded) {
    encoded = await sharp(source).avif(options).toBuffer();
    generated++;
  }
  const path = name.replace(/\.webp$/, ".avif");
  if (encoded.length >= source.length) {
    if (old) await rm(root + old.path, { force: true });
    continue;
  }
  const meta = await sharp(encoded).metadata();
  await writeFile(root + path, encoded);
  files[name] = {
    path,
    width: meta.width,
    height: meta.height,
    bytes: encoded.length,
    sha256: hash(encoded),
    sourceHash,
    encoder,
  };
  outputBytes += encoded.length;
}
await writeFile(
  manifestPath,
  JSON.stringify({ version: 1, generator: "sharp", options, files }, null, 2) +
    "\n",
);
console.log(
  `AVIF: ${Object.keys(files).length} smaller deliveries; generated ${generated}; input ${sourceBytes} bytes, AVIF ${outputBytes} bytes. WebP/PNG preserved.`,
);
