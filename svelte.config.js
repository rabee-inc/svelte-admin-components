import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  typescript: true,
  // ...
});
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },

    vite: {
      mode: process.env.NODE_ENV,
      define: {
        'process.env': process.env,
      },
      resolve: {
        alias: {
          "svelte-admin-components": path.resolve('./src/lib'),
          $components: path.resolve('./src/components'),
          $demo: path.resolve('./src/demo'),
        }
      }
    }
  },
  preprocess,
};

export default config;
