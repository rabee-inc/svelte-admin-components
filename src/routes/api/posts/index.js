import crud from "$lib/curd";

export const get = crud.index('posts');
export const post = crud.create('posts');
