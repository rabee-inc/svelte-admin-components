import crud from "$lib/curd";

export const get = crud.index('users');
export const post = crud.create('users');
