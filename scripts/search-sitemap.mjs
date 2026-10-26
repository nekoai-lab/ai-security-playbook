import { readdir, readFile, writeFile } from "node:fs/promises";
import { parse } from "yaml";
const escapeXml = (s) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
/** Build from actual emitted routes; no production dependency on the design audit map. */
export default function searchSitemap() {
  let site, base;
  return {
    name: "playbook-search-sitemap",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = config.site;
        base = config.base;
      },
      "astro:build:done": async ({ pages, dir, logger }) => {
        if (process.env.DESIGN_PREVIEW === "1") return;
        if (!site) throw new Error("Sitemap requires a canonical site");
        const root = new URL(`${base.replace(/\/$/, "")}/`, site);
        const prefix = root.pathname.replace(/^\//, "");
        const dates = new Map();
        for (const name of await readdir("src/content/lessons")) {
          if (!name.endsWith(".mdx")) continue;
          const raw = await readFile(`src/content/lessons/${name}`, "utf8");
          const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
          if (!frontmatter) throw new Error(`Missing frontmatter: ${name}`);
          const { updated } = parse(frontmatter[1]);
          if (!/^\d{4}-\d{2}-\d{2}$/.test(updated))
            throw new Error(`Invalid update date: ${name}`);
          dates.set(`learn/${name.slice(0, -4)}/`, updated);
        }
        for (const name of await readdir("src/data/security-updates")) {
          if (!name.endsWith(".json")) continue;
          const data = JSON.parse(await readFile(`src/data/security-updates/${name}`,"utf8"));
          if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated)) throw Error(`Invalid update date: ${name}`);
          dates.set(`updates/${data.id}/`,data.updated);
        }
        const urls = new Map();
        for (const page of pages) {
          let route = page.pathname.replace(/^\//, "");
          if (route.startsWith(prefix)) route = route.slice(prefix.length);
          if (
            /^(404(?:\.html|\/)?|design-system\/)/.test(route) ||
            /\.(xml|txt|json)$/.test(route)
          )
            continue;
          const loc = new URL(route, root).href;
          urls.set(loc, dates.get(route));
        }
        const entries = [...urls]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(
            ([loc, date]) =>
              `  <url><loc>${escapeXml(loc)}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`,
          )
          .join("\n");
        await writeFile(
          new URL("sitemap.xml", dir),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
        );
        logger.info(`Sitemap: ${urls.size} canonical public pages`);
      },
    },
  };
}
