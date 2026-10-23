import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
// The private harness is executed locally; its source is never copied here.
const dir =
  process.env.DESIGN_HARNESS_DIR ??
  join(homedir(), "Projects", "ai-dev-harness");
const command = join(dir, "bin", "design-audit");
if (!existsSync(command)) {
  console.error(
    "Design harness not found. Set DESIGN_HARNESS_DIR to your local harness checkout. See design/README.md.",
  );
  process.exit(2);
}
const args = process.argv.slice(2);
const base = "http://127.0.0.1:4387/ai-security-playbook/";
const positional = args.filter(
  (arg, i) =>
    !arg.startsWith("--") &&
    !["--out", "--baseline", "--widths", "--rules"].includes(args[i - 1]),
);
const targets =
  positional.length || args.includes("--help")
    ? args
    : [
        ...args,
        base,
        base + "design-system/",
        base + "learn/node-october-2026/",
      ];
const result = spawnSync(
  command,
  ["--rules", "design/design-rules.json", ...targets],
  { stdio: "inherit", env: process.env },
);
if (result.error) {
  console.error(result.error.message);
  process.exit(2);
}
process.exit(result.status ?? 2);
