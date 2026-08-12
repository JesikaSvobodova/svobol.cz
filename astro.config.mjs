// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Kanonická doména. Musí sedět s public/CNAME a se `site.url`
  // v src/data/site.ts — z téhle hodnoty se generuje sitemap i canonical.
  site: "https://svobol.cz",

  // Statický výstup do dist/. Žádný server, žádný runtime.
  output: "static",

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Odkazy bez koncového lomítka (/kontakt), server je akceptuje obojí.
  trailingSlash: "ignore",

  build: {
    // /kontakt → dist/kontakt/index.html
    format: "directory",
  },
});
