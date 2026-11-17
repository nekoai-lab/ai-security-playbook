import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import searchSitemap from "./scripts/search-sitemap.mjs";
export default defineConfig({
  site: "https://nekoai-lab.github.io",
  base: "/ai-security-playbook",
  trailingSlash: "always",
  integrations: [mdx(), searchSitemap()],
});
