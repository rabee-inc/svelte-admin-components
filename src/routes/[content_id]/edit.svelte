<script context="module">
  import admin from "$admin/index.js"
  export async function load({fetch, params}) {
    let content_id = params.content_id;
    let content = admin.contents[content_id];

    return {
      props: {
        content_id,
        content,
      }
    };
  }
</script>
<script>
  import { ContentForm, SCHEMA_CONTENT } from "svelte-admin-components";

  export let content;
  export let content_id;

  let form;

  let submit = async (e) => {
    let value = e.detail.value;

    // 更新
    Object.assign(content, value);
    admin.contents[content_id] = content;
    
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
  main.s-full.overflow-scroll
    div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
      h1.fs16 {content.label} edit
      div.f
        button.button.primary(on:click='{form.submit()}') save
    div.p16
      ContentForm(bind:this='{form}', value='{content}', sections='{SCHEMA_CONTENT}', actions='{admin.actions}', on:submit='{submit}')
</template>
