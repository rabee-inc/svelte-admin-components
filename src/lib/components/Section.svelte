
<script>
  export let section;
</script>

<template lang="pug">
  div.bg-white.rounded-4.box-shadow.overflow-hidden
    div.bg-aliceblue.border-bottom.p8
      div.fs12 {section.label}
    div.p16
      +if('section.description')
        p.text-darkgray.mb16 {section.description}
      slot
</template>
