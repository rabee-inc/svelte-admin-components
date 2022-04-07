
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
    uploadImage(file) {
      let url = URL.createObjectURL(file);
      return {
        url,
      };
    },
  }
};

export default admin;