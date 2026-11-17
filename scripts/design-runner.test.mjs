import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
test("full and quick coverage stay distinct, and failures are propagated", () => {
  const dir = mkdtempSync(join(tmpdir(), "playbook-runner-"));
  try {
    mkdirSync(join(dir, "bin"));
    writeFileSync(
      join(dir, "bin/design-audit"),
      "#!/usr/bin/env node\nconsole.log(JSON.stringify(process.argv.slice(2)));process.exit(Number(process.env.PLAYBOOK_TEST_EXIT??0));\n",
      { mode: 0o755 },
    );
    const run = (args = [], status = "0") =>
      spawnSync(process.execPath, ["scripts/design-audit.mjs", ...args], {
        encoding: "utf8",
        env: {
          ...process.env,
          DESIGN_HARNESS_DIR: dir,
          PLAYBOOK_TEST_EXIT: status,
        },
      });
    const full = run();
    assert.equal(full.status, 0);
    assert.match(full.stdout, /FULL:/);
    const fullArgs = JSON.parse(full.stdout.trim().split("\n").at(-1));
    assert.equal(
      fullArgs.filter((a) => a.startsWith("http")).length,
      JSON.parse(readFileSync("design/review-map.json", "utf8")).pages.length,
    );
    assert(!fullArgs.includes("--widths"));
    const guide = run(["--guide"]);
    assert.equal(guide.status, 0);
    assert.match(guide.stdout, /GUIDE FULL:/);
    const guideArgs = JSON.parse(guide.stdout.trim().split("\n").at(-1));
    assert.equal(guideArgs.filter((a) => a.startsWith("http")).length, 1);
    assert(
      guideArgs.some(
        (a) =>
          a === "http://127.0.0.1:4392/ai-security-playbook/design-system/",
      ),
    );
    assert(!guideArgs.includes("--widths"));
    assert.equal(run(["--guide"], "1").status, 1);
    const quick = run(["--quick"]);
    assert.equal(quick.status, 0);
    assert.match(quick.stdout, /diagnostics only; not a release approval/);
    const quickArgs = JSON.parse(quick.stdout.trim().split("\n").at(-1));
    assert.equal(quickArgs.filter((a) => a.startsWith("http")).length, 3);
    assert(quickArgs.includes("375,1280"));
    const custom = run(["http://127.0.0.1:4387/ai-security-playbook/"]);
    assert.match(custom.stdout, /CUSTOM:/);
    assert.equal(run([], "1").status, 1);
    assert.equal(run(["--rules", "other.json"]).status, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
