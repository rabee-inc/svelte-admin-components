<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    input.w-full.border.px8.py4(type='text', bind:value='{value}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', on:change)
</template>
