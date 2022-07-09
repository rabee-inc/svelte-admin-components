<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import { contents } from "$lib/index.js";
  import { getByPath } from "$lib/utils";

  let className = null;
  export {className as class};
  export let headings = [];
  export let items = [];

  let dispatch = createEventDispatcher();

  let select = (e, item) => {
    dispatch('select', {
      item,
      originalEvent: e,
    });
  };
</script>

<template lang='pug'>
  div.w-full.overflow-scroll(class='{className}')
    table.w-full.border-spacing-0.border-collapse-collapse
      thead
        tr.border-bottom.text-left
          +each('headings as heading')
            th.min-width-150.px12.py16.text-gray.bold.word-break-keep {heading.label}
      tbody
        +each('items as item')
          tr.border-bottom.transition.hover-bg.cursor-pointer(on:click!='{(e) => select(e, item)}')
            +each('headings as heading')
              td.p12.fs13
                svelte:component(this='{contents[heading.type]}', value='{ getByPath(item, heading.key) }')
</template>

<style lang="less">
  .hover-bg {
    &:hover {
      background-color: aliceblue;
    }
  }

  .min-width-150 {
    min-width: 150px;
  }
</style>