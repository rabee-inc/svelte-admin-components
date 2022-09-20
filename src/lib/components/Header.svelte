<script>
  export {className as class};
  export let path;
  export let label;
  export let actions;
  export let buttons = [];

  let className = null;
  let breadcrumbs = [];

  $: {
    breadcrumbs = [];

    let pathes = path.split('/');
    let temp_pathes = [];

    pathes.forEach((p, i) => {
      temp_pathes.push(p);

      let label = p;
      let temp_path = temp_pathes.join('/');

      if (i%2 === 0) {
        let content = actions.pathToContent(temp_path);

        if (content) {
          label = content.label;
        }
      }

      breadcrumbs.push({
        label,
        link: `/${temp_path}`,
      });
    });
  }
</script>

<template lang="pug">
  div.f.fm.flex-between(class='{className}')
    div.overflow-scroll
      h1.fs14.f
        +each('breadcrumbs as breadcrumb,i')
          a.flex-fixed(href='{breadcrumb.link}') {breadcrumb.label} 
          +if('i < (breadcrumbs.length-1)')
            span.mx4 / 

    div.f.fm
      div.f.fm
      +each('buttons as button')
        +if('!button.shouldShow || button.shouldShow()')
          button.button.ml8(type='button', class!='{button.kind || ""}', on:click='{button.onclick}') {button.label}
      slot(name='right')
</template>