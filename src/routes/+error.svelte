<script>
  import { page } from '$app/stores';
  let status = $page.status;
  let message = $page.error.message;
</script>

<template lang="pug">
  main.f.fh.s-full
    div.py64.text-center
      h1.fs64 {status}
      p.mb12 {message}
      a.button.button.normal(href='/') TOPへ戻る
</template>