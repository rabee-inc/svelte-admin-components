<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";

  export let schema;
  export let value = {};
</script>

<template lang='pug'>
  div.border.p8
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div.row.mxn8
      +each('schema.opts.schemas as schema')
        div.px8.mb16.w-full(class='{schema.class}')
          svelte:component(this='{forms[schema.type]}', schema='{schema}', bind:value='{value[schema.key]}')
</template>
