

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
    if (_changed) {
      _changed = false;

      try {
        let { url } = await actions.image.upload({
          value,
          file: _file,
        });
        value = url;
      }
      catch (e) {
        // 失敗した場合はフラグを戻す
        _changed = true;
      }
    }

    return value;
  };

  let input;
  let _file;
  let _changed = false;
  let dispatch = createEventDispatcher();

  // 画像を click したとき
  let click = async () => {
    if (actions.image?.select) {
      let image = await actions.image.select();
      if (image) {
        value = image;
      }
    }
    else {
      input.click();
    }
  };

  // 画像を drop したとき
  let drop = (e) => {
    if (schema.opts?.readonly) return ;
    
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

    _changed = true;
    dispatch('change');
  };

  onMount(() => {
    input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      // TODO: 型定義周り全体的に見直し
      // @ts-ignore
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
    div.relative.f.fh.s-full(on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
      +if('value')
        img.block.max-height-300.s-full.object-fit-contain(src='{!value || value}', alt='')
        +else
          div.w200.square.bg-whitesmoke
      +if('!schema.opts?.readonly')
        div.absolute.trbl0.s-full.f.fh.fs26.cursor-pointer.hover-bg-black-40(on:click='{click}') +
</template>


<style lang="less">
  .max-height-300 {
    max-height: 300px;
  }
  

  .hover-bg-black-40 {
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>