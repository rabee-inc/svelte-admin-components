<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = null;
  // svelte-ignore unused-export-let
  export let formValue = null;
  // svelte-ignore unused-export-let
  export let actions = null;
  // svelte-ignore unused-export-let
  export let item = null;
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.mb4
        div.fs12 {schema.label} 
          +if('schema.opts?.required')
            span *
        +if('schema.opts?.description')
          div.fs10 {schema.opts.description}
        +if('schema.opts?.caution')
          div.fs10.text-danger ※{schema.opts.caution}
    input.w-full.border.rounded-4.px8.py4(bind:value, type='text', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
</template>
