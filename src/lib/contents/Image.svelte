<svelte:options accessors={true}/>

<script>
  export let value = '';
</script>

<template lang='pug'>
  div.rect-ogp.bg-whitesmoke.border
    +if('value')
      img.s-full.object-fit-contain(src='{value}', alt='')
</template>
