<script context="module">
</script>
<script>
  import { Sidebar } from "svelte-admin-components";
  import admin from "$admin/admin.js"

</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        div.f.fclm.fm.mb36
          h1.ts-large.mb4 svelte-admin-components demo
</template>
