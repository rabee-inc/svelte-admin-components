

<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let schema;
  export let actions;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let item;
  // svelte-ignore unused-export-let
  export let getValue = async () => {
    let v = await actions.image.upload({
      value,
      file: _file,
    });
    return v;
  };

  let input;
  let _file;
  let dispatch = createEventDispatcher();

  // 画像を click したとき
  let click = async () => {
    if (actions.image?.select) {
      let image = await actions.image.select();
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
    value = URL.createObjectURL(file);
    _file = file;

    dispatch('change');
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
  div.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div.relative.inline-block(on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
      +if('value')
        img.max-height-300(src='{!value || value}', alt='')
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