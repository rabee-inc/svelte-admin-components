import crud from "$lib/curd";


export const get = crud.read('posts');
export const put = crud.update('posts');
export const del = crud.del('posts');
