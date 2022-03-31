<script context="module">
  export async function load({fetch, params}) {
    let res = await fetch(`/api/${params.collection}`);
    let {items} = await res.json();

    return {
      props: {
        items,
      }
    };
  }
</script>
<script>

  import * as forms from "$lib/index.js";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import admin from "$app/admin.js";

  export let items = [];

  let Text = forms.Text;

</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.container-640.px16.py32
      +each('items as item')
        div {item.id}. {item.screen_name}
</template>
