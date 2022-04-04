import crud from "$demo/curd.js";


export const get = crud.read('posts');
export const put = crud.update('posts');
export const del = crud.del('posts');
