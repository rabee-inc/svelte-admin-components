import { headings, schemas, sections } from "$admin/contents/template";

export default {
  label: "tag",
  settings: {
    search: true,
    create: true,
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
      class: "col12",
      schemas: [
        schemas.id,
        schemas.name,
        schemas.created_at,
      ]
    }
  ]
};
