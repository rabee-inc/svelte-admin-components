<svelte:options accessors={true}/>

<script>
  import deepExtend from '@jalik/deep-extend';
  import { forms } from "$lib/index.js";
  import { getByPath, setByPath } from "$lib/utils";

  export let schema;
  export let actions = null;
  export let value;
  export let formValue = null;
  export let item = null;
  export let frame = true;

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  // svelte-ignore unused-export-let
  export let getValue = async () => {
    let v = {};
    let promises = Object.entries(instances).filter(([key, instance]) => instance).map(async ([key, instance]) => {
      if (!key) return ;
      
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

  export const getInstances = () => {
    return instances;
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
    let shouldShow = schema.shouldShow;
    if (shouldShow) {
      let result = shouldShow({
        schema,
        value: formValue || value,
      });

      return result;
    }

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

    dispatch('change');
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
          div.align-self-top.w-full.px8(class!='{schema.class || "mb16"}')
            svelte:component(bind:this='{instances[schema.key]}', this='{forms[schema.type]}', schema='{schema}', actions='{actions}', {formValue}, item='{value}', value='{getByPath(value, schema.key)}', on:change='{syncValue}')
</template>
