<script>
  
  // setup head
  import {setOptions} from 'svelte-head';

  setOptions({
    title(title) {
      return title;
    },
    description(description) {
      return description;
    },
    keywords(keywords) {
      return keywords;
    },
    noindex() {
      return true;
    },
    nofollow() {
      return true;
    },
  });

  import { Sidebar } from "svelte-admin-components";
  import admin from "$admin/index.js";

  let name = 'Admin demo';
</script>

<style lang="less" global>
  @import '/src/app.css';
  @import '/src/admin/styles/global.less';
</style>

<template lang="pug">
  div.f.fclm.s-full
    div.s-full.f
      Sidebar.w300.bg-primary.text-white(name='{name}', sections='{admin.sections}')
      div.s-full.f.flex-column.overflow-hidden
        slot
</template>
