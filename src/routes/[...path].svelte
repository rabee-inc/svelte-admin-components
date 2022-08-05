<script context="module">
  import admin from "$admin/index.js"

  // paths から content_id を取得する
  let pathsToContentId = (paths) => {
    // 偶数だけ残す
    let content_paths = paths.filter((p, i) => {
      return i % 2 === 0;
    });

    return content_paths.join('/');
  };

  let pathsToId = (paths) => {
    return paths[paths.length-1];
  };

  export async function load({fetch, params}) {
    let path = params.path;
    let paths = params.path.split('/');
    let mode;

    // mode の判定
    if (paths.length % 2 === 1) {
      mode = 'list';
    }
    else {
      if (paths[paths.length-1] === '_schema') {
        mode = 'schema';
      }
      else {
        mode = 'edit';
      }
    }

    let content_id = pathsToContentId(paths);
    let id;

    if (mode !== 'list') {
      id = pathsToId(paths);
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
        path,
        paths,
        mode,
        content,
        content_id,
        id,
      }
    };
  };
</script>

<script>
  import { goto } from "$app/navigation";
  import { Meta } from "svelte-head";
  import { indicator } from "svelte-modal-manager";

  import List from "./_List.svelte";
  import Edit from "./_Edit.svelte";

  export let path;
  export let paths;
  export let mode;
  export let content;
  export let content_id;
  export let id;

  let onSelect = (e) => {
    let url = `/${path}/${e.detail.item.id}`;
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
        let res = await fetch(`/api/${path}`, {
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
        let res = await fetch(`/api/${path}`, {
          method: 'post',
          body: JSON.stringify({
            item,
          }),
        });
        let json = await res.json();
        console.log('created', json);
        // 単体編集ページに遷移
        let to = path.replace(/new$/, json.item.id);
        goto(`/${to}`, {
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
</script>

<Meta />

<template lang="pug">
  main.s-full.overflow-scroll
    +if('mode === "list"')
      List(content_id='{content_id}', content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "edit"')
      Edit(content_id='{content_id}', content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "schema"')
      div TODO: schema 編集
</template>