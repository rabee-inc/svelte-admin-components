<script context="module">
  // export async function load({fetch}) {
  //   let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  //   let json = await res.json();

  //   return {
  //     props: {
  //       posts: json,
  //     }
  //   };
  // }
</script>
<script>

  import * as forms from "$lib/index.js";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import admin from "$app/admin.js";

  let Text = forms.Text;

</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.container-640.px16.py32
      div.f.fclm.fm.mb36
        h1.ts-large.mb4 svelte-admin-components demo
        Text
</template>
