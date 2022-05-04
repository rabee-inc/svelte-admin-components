<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let actions;
  export let item;
  export let value;
  let instance;

  // svelte-ignore unused-export-let
  export let getValue = () => {
    return instance.getValue();
  };
</script>

<template lang='pug'>
  div
    svelte:component(bind:this='{instance}', this='{forms.object}', schema='{schema}', actions='{actions}', value='{item}')
</template>
