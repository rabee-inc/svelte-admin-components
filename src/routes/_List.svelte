<script>
  import { goto } from "$app/navigation";
  import ContentList from "$lib/components/ContentList.svelte";

  export let content;
  export let path;
  export let actions;

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

    let res = await fetch(`/api/${path}`);
    ({items} = await res.json());

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
    ContentList(items='{items}', headings='{content.headings}', actions='{actions}', on:select='{onSelect}')
    +if('nextCursor && !loading')
      div.f.fh
        button.button(on:click='{fetchItems}') More
    +if('loading')
      div.f.fh
        div loading...
</template>