<script>
  import '../app.css';
  import '/static/icons/icons.css';

  import { Sidebar } from "svelte-admin-components";
  import admin from "$admin/index.js"
</script>

<style lang="less" global>
  @import '/src/admin/styles/global.less';
</style>

<template lang="pug">
  div.f.fclm.s-full
    div.s-full.f.overflow-hidden
      Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
      div.s-full.f.flex-column
        slot
</template>
