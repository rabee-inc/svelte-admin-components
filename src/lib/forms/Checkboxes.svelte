<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let schema;
  export let value = [];
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;

  let tempValue = value;
  let _choices = [];

  let setupChoices = async (choices) => {
    // 文字列だったら関数化して結果を返す
    if (typeof choices === 'string') {
      // 共通の関数もしくは配列に変換
      choices = actions[choices];
    }

    if (typeof choices === 'function') {
      _choices = await choices({schema, value});
    }
    else {
      _choices = choices;
    }
  };


  onMount(() => {
    setupChoices(schema.opts.choices);
  });

  // svelte-ignore unused-export-let
  export let getValue = () => {
    return tempValue;
  };
</script>

<template lang='pug'>
  div.block
    +if('schema.label')
      div.mb4
        div.fs12 {schema.label} 
          +if('schema.opts?.required')
            span *
        +if('schema.opts?.description')
          div.fs10 {schema.opts.description}
        +if('schema.opts?.caution')
          div.fs10.text-danger ※{schema.opts.caution}
    div.row
      +each('_choices as choice')
        label.f.fm.flex-fixed.mr16.mr0-last
          input.mr4(type='checkbox', bind:group='{tempValue}', value='{choice.value}')
          span(value='{choice.value}') {choice.label || choice.value}
</template>