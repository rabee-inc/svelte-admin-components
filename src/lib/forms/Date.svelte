<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
</script>

<template lang="pug">
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    input.input(bind:value, type='date')
</template>