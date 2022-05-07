<svelte:options accessors={true}/>

<script>
  export let schema;
  export let actions;
  export let item;

  let onAction = () => {
    let fn = actions.button[schema.opts.action];

    if (fn) {
      fn({
        schema,
        item,
      });
    }
  };
</script>

<template lang='pug'>
  div
    button.button(type='button', on:click='{onAction}') {schema.label}
</template>
