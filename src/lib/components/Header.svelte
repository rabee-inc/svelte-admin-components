<script>
  export {className as class};
  export let label;
  export let actions = [];

  let className = null;
</script>

<template lang="pug">
  div.f.fm.flex-between(class='{className}')
    h1.fs16 {label}
    div.f.fm
      div.f.fm
      +each('actions as action')
        +if('!action.shouldShow || action.shouldShow()')
          button.button.ml8(type='button', class!='{action.kind || ""}', on:click='{action.onclick}') {action.label}
      slot(name='right')
</template>