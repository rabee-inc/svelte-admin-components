<svelte:options accessors={true}/>

<script>
  export let schema;
  export let actions;
  export let item;
  // svelte-ignore unused-export-let
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  
  let onAction = () => {
    actions.button[schema.opts.action]?.({
      schema,
      item,
    });
  };
</script>

<template lang='pug'>
  div
    button.button(type='button', on:click='{onAction}') {schema.label}
</template>
