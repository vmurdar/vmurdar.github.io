import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import clerk from '@clerk/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), clerk()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 4321,
    host: '0.0.0.0'
  }
});
