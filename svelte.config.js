import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  typescript: true,
  // ...
});
import path from 'path';

let adapter = null;

if (adapterAuto().name !== '@sveltejs/adapter-auto') {
  // vercel/netlify/cloudflare pages
  adapter = adapterAuto();
}
else {
  // auto で hit しなかったら強制的に node にする
  adapter = adapterNode();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter,

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
          $admin: path.resolve('./src/admin'),
        }
      }
    }
  },
  preprocess,
};

export default config;
