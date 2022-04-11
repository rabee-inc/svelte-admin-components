<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    select.px8.py4.border.rounded-4.lh15(bind:value, on:change)
      +each('schema.opts.choices as choice')
        option(value='{choice.value}') {choice.label || choice.value}
</template>
