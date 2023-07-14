<svelte:options accessors={true}/>

<script context="module">
  /** @type {import('@rabee-org/svelte-modal-manager/types').ModalDefaultOptions} */
  export const { dismissible, position, focus, transition, overlay, timeout } = {
    // dismissible: false,
    // position: { x: 'center', y: 'middle' },
    // focus: false,
    // transition: {
    //   type: fly,
    //   props: {
    //     y: 8,
    //     duration: 256,
    //   },
    // },
    // overlay: {
    //   styles: {
    //     background: 'rgba(0, 0, 0, 0.75)',
    //   },
    // },
    // timeout: 2000,
  };
</script>

<script>
  import ContentList from '$lib/components/ContentList.svelte';
  import { getByPath } from '$lib/utils';
  import { getModalContext } from '@rabee-org/svelte-modal-manager';
  
  const { close, awaitClose, result, isClosed, dispatch } = getModalContext();

  export let path;
  export let actions;

  let content = actions.pathToContent(path);

  let onSelect = (e) => {
    $result = e.detail.item;
    dispatch('select', {
      item: $result,
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