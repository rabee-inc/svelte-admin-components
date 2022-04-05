<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value;
  console.log(schema,'schema')
  console.log(value,'value')

</script>

<template lang="pug">
  label.block
    div.fs12.mb4 {schema.label}
    input.input(bind:value, type='date')
</template>