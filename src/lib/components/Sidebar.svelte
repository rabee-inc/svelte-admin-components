<svelte:options accessors={true}/>

<script>
  import { page } from "$app/stores";
  
  let className;
  export {className as class};
  export let name = 'Admin Demo'
  export let sections = [];
</script>

<template lang='pug'>
  div.min-h100vh.p16(class='{className}')
    div.mb32
      a.bold.fs16(href='/') {name}
    +each('sections as section')
      div.mb32
        div.text-uppercase.bold.opacity-50.mb8 {section.label}
        
        div
          +each('section.items as item')
            a.block.py3.fs16(href='{item.link}', class!="{$page.url.pathname === item.link ? 'pl10 text-primary bg-white bold rounded-top-left-full rounded-bottom-left-full mrn16 mln10' : ''}")
              div {item.label}
</template>

<style lang="less">
  .min-h100vh {
    min-height: 100vh;
  }
</style>