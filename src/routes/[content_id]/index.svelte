<script context="module">
  import admin from "$admin/index.js"
  export async function load({fetch, params}) {
    let content_id = params.content_id;
    let res = await fetch(`/api/${content_id}`);
    let {items} = await res.json();
    let content = admin.contents[content_id];

    return {
      props: {
        content_id,
        items,
        content,
      }
    };
  }
</script>
<script>
  import { goto } from "$app/navigation";
  import { Meta } from 'svelte-head';

  import { ContentList } from "svelte-admin-components";

  export let content_id;
  export let items = [];
  export let content;

  let select = (e) => {
    let url = `/${content.path}/${e.detail.item.id}`;
    if (e.detail.originalEvent.metaKey) {
      // 新しいタブで開く
      window.open(url);
    }
    else {
      goto(url);
    }
  };
</script>

<Meta />

<template lang='pug'>
  main.s-full.overflow-scroll
    div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
      div.f.fm
        h1.mr8 {content.label}
        a.fs12.p4.mt6(href='/{content.path}/edit')
          i.material-icons.fs18 edit
      div
        a.button.primary(href='/{content.path}/new') NEW
    div.p16
      ContentList(items='{items}', headings='{content.headings}', on:select='{select}')
</template>
