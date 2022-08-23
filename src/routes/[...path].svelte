<script context="module">
  import admin from "$admin/index.js"

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

    let id;

    if (mode !== 'list') {
      id = admin.actions.pathToId(path);
    }

    let content = admin.actions.pathToContent(path);
    if (!content) {
      return {
        status: 404,
        error: new Error('content not found!'),
      };
    }

    return {
      props: {
        path,
        paths,
        mode,
        content,
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
  export let id;

  content = admin.actions.pathToContent(path);
</script>

<Meta />

<template lang="pug">
  main.s-full.overflow-scroll
    +if('mode === "list"')
      List(content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "edit"')
      Edit(content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "schema"')
      div TODO: schema 編集
</template>
