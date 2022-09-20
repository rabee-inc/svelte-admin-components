import { headings, schemas, sections } from "$admin/contents/template";

export default {
  label: "user",
  settings: {
    search: false,
    create: false,
    update: true,
    delete: true,
  },
  headings: [
    headings.id,
    headings.name,
  ],
  sections: [
    {
      label: "メイン",
      class: "col12 mb16",
      schemas: [
        schemas.id,
        schemas.name,
      ],
    },
    {
      label: "サブ",
      class: "col4",
      schemas: [
        {
          key: "radio",
          label: "ラジオボタン",
          type: "radio",
          opts: {
            choices: [
              {
                value: "one",
                label: "1つ目"
              },
              {
                value: "two",
                label: "2つ目"
              },
              {
                value: "three",
                label: "3つ目"
              },
              {
                value: "four",
                label: "4つ目"
              },
              {
                value: "five",
                label: "5つ目"
              },
              {
                value: "six",
                label: "6つ目"
              },
              {
                value: "seven",
                label: "7つ目"
              },
              {
                value: "eight",
                label: "8つ目"
              },
            ]
          }
        },
        {
          key: "checkbox",
          label: "チェックボックス",
          type: "checkboxes",
          opts: {
            choices: [
              {
                value: "one",
                label: "1つ目"
              },
              {
                value: "two",
                label: "2つ目"
              },
              {
                value: "three",
                label: "3つ目"
              },
              {
                value: "four",
                label: "4つ目"
              },
              {
                value: "five",
                label: "5つ目"
              },
              {
                value: "six",
                label: "6つ目"
              },
              {
                value: "seven",
                label: "7つ目"
              },
              {
                value: "eight",
                label: "8つ目"
              },
            ]
          }
        }
      ]
    }
  ]
};
