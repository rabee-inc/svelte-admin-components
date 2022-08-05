<script>
  import { goto } from "$app/navigation";
  import ContentForm from "$lib/components/ContentForm.svelte";
  import { indicator } from "svelte-modal-manager";

  export let content_id;
  export let content;
  export let path;
  export let actions;
  export let id;

  let item;
  let form;

  let setup = () => {
    item = null;
  };

  let fetchItem = async () => {
    if (id === 'new') return ;

    let res = await fetch(`/api/${path}`);
    ({item} = await res.json());
  };

  let onSubmit = async (e) => {
    let item = e.detail.value;

    if (item.id) {
      let i = indicator();

      try {
        let res = await fetch(`/api/${path}`, {
          method: 'put',
          body: JSON.stringify({
            item,
          }),
        });
        let json = await res.json();
        console.log('saved', json);
      }
      catch (e) {

      }
      finally {
        setTimeout(() => {
          i.close();
        }, 512);
      }
    }
    else {
      let i = indicator();

      try {
        let res = await fetch(`/api/${path}`, {
          method: 'post',
          body: JSON.stringify({
            item,
          }),
        });
        let json = await res.json();
        console.log('created', json);
        // 単体編集ページに遷移
        let to = path.replace(/new$/, json.item.id);
        goto(`/${to}`, {
          replaceState: true,
        });
      }
      catch (e) {

      }
      finally {
        setTimeout(() => {
          i.close();
        }, 512);
      }
    }
  };

  let onDelete = async () => {
    if (!confirm('really?')) {
      return ;
    }

    await fetch(`/api/${path}`, {
      method: 'delete',
    });

    console.log('deleted');

    // 前のページに戻る
    history.back();
  };

  $: {
    path;

    setup();
    fetchItem();
  }
</script>

<template lang="pug">
  div.f.fm.flex-between.p16.sticky.t0.border-bottom.bg-white.relative.z100
    h1.fs16 {content.label} / {item?.id || 'new'}
    div.f
      +if('item?.id')
        button.button.danger.mr8(type='button', on:click!='{onDelete}') delete
      button.button.primary(on:click='{form.submit}') {item?.id ? 'save' : 'create'}
  div.p16
    ContentForm(bind:this='{form}', value='{item}', sections='{content.sections}', actions='{actions}', on:submit='{onSubmit}')
</template>