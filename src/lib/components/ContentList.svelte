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
  export let actions;
  export let limit = 16;

  let dispatch = createEventDispatcher();

  let queryElement;
  let items = [];
  let nextCursor;
  let query;
  let loading;
  let sort;
  let sortedChoices = [];

  let setup = () => {
    items = [];
    nextCursor = '';
    query = '';
    sort = '';
    loading = false;
  };

  let fetchItems = async () => {
    loading = true;

    let res = await actions.api.index({
      path,
      cursor: nextCursor,
      query,
      sort,
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

  let getHeadingClass = (heading, item) => {
    let cls = heading.class;

    if (typeof cls === 'function') {
      // 関数だったら実行した返り値を class として使う
      cls = cls({
        heading,
        item,
      });
    }

    return cls;
  };

  async function setupSortChoices(sortChoices) {
    // 文字列だったら関数化して結果を返す
    if (typeof sortChoices === 'string') {
      // 共通の関数もしくは配列に変換
      sortChoices = actions[sortChoices];

      if (typeof sortChoices === 'function') {
        sortedChoices = await sortChoices({ items });
      }
      else {
        sortedChoices = sortChoices;
      }
    }
    else {
      sortedChoices = sortChoices;
    }
  };

  function onSort(e) {
    setup();
    sort = e.target.value;
    fetchItems();
  }

  $: {
    path;

    setup();
    fetchItems();
    setupSortChoices(content.sort);
  }
</script>

<template lang='pug'>
  div.p8
    form.f.flex-between.fm(on:submit|preventDefault='{onSearch}')
      div.f
        +if('content.settings.search')
          input.input.mr4(bind:this='{queryElement}', type='search')
          button.button 検索
      div.f.fm
        +if('content.sort')
          div.f.fm
            div.mr4 並び替え :
            select.border.rounded-4.py8.px12.mr4(on:change='{onSort}')
              +each('sortedChoices as sort')
                option(value='{sort.value}') {sort.label}
        +if('content.actions')
          +each('content.actions as action')
            button.button.fs12.ml8(type='button', on:click!='{() => onAction(action)}') {action.label}

  div.w-full.overflow-scroll(class='{className}')
    table.w-full.border-spacing-0.border-collapse-collapse
      thead
        tr.border-bottom.text-left
          +each('content.headings as heading')
            th.px12.py16.text-gray.bold.word-break-keep.fs12(style!='min-width: {heading.width || "150px"}; width: {heading.width || "auto"}') {heading.label}
      tbody
        +each('items as item')
          tr.border-bottom.transition.hover-bg.cursor-pointer(on:click!='{(e) => onSelect(e, item)}')
            +each('content.headings as heading')
              td.p12.fs13
                div(class='{getHeadingClass(heading, item)}')
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