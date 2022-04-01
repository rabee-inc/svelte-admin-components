<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";

  let className;
  export {className as class};
  export let item;
  export let schemas;

  let dispatch = createEventDispatcher();

  let submit = () => {
    dispatch('submit', {
      item,
    });
  };
</script>

<template lang='pug'>
  div(class='{className}')
    form(on:submit|preventDefault='{submit}')
      button.mb16 save
      div.row.mxn8
        +each('schemas as schema')
          div.px8.mb16
            //- svelte:component(this='{forms[schema.type]}', value='{ getByPath(item, schema.key) }')
            svelte:component(this='{forms[schema.type]}', schema='{schema}', bind:value='{item[schema.key]}')
</template>
