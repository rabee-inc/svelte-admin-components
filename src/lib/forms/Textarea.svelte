<svelte:options accessors={true}/>

<script>
  import { getImgixUrl } from "$lib/utils";
  import { tick } from "svelte";

  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  export let actions = '';
  // svelte-ignore unused-export-let
  export let item;

  export let textareaElement;

  let isShowToolbar = schema.opts?.toolbar;
  
  let toolbarItems = [
    { label: 'H1', action: () => insertText('# ') },
    { label: 'H2', action: () => insertText('## ') },
    { label: 'H3', action: () => insertText('### ') },
    { label: 'B', action: () => insertText('****', { caret_move: -2 }) },
    { label: 'LIST', action: () => insertText('- ') },
    { label: 'IMAGE', action: () => insertImage() },
  ];

  // 画像埋め込み対応
  let onDrop = async (e) => {
    var file = e.dataTransfer.files[0];
    if (!file) return ;

    // 画像以外は弾く
    if (/^image/.test(file.type) === false) return ;

    let text = await createImageText(file);

    // 差し込む
    insertText(text);
  };

  function getCursorPosition() {
    return textareaElement.selectionStart;
  }

  async function insertText(text, opts = {}) {
    let cursor_position = getCursorPosition();

    let before = value.substring(0, cursor_position);
    let after = value.substring(cursor_position, value.length);

    value = before + text + after;
    textareaElement.focus();
    
    // NOTE: caretの動かしたい値を設定する(例: 1つ戻したい場合は -1)
    if (opts?.caret_move) {
      await tick()
      cursor_position = getCursorPosition();
      let position = cursor_position + opts.caret_move;
      textareaElement.setSelectionRange(position, position);
    }
  }

  function insertImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async (e) => {
      // TODO: 型定義周り全体的に見直し
      // @ts-ignore
      let file = e.target.files[0];
      if (!file) return ;

      // 画像以外は弾く
      if (/^image/.test(file.type) === false) return ;

      let text = await createImageText(file);

      // 差し込む
      insertText(text);
    };
  }

  async function createImageText(file) {
    // TODO: 型定義周り全体的に見直し
    // @ts-ignore
    let { url, width, height } = await actions.image.upload({
      file,
    });

    let imgix_url = getImgixUrl(url, (width >= 2000 ? 2000 : null));

    return `![${file.name}](${imgix_url})`;
  }

  const onAction = async (action) => {
    await action.onclick({
      value,
      item,
      actions,
      insertText,
    });
  };
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    div.relative.border.rounded-4.pb44.overflow-hidden
      textarea.w-full.px8.pt4(bind:this!='{textareaElement}', bind:value, rows!='{schema.opts?.cols || 8}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change, on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{onDrop}')
      +if('isShowToolbar || schema.opts?.actions?.length')
        div.absolute.b0.r0.l0.bg-white.w-full.overflow-x-scroll.p8.border-top
          +if('isShowToolbar')
            +each('toolbarItems as item')
              button.border.px4.rounded-4.py2.mr4.mr0-last(type='button', on:click!='{item.action}') {item.label}
          +if('schema.opts?.actions')
            +each('schema.opts?.actions as action')
              button.border.px4.rounded-4.py2.mr4.mr0-last(type='button', on:click!='{() => onAction(action)}') {action.label}

</template>

<style type='less'>
  .pb44 {
    padding-bottom: 44px;
  }
  textarea {
    outline: none;
  }
</style>