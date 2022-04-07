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

  import { ContentList, Sidebar } from "svelte-admin-components";
  
  export let items = [];
  export let content;

  let select = (e) => {
    goto(`/${content.path}/${e.detail.item.id}`);
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        div.f.fm.flex-between.mb16
          div.f.fm
            h1.mr8 {content.label}
            a.fs12.p4.mt6(href='/{content.path}/edit')
              i.material-icons.fs18 edit
          div
            a.button.primary(href='/{content.path}/new') NEW

        ContentList(items='{items}', headings='{content.headings}', on:select='{select}')
</template>
