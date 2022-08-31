import { headings, schemas, sections } from "./template";

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
