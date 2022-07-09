<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let heading;
  export let actions;
  export let value = '';

  let _value = value;

  onMount(() => {
    _setup();
  });

  let _setup = async () => {
    let mappings = heading.opts?.mappings;

    if (mappings) {
      if (typeof mappings === 'string') {
        mappings = actions[mappings];

        if (typeof mappings === 'function') {
          mappings = await mappings();
        }
      }

      if (Array.isArray(mappings)) {
        // choices 形式だった場合
        let hit = mappings.find(item => item.value === value);
        _value = hit.label;
      }
      else {
        // object だった場合
        _value = mappings[value];
      }
    }
    else {
      _value = value;
    }
  };

</script>

<template lang='pug'>
  p.line-clamp-3 {_value}
</template>
