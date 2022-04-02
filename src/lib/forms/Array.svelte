<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value = [_getDefaultValue()];

  let add = () => {
    console.log(schema);
    value.push(_getDefaultValue());
    value = value;
  };

  let _getDefaultValue = () => {
    if (schema.type === 'object') {
      return {};
    }
    else if (schema.type === 'array') {
      return [];
    }

    return '';
  };

</script>

<template lang='pug'>
  div.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div
      +each('value as i')
        div.mb4
          svelte:component(this='{forms[schema.opts.schema.type]}', schema='{schema.opts.schema}', bind:value='{i}')
      button.button.w-full(type='button', on:click='{add}') +
</template>
