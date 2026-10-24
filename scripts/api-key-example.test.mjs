import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, writeFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
test("the published Vite example includes the public dummy value in browser output", async () => {
  const article = await readFile("src/content/lessons/api-keys.mdx", "utf8");
  const env = /```dotenv\n([\s\S]*?)```/.exec(article)?.[1];
  const js = [...article.matchAll(/```js\n([\s\S]*?)```/g)]
    .map((m) => m[1])
    .find((s) => s.includes("querySelector('#check')"));
  const html = /```html\n([\s\S]*?)```/.exec(article)?.[1];
  assert(
    env && js && html,
    "example must remain executable from the published snippets",
  );
  const root = await mkdtemp(join(tmpdir(), "playbook-public-env-"));
  try {
    await writeFile(join(root, ".env"), env);
    await writeFile(join(root, "main.js"), js);
    await writeFile(
      join(root, "index.html"),
      `<!doctype html><html lang="ja"><meta charset="utf-8"><title>Practice</title>${html}<script type="module" src="/main.js"></script></html>`,
    );
    await build({ root, configFile: false, logLevel: "silent" });
    const names = await readdir(join(root, "dist/assets"));
    const output = (
      await Promise.all(
        names
          .filter((n) => n.endsWith(".js"))
          .map((n) => readFile(join(root, "dist/assets", n), "utf8")),
      )
    ).join("\n");
    assert(
      output.includes("DEMO_PUBLIC_12345"),
      "public dummy value must reach the browser bundle",
    );
    assert(
      !output.includes("DEMO_SERVER_67890"),
      "unused private dummy is not bundled in this fixture; this is not a general leakage audit",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
