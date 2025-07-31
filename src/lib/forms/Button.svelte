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
    let func;
    if (typeof schema.opts.action === 'function') {
      func = schema.opts.action;
    }
    else if (actions.button[schema.opts.action]) {
      func = actions.button[schema.opts.action];
    }

    if (func) {
      func({
        schema,
        item,
      });
    }
  };
</script>

<template lang='pug'>
  div
    +if('schema.opts?.caution')
      div.fs10.text-danger ※{schema.opts.caution}
    button.button(type='button', on:click='{onAction}') {schema.label}
</template>
