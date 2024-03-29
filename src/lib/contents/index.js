
// contents
import { default as Text } from './Text.svelte';
import { default as Image } from './Image.svelte';
import { default as Date } from './Date.svelte';
import { default as Button } from './Button.svelte';

let contents = {
  text: Text,
  image: Image,
  date: Date,
  button: Button,
};

export default contents;

export let registerContent = (key, content) => {
  contents[key] = content;
};
