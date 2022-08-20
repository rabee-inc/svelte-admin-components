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
        }
      ]
    }
  ]
};
