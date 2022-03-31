<svelte:options accessors={true}/>

<script>
  let className;
  export {className as class};
  export let sections = [];
</script>

<template lang='pug'>
  div.min-h100vh.p16(class='{className}')
    +each('sections as section')
      div {section.label}
      
      div.ml16
        +each('section.items as item')
          div {item.label}
</template>

<style lang="less">
  .min-h100vh {
    min-height: 100vh;
  }
</style>