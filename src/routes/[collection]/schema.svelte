<script context="module">
  import admin from "$demo/admin.js"
  export async function load({fetch, params}) {
    let collection = params.collection;
    let content = admin.contents[params.collection];

    return {
      props: {
        collection,
        content,
      }
    };
  }
</script>
<script>
  import { ContentForm, Sidebar } from "$lib";

  export let collection;
  export let item = {};
  export let content;

  let schemas = [
    {
      "key": "label",
      "label": "label",
      "type": "text",
      "class": "col4",
    },

    {
      "key": "schemas",
      "label": "schemas",
      "type": "array",
      "opts": {
        "schema": {
          "type": "object",
          "opts": {
            "schemas": [
              {
                "key": "key",
                "label": "key",
                "type": "text",
                "class": "col4",
              },
              {
                "key": "label",
                "label": "label",
                "type": "text",
                "class": "col4",
              },
              {
                "key": "type",
                "label": "type",
                "type": "text",
                "class": "col4",
              },
            ]
          }
        }
      }
    },
  ];

  let submit = async (e) => {
    let item = e.detail.item;

    await fetch('/api/contents', {
      method: 'post',
      body: JSON.stringify({
        contents: admin.contents,
      })
    });

    console.log('writed');
  };
</script>

<template lang='pug'>
  div.f
    Sidebar.w300.bg-royalblue.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label} schema
        ContentForm(item='{content}', schemas='{schemas}', on:submit='{submit}')
</template>
