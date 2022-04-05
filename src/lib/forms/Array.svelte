<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";
  import Sortable from 'sortablejs';
  import { onMount } from "svelte";
  import handle from "$lib/assets/handle.svg";

  export let schema;
  export let value;

  // setup default value
  if (!value) {
    value = [];
  }

  let key = Date.now();
  let elements;

  let add = () => {
    console.log(schema);
    value.push('');
    value = value;
  };

  onMount(() => {
    Sortable.create(elements, {
      animation: 150,
      handle: '.handle',
      store: {
        set: (sortable) => {
          let temp = sortable.toArray().map(id => {
            return value[id];
          });
          key = Date.now();
          value = temp;
        },
      },
    });
  });

</script>

<template lang='pug'>
  div.block.border
    +if('schema.label')
      div.bg-aliceblue.border-bottom.p8
        div.fs12.mb4 {schema.label}
    div.p16
      div.mb8(bind:this='{elements}')
        +key('key')
          +each('value as v,i')
            div.f.fm.mb8(data-id='{i}')
              img.handle.flex-fixed.p8.mr8(src='{handle}', alt='handle')
              div.w-full
                svelte:component(this='{forms[schema.opts.schema.type]}', schema='{schema.opts.schema}', bind:value='{v}')
      button.button.w-full(type='button', on:click='{add}') +
</template>
