<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = 'hoge';
</script>

<template lang='pug'>
  label.block
    div.fs12.mb4 {schema.label}
    input.border.px8.py4(type='text', bind:value='{value}')
</template>
