<script context="module">
  export async function load({fetch, params}) {
    let collection = params.collection;
    let res = await fetch(`/api/${collection}`);
    let {items} = await res.json();

    return {
      props: {
        collection,
        items,
      }
    };
  }
</script>
<script>

  import * as forms from "$lib/index.js";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import admin from "$app/admin.js";

  export let collection = '';
  export let items = [];

  let Text = forms.Text;

</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {collection}
        +each('items as item')
          div {item.id}. {item.screen_name}
</template>
