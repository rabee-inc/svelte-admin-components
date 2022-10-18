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
    input.accept = schema.opts?.accept;

    input.onchange = (e) => {
      let file = e.target.files[0];
      if (!file) return ;

      setFile(file);
    };
  });

  let removeFile = () => {
    input.value = '';
    value = null;
    _file = null;
  };

</script>

<template lang='pug'>
  div
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    div
      +if('value')
        div.f.fm
          div.word-break-all.mr8 {value}
          div.flex-fixed.cursor-pointer(on:click='{removeFile}', alt='close').
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.05024 5.63604L12 10.5858L16.9497 5.63604L18.3639 7.05025L13.4142 12L18.3639 16.9497L16.9497 18.364L12 13.4142L7.05024 18.364L5.63603 16.9497L10.5858 12L5.63603 7.05025L7.05024 5.63604Z" fill="black"/>
            </svg>
      button.button.flex-fixed(type='button', on:click='{click}', on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{drop}')
        span ファイルを選択
</template>
