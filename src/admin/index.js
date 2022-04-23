
import contents from './contents.json';

const admin = {
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
  contents,
  actions: {
    // selectImage() {
    //   // 画像選択モーダル開いたり
    // },
    
    // url を文字列として返す
    uploadImage({value, file}) {
      // TODO: upload server
      return value;
    },

    contents: {
      async index({schema}) {
        let res = await fetch(`/api/${schema.opts.content}`);
        let data = await res.json();
  
        return data;
      },

      async get({schema, value}) {
        // value = '9bd9d8d6-9a67-44e0-b467-cc8796ed151a';
        if (!value) return null;

        let res = await fetch(`/api/${schema.opts.content}/${value}`);
        let data = await res.json();

        return data.item;
      },
    }
  }
};

export default admin;