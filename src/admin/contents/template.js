export let headings = {
  id: {
    key: "id",
    label: "ID",
    type: "text"
  },
  slug: {
    key: "slug",
    label: "スラグ",
    type: "text"
  },
  image: {
    key: "image.url",
    label: "画像",
    type: "image",
    width: '100px',
    class: 'h64',
  },
};

export let schemas = {
  id: {
    key: "id",
    label: "ID",
    type: "text",
    opts: {
      readonly: true
    }
  },
  image: {
    key: "image.url",
    label: "image",
    type: "image",
  },
};

export let sections = {
  meta: {
    label: "メタ情報",
    class: "col12",
    schemas: [
      {
        key: "data.meta_title",
        label: "メタタイトル",
        type: "text",
        opts: {}    
      },
      {
        key: "data.meta_description",
        label: "メタディスクリプション",
        type: "textarea",
        opts: {}
      },
      {
        key: "data.noindex",
        label: "noindex",
        type: "switch",
        opts: {}
      },
      {
        key: "data.nofollow",
        label: "nofollow",
        type: "switch",
        opts: {}
      },
    ]
  },
};