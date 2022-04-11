<script context="module">
  import admin from "$admin/admin.js"
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

  let form;

  let submit = async (e) => {
    let item = e.detail.value;

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

  let del = async () => {
    if (!confirm('really?')) {
      return ;
    }

    await fetch(`/api/${collection}/${item.id}`, {
      method: 'delete',
    });

    console.log('deleted');

    // 一覧ページに戻る
    goto(`/${collection}`, {
      replaceState: true,
    });
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        div.f.fm.flex-between.mb16
          h1.fs16 {content.label} / {item.id || 'new'}
          div.f
            +if('item.id')
              button.button.danger.mr8(type='button', on:click!='{del}') delete
            button.button.primary(on:click='{form.submit()}') {item.id ? 'save' : 'create'}
        ContentForm(bind:this='{form}', value='{item}', schemas='{content.schemas}', actions='{admin.actions}', on:submit='{submit}', on:delete='{del}')
</template>
