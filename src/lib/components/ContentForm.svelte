<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import Section from "./Section.svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";
  import deepExtend from "@jalik/deep-extend";

  let className = null;
  export {className as class};
  export let path;
  export let value;
  export let sections;
  export let actions;
  export let sectionComponent = Section;
  export let validator = null;

  let dispatch = createEventDispatcher();
  let form;
  let instance;
  let instances = [];
  let formValue = value;

  export let getValue = async () => {
    let promises = instances.map(instance => {
      return instance ? instance.getValue() : {};
    });

    let values = await Promise.all(promises);
    let value = deepExtend({}, ...values);

    return value;
  };

  export let submit = async () => {
    // check validity
    if (!reportValidity()) return ;

    let value = await getValue();
    dispatch('submit', {
      value,
    });
  };

  export const reportValidity = () => {
    if (validator?.reportValidity) {
      return validator.reportValidity();
    }
    return form.reportValidity();
  };

  // svelte-ignore unused-export-let
  export let del = async () => {
    let value = await getValue();
    dispatch('delete', {
      value,
    });
  };

  export const getInstances = () => {
    return instances;
  };

  // 使われてなさそうで、エラー出るので非表示
  // let getObjectSchema = () => {
  //   return {
  //     type: "object",
  //     opts: {
  //       schemas: schemas,
  //     }
  //   };
  // };

  let sectionToObjectSchema = (section) => {
    return {
      type: "object",
      opts: {
        schemas: section.schemas,
      }
    };
  };

  // セクションごとに表示するかをチェック
  let shouldShowSection = (section) => {
    if (section.shouldShow) {
      let result = section.shouldShow({
        section,
        value: formValue,
      });

      return result;
    }
    return true;
  };

  // 変更イベント
  let onChange = async (e) => {
    formValue = await getValue();

    // 更新したら sections の表示を再チェックする
    sections = sections;

    dispatch('change', { 
      formValue,
      originalEvent: e.detail?.originalEvent,
      schema: e.detail?.schema,
    });
  };

  $: {
    // value が代入されたら必ず一回は formValue に反映する
    if (value && !formValue) {
      formValue = value;
    }
  }

</script>

<template lang='pug'>
  div(class!='{className || ""}')
    form(bind:this='{form}', on:submit|preventDefault='{submit}', novalidate='{validator}')
      //- Enter 用に submit ボタンを配置
      button.hide(type='submit')

      +key('value')
        div.row.mxn8
          +each('sections as section,i')
            +if('shouldShowSection(section)')
              div.align-self-top.px8(class!='{section.class || "mb16"}')
                svelte:component(this='{sectionComponent}', {section})
                  svelte:component(bind:this='{instances[i]}', this='{forms.object}', {path}, schema='{sectionToObjectSchema(section)}', {actions}, {value}, {formValue}, frame='{false}', on:change!='{onChange}')
</template>
