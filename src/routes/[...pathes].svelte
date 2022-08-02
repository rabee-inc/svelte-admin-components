<script context="module">
import { contents } from "$lib";


  export async function load({fetch, params}) {
    let pathes = params.pathes.split('/');
    let mode = (pathes.length % 2 === 0) ? 'edit' : 'list';

    let content_id;

    if (mode === 'edit') {
      content_id = pathes[pathes.length  - 2];
    }
    else {
      content_id = pathes[pathes.length  - 1];
    }

    console.log(content_id);
    if (!contents.schemas[content_id]) {
      // return {
      //   redirect: 404,
      // }
    }

    return {
      props: {
        mode,
      }
    };
  };
</script>

<script>
  export let mode;
</script>

<template lang="pug">
  div {mode}
</template>