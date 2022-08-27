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
  import {Header} from "svelte-admin-components";

  export let path;
  export let paths;
  export let mode;
  export let content;
  export let id;

  content = admin.actions.pathToContent(path);

  let getHeaderLabel = (path) => {
    return id ? `${content.label} / ${id}` : content.label;
  };

  let getHeaderActions = (path) => {
    if (mode === 'list') {
      // 一覧
      return [
        {
          label: 'NEW',
          kind: 'primary',
          onclick: () => {
            goto(`/${path}/new`);
          }
        },
      ];
    }
    else if (id === 'new') {
      // 新規作成
      return [
        {
          label: 'CREATE',
          kind: 'primary',
          onclick: () => {
            alert();
          }
        },
      ];
    }
    else {
      // 編集
      return [
        {
          label: 'DELETE',
          kind: 'danger',
          onclick: () => {
            alert();
          }
        },
        {
          label: 'SAVE',
          kind: 'primary',
          onclick: () => {
            alert();
          }
        },
      ];
    }
  };
</script>

<Meta />

<template lang="pug">
  main.s-full.overflow-scroll
    Header.p16.sticky.t0.box-shadow.bg-white.relative.z100(label='{getHeaderLabel(path)}', actions='{getHeaderActions(path)}')

    +if('mode === "list"')
      List(content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "edit"')
      Edit(content='{content}', path='{path}', actions='{admin.actions}', id='{id}')
    +if('mode === "schema"')
      div TODO: schema 編集
</template>
