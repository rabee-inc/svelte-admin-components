import { headings, schemas, sections } from "$admin/contents/template";

export default {
  label: "settings",
  settings: {
    update: true,
    delete: false,
  },
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
        schemas.image,
      ]
    }
  ]
};
