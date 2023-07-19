import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { modalManagerPlugin } from '@rabee-org/svelte-modal-manager/vite'

export default defineConfig({
  plugins: [sveltekit(), modalManagerPlugin()],
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
