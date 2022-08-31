<svelte:options accessors={true}/>

<script>
  import { page } from "$app/stores";
  
  let className;
  export {className as class};
  export let name = 'Admin Demo'
  export let logo;
  export let sections = [];

  let shouldShow = (item) => {
    if (item.shouldShow) {
      return item.shouldShow();
    }
    return true;
  };
</script>

<template lang='pug'>
  div.min-h100vh.p16(class='{className}')
    div.mb16
      a.block.p16.text-center(href='/')
        +if('logo')
          div
            img.w-full(src='{logo}', alt='{name}')
          +else
            span.bold.fs16 {name}
    +each('sections as section')
      +if('shouldShow(section)')
        div.mb32
          div.text-uppercase.bold.opacity-50.mb8 {section.label}
          
          div
            +each('section.items as item')
              +if('shouldShow(item)')
                div.pl8.rounded-8.hover-trigger.hover-bg-light
                  a.block.pl8.py3.fs16(href='{item.link}', class!="{$page.url.pathname.indexOf(item.link) === 0 ? 'pl16 bg-white rounded-top-left-full rounded-bottom-left-full text-primary bold mrn16 mln8' : ''}")
                    div {item.label}
</template>

<style lang="less">
  .min-h100vh {
    min-height: 100vh;
  }
</style>