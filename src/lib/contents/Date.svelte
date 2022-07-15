<svelte:options accessors={true}/>

<script>
  import dayjs from 'dayjs';

  // svelte-ignore unused-export-let
  export let heading;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;
  export let value = '';
</script>

<template lang='pug'>
  +if('value')
    time {dayjs(value).format('YYYY/MM/DD HH:mm')}
</template>
