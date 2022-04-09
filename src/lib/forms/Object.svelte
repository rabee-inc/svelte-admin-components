<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";
  import { getByPath, setByPath } from "$lib/utils";

  export let schema;
  export let actions;
  export let value;
  export let border = true;
  // svelte-ignore unused-export-let
  export let getValue = async () => {
    let v = {};
    let promises = Object.entries(instances).map(async ([key, instance]) => {
      let temp = instance.getValue ? instance.getValue() : instance.value;

      if (temp instanceof Promise) {
        temp = await temp;
      }

      setByPath(v, key, temp);
    });

    await Promise.all(promises);

    return v;
  };

  // setup default value
  if (!value) {
    value = {};
  }

  let instances = {};
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
  div.rounded-4(class:border)
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.row.p24.mxn8.mbn16
      +each('getOpts(schema).schemas as schema')
        +if('shouldShow(schema, value)')
          div.w-full.px8.mb16(class='{schema.class}')
            svelte:component(bind:this='{instances[schema.key]}', this='{forms[schema.type]}', schema='{schema}', actions='{actions}', item='{value}', value='{getByPath(value, schema.key)}')
</template>
