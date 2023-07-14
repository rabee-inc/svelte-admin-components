// import adapterAuto from '@sveltejs/adapter-auto';
// import adapterNode from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

const preprocess = sveltePreprocess({
  typescript: true,
  // ...
});

// let adapter = null;

// if (adapterAuto().name !== '@sveltejs/adapter-auto') {
//   // vercel/netlify/cloudflare pages
//   adapter = adapterAuto();
// }
// else {
//   // auto で hit しなかったら強制的に node にする
//   adapter = adapterNode();
// }


/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter,
    adapter: adapter(),
    alias: {
      '$components': path.resolve('./src/components'),
      '$modals': path.resolve('./src/components/modals'),
      "$admin": path.resolve('./src/admin'),
      "svelte-admin-components": path.resolve('./src/lib'),
      // '@rabee-org/svelte-admin-components': path.resolve('./src/lib'),
    }
  },
  preprocess,
};

export default config;
