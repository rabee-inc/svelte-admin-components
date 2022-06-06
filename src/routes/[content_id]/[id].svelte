<script context="module">
  import admin from "$admin/index.js"
  export async function load({fetch, params}) {
    let content_id = params.content_id;
    let id = params.id;
    let content = admin.contents[content_id];
    let item;

    if (id !== 'new') {
      let res = await fetch(`/api/${content_id}/${id}`);
      let data = await res.json();
      item = data.item;
    }
    else {
      item = {};
    }

    return {
      props: {
        content_id,
        item,
        content,
      }
    };
  }
</script>
<script>
  import { goto } from "$app/navigation";
  import { ContentForm } from "svelte-admin-components";
  import { indicator } from 'svelte-modal-manager';

  export let content_id;
  export let item;
  export let content;

  let form;

  let submit = async (e) => {
    let item = e.detail.value;

    if (item.id) {
      let i = indicator();

      let res = await fetch(`/api/${content_id}/${item.id}`, {
        method: 'put',
        body: JSON.stringify({
          item,
        }),
      });
      let json = await res.json();
      console.log('saved', json);

      setTimeout(() => {
        i.close();
      }, 512);
    }
    else {
      let res = await fetch(`/api/${content_id}`, {
        method: 'post',
        body: JSON.stringify({
          item,
        }),
      });
      let json = await res.json();
      console.log('created', json);

      // 単体編集ページに遷移
      goto(`/${content_id}/${json.item.id}`, {
        replaceState: true,
      });
    }
  };

  let del = async () => {
    if (!confirm('really?')) {
      return ;
    }

    await fetch(`/api/${content_id}/${item.id}`, {
      method: 'delete',
    });

    console.log('deleted');

    // 一覧ページに戻る
    goto(`/${content_id}`, {
      replaceState: true,
    });
  };
</script>

<template lang='pug'>
  main.s-full.overflow-scroll
    div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
      h1.fs16 {content.label} / {item.id || 'new'}
      div.f
        +if('item.id')
          button.button.danger.mr8(type='button', on:click!='{del}') delete
        button.button.primary(on:click='{form.submit()}') {item.id ? 'save' : 'create'}
    div.p16
      ContentForm(bind:this='{form}', value='{item}', sections='{content.sections}', actions='{admin.actions}', on:submit='{submit}', on:delete='{del}')
</template>
