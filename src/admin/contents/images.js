import { headings, schemas, sections } from "./template";

export default {
  label: "画像",
  headings: [
    {
      key: "url",
      label: "アイキャッチ",
      type: "image",
      width: "100px",
      class: "h64"
    },
    {
      key: "id",
      label: "ID",
      type: "text"
    },
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
      label: "基本",
      class: "col8",
      schemas: [
        // schemas.image,
        // // TODO: テキストを表示させる
        // {
        //   label: 'クリック または ドラッグ&ドロップで追加できます',
        // },
        // schemas.slug,
        // {
        //   key: "data.alt",
        //   label: "alt text",
        //   type: "text",
        //   opts: {},
        // },      
      ]
    },
  ]
};
