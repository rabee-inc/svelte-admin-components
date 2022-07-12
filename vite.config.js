import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  mode: process.env.NODE_ENV,
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      "svelte-admin-components": path.resolve('./src/lib'),
      $components: path.resolve('./src/components'),
      $admin: path.resolve('./src/admin'),
    }
  }

};

export default config;