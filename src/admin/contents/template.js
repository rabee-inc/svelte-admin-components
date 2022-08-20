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
  title: {
    key: "title",
    label: "タイトル",
    type: "text"
  },
  created_at: {
    key: "created_at",
    label: "作成日",
    type: "date"
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
  title: {
    key: "title",
    label: "title",
    type: "text",
    class: "",
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