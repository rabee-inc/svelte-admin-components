
// contents
import Text from './Text.svelte';
import Textarea from './Textarea.svelte';
import Number from './Number.svelte';
import Switch from './Switch.svelte';
import Date from './Date.svelte';
import Select from './Select.svelte';
import Checkboxes from './Checkboxes.svelte';
import Radio from './Radio.svelte';
import Image from './Image.svelte';
import Array from './Array.svelte';
import Object from './Object.svelte';
import Button from './Button.svelte';
import Content from './Content.svelte';
import File from './File.svelte';

let forms = {
  text: Text,
  textarea: Textarea,
  number: Number,
  switch: Switch,
  date: Date,
  select: Select,
  checkboxes: Checkboxes,
  radio: Radio,
  image: Image,
  array: Array,
  object: Object,
  button: Button,
  content: Content,
  file: File,
};

export default forms;

export let registerForm = (key, form) => {
  forms[key] = form;
};
