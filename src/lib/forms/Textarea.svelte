<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = 'hoge';
</script>

<template lang='pug'>
  label.block
    div.fs12.mb4 {schema.label}
    textarea.w-full.border.px8.py4(bind:value, rows='8')
</template>
