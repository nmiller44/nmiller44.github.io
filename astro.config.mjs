import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://forty4.dev/',
    integrations: [tailwind()],
});
