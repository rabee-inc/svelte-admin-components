<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value;

  // setup default value
  if (!value) {
    value = {};
  }

  let getOpts = () => {
    let opts = schema.opts;
    if (typeof schema.opts === 'function') {
      opts = schema.opts({
        value,
      });
    }
    return opts;
  };
</script>

<template lang='pug'>
  div.border
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.row.p16.mxn8
      +each('getOpts().schemas as schema')
        div.w-full.px8.mb16.mb0-last(class='{schema.class}')
          svelte:component(this='{forms[schema.type]}', schema='{schema}', bind:value='{value[schema.key]}')
</template>
