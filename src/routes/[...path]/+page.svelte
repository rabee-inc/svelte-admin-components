<script>

  import { afterNavigate, goto } from "$app/navigation";
  import { Meta } from "@rabee-org/svelte-head";
  import { page } from "$app/stores";
  import admin from "$admin/index.js"
  import { onMount } from "svelte";
  import { indicator } from "$lib/scripts/modal";
  import { ContentList, ContentForm, Header } from "svelte-admin-components";

  $: ({ path, mode, id, content } = $page.data);

  let actions = admin.actions;
  let item;
  let form;

  // ライブリロード
  content = actions.pathToContent(path);

  // 選択
  let onSelect = (e, item) => {
    // 遷移する
    let url = `/${path}/${e.detail.item.id}`;
    if (e.detail.originalEvent.metaKey) {
      // 新しいタブで開く
      window.open(url);
    }
    else {
      goto(url);
    }
  };

  // item 取得
  let fetchItem = async () => {
    if (id === 'new') return ;

    ({item} = await actions.api.get({
      path,
    }));
  };

  // 新規作成 / 更新
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

  // 削除
  let onDelete = async () => {
    if (!confirm('このデータを削除します。よろしいですか？\n※この操作は取り消せません。')) {
      return ;
    }

    // 削除
    let res = await actions.api.del({
      path,
    });
    console.log('deleted', res);

    // 前のページに戻る
    history.back();
  };

  let getHeaderButtons = (path) => {
    if (mode === 'list') {
      // 一覧
      return [
        {
          label: 'NEW',
          kind: 'primary',
          onclick: () => {
            goto(`/${path}/new`);
          },
          shouldShow() {
            return content.settings.create;
          },
        },
      ];
    }
    else if (id === 'new') {
      // 新規作成
      return [
        {
          label: 'CREATE',
          kind: 'primary',
          onclick: () => {
            form.submit();
          },
          shouldShow() {
            return content.settings.create;
          },
        },
      ];
    }
    else {
      // 編集
      return [
        // 削除
        {
          label: 'DELETE',
          kind: 'danger',
          onclick: (e) => {
            // NOTE: e 使う場合は入れる
            onDelete();
          },
          shouldShow() {
            return content.settings.delete;
          },
        },
        // 保存
        {
          label: 'SAVE',
          kind: 'primary',
          onclick: () => {
            form.submit();
          },
          shouldShow() {
            return content.settings.update;
          },
        },
      ];
    }
  };

  $: {
    path;
    fetchItem();
  }
</script>

<Meta />

<template lang="pug">
  main.s-full.overflow-scroll
    Header.p16.sticky.t0.box-shadow.bg-white.relative.z100(path='{path}', actions='{actions}', buttons='{getHeaderButtons(path)}')

    div.p16
      +if('mode === "list"')
        div.bg-white.box-shadow.rounded-4.mb16
          ContentList(path='{path}', content='{content}', actions='{actions}', limit='{16}', on:select='{onSelect}')
      +if('mode === "edit"')
        ContentForm(bind:this='{form}', path='{path}', value='{item}', sections='{content.sections}', actions='{admin.actions}', on:submit='{onSubmit}')
</template>
