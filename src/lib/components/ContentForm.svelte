<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import Section from "./Section.svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";
  import deepExtend from "@jalik/deep-extend";

  let className;
  export {className as class};
  export let value;
  export let sections;
  export let actions;
  export let sectionComponent = Section;

  let dispatch = createEventDispatcher();
  let form;
  let instance;
  let instances = [];

  export let getValue = async () => {
    let promises = instances.map(instance => {
      return instance.getValue();
    });

    let values = await Promise.all(promises);
    let value = deepExtend({}, ...values);

    return value;
  };

  export let submit = async () => {
    // check validity
    if (!form.reportValidity()) return ;

    let value = await getValue();
    dispatch('submit', {
      value,
    });
  };

  // svelte-ignore unused-export-let
  export let del = async () => {
    let value = await getValue();
    dispatch('delete', {
      value,
    });
  };

  let getObjectSchema = () => {
    return {
      type: "object",
      opts: {
        schemas: schemas,
      }
    };
  };

  let sectionToObjectSchema = (section) => {
    return {
      type: "object",
      opts: {
        schemas: section.schemas,
      }
    };
  };

</script>

<template lang='pug'>
  div(class='{className}')
    form(bind:this='{form}', on:submit|preventDefault='{submit}')
      //- Enter 用に submit ボタンを配置
      button.hide(type='submit')
      +key('value')
        div.row.mxn8
          +each('sections as section,i')
            div.align-self-top.px8.mb16(class='{section.class}')
              svelte:component(this='{sectionComponent}', label='{section.label}')
                svelte:component(bind:this='{instances[i]}', this='{forms.object}', schema='{sectionToObjectSchema(section)}', actions='{actions}', value='{value}', frame='{false}')
</template>
