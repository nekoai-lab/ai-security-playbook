import { createHash } from "node:crypto";
import sharp from "sharp";
import * as fontkit from "fontkit";
export const WIDTH = 1200,
  HEIGHT = 630,
  TITLE_SIZE = 64;
export const hash = (data) => createHash("sha256").update(data).digest("hex");
export function loadTokens(css) {
  const get = (n) => {
    const value = new RegExp(`--${n}:\\s*([^;]+);`).exec(css)?.[1].trim();
    if (!value) throw Error(`Missing token ${n}`);
    return value;
  };
  return {
    paper: get("color-paper"),
    ink: get("color-ink"),
    muted: get("color-muted"),
    orange: get("color-orange"),
    sans: get("font-sans"),
  };
}
export function loadFonts(bytes) {
  const source = fontkit.create(bytes);
  return {
    regular: source.getVariation({ wght: 400 }),
    bold: source.getVariation({ wght: 700 }),
  };
}
export function textWidth(text, font, size) {
  return (
    (font.layout(text).positions.reduce((sum, p) => sum + p.xAdvance, 0) *
      size) /
    font.unitsPerEm
  );
}
export function wrapTitle(text, font, size = TITLE_SIZE, width = 580) {
  const lines = [];
  let line = "";
  for (const char of Array.from(text)) {
    if (char === "\n") {
      lines.push(line);
      line = "";
      continue;
    }
    if (line && textWidth(line + char, font, size) > width) {
      if (/^[、。，．？！？」』）】]$/.test(char)) {
        const chars = Array.from(line);
        const last = chars.pop();
        lines.push(chars.join(""));
        line = last;
      } else {
        lines.push(line);
        line = "";
      }
    }
    line += char;
  }
  if (line) lines.push(line);
  return lines;
}
export function chooseTitle(title, shortTitle, font) {
  for (const value of [
    ...new Set(
      (shortTitle && wrapTitle(title, font).length > 2
        ? [shortTitle, title]
        : [title, shortTitle]
      ).filter(Boolean),
    ),
  ]) {
    const lines = wrapTitle(value, font);
    if (
      lines.length <= 3 &&
      lines.every((l) => textWidth(l, font, TITLE_SIZE) <= 580)
    )
      return { text: value, lines };
  }
  throw Error(`Title needs shortTitle (64px / 3 lines): ${title}`);
}
export function textPaths(text, font, size, x, y, color) {
  const run = font.layout(text);
  let cursor = 0;
  const paths = [];
  for (let i = 0; i < run.glyphs.length; i++) {
    const glyph = run.glyphs[i],
      pos = run.positions[i];
    if (glyph.id === 0 && !/^\s*$/.test(text))
      throw Error(`Missing glyph in: ${text}`);
    paths.push(
      `<path fill="${color}" d="${glyph.path.toSVG()}" transform="translate(${x + ((cursor + pos.xOffset) * size) / font.unitsPerEm},${y - (pos.yOffset * size) / font.unitsPerEm}) scale(${size / font.unitsPerEm},${-size / font.unitsPerEm})"/>`,
    );
    cursor += pos.xAdvance;
  }
  return paths.join("");
}
async function duotone(image, tokens) {
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const paper = rgb(tokens.paper),
    ink = rgb(tokens.ink);
  const { data, info } = await image
    .toColourspace("srgb")
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mapped = Buffer.alloc(info.width * info.height * 4);
  for (let p = 0; p < info.width * info.height; p++) {
    const grey = Math.round(
      data[p * info.channels] * 0.2126 +
        data[p * info.channels + 1] * 0.7152 +
        data[p * info.channels + 2] * 0.0722,
    );
    for (let c = 0; c < 3; c++)
      mapped[p * 4 + c] = Math.round(
        ink[c] + ((paper[c] - ink[c]) * grey) / 255,
      );
    mapped[p * 4 + 3] =
      info.channels === 2
        ? data[p * 2 + 1]
        : info.channels === 4
          ? data[p * 4 + 3]
          : 255;
  }
  return sharp(mapped, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}
async function monochrome(
  bytes,
  width,
  height,
  position = "centre",
  tokens,
  focalX,
) {
  // Deterministic delivery crop: preserve the chosen subject within the portrait art slot.
  let image = sharp(bytes);
  if (focalX !== undefined) {
    if (!Number.isFinite(focalX) || focalX < 0 || focalX > 1)
      throw Error("Invalid OGP focal point");
    const meta = await image.metadata();
    const cropWidth = Math.min(
      meta.width,
      Math.floor((meta.height * width) / height),
    );
    const left = Math.max(
      0,
      Math.min(
        meta.width - cropWidth,
        Math.round(meta.width * focalX - cropWidth / 2),
      ),
    );
    image = image.extract({
      left,
      top: 0,
      width: cropWidth,
      height: meta.height,
    });
  }
  return duotone(
    image.resize(width, height, { fit: "cover", position }),
    tokens,
  );
}
export async function renderCard({
  tokens,
  fonts,
  logo,
  scene,
  title,
  theme,
  position = "centre",
  focalX,
}) {
  const selected = chooseTitle(title.text, title.shortTitle, fonts.bold);
  const brand = textPaths(
    "AI Security Playbook",
    fonts.bold,
    28,
    180,
    156,
    tokens.ink,
  );
  const topic = textPaths(theme, fonts.regular, 24, 100, 238, tokens.muted);
  const signature = textPaths(
    "Tsukineko",
    fonts.bold,
    24,
    100,
    550,
    tokens.muted,
  );
  const headline = selected.lines
    .map((line, i) =>
      textPaths(line, fonts.bold, TITLE_SIZE, 100, 328 + i * 88, tokens.ink),
    )
    .join("");
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${tokens.paper}"/><rect width="1200" height="12" fill="${tokens.orange}"/>${brand}${topic}${headline}${signature}</svg>`,
  );
  const smallLogo = await duotone(sharp(logo).resize(64, 64), tokens);
  const art = scene
    ? await monochrome(scene, 480, 630, position, tokens, focalX)
    : await duotone(sharp(logo).resize(360, 360), tokens);
  const output = await sharp(background)
    .composite([
      { input: art, left: scene ? 720 : 740, top: scene ? 0 : 135 },
      { input: smallLogo, left: 100, top: 108 },
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="12"><rect width="1200" height="12" fill="${tokens.orange}"/></svg>`,
        ),
        left: 0,
        top: 0,
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  return { output, selected };
}
