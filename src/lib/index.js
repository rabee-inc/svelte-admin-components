// utils
export * from './utils.js';

// components
export { default as Sidebar } from './components/Sidebar.svelte';
export { default as ContentList } from './components/ContentList.svelte';
export { default as ContentForm } from './components/ContentForm.svelte';
export { default as Header } from './components/Header.svelte';

// contents
export { default as contents, registerContent } from './contents/index.js';
import contents from './contents/index.js';

// forms
export { default as forms, registerForm } from './forms/index.js';
import forms from './forms/index.js';

const SCHEMA_REQUIRED = {
  "key": "required", "label": "required", "type": "switch", "class": "col2",
};
const SCHEMA_READONLY = {
  "key": "readonly", "label": "readonly", "type": "switch", "class": "col2",
};

// edit 用 shcema
export const SCHEMA_FORM = [
  {
    "key": "key", "label": "key", "type": "text", "class": "col3",
  },
  {
    "key": "label", "label": "label", "type": "text", "class": "col3",
  },
  {
    "key": "type", "label": "type", "type": "select", "class": "col3",
    "opts": {
      "choices": Object.keys(forms).map(key => {
        return { value : key };
      }),
    },
  },
  {
    "key": "class", "label": "class", "type": "text", "class": "col3",
  },

  // for text
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'text',
    },
    "opts": {
      "schemas": [
        SCHEMA_REQUIRED, SCHEMA_READONLY,
      ]
    }
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
        SCHEMA_REQUIRED, SCHEMA_READONLY,
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
        SCHEMA_REQUIRED, SCHEMA_READONLY,
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
        SCHEMA_REQUIRED, SCHEMA_READONLY,
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
        { "key": "is_section", "label": "section", "type": "switch", "class": "col4", },
        {
          "key": "schemas",
          "label": "schemas",
          "type": "array",
          "opts": {
            "schema": {
              "type": "object",
              "opts": () => {
                return {
                  "schemas": SCHEMA_FORM,
                };
              },
            }
          }
        },
      ]
    }
  },
  // for content
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'content',
    },
    "opts": {
      "schemas": [
        { "key": "content", "label": "content", "type": "text", "class": "col4", },
        { "key": "value_key", "label": "value key", "type": "text", "class": "col4", },
        { "key": "label_key", "label": "label key", "type": "text", "class": "col4", },
      ]
    }
  },
  // for button
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'button',
    },
    "opts": {
      "schemas": [
        { "key": "action", "label": "action", "type": "text", "class": "col4", },
      ]
    }
  },
  // for date
  {
    "key": "opts",
    "label": "opts",
    "type": "object",
    "condition": {
      "key": 'type',
      "operation": "==",
      "value": 'date',
    },
    "opts": {
      "schemas": [
        // { "key": "format", "label": "format", "type": "text", "class": "col4", },
        { "key": "is_unixtime", "label": "unixtime", "type": "switch", "class": "col4", },
        {
          "key": "date_type", "label": "type", "type": "select", "class": "col4",
          "opts": {
            "choices": [
              { value: 'datetime', },
              { value: 'date', },
              { value: 'month', },
              { value: 'week', },
            ],
          },
        },      
      ]
    }
  },

  // TODO: 他の type 用のも作っていく
];

export const SCHEMA_SECTION = [
  {
    "key": "label", "label": "label", "type": "text", "class": "col4",
  },
  {
    "key": "class", "label": "class", "type": "text", "class": "col4",
  },
  {
    "key": "description",
    "label": "description",
    "type": "textarea",
    "class": "col12",
    "opts": {
      "cols": 2,
    }
  },
  {
    "key": "schemas",
    "label": "schemas",
    "type": "array",
    "opts": {
      "schema": {
        "type": "object",
        "opts": {
          "schemas": SCHEMA_FORM
        },
      }
    }
  },
];

export const SCHEMA_HEADING = [
  {
    "key": "key", "label": "key", "type": "text", "class": "col4",
  },
  {
    "key": "label", "label": "label", "type": "text", "class": "col4",
  },
  {
    "key": "type", "label": "type", "type": "select", "class": "col4",
    "opts": {
      "choices": Object.keys(contents).map(key => {
        return { value : key };
      }),
    },
  },
];

export const SCHEMA_CONTENT = [
  {
    label: 'content',
    class: '',
    schemas: [
      {
        "key": "label",
        "label": "label",
        "type": "text",
        "class": "col4",
      },
      {
        "key": "headings",
        "label": "headings",
        "type": "array",
        "opts": {
          "schema": {
            "type": "object",
            "opts": {
              "schemas": SCHEMA_HEADING
            },
          }
        }
      },
      {
        "key": "sections",
        "label": "sections",
        "type": "array",
        "opts": {
          "schema": {
            "type": "object",
            "opts": {
              "schemas": SCHEMA_SECTION
            },
          }
        }
      },
    ]
  }
];


// setup modal
import { registerModalComponent } from 'svelte-modal-manager';

import * as ContentModal from './modals/Content.svelte';

registerModalComponent('admin-content', ContentModal);
