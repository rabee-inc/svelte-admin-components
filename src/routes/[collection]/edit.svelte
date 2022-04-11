<script context="module">
  import admin from "$demo/admin.js"
  export async function load({fetch, params}) {
    let collection = params.collection;
    let content = admin.contents[collection];

    return {
      props: {
        collection,
        content,
      }
    };
  }
</script>
<script>
  import { ContentForm, Sidebar, CONTENT_SCHEMA } from "svelte-admin-components";

  export let content;
  export let collection;

  let submit = async (e) => {
    let value = e.detail.value;

    // 更新
    Object.assign(content, value);
    admin.contents[collection] = content;
    
    await fetch('/api/contents', {
      method: 'post',
      body: JSON.stringify({
        contents: admin.contents,
      })
    });

    console.log('writed');
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label} edit
        ContentForm(value='{content}', schemas='{CONTENT_SCHEMA}', actions='{admin.actions}', on:submit='{submit}')
</template>
