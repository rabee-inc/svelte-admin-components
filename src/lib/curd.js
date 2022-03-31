// 共通 curd
import dummy from '$lib/dummy.js';

// 
export const index = (key) => {
  let items = dummy[key];

  return function({request, params, url}) {
    return {
      body: {
        items,
      }
    };
  };
};

// 
export const create = (key) => {

};

// 
export const read = (key) => {
  let items = dummy[key];

  return function({request, params, url}) {
    let item = items.find(item => item['id'] === params['id']);

    if (!item) {
      return {
        status: '404',
        body: {
          message: `Not found: ${params['id']}`,
        }
      }
    }

    return {
      body: {
        item,
      }
    };
  };
};

// 
export const update = (key) => {

};

// 
export const del = (key) => {

};

// 
export default {
  index,
  create,
  read,
  update,
  del,
};
