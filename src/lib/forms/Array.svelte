<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value;

  // setup default value
  if (!value) {
    value = [''];
  }

  let add = () => {
    console.log(schema);
    value.push('');
    value = value;
  };

</script>

<template lang='pug'>
  div.block.border
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.p16
      div.mb8
        +each('value as i')
          div.mb8
            svelte:component(this='{forms[schema.opts.schema.type]}', schema='{schema.opts.schema}', bind:value='{i}')
      button.button.w-full(type='button', on:click='{add}') +
</template>
