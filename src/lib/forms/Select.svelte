<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value = '';
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    //- TODO: select は readonly 効かないので対策考える
    select.px8.py4.border.rounded-4.lh15(bind:value, required!='{schema.opts?.required}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
      +each('schema.opts.choices as choice')
        option(value='{choice.value}') {choice.label || choice.value}
</template>
