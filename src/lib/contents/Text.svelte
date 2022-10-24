<svelte:options accessors={true}/>

<script>
  import { onMount } from "svelte";

  export let heading;
  export let actions;
  // svelte-ignore unused-export-let
  export let item;
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
        _value = hit?.label;
      }
      else {
        // object だった場合
        _value = mappings[value];
      }
    }
    else {
      _value = value;
    }

    // value が関数だったら実行する
    if (heading.opts?.getValue) {
      _value = heading.opts?.getValue({
        value: _value,
        item,
        heading,
      });
    }
  };

</script>

<template lang='pug'>
  p.line-clamp-3
    +if('_value !== null')
      | {_value}
      +else
        | (未設定)
</template>
