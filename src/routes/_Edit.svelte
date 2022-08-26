<script>
  import { goto } from "$app/navigation";
  import { ContentForm } from "svelte-admin-components";
  import { indicator } from "svelte-modal-manager";

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

    ({item} = await actions.api.get({
      path,
    }));
  };

  let onSubmit = async (e) => {
    let item = e.detail.value;

    let i = indicator();

    try {
      if (id !== 'new') {
        // 更新
        let res = await actions.api.put({
          path,
          data: item,
        });
        console.log('saved', res);
      }
      else {
        // 新規作成
        let res = await actions.api.post({
          path: path.replace(/\/new$/, ''),
          data: item,
        });

        console.log('created', res);
        // 単体編集ページに遷移
        let to = path.replace(/new$/, res.item.id);
        goto(`/${to}`, {
          replaceState: true,
        });
      }
    }
    catch(e) {
      alert(e);
    }
    finally {
      setTimeout(() => {
        i.close();
      }, 512);
    }
  };

  let onDelete = async () => {
    if (!confirm('really?')) {
      return ;
    }

    let res = await actions.api.del({
      path,
    });
    console.log('deleted', res);

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
  div.f.fm.flex-between.p16.sticky.t0.border-bottom.box-shadow.bg-white.relative.z100
    h1.fs16 {content.label} / {item?.id || 'new'}
    div.f
      +if('item?.id')
        button.button.danger.mr8(type='button', on:click!='{onDelete}') delete
      button.button.primary(on:click='{form.submit}') {item?.id ? 'save' : 'create'}
  div.p16
    ContentForm(bind:this='{form}', path='{path}', value='{item}', sections='{content.sections}', actions='{actions}', on:submit='{onSubmit}')
</template>