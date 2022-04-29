<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";
  import { openModal } from 'svelte-modal-manager';

  export let schema;
  export let actions;
  export let value = '';

  let items = [];
  let content = null;

  onMount(async () => {
    content = await actions.content.get({
      schema,
      value,
    });
  });

  let openContentModal = () => {
    let modal = openModal('admin-content', {
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
    return content ? content[schema.opts.value_key] : null;
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
        div.mr16 {content[schema.opts.label_key]}
      div
        button.button(type='button', on:click='{openContentModal}') 選択する
</template>
