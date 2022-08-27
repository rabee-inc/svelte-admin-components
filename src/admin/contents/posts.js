import { headings, schemas, sections } from "./template";

export default {
  label: "post",
  settings: {
    search: true,
    create: true,
    update: true,
    delete: true,
  },
  headings: [
    headings.image,
    headings.id,
    headings.title,
    headings.created_at,
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
        schemas.id,
        schemas.title,
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
      class: "col4 mb16",
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
        schemas.image,
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
      shouldShow: ({value}) => {
        return value?.meta;
      },
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
  ],
  // コメント
  comments: {
    label: "post comments",
    headings: [
      {
        key: "id",
        label: "ID",
        type: "text"
      },
      {
        key: "created_user.screen_name",
        label: "user",
        type: "text"
      },
      {
        key: "content",
        label: "content",
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
          {
            key: "id",
            label: "ID",
            type: "text",
            opts: {
              readonly: true
            }
          },
          {
            key: "content",
            label: "content",
            type: "textarea",
            opts: {}
          }
        ]
      }
    ]
  }
};
