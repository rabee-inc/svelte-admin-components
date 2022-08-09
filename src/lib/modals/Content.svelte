<svelte:options accessors={true}/>

<script>

  import { createEventDispatcher, onMount } from 'svelte';
  export const dispatch = createEventDispatcher();
  // svelte-ignore unused-export-let
  export let close;
  // svelte-ignore unused-export-let
  export let awaitClose;

  export let schema;
  export let actions;

  let items = [];

  onMount(async () => {
    let res = await actions.api.index({
      path: `${schema.opts.content_name}`
    });

    items = [...items, ...res.items];
  });

  let selectContent = (content) => {
    dispatch('select', {
      content,
    });
  };

</script>

<template lang='pug'>
  div.modal.rounded-8.overflow-scroll
    div.p16
      +each('items as item')
        button.block.w-full.p8.hover-trigger.text-left.mb4(type='button', on:click!='{ () => selectContent(item) }') {item[schema.opts.label_key]}
</template>

<style lang="less">
  .modal {
    min-width: 300px;
    max-width: 90vw;
    max-height: 80vh;
    width: 340px;
    background-color: rgba(255, 255, 255, 0.90);
    color: #222222;
  }
</style>