<svelte:options accessors={true}/>

<script>
  export let value = 'hoge';
</script>

<template lang='pug'>
  input.border.px8.py4(type='text', bind:value='{value}')
</template>
