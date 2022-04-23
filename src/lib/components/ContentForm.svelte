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
  let form;
  let instance;

  export let submit = async () => {
    // check validity
    if (!form.reportValidity()) return ;

    let value = await instance.getValue();
    dispatch('submit', {
      value,
    });
  };

  // svelte-ignore unused-export-let
  export let del = async () => {
    let value = await instance.getValue();
    dispatch('delete', {
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
    form(bind:this='{form}', on:submit|preventDefault='{submit}')
      //- Enter 用に submit ボタンを配置
      button.hide(type='submit')
      div
        svelte:component(bind:this='{instance}', this='{forms.object}', schema='{getObjectSchema()}', actions='{actions}', value='{value}', border='{false}')
</template>
