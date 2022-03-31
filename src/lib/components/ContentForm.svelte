<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";

  let className;
  export {className as class};

  let dispatch = createEventDispatcher();
</script>

<template lang='pug'>
  div(class='{className}')
    div hoge
</template>
