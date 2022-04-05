<script context="module">
  import admin from "$demo/admin.js"
  export async function load({fetch, params}) {
    let collection = params.collection;
    let id = params.id;
    let content = admin.contents[params.collection];
    let item;

    if (params.id !== 'new') {
      let res = await fetch(`/api/${collection}/${id}`);
      let data = await res.json();
      item = data.item;
    }
    else {
      item = {};
    }

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
  import { goto } from "$app/navigation";
  import { ContentForm, Sidebar } from "svelte-admin-components";

  export let collection;
  export let item;
  export let content;

  let submit = async (e) => {
    let item = e.detail.item;

    if (item.id) {
      let res = await fetch(`/api/${collection}/${item.id}`, {
        method: 'put',
        body: JSON.stringify({
          item,
        }),
      });
      let json = await res.json();
      console.log('saved', json);
    }
    else {
      let res = await fetch(`/api/${collection}`, {
        method: 'post',
        body: JSON.stringify({
          item,
        }),
      });
      let json = await res.json();
      console.log('created', json);

      // 単体編集ページに遷移
      goto(`/${collection}/${json.item.id}`, {
        replaceState: true,
      });
    }
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label} / {item.id || 'new'}
        ContentForm(item='{item}', schemas='{content.schemas}', on:submit='{submit}')
</template>
