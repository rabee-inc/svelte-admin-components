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
  import { ContentForm, Sidebar } from "svelte-admin-components";

  export let content;
  export let collection;

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
              { "key": "key", "label": "key", "type": "text", "class": "col4", },
              { "key": "label", "label": "label", "type": "text", "class": "col4", },
              { "key": "type", "label": "type", "type": "text", "class": "col4", },
              // for textarea
              {
                "key": "opts",
                "label": "opts",
                "type": "object",
                "condition": {
                  "key": 'type',
                  "operation": "==",
                  "value": 'textarea',
                },
                "opts": {
                  "schemas": [
                    { "key": "cols", "label": "cols", "type": "number", "class": "col4", },
                  ]
                }
              },
              // for number
              {
                "key": "opts",
                "label": "opts",
                "type": "object",
                "condition": {
                  "key": 'type',
                  "operation": "==",
                  "value": 'number',
                },
                "opts": {
                  "schemas": [
                    { "key": "min", "label": "min", "type": "number", "class": "col4", },
                    { "key": "max", "label": "max", "type": "number", "class": "col4", },
                    { "key": "step", "label": "step", "type": "number", "class": "col4", },
                  ]
                }
              },
              // TODO: 他の type 用のも作っていく
            ],
          },
        }
      }
    },
  ];

  let submit = async (e) => {
    let value = e.detail.value;

    // 更新
    Object.assign(content, value);
    admin.contents[collection] = content;
    
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
    Sidebar.w300.bg-primary.text-white(sections='{admin.sections}')
    main.w-full
      div.container-960.px16.py32
        h1.mb16 {content.label} edit
        ContentForm(value='{content}', schemas='{schemas}', actions='{admin.actions}', on:submit='{submit}')
</template>
