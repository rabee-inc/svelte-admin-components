
<script>
  export let section;
</script>

<template lang="pug">
  div.border.rounded-4
    div.bg-aliceblue.border-bottom.p8
      div.fs12 {section.label}
    div.p16
      +if('section.description')
        p.text-darkgray.mb16 {section.description}
      slot
</template>
