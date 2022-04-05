<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
</script>

<template lang='pug'>
    label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    input.input.w-full(bind:value, type='number')
</template>
