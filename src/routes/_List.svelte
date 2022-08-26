<script>
  import { goto } from "$app/navigation";
  import { ContentList } from "svelte-admin-components";

  export let content;
  export let path;
  export let actions;

  let onSelect = (e, item) => {
    // 遷移する
    let url = `/${path}/${e.detail.item.id}`;
    if (e.detail.originalEvent.metaKey) {
      // 新しいタブで開く
      window.open(url);
    }
    else {
      goto(url);
    }
  };
</script>

<template lang="pug">
  div.f.fm.flex-between.p16.sticky.t0.box-shadow-1.bg-white.relative.z100
    div.f.fm
      h1.fs16 {content.label}
    div
      a.button.primary(href='/{path}/new') NEW
  div.p16
    div.bg-white.box-shadow.rounded-4.mb16
      ContentList(path='{path}', content='{content}', actions='{actions}', limit='{16}', on:select='{onSelect}')
</template>