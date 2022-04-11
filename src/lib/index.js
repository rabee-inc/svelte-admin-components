// components
export { default as Sidebar } from './components/Sidebar.svelte';
export { default as ContentList } from './components/ContentList.svelte';
export { default as ContentForm } from './components/ContentForm.svelte';

// contents
export { default as contents } from './contents/index.js';

// forms
export { default as forms } from './forms/index.js';
import forms from './forms/index.js';

// edit 用 shcema
export const FORM_SCHEMA = [
  {
    "key": "key", "label": "key", "type": "text", "class": "col4",
  },
  {
    "key": "label", "label": "label", "type": "text", "class": "col4",
  },
  {
    "key": "type", "label": "type", "type": "select", "class": "col4",
    "opts": {
      "choices": Object.keys(forms).map(key => {
        return { value : key };
      }),
    },
  },
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
  // for select
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'select',
    },
    "opts": {
      "schemas": [
        {
          "key": "choices",
          "label": "choices",
          "type": "array",
          "opts": {
            "schema": {
              "type": "object",
              "opts": {
                "schemas": [
                  { "key": "value", "label": "value", "type": "text", "class": "col6", },
                  { "key": "label", "label": "label", "type": "text", "class": "col6", },
                ]
              },
            },
          },
        },
      ]
    }
  },
  // for array
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'array',
    },
    "opts": {
      "schemas": [
        { "key": "schema.type", "label": "schema type", "type": "text", "class": "col4", },
      ]
    }
  },
  // for object
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'object',
    },
    "opts": {
      "schemas": [
        {
          "key": "schemas",
          "label": "schemas",
          "type": "array",
          "opts": {
            "schema": {
              "type": "object",
              "opts": () => {
                return {
                  "schemas": FORM_SCHEMA,
                };
              },
            }
          }
        },
      ]
    }
  }
  // TODO: 他の type 用のも作っていく
];
export const CONTENT_SCHEMA = [
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
          "schemas": FORM_SCHEMA
        },
      }
    }
  },
];