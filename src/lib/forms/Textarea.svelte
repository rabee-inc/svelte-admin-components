<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let actions = '';
  // svelte-ignore unused-export-let
  export let item;

</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    textarea.w-full.border.rounded-4.px8.py4(bind:value, rows='{schema.opts?.cols || 8}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
</template>
