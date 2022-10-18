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
        let v = await actions.file.upload({
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
    return value;
  };

  let input;
  let _file;
  let _changed = false;
  let dispatch = createEventDispatcher();

  // ファイルを選択を click したとき
  let click = async () => {
    input.click();
  };

  // ファイルを drop したとき
  let drop = (e) => {
    var file = e.dataTransfer.files[0];
    if (!file) return ;

    // アップロードしてセット
    setFile(file);
  };
  
  let setFile = (file) => {
    value = URL.createObjectURL(file);
    _file = file;

    _changed = true;

    dispatch('change');
  };

  onMount(() => {
    input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      let file = e.target.files[0];
      if (!file) return ;

      setFile(file);
    };
  });
</script>

<template lang='pug'>
  div
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div
      +if('value')
        div.word-break-all {value}
      button.button.flex-fixed(type='button', on:click='{click}', on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
        span ファイルを選択
</template>

