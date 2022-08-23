
import { goto } from '$app/navigation';
import contents from './contents/index.js';

const admin = {
  contents,
  sections: [
    {
      label: 'service',
      items: [
        { label: 'user', link: '/users' },
        { label: 'post', link: '/posts' },
        { label: 'image', link: '/images' },
      ]
    },
    {
      label: 'admin',
      items: [
        { label: 'operator', link: '/operators' },
        { label: 'config', link: '/settings/config' },
      ]
    },
  ],
  actions: {
    // path から content を取得する
    pathToContent(path) {
      // path 自体にマッチした場合はそれを返す
      if (admin.contents[path]) return admin.contents[path];

      let paths = path.split('/');

      // 偶数だけ残す
      let content_paths = paths.filter((p, i) => {
        return i % 2 === 0;
      });

      let content_id = content_paths.join('/');

      return admin.contents[content_id];
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
      // select() {
      //   // 画像選択モーダル開いたり

      // },
      upload({value, file}) {
        return value;
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