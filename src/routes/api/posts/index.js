import crud from "$demo/curd.js";

export const get = crud.index('posts');
export const post = crud.create('posts');
