<svelte:options accessors={true}/>

<script>
  import dayjs from 'dayjs';

  export let schema;
  export let value = '';

  if (schema.opts.is_unixtime) {
    // value = dayjs(value*1000).format('YYYY-MM-DDTHH:mm:ss');
    value = dayjs(value).format('YYYY-MM-DDTHH:mm:ss');
  }

  let input;
  let getType = () => {
    let date_type = schema.opts.date_type;
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
    input.input.w-full(bind:this='{input}', value='{value}', type='{getType()}', on:change)
</template>