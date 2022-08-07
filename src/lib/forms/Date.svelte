<svelte:options accessors={true}/>

<script>
  import dayjs from 'dayjs';

  export let schema;
  export let value = '';
  // svelte-ignore unused-export-let
  export let formValue;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;


  let _value = '';

  if (schema.opts.is_unixtime && value) {
    _value = dayjs(value || undefined).format('YYYY-MM-DDTHH:mm');
  }
  else {
    _value = value;
  }

  let input;
  let getType = () => {
    let date_type = schema.opts.date_type || 'datetime-local';
    if (date_type === 'datetime') date_type += '-local';

    return date_type;
  };

  // svelte-ignore unused-export-let
  export let getValue = () => {
    let v = input.value;

    if (schema.opts.is_unixtime) {
      // return dayjs(v).unix();
      return dayjs(v).valueOf();
    }

    return v;
  };

</script>

<template lang="pug">
  label.block
    +if('schema.label')
      div.fs12.mb4 {schema.label}
    input.input.w-full(bind:this='{input}', value='{_value}', type='{getType()}', required!='{schema.opts?.required}', readonly!='{schema.opts?.readonly}', class:bg-whitesmoke='{schema.opts?.readonly}', on:change)
</template>