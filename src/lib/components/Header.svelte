<script>
  export {className as class};
  export let path;
  export let label;
  export let actions;
  export let buttons = [];

  let className = null;
</script>

<template lang="pug">
  div.f.fm.flex-between(class='{className}')
    h1.fs16 {label}
    div.f.fm
      div.f.fm
      +each('buttons as button')
        +if('!button.shouldShow || button.shouldShow()')
          button.button.ml8(type='button', class!='{button.kind || ""}', on:click='{button.onclick}') {button.label}
      slot(name='right')
</template>