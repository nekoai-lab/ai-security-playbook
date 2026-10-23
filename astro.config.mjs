import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
export default defineConfig({
  site: "https://nekoai-lab.github.io",
  base: "/ai-security-playbook",
  trailingSlash: "always",
  integrations: [mdx()],
});
