import { headings, schemas, sections } from "./template";

export default {
  label: "settings",
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
          key: "image.url",
          label: "image",
          type: "image",
          class: ""
        }
      ]
    }
  ]
};
