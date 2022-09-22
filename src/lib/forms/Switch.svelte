<svelte:options accessors={true}/>

<script>
  export let schema;
  export let value;
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;


</script>

<template lang='pug'>
  label.inline-block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    input.switch.text-primary(type='checkbox', bind:checked='{value}', class:checked='{value}', disabled!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
</template>

<style lang='less' global>
  // switch
  input.switch[type=checkbox] {
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;  
    width: 51px;
    height: 31px;
    border-radius: 9999px;
    overflow: hidden;
    background: #C5C5C5;
    transition: 200ms;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 27px;
      height: 27px;
      background: white;
      display: block;
      border-radius: 9999px;
      transition: 200ms;
    }
    &.checked {
      background: currentColor;
      border-color: transparent !important;
      &:after {
        left: 22px;
      }
    }
  }
</style>
