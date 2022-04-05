// 共通 curd
import dummy from './dummy.js';

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
  let items = dummy[key];
  let generator = dummy.generator[key];

  return async function({request, params, url}) {
    let item = generator();
    let body = await request.json();
    Object.assign(item, body.item);

    items.unshift(item);

    return {
      body: {
        item,
      }
    };
  };
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
  let items = dummy[key];
  
  return async function({request, params, url}) {
    let item = items.find(item => item['id'] === params['id']);

    if (!item) {
      return {
        status: '404',
        body: {
          message: `Not found: ${params['id']}`,
        }
      }
    }

    let body = await request.json();
    Object.assign(item, body.item);

    return {
      body: {
        item,
      }
    };
  };

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
