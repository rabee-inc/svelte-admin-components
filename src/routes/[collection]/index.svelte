<script context="module">
  import admin from "$demo/admin.js"
  export async function load({fetch, params}) {
    let collection = params.collection;
    let res = await fetch(`/api/${collection}`);
    let {items} = await res.json();
    let content = admin.contents[params.collection];

    return {
      props: {
        collection,
        items,
        content,
      }
    };
  }
</script>
<script>
  import { goto } from "$app/navigation";

  import { ContentList, Sidebar } from "$lib";
  
  export let items = [];
  export let content;

  let select = (e) => {
    goto(`/${content.path}/${e.detail.item.id}`);
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label}

        ContentList(items='{items}', headings='{content.headings}', on:select='{select}')
</template>
