<svelte:options accessors={true}/>

<script>
  import ContentList from '$lib/components/ContentList.svelte';
  import { getByPath } from '$lib/utils';

  import { createEventDispatcher, onMount } from 'svelte';
  export const dispatch = createEventDispatcher();
  // svelte-ignore unused-export-let
  export let close;
  // svelte-ignore unused-export-let
  export let awaitClose;

  export let path;
  export let actions;

  export let value;

  let content = actions.pathToContent(path);

  let onSelect = (e) => {
    value = e.detail.item;
    dispatch('select', {
      item: value,
    });
  };

</script>

<template lang='pug'>
  div.modal.rounded-8.overflow-scroll
    div.p16.w-full
      ContentList(path='{path}', content='{content}', actions='{actions}', limit='{16}', on:select='{onSelect}')
</template>

<style lang="less">
  .modal {
    min-width: 300px;
    max-width: 90vw;
    max-height: 80vh;
    width: 100%;
    background-color: white;
    color: #222222;
  }
</style>