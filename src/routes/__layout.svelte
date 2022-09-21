<script>
  import '../app.js';
  import '../app.css';

  import { Sidebar } from "svelte-admin-components";
  import admin from "$admin/index.js";

  let name = 'Admin demo';
</script>

<style lang="less" global>
  @import '../admin/styles/global.less';
</style>

<template lang="pug">
  div.f.fclm.s-full
    div.s-full.f.overflow-hidden
      Sidebar.flex-fixed.w200.bg-primary.text-white(logo='/images/logo.svg', name='{name}', sections='{admin.sections}')
      div.s-full.f.flex-column.overflow-hidden
        slot
</template>
