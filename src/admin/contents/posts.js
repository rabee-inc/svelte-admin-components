import { headings, schemas, sections } from "./template";

export default {
  label: "post",
  headings: [
    {
      key: "image.url",
      label: "アイキャッチ",
      type: "image",
      width: "80px"
    },
    {
      key: "id",
      label: "ID",
      type: "text"
    },
    {
      key: "title",
      label: "タイトル",
      type: "text"
    },
    {
      key: "created_at",
      label: "作成日",
      type: "date"
    },
    {
      key: "tags",
      label: "タグ",
      type: "text"
    },
    {
      key: "description",
      label: "詳細",
      type: "text"
    },
    {
      key: "updated_at",
      label: "更新日時",
      type: "date"
    },
    {
      key: "",
      label: "ダウンロード",
      type: "button",
      opts: {
        action: "download"
      }
    }
  ],
  sections: [
    {
      label: "メイン",
      class: "col8",
      description: "メインとなる入力フォームです!",
      schemas: [
        {
          key: "id",
          label: "ID",
          type: "text",
          class: "mb64",
          opts: {
            readonly: true
          }
        },
        {
          key: "title",
          label: "title",
          type: "text",
          class: "",
          opts: {}
        },
        {
          key: "description",
          label: "description",
          type: "textarea",
          class: "",
          opts: {
            cols: ""
          }
        },
        {
          key: "",
          label: "コメント一覧へ",
          type: "button",
          class: "",
          opts: {
            action: "gotoComments"
          }
        }
      ]
    },
    {
      label: "サブ",
      class: "col4",
      schemas: [
        {
          key: "",
          label: "preview",
          type: "button",
          class: "",
          opts: {
            action: "preview"
          }
        },
        {
          key: "image.url",
          label: "image",
          type: "image",
          class: ""
        },
        {
          key: "tags",
          label: "tags",
          type: "array",
          opts: {
            schema: {
              type: "text"
            }
          }
        },
        {
          key: "author",
          label: "作者",
          type: "content",
          opts: {
            content_path: "users",
            value_key: "id",
            label_key: "screen_name"
          }
        },
        {
          key: "meta",
          label: "is_meta",
          type: "switch"
        }
      ]
    },
    {
      label: "メタ",
      class: "col12",
      schemas: [
        {
          key: "meta_title",
          label: "メタタイトル",
          type: "text",
          class: "",
          opts: {}
        },
        {
          key: "meta_description",
          label: "メタ詳細",
          type: "textarea",
          class: "",
          opts: {
            cols: ""
          }
        }
      ]
    }
  ]
};
