<script>
  import { ContentList } from "svelte-admin-components";

  export let content;
  export let path;
  export let actions;
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
      ContentList(path='{path}', headings='{content.headings}', actions='{actions}', limit='{16}')
</template>