<svelte:options accessors={true}/>

<script>
  let className;
  export {className as class};
  export let sections = [];
</script>

<template lang='pug'>
  div.min-h100vh.p16(class='{className}')
    +each('sections as section')
      div.mb32
        div.text-uppercase.bold.opacity-50.mb8 {section.label}
        
        div
          +each('section.items as item')
            a.block.fs16.mb8(href='{item.link}')
              div {item.label}
</template>

<style lang="less">
  .min-h100vh {
    min-height: 100vh;
  }
</style>