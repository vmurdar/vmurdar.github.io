import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
