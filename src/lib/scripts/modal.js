import { modalAlert, modalConfirm, modalIndicator } from "@rabee-org/svelte-modal-manager";

export const indicator = modalIndicator.open;

/**
 * 
 * @param {string} message 
 * @param {Parameters<typeof modalAlert.openSync>[0]} [props] 
 * @returns 
 */
export function alert(message, props) {
  return modalAlert.openSync({ message, ...props });
}

/**
 * 
 * @param {string} message 
 * @param {Parameters<typeof modalConfirm.openSync>[0]} [props] 
 * @returns 
 */
export function confirm(message, props) {
  return modalConfirm.openSync({ message, ...props });
}