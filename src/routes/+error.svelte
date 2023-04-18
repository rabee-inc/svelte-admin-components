<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
    return {
      props: {
        status,
        message: error.message,
        title: `${status}: ${error.message}`
      }
    };
  }
</script>

<script>
  export let status;
  export let message;
</script>

<template lang="pug">
  main.f.fh.s-full
    div.py64.text-center
      h1.fs64 {status}
      p {message}
</template>
