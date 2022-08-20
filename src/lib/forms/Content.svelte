<svelte:options accessors={true}/>

<script>
  import { getByPath } from "$lib/utils";
  import { onMount } from "svelte";
  import { openModal } from 'svelte-modal-manager';

  export let path;
  export let schema;
  export let actions;
  export let value = '';
  export let item;

  let items = [];
  let content = null;

  onMount(async () => {
    if (!value) return ;

    let res = await actions.api.get({
      path: `${schema.opts.content_path}/${value}`
    });

    content = res.item;
  });

  let openContentModal = () => {
    let modal = openModal('admin-content', {
      path,
      schema,
      actions,
    });

    modal.$on('select', (e) => {
      content = e.detail.content;
      modal.close();
    });
  };

  // svelte-ignore unused-export-let
  export let getValue = () => {
    return content ? getByPath(content, schema.opts.value_key) : null;
  };
</script>

<template lang='pug'>
  div
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    div.f.fm
      +if('content')
        div.mr16 {getByPath(content, schema.opts.label_key)}
      div
        button.button(type='button', on:click='{openContentModal}') 選択する
</template>
