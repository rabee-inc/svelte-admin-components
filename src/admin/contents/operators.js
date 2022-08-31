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
  ],
  sections: [
    {
      label: "メイン",
      class: "col12",
      schemas: [
        schemas.id,
      ]
    }
  ]
};
