<script>
  import { goto } from "$app/navigation";
  import { ContentList } from "svelte-admin-components";

  export let content;
  export let path;
  export let actions;

  const LIMIT = 16;

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
      limit: LIMIT,
    });

    items.push(...res.items);
    items = items;

    nextCursor = res.next_cursor;

    loading = false;
  };

  let onSelect = (e) => {
    let url = `/${path}/${e.detail.item.id}`;
    if (e.detail.originalEvent.metaKey) {
      // 新しいタブで開く
      window.open(url);
    }
    else {
      goto(url);
    }
  };

  let onSearch = async () => {
    setup();
    query = queryElement.value;
    fetchItems();
  };

  $: {
    path;

    setup();
    fetchItems();
  }
</script>

<template lang="pug">
  div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
    div.f.fm
      h1.mr8 {content.label}
      a.fs12.p4.mt6(href='/{path}/_schema')
        i.material-icons.fs18 edit
    div
      a.button.primary(href='/{path}/new') NEW
  div.p16
    form.f.fr(on:submit|preventDefault='{onSearch}')
      div.f
        input.input.mr4(bind:this='{queryElement}', type='search')
        button.button 検索
    div.mb16
      ContentList(items='{items}', headings='{content.headings}', actions='{actions}', on:select='{onSelect}')
    
    div.p16
      +if('nextCursor && !loading')
        div.f.fh
          button.button(on:click='{fetchItems}') More
      +if('loading')
        div.f.fh
          div loading...
</template>