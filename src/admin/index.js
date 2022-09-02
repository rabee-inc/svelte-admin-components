
import { goto } from '$app/navigation';
import { pathToContent } from 'svelte-admin-components';
import { openModal } from 'svelte-modal-manager';
import contents from './contents/index.js';

let isGuest = () => {
  let url = new URL(location.href);
  let mode = url.searchParams.get('mode');

  return mode === 'guest';
};

const admin = {
  contents,
  sections: [
    {
      label: 'service',
      items: [
        {
          label: 'user',
          link: '/users',
          shouldShow() {
            return !isGuest();
          }
        },
        { label: 'post', link: '/posts' },
        { label: 'category', link: '/categories' },
        { label: 'image', link: '/images' },
      ],
    },
    {
      label: 'admin',
      items: [
        { label: 'operator', link: '/operators' },
        {
          label: 'config',
          link: '/settings/config',
        },
      ],
      shouldShow() {
        return !isGuest();
      },
    },
  ],
  actions: {
    // path から content を取得する
    pathToContent(path) {
      return pathToContent(admin.contents, path);
    },

    // path から id を取得する
    pathToId(path) {
      let paths = path.split('/');
      return paths[paths.length-1];
    },

    api: {
      async index({path, cursor, query}) {
        let res = await fetch(`/api/${path}`);
        let json = await res.json();

        return json;
      },
      async get({path}) {
        let res = await fetch(`/api/${path}`);
        let json = await res.json();

        return json;
      },
      async put({path, data}) {
        let res = await fetch(`/api/${path}`, {
          method: 'put',
          body: JSON.stringify({
            item: data,
          }),
        });
        let json = await res.json();

        return json;
      },
      async post({path, data}) {
        let res = await fetch(`/api/${path}`, {
          method: 'post',
          body: JSON.stringify({
            item: data,
          }),
        });
        let json = await res.json();

        return json;
      },
      async del({path}) {
        let res = await fetch(`/api/${path}`, {
          method: 'delete',
        });
        let json = await res.json();
        return json;
      }
    },

    image: {
      async select() {
        // 画像選択モーダル開いたり
        let modal = openModal('admin-content', {
          path: 'images',
          actions: admin.actions,
        });

        // 何かしら選んだらクローズする
        modal.$on('select', (e) => {
          modal.close();
        });

        let item = await modal.awaitClose();

        return item && item.url;
      },
      upload({value, file}) {
        let url = URL.createObjectURL(file);
        return url;
      },
    },

    button: {
      preview({schema, item}) {
        console.log(schema, item);
        alert('view preview');
      },

      download({heading, item}) {
        alert('download: '+ item.title);
      },

      gotoComments({item}) {
        goto(`${location.pathname}/comments`);
      },
    },

    genders() {
      return [
        { "value": "male", "label": "男性" },
        { "value": "female", "label": "女性" },
        { "value": "other", "label": "その他" }
      ]
    },
  },
};


export default admin;