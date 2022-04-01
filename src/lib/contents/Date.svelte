<svelte:options accessors={true}/>

<script>
  import dayjs from 'dayjs';
  export let value = '';
</script>

<template lang='pug'>
  +if('value')
    time {dayjs().format('YYYY/MM/DD HH:mm')}
</template>
