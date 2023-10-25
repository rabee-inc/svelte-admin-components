<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;

  let _choices = [];

  let setupChoices = async (choices) => {
    // 文字列だったら関数化して結果を返す
    if (typeof choices === 'string') {
      // 共通の関数もしくは配列に変換
      choices = actions[choices];

      if (typeof choices === 'function') {
        _choices = await choices({schema, value});
      }
      else {
        _choices = choices;
      }
    }
    else {
      _choices = choices;
    }
  };

  onMount(() => {
    setupChoices(schema.opts.choices);
  });
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    select.px8.py4.border.rounded-4.lh15(bind:value, required!='{schema.opts?.required}', disabled!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
      +each('_choices as choice')
        option(value='{choice.value}') {choice.label || choice.value}
</template>

<style lang="less">
  select:disabled {
    color: #000;
  }
</style>