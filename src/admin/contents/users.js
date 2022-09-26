import { headings, schemas, sections } from "$admin/contents/template";

export default {
  label: "user",
  settings: {
    search: true,
    create: true,
    update: true,
    delete: true,
  },
  headings: [
    Object.assign({}, headings.image, {
      key: 'icon_image.url',
    }),
    headings.id,
    {
      key: "screen_name",
      label: "name",
      type: "text"
    },
    {
      key: "gender",
      label: "gender",
      type: "text",
      class: ({item}) => {
        if (item.gender === 'male') {
          return 'text-blue';
        }
        else if (item.gender === 'female') {
          return 'text-red';
        }
        return 'text-green';
      },
      opts: {
        mappings: "genders"
      }
    }
  ],
  sections: [
    {
      label: "メイン",
      class: "col8",
      schemas: [
        schemas.id,
        {
          key: "screen_name",
          label: "名前　",
          type: "text",
          opts: {}
        },
        {
          key: "display_name",
          label: "表示名",
          type: "text",
          opts: {}
        },
        {
          key: "bio",
          label: "プロフィール",
          type: "textarea",
          opts: {
            cols: ""
          }
        },
        {
          key: "age",
          label: "年齢",
          type: "number",
          opts: {
            min: 12,
            max: 128,
            step: ""
          }
        },
        {
          key: "gender",
          label: "性別",
          type: "select",
          shouldShow: ({schema, value}) => {
            return value.age >= 18;
          },
          opts: {
            choices: [
              {
                value: "male",
                label: "男性"
              },
              {
                value: "female",
                label: "女性"
              },
              {
                value: "other",
                label: "その他"
              }
            ]
          }
        },
        {
          key: "gender",
          label: "性別",
          type: "select",
          opts: {
            choices: "genders"
          }
        },
        {
          key: "is_ambassador",
          label: "アンバサダー",
          type: "switch"
        },
        {
          key: "is_official",
          label: "公式",
          type: "switch",
          opts: {
            readonly: true,
          }
        },
        {
          key: "created_at",
          label: "作成日",
          type: "date",
          opts: {
            is_unixtime: true,
            date_type: "",
            readonly: true,
            required: true
          }
        },
        {
          key: "roles",
          label: "権限",
          type: "checkboxes",
          opts: {
            choices: [
              {
                value: "admin",
                label: "管理者"
              },
              {
                value: "member",
                label: "メンバー"
              },
              {
                value: "viewer",
                label: "閲覧者"
              }
            ]
          }
        },
        {
          key: "gender",
          label: "性別",
          type: "radio",
          opts: {
            choices: [
              {
                value: "male",
                label: "男性"
              },
              {
                value: "female",
                label: "女性"
              },
              {
                value: "other",
                label: "その他"
              }
            ]
          }
        }
      ]
    },
    {
      label: "サブ",
      class: "col4",
      schemas: [
        {
          key: " media",
          label: "メディア",
          type: "array",
          class: "",
          opts: {
            schema: {
              type: "object",
              opts: {
                schemas: [
                  { key: 'name', type: 'text', label: 'サービス名', },
                  { type: 'text', key: 'url', label: 'URL' },
                ],
              },
            },
          },
        },
      ]
    }
  ]
};
