<svelte:options accessors={true}/>

<script>
  import { contents } from "$lib/index.js";
  import { getByPath } from "$lib/utils";

  let className;
  export {className as class};
  export let headings = [];
  export let items = [];
</script>

<template lang='pug'>
  div(class='{className}')
    table.w-full.w-full.border-spacing-0.border-collapse-collapse
      thead
        tr.border-bottom.text-left
          +each('headings as heading')
            th.px12.py16.text-gray.bold.word-break-keep {heading.label}
      tbody
        +each('items as item')
          tr.border-bottom.transition.hover-bg.cursor-pointer
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
</style>