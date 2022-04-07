<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let schema;
  export let actions;
  export let value = '';

  let input;
  let click = async () => {
    if (actions.selectImage) {
      let image = await actions.selectImage();
      value = image;
    }
    else {
      input.click();
    }
  };

  let setImage = (file) => {
    let image = actions.uploadImage(file);
    value = image;
  };

  onMount(() => {
    input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      let file = e.target.files[0];
      if (!file) return ;

      setImage(file);
    };
  });

</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div.relative.inline-block
      img.max-height-300(src='{value.url}')
      div.absolute.trbl0.s-full.f.fh.fs26.cursor-pointer(on:click='{click}') +
    //- input.w-full.border.px8.py4(type='text', bind:value='{value}', required!='{schema.opts && schema.opts.required}', readonly!='{schema.opts?.readonly}')
</template>


<style lang="less">
  .max-height-300 {
    max-height: 300px;
  }
</style>