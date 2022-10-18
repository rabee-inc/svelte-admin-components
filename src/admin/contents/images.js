import { headings, schemas, sections } from "$admin/contents/template";

export default {
  label: "画像",
  settings: {
    search: true,
    create: true,
    update: true,
    delete: true,
  },
  headings: [
    {
      key: "url",
      label: "アイキャッチ",
      type: "image",
      width: "100px",
      class: "h64"
    },
    headings.id,
    {
      key: "name",
      label: "name",
      type: "text"
    },
    {
      key: "created_at",
      label: "作成日",
      type: "date"
    }
  ],
  sections: [
    {
      label: "メイン",
      class: "col12",
      schemas: [
        schemas.id,
        {
          key: "name",
          label: "name",
          type: "text",
          opts: {}
        },
        {
          key: "url",
          label: "image",
          type: "image"
        },
        {
          key: "file_url",
          label: "file",
          type: "file",
          opts: {
            accept: 'video/*',
          }
        },
      ]
    }
  ],

  actions: [
    {
      label: 'CSV アップロード',
      onclick: () => {
        alert('CSV アップロードだよ');
      },
    },
    {
      label: 'CSV ダウンロード',
      onclick: () => {
        alert('CSV ダウンロードだよ');
      },
    },
  ],
};
