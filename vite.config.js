import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    'process.env': process.env,
  },
  // for dev
  server: {
    port: 3000,
  },
  // for preview
  preview: {
    port: 3000,
  }
});
