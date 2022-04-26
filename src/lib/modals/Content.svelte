<svelte:options accessors={true}/>

<script>
import Select from '$lib/forms/Select.svelte';

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
    let contents = await actions.content.index({
      schema,
    });

    items = [...items, ...contents.items];
  });

  let selectContent = (content) => {
    dispatch('select', {
      content,
    });
  };

  // let submit = () => {
  //   dispatch('submit');
  //   close();
  // };
</script>

<template lang='pug'>
  div.modal.rounded-8.overflow-scroll
    div.p16
      +each('items as item')
        button.p8.mb4(type='button', on:click!='{ () => selectContent(item) }') {item[schema.opts.label_key]}
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