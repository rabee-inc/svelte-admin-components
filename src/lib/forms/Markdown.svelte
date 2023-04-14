<svelte:options accessors={true}/>

<script>
  import { getImgixUrl } from "$lib/utils";
  import { Editor, rootCtx, defaultValueCtx, EditorStatus, editorViewCtx, serializerCtx, editorViewOptionsCtx } from '@milkdown/core';
  import { nord } from '@milkdown/theme-nord';
  import { gfm } from '@milkdown/preset-gfm';
  import { clipboard } from '@milkdown/plugin-clipboard';
  import { insert, callCommand } from '@milkdown/utils';
  import { history } from '@milkdown/plugin-history'
  import { indent } from '@milkdown/plugin-indent'
  import { cursor } from '@milkdown/plugin-cursor'
  import { commonmark } from '@milkdown/preset-commonmark';
  import { listener, listenerCtx } from "@milkdown/plugin-listener";

  // styles
  import '@milkdown/theme-nord/style.css'
  import 'prosemirror-tables/style/tables.css'


  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  export let actions = '';
  // svelte-ignore unused-export-let
  export let item;

  export let editorElement;

  let editor;

  $: {
    editorElement;
    if (editorElement) {
      initializeEditor(editorElement);
    }
  }


  // readonly を逆にして editable set
  const editable = () => !schema.opts?.readonly;

  // editor 初期化
  const initializeEditor = async (element) => {
    editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, element);
        ctx.set(defaultValueCtx, value);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
            value = markdown;
        });
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          editable,
          handleDOMEvents: {
            ...prev.handleDOMEvents,
            click: handleElementClick,
          },
        }));
      })
      .config(nord)
      .use(commonmark)
      .use(history)
      .use(listener)
      .use(indent)
      .use(cursor)
      .use(clipboard)
      .use(gfm)
      .create();
  };

  const handleElementClick = (view, event) => {
    console.log("Element clicked:", event.target);
    if (event.target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      // 新しいタブでリンクを開く
      const href = event.target.getAttribute('href');
      window.open(href, '_blank');
    }
  };

  // 値を取得
  export const getMarkdown = () => {
    let value = editor.action((ctx) => {
      const editorView = ctx.get(editorViewCtx);
      const serializer = ctx.get(serializerCtx);
      return serializer(editorView.state.doc);
    });
    return value;
  };

  // 値を挿入
  export const insertValue = (value) => {
    if (!value.trim) return ;
    editor.action(insert(value));
  };

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

    insertValue(text);
  };

</script>

<template lang='pug'>
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label} 
        +if('schema.opts?.required')
          span *
    div.markdown-styles.w-full.border.rounded-4.p8(bind:this='{editorElement}', rows='{schema.opts?.cols || 8}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change, on:dragover|preventDefault!='{() => {}}', on:drop|preventDefault='{onDrop}')
</template>
