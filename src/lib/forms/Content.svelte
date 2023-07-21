<svelte:options accessors={true}/>

<script>
  import { getByPath } from "$lib/utils";
  import { onMount } from "svelte";
  import { modalContent } from "../index.js";

  export let path;
  export let schema;
  export let actions;
  export let value = '';
  export let item;

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  let items = [];
  let contentItem = null;

  onMount(async () => {
    if (!value) return ;

    let res = await actions.api.get({
      path: `${schema.opts.content_path}/${value}`
    });

    contentItem = res.item;
  });

  let openContentModal = () => {
    let modal = modalContent.open({
      path: schema.opts.content_path,
      actions,
    });

    modal.$on('select', (e) => {
      contentItem = e.detail.item;

      dispatch('change');
      modal.close();
    });
  };

  // svelte-ignore unused-export-let
  export let getValue = () => {
    return contentItem ? getByPath(contentItem, schema.opts.value_key) : null;
  };
</script>

<template lang='pug'>
  div
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    div.f.fm
      +if('contentItem')
        div.mr16 {getByPath(contentItem, schema.opts.label_key)}
      div
        button.button(type='button', on:click='{openContentModal}') 選択する
</template>
