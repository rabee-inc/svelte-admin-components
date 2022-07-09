<svelte:options accessors={true}/>

<script>
  // svelte-ignore unused-export-let
  export let heading;
  // svelte-ignore unused-export-let
  export let actions;
  export let value = '';
</script>

<template lang='pug'>
  div.rect-ogp.bg-whitesmoke.border
    +if('value')
      img.s-full.object-fit-contain(src='{value}', alt='')
</template>
