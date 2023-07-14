declare module '$modal' {
  import type { ModalControllerProxy } from "@rabee-org/svelte-modal-manager/types";
  import type * as Content from "$modals/Content.svelte";
  export const modalContent: ModalControllerProxy<typeof Content, any>;
}
