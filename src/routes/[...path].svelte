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

  import List from "./_List.svelte";
  import Edit from "./_Edit.svelte";

  export let path;
  export let paths;
  export let mode;
  export let content;
  export let content_id;
  export let id;
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