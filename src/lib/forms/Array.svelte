<svelte:options accessors={true}/>

<script>
  import { forms } from "$lib/index.js";
  import Sortable from 'sortablejs';
  import { onMount } from "svelte";

  // NOTE: ssr:false にするとうまくいかない
  // import handle from "$lib/assets/handle.svg";

  export let schema;
  export let value = [];
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let item;
  // svelte-ignore unused-export-let
  export let getValue = async () => {
    let promises = instances.filter(Boolean).map(async (instance, i) => {
      let v = instance.getValue ? instance.getValue() : instance.value;

      if (v instanceof Promise) {
        v = await v;
      }

      return v;
    });

    let v = await Promise.all(promises);

    return v;
  };

  
  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  let key = '';
  let instances = [];
  let elements;

  let add = () => {
    value.push('');

    _updateArray(value);
  };

  let del = (i) => {
    value.splice(i, 1);

    _updateArray(value);
  };

  // 子要素で変更があった際に反映する
  let _syncValue = async () => {
    value = await getValue();

    dispatch('change');
  };

  // 配列をアップデート(キャッシュ対策)
  let _updateArray = (v) => {
    key = Date.now();
    value = v;
  };

  onMount(() => {
    Sortable.create(elements, {
      animation: 150,
      handle: '.handle',
      store: {
        set: (sortable) => {
          let temp = sortable.toArray().map(id => {
            return value[id];
          });

          _updateArray(temp);
        },
      },
    });
  });

  $: {
    // setup default value
    if (!value) {
      value = [];
    }
  }

</script>

<template lang='pug'>
  div.border.rounded-4
    +if('schema.label')
      div.border-bottom.p8(class!='{schema.opts?.readonly ? "bg-whitesmoke" : "bg-aliceblue"}')
        div.fs12.mb4 {schema.label}
    div
      div(bind:this!='{elements}')
        +key('key')
          +each('value as v,i')
            div.relative.f.fm.p16.hover-trigger(data-id!='{i}', class:border-bottom-not-last!='{schema.opts?.readonly && value.length}')
              +if('!schema.opts?.readonly')
                div.handle.flex-fixed.p8.cursor-pointer.mr8(alt='handle').
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>
              div.w-full
                svelte:component(bind:this!='{instances[i]}', this!='{forms[schema.opts.schema.type]}', schema!='{schema.opts.schema}', actions!='{actions}', bind:value!='{v}', on:change!='{_syncValue}')
              +if('!schema.opts?.readonly')
                button.absolute.t8.r8.f.fh.s24.circle.border.bg-white.hover-show(type='button', on:click!='{() => {del(i)}}') ✕
      +if('!schema.opts?.readonly')
        div.p16
          button.button.w-full(type='button', on:click='{add}') +
      +if('schema.opts?.readonly && !value.length')
        div.p16
          div 未設定
</template>
