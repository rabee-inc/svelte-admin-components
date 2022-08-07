
import { goto } from '$app/navigation';
import contents from './contents.json';

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
      ]
    },
  ],
  actions: {
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

// DEBUG: メタの値に応じて分岐テスト
admin.contents.posts.sections.find(s => s.label === 'メタ').shouldShow = ({section, value}) => {
  return value?.meta;
};

// DEBUG: 18歳以上だったら性別を選択できるよう対応
admin.contents.users.sections[0].schemas.find(s => s.key === 'gender').shouldShow = ({schema, value}) => {
  return value.age >= 18;
};


export default admin;