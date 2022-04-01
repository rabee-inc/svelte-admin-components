<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value = [''];

  let add = () => {
    value.push('');
    value = value;
  };

</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div
      +each('value as i')
        div.mb4
          svelte:component(this='{forms[schema.opts.schema.type]}', schema='{schema.opts.schema}', bind:value='{i}')
      button.button(type='button', on:click='{add}') add
</template>
