<script context="module">
  import admin from "$app/admin.js";
  export async function load({fetch, params}) {
    let collection = params.collection;
    let res = await fetch(`/api/${collection}`);
    let {items} = await res.json();
    let schema = admin.schemas[params.collection];

    return {
      props: {
        collection,
        items,
        schema,
      }
    };
  }
</script>
<script>
  import { ContentList, Sidebar } from "$lib";
  
  export let items = [];
  export let schema;

</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {schema.label}

        ContentList(items='{items}', headings='{schema.headings}')
</template>
