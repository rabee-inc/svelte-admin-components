
<script>
  export let label;
</script>

<template lang="pug">
  div.border.rounded-4
    div.bg-aliceblue.border-bottom.p8
      div.fs12 {label}
    div.p16
      slot
</template>
