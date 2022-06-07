<svelte:options accessors={true}/>

<script>
  import deepExtend from '@jalik/deep-extend';
  import { forms } from "$lib/index.js";
  import { getByPath, setByPath } from "$lib/utils";

  export let schema;
  export let actions;
  export let value;
  export let item;
  export let frame = true;
  
  // svelte-ignore unused-export-let
  export let getValue = async () => {
    let v = {};
    let promises = Object.entries(instances).filter(([key, instance]) => instance).map(async ([key, instance]) => {
      let temp = instance.getValue ? instance.getValue() : instance.value;

      if (temp instanceof Promise) {
        temp = await temp;
      }

      if (instance.schema.type === 'object' && instance.schema.opts.is_section) {
        // is_section:true の場合は key を無視して extend する
        deepExtend(v, temp);
      }
      else {
        setByPath(v, key, temp);
      }
    });

    await Promise.all(promises);

    return v;
  };

  // setup default value
  if (!value) {
    value = {};
  }
  // section の場合は value を item で上書きする
  if (schema.opts.is_section) {
    value = item;
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

  let syncValue = async () => {
    value = await getValue();
  };

</script>

<template lang='pug'>
  div.rounded-4(class:border='{frame}')
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.row.p24.mxn8.mbn16(class:p24='{frame}')
      +each('getOpts(schema).schemas as schema')
        +if('shouldShow(schema, value)')
          div.align-self-top.w-full.px8.mb16(class='{schema.class}')
            svelte:component(bind:this='{instances[schema.key]}', this='{forms[schema.type]}', schema='{schema}', actions='{actions}', item='{value}', value='{getByPath(value, schema.key)}', on:change='{syncValue}')
</template>
