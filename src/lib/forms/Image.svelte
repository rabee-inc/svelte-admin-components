

<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let schema;
  export let actions;
  export let value = '';

  let input;

  // 画像を click したとき
  let click = async () => {
    if (actions.selectImage) {
      let image = await actions.selectImage();
      value = image;
    }
    else {
      input.click();
    }
  };

  // 画像を drop したとき
  let drop = (e) => {
    var file = e.dataTransfer.files[0];
    if (!file) return ;

    // 画像以外は弾く
    if (/^image/.test(file.type) === false) return ;

    // アップロードしてセット
    setImage(file);
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
    div.relative.inline-block(on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
      +if('value.url')
        img.max-height-300(src='{!value || value.url}')
        +else
          div.w200.square.bg-whitesmoke
      div.absolute.trbl0.s-full.f.fh.fs26.cursor-pointer(on:click='{click}') +
    //- input.w-full.border.px8.py4(type='text', bind:value='{value}', required!='{schema.opts && schema.opts.required}', readonly!='{schema.opts?.readonly}')
</template>


<style lang="less">
  .max-height-300 {
    max-height: 300px;
  }
</style>