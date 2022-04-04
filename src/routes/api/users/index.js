import crud from "$demo/curd.js";

export const get = crud.index('users');
export const post = crud.create('users');
