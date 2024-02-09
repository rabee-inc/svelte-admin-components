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
    { id: 'h1', label: 'H1', symbol: '#', type: 'line_head' },
    { id: 'h2', label: 'H2', symbol: '##', type: 'line_head' },
    { id: 'h3', label: 'H3', symbol: '##', type: 'line_head' },
    { id: 'bold', label: 'BOLD', symbol: '**', type: 'enclosing' },
    { id: 'strikethrough', label: 'STRIKETHROUGH', symbol: '~~', type: 'enclosing' },
    { id: 'list', label: 'LIST', symbol: '-', type: 'list' },
    { id: 'number_list', label: 'NUM LIST', symbol: '1.', type: 'list' },
    { id: 'clip', label: 'LINK', symbol: '[title](https://~)', type: 'link' },
    { id: 'image', label: 'IMAGE', symbol: '![title](url)', type: 'image' },
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

    textareaElement.setRangeText(text);

    textareaElement.focus();
    let position = cursor_position += text.length;
    textareaElement.setSelectionRange(position, position);
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

  async function onAction(action) {
    await action.onclick({
      value,
      item,
      actions,
      insertText,
    });
  };

  function selectToolbarItem({ symbol, type }) {
    //- 行の頭につくタイプ
    if (type === 'line_head' || type === 'list') {
      replaceLineHead(symbol);
    }
    //- 囲むタイプ
    else if (type === 'enclosing'){
      replaceEnclosing(symbol);
    }
    // リンクタイプ
    else if (type === 'link') {
      replaceMarkdownLink(symbol)
    }
    // 画像タイプ
    else if (type === 'image') {
      insertImage();
    }
  }

  // 記号が文字を囲うスタイルを形成
  function replaceEnclosing(symbol) {
    const selection = window.getSelection().toString();
    const formatted_text = symbol + selection + symbol;
    textareaElement.setRangeText(formatted_text);
    textareaElement.focus();
    let cursor_position = getCursorPosition();
    cursor_position += formatted_text.length;
    // 文字選択がなかった場合
    if (!selection) {
      cursor_position -= symbol.length;
    }
    textareaElement.setSelectionRange(cursor_position, cursor_position);
  }

  // 文字の頭に記号が付くスタイルを形成
  function replaceLineHead(symbol) {
    const selection = window.getSelection().toString();
    const formatted_text = symbol + ' ' + selection;
    textareaElement.setRangeText(formatted_text);
    textareaElement.focus();
    let cursor_position = getCursorPosition();
    cursor_position += formatted_text.length;
    textareaElement.setSelectionRange(cursor_position, cursor_position);
  }

  // リンクのスタイルを形成
  function replaceMarkdownLink(symbol) {
    const selection = window.getSelection().toString();
    const formatted_text = symbol.replace('title', selection);
    textareaElement.setRangeText(formatted_text);
    textareaElement.focus();
    let cursor_position = getCursorPosition();
    cursor_position += formatted_text.length;
    textareaElement.setSelectionRange(cursor_position, cursor_position);
  }
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.mb4
        div.fs12 {schema.label} 
          +if('schema.opts?.required')
            span *
        +if('schema.opts?.description')
          div.fs10 {schema.opts.description}
        +if('schema.opts?.caution')
          div.fs10.text-danger ※{schema.opts.caution}
    div.relative.border.rounded-4.overflow-hidden(class!='{isShowToolbar || schema.opts?.actions?.length ? "pb44" : ""}', class:bg-whitesmoke='{schema.opts?.readonly}')
      textarea.w-full.px8.pt4(bind:this!='{textareaElement}', bind:value, rows!='{schema.opts?.cols || 8}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', on:change, on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{onDrop}')
      +if('isShowToolbar || schema.opts?.actions?.length')
        div.absolute.b0.r0.l0.bg-white.w-full.overflow-x-scroll.p8.border-top
          +if('isShowToolbar')
            +each('toolbarItems as item')
              button.border.px4.rounded-4.py2.mr4.mr0-last(type='button', on:click!='{() => selectToolbarItem(item)}') {item.label}
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