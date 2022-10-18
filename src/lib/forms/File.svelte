

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
        let v = await actions.image.upload({
          value,
          file: _file,
        });
        value = v;
      }
      catch (e) {
        // 失敗した場合はフラグを戻す
        _changed = true;
      }
    }
    console.log(value,'value')
    return value;
  };

  let input;
  let _file;
  let _changed = false;
  let dispatch = createEventDispatcher();

  // 画像を click したとき
  let click = async () => {
    // たぶん、モーダルのこと
    if (!actions.image?.select) {
      let image = await actions.image.select();
      if (image) {
        value = image;
      }
    }
    else {
      input.click();
    }
  };

  // そんなに問題ではない
  // 画像を drop したとき
  let drop = (e) => {
    var file = e.dataTransfer.files[0];
    if (!file) return ;

    // 動画以外は弾く
    if (/^video/.test(file.type) === false) return ;
    // alert()でわかるようにすると（テスト用でもおく）
    // アップロードしてセット
    setFile(file);
  };
  
  let setFile = (file) => {
    // ファイルの最大サイズ指定はあるのか
    value = URL.createObjectURL(file);
    _file = file;

    _changed = true;
    // ここが不明
    dispatch('change');
  };

  onMount(() => {
    input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';

    input.onchange = (e) => {
      let file = e.target.files[0];
      if (!file) return ;

      setFile(file);
    };
  });
</script>

<template lang='pug'>
  div.block
    //- ここには、渡ってきたスキーマが入ってくる
    +if('schema.label')
      div.fs12.mb4 {schema.label}

    div.relative.inline-block(on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
      +if('value')
        //- プレビューがいらないので、動画のURLだけがでればいい
        div {value}
        +else
          div.w200.square.bg-whitesmoke
      div.absolute.trbl0.s-full.f.fh.fs26.cursor-pointer(on:click='{click}') +
</template>


<style lang="less">
  .max-height-300 {
    max-height: 300px;
  }
</style>