import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const dir =
  process.env.DESIGN_HARNESS_DIR ??
  join(homedir(), "Projects", "ai-dev-harness");
const command = join(dir, "bin", "design-audit");
if (!existsSync(command)) {
  console.error(
    "Design harness not found. Set DESIGN_HARNESS_DIR. See design/README.md.",
  );
  process.exit(2);
}
const map = JSON.parse(
  readFileSync(new URL("../design/review-map.json", import.meta.url), "utf8"),
);
const guide = process.argv.includes("--guide");
const quick = process.argv.includes("--quick");
const args = process.argv
  .slice(2)
  .filter((a) => a !== "--quick" && a !== "--guide");
if (args.includes("--rules")) {
  console.error("Use the project design/design-rules.json contract.");
  process.exit(2);
}
const positional = args.filter(
  (arg, i) =>
    !arg.startsWith("--") &&
    !["--out", "--baseline", "--widths"].includes(args[i - 1]),
);
const custom = positional.length > 0 || args.includes("--widths");
const mode = quick ? "QUICK" : custom ? "CUSTOM" : "FULL";
console.log(
  `${guide ? "GUIDE " : ""}${mode}: ${mode === "FULL" ? "all routes and contract widths; visual/keyboard/text review still required" : "diagnostics only; not a release approval"}`,
);
const base = (
  process.env.DESIGN_PREVIEW_URL ??
  (guide
    ? map.guidePreview.baseUrl
    : "http://127.0.0.1:4387/ai-security-playbook/")
).replace(/\/?$/, "/");
const defaults = (
  guide ? map.guidePreview.pages : quick ? map.representatives : map.pages
).map((p) => base + p);
const targets =
  positional.length || args.includes("--help") ? args : [...args, ...defaults];
const quickWidths =
  quick && !args.includes("--widths") ? ["--widths", "375,1280"] : [];
const result = spawnSync(
  command,
  ["--rules", "design/design-rules.json", ...quickWidths, ...targets],
  { stdio: "inherit", env: process.env },
);
if (result.error) {
  console.error(result.error.message);
  process.exit(2);
}
process.exit(result.status ?? 2);
