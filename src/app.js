
// setup head
import { setOptions } from '@rabee-org/svelte-head';

setOptions({
  title(title) {
    return title;
  },
  description(description) {
    return description;
  },
  keywords(keywords) {
    return keywords;
  },
  noindex() {
    return true;
  },
  nofollow() {
    return true;
  },
});
