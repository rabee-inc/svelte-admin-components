<svelte:options accessors={true}/>

<script>
  import { getImgixUrl } from "$lib/utils";

  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  export let actions = '';
  // svelte-ignore unused-export-let
  export let item;

  export let textareaElement;

  // 画像埋め込み対応
  let onDrop = async (e) => {
    var file = e.dataTransfer.files[0];
    if (!file) return ;

    // 画像以外は弾く
    if (/^image/.test(file.type) === false) return ;

    let { url, width, height } = await actions.image.upload({
      file,
    });

    let imgix_url = getImgixUrl(url, (width >= 2000 ? 2000 : null));

    let text = `![${file.name}](${imgix_url})`;

    // 差し込む
    let cursor_position = textareaElement.selectionStart;

    let before = value.substring(0, cursor_position);
    let after = value.substring(cursor_position, value.length);

    value = before + text + after;
  };
</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    textarea.w-full.border.rounded-4.px8.py4(bind:this='{textareaElement}', bind:value, rows='{schema.opts?.cols || 8}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change, on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{onDrop}')
</template>
