<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import { contents } from "$lib/index.js";
  import { getByPath } from "$lib/utils";
  import { goto } from "$app/navigation";

  let className = null;
  export {className as class};
  export let path;
  export let content;
  export let headings = [];
  export let actions;
  export let limit = 16;

  let dispatch = createEventDispatcher();

  let queryElement;
  let items = [];
  let nextCursor;
  let query;
  let loading;

  let setup = () => {
    items = [];
    nextCursor = '';
    query = '';
    loading = false;
  };

  let fetchItems = async () => {
    loading = true;

    let res = await actions.api.index({
      path,
      cursor: nextCursor,
      query,
      limit,
    });

    items.push(...res.items);
    items = items;

    nextCursor = res.next_cursor;

    loading = false;
  };

  let onSelect = (e, item) => {
    dispatch('select', {
      item,
      originalEvent: e,
    });
  };

  let onSearch = () => {
    setup();
    query = queryElement.value;
    fetchItems();
  };

  let onAction = (action) => {
    action.onclick({
      path,
      content,
    });
  };

  $: {
    path;

    setup();
    fetchItems();
  }
</script>

<template lang='pug'>
  div
    form.f.flex-between.fm(on:submit|preventDefault='{onSearch}')
      div.f
        input.input.mr4(bind:this='{queryElement}', type='search')
        button.button 検索
      div
        +if('content.actions')
          +each('content.actions as action')
            button.button.fs12.ml8(type='button', on:click!='{() => onAction(action)}') {action.label}

  div.w-full.overflow-scroll(class='{className}')
    table.w-full.border-spacing-0.border-collapse-collapse
      thead
        tr.border-bottom.text-left
          +each('headings as heading')
            th.px12.py16.text-gray.bold.word-break-keep(style!='min-width: {heading.width || "150px"}; width: {heading.width || "auto"}') {heading.label}
      tbody
        +each('items as item')
          tr.border-bottom.transition.hover-bg.cursor-pointer(on:click!='{(e) => onSelect(e, item)}')
            +each('headings as heading')
              td.p12.fs13
                div(class='{heading.class}')
                  svelte:component(this='{contents[heading.type]}', value='{ getByPath(item, heading.key) }', item='{item}', heading='{heading}', actions='{actions}')
  div.p16
    +if('nextCursor && !loading')
      div.f.fh
        button.button(on:click='{fetchItems}') More
    +if('loading')
      div.f.fh
        div loading...

</template>

<style lang="less">
  .hover-bg {
    &:hover {
      background-color: aliceblue;
    }
  }

  .min-width-150 {
    min-width: 150px;
  }
</style>