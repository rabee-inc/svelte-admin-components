<svelte:options accessors={true}/>

<script>
  // svelte-ignore unused-export-let
  export let heading;
  // svelte-ignore unused-export-let
  export let actions;
  // svelte-ignore unused-export-let
  export let item;
  export let value = '';
</script>

<template lang='pug'>
  div.s-full.bg-whitesmoke.border
    +if('value')
      img.s-full.object-fit-contain(src='{value}', alt='')
</template>
