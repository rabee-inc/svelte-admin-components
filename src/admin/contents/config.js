import { headings, schemas, sections } from "./template";

export default {
  label: "settings",
  sections: [
    {
      label: "メイン",
      class: "col12",
      schemas: [
        {
          key: "id",
          label: "id",
          type: "text",
          opts: {}
        },
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
