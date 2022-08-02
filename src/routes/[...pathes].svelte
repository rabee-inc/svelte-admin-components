<script context="module">
  import admin from "$admin/index.js"

  export async function load({fetch, params}) {
    let pathes = params.pathes.split('/');
    let mode;

    // mode の判定
    if (pathes.length % 2 === 1) {
      mode = 'list';
    }
    else {
      if (pathes[pathes.length-1] === '_schema') {
        mode = 'schema';
      }
      else {
        mode = 'edit';
      }
    }

    let content_id;
    let id;

    if (mode === 'list') {
      content_id = pathes[pathes.length  - 1];
    }
    else {
      content_id = pathes[pathes.length  - 2];
      id = pathes[pathes.length  - 1];
    }

    // TODO: 多階層を考慮する必要あり
    let content = admin.contents[content_id];
    if (!content) {
      return {
        status: 404,
        error: new Error('page not found!'),
      };
    }

    return {
      props: {
        path: params.pathes,
        pathes,
        mode,
        content,
        content_id,
        id,
      }
    };
  };
</script>

<script>
  import ContentForm from "$lib/components/ContentForm.svelte";
  import ContentList from "$lib/components/ContentList.svelte";
  import { goto } from "$app/navigation";
  import { Meta } from "svelte-head";
  import { indicator } from "svelte-modal-manager";

  export let path;
  export let pathes;
  export let mode;
  export let content;
  export let content_id;
  export let id;

  let form;
  let item = null;
  let items = [];

  let setup = () => {
    item = null;
    items = [];
  };

  let fetchItems = async () => {
    let res = await fetch(`/api/${content_id}`);
    ({items} = await res.json());
  };

  let fetchItem = async () => {
    if (id === 'new') return ;

    let res = await fetch(`/api/${content_id}/${id}`);
    ({item} = await res.json());
  };

  let onSelect = (e) => {
    let url = `/${content.path}/${e.detail.item.id}`;
    if (e.detail.originalEvent.metaKey) {
      // 新しいタブで開く
      window.open(url);
    }
    else {
      goto(url);
    }
  };

  let onSubmit = async (e) => {
    let item = e.detail.value;

    if (item.id) {
      let i = indicator();

      try {
        let res = await fetch(`/api/${content_id}/${item.id}`, {
          method: 'put',
          body: JSON.stringify({
            item,
          }),
        });
        let json = await res.json();
        console.log('saved', json);
      }
      catch (e) {

      }
      finally {
        setTimeout(() => {
          i.close();
        }, 512);
      }
    }
    else {
      let i = indicator();

      try {
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
      catch (e) {

      }
      finally {
        setTimeout(() => {
          i.close();
        }, 512);
      }
    }
  };

  let onDelete = async () => {
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

  $: {
    mode;
    content_id;
    id;

    setup();

    if (mode === 'list') {
      fetchItems();
    }
    else if (mode === 'edit') {
      fetchItem();
    }
  }
</script>

<Meta />

<template lang="pug">
  main.s-full.overflow-scroll
    +if('mode === "list"')
      div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
        div.f.fm
          h1.mr8 {content.label}
          a.fs12.p4.mt6(href='/{content.path}/_schema')
            i.material-icons.fs18 edit
        div
          a.button.primary(href='/{content.path}/new') NEW
      div.p16
        ContentList(items='{items}', headings='{content.headings}', actions='{admin.actions}', on:select='{onSelect}')
    +if('mode === "edit"')
      div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
        h1.fs16 {content.label} / {item?.id || 'new'}
        div.f
          +if('item?.id')
            button.button.danger.mr8(type='button', on:click!='{onDelete}') delete
          button.button.primary(on:click='{form.submit()}') {item?.id ? 'save' : 'create'}
      div.p16
        ContentForm(bind:this='{form}', value='{item}', sections='{content.sections}', actions='{admin.actions}', on:submit='{onSubmit}')
    +if('mode === "schema"')
      div TODO: schema 編集
</template>