import manifest from "../../public/images/avif-delivery.json";
const files = manifest.files as Record<string, { path: string }>;
export function avifSrcset(
  stem: string,
  base: string,
  widths = [480, 960],
): string | null {
  const sources = widths.map((w) => files[`${stem}-${w}.webp`]);
  return sources.every(Boolean)
    ? sources.map((s, i) => `${base}/images/${s.path} ${widths[i]}w`).join(", ")
    : null;
}
