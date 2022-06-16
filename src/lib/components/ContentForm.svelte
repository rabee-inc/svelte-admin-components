<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from "svelte";
  import Section from "./Section.svelte";
  import { forms } from "$lib/index.js";
  import { getByPath } from "$lib/utils";
  import deepExtend from "@jalik/deep-extend";

  let className = null;
  export {className as class};
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
  let onChange = async () => {
    formValue = await getValue();

    // 更新したら sections の表示を再チェックする
    sections = sections;

    dispatch('change');
  };

</script>

<template lang='pug'>
  div(class='{className}')
    form(bind:this='{form}', on:submit|preventDefault='{submit}', novalidate='{validator}')
      //- Enter 用に submit ボタンを配置
      button.hide(type='submit')

      +key('value')
        div.row.mxn8
          +each('sections as section,i')
            +if('shouldShowSection(section)')
              div.align-self-top.px8.mb16(class='{section.class}')
                svelte:component(this='{sectionComponent}', label='{section.label}')
                  svelte:component(bind:this='{instances[i]}', this='{forms.object}', schema='{sectionToObjectSchema(section)}', actions='{actions}', value='{value}', formValue='{formValue}', frame='{false}', on:change='{onChange}')
</template>
