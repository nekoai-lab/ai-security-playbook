import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function reviewContext(files, map) {
  const sections = new Set(),
    references = new Set(map.contract),
    anchors = new Set(),
    affected = new Set();
  let fallback = files.length === 0;
  for (const raw of files) {
    const file = raw.replaceAll("\\", "/").replace(/^\.\//, "");
    const matches = map.sections.filter((s) =>
      s.prefixes.some((p) => file.startsWith(p)),
    );
    if (matches.length === 0 || file.includes("..") || file.startsWith("/"))
      fallback = true;
    for (const s of matches) {
      sections.add(s.name);
      s.references.forEach((p) => references.add(p));
      s.anchors.forEach((a) => anchors.add(a));
      if (s.name === "lesson") {
        const slug = /^src\/content\/lessons\/([^/]+)\.mdx$/.exec(file)?.[1];
        const route = slug ? `learn/${slug}/` : null;
        if (route && map.pages.includes(route)) {
          affected.add(route);
          affected.add("");
          for (const index of ["library/", "updates/"])
            if (map.pages.includes(index)) affected.add(index);
          references.add(file);
        } else fallback = true;
      } else if (s.name === "guide") {
        /* Authoring preview is reported separately. */
      } else map.representatives.forEach((p) => affected.add(p));
    }
  }
  if (fallback) map.pages.forEach((p) => affected.add(p));
  return {
    entry: map.entry,
    changes: files,
    sections: [...sections],
    read: [...references],
    guideSections: [...anchors].map(
      (a) => `${map.guidePreview.baseUrl}design-system/#${a}`,
    ),
    guidePreview: map.guidePreview,
    diagnostic: {
      coverage: fallback ? "full-fallback" : "selected",
      pages: [...affected].map((p) => map.basePath + p),
      widths: [375, 1280],
      releaseReady: false,
    },
    release: {
      pages: map.pages.map((p) => map.basePath + p),
      widths: [320, 375, 768, 1280],
      requires: [
        "full-audit",
        "build-and-links",
        "keyboard",
        "text-200-percent",
        "visual-review",
      ],
    },
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const map = JSON.parse(
      readFileSync(
        new URL("../design/review-map.json", import.meta.url),
        "utf8",
      ),
    );
    const args = process.argv.slice(2);
    const files = args.length
      ? args
      : [
          ...new Set(
            [
              ...execFileSync("git", ["diff", "--name-only", "main"], {
                encoding: "utf8",
              })
                .trim()
                .split("\n"),
              ...execFileSync(
                "git",
                ["ls-files", "--others", "--exclude-standard"],
                { encoding: "utf8" },
              )
                .trim()
                .split("\n"),
            ].filter(Boolean),
          ),
        ];
    console.log(JSON.stringify(reviewContext(files, map), null, 2));
  } catch (error) {
    console.error(
      `Cannot select review scope: ${error.message}. Run the full review.`,
    );
    process.exitCode = 2;
  }
}
