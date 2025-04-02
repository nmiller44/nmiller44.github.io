import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://forty4.dev/',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});