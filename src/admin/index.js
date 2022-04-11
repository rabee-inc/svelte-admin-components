
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
  }
};

export default admin;