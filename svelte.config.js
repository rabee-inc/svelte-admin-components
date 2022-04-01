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
          $components: path.resolve('./src/components'),
          $app: path.resolve('./src/app'),
        }
      }
    }
  },
  preprocess,
};

export default config;
