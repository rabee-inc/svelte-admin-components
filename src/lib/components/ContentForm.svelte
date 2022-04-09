<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";

  let className;
  export {className as class};
  export let value;
  export let schemas;
  export let actions;

  let dispatch = createEventDispatcher();
  let instance;

  let submit = async () => {
    let value = await instance.getValue();
    dispatch('submit', {
      value,
    });
  };

  let getObjectSchema = () => {
    return {
      type: "object",
      opts: {
        schemas: schemas,
      }
    };
  };
</script>

<template lang='pug'>
  div(class='{className}')
    form(on:submit|preventDefault='{submit}')
      div.f.fr
        button.button.primary.mb16 save
      div
        svelte:component(bind:this='{instance}', this='{forms.object}', schema='{getObjectSchema()}', actions='{actions}', value='{value}', border='{false}')
</template>
