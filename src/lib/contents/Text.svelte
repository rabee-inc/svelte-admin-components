<svelte:options accessors={true}/>

<script>
  export let value = '';
</script>

<template lang='pug'>
  p.line-clamp-3 {value}
</template>
