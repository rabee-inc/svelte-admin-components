import crud from "$demo/curd.js";

export const get = crud.read('users');
export const put = crud.update('users');
export const del = crud.del('users');
