<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let schema;
  export let actions;
  export let value = '';

  let items = [];
  let content = null;

  onMount(async () => {
    // let contents = await actions.contents.index({
    //   schema,
    // });

    // items.push(...contents.items);

    content = await actions.contents.get({
      schema,
      value,
    });
  });

  // svelte-ignore unused-export-let
  export let getValue = () => {
    return '9bd9d8d6-9a67-44e0-b467-cc8796ed151a';
  };

</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    div.f.fm
      div.mr16
        +if('content')
          div {content[schema.opts.label_key]}
          +else
      button.button(type='button') 選択する
      
</template>
