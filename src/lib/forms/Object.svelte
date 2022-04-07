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

  let shouldShow = (schema) => {
    let condition = schema.condition;
    if (condition) {
      let a = value[condition.key];
      let b = condition.value;

      if (condition.operation === '==') {
        return a === b;
      }
      // TODO: <, <=, >, >=

      return false;
    }
    return true;
  };
</script>

<template lang='pug'>
  div.border
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.row.p16.mxn8
      +each('getOpts(schema).schemas as schema')
        +if('shouldShow(schema, value)')
          div.w-full.px8.mb16.mb0-last(class='{schema.class}')
            svelte:component(this='{forms[schema.type]}', schema='{schema}', item='{value}', bind:value='{value[schema.key]}')
</template>
