<script context="module">
  import admin from "$demo/admin.js"
  export async function load({fetch, params}) {
    let collection = params.collection;
    let id = params.id;
    let res = await fetch(`/api/${collection}/${id}`);
    let {item} = await res.json();
    let content = admin.contents[params.collection];

    return {
      props: {
        collection,
        item,
        content,
      }
    };
  }
</script>
<script>
  import { ContentForm, Sidebar } from "$lib";
  
  export let collection;
  export let item;
  export let content;

  let submit = async (e) => {
    let item = e.detail.item;

    let res = await fetch(`/api/${collection}/${item.id}`, {
      method: 'put',
      body: JSON.stringify({
        item,
      }),
    });
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label} / {item.id}
        ContentForm(item='{item}', schemas='{content.schemas}', on:submit='{submit}')
</template>
