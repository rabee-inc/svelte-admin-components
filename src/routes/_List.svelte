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
  div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
    div.f.fm
      h1.mr8 {content.label}
      a.fs12.p4.mt6(href='/{path}/_schema')
        i.material-icons.fs18 edit
    div
      a.button.primary(href='/{path}/new') NEW
  div.p16
    div.mb16
      ContentList(path='{path}', headings='{content.headings}', actions='{actions}', limit='{16}', on:select='{onSelect}')
</template>