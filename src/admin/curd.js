// 共通 curd
import dummy from './dummy.js';

// 
export const index = (key) => {
  return function({request, params, url}) {
    let items = dummy[params.collection];

    return {
      body: {
        items,
      }
    };
  };
};

// 
export const create = (key) => {
  return async function({request, params, url}) {
    let items = dummy[params.collection];
    let generator = dummy.generator[params.collection];

    let item = generator();
    let body = await request.json();

    // id は無視する
    delete body.item.id;
    
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
  return function({request, params, url}) {
    let items = dummy[params.collection];
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
  return async function({request, params, url}) {
    let items = dummy[params.collection];
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
  return async function({request, params, url}) {
    let items = dummy[params.collection];
    let index = items.findIndex(item => item['id'] === params['id']);

    if (index === -1) {
      return {
        status: '404',
        body: {
          message: `Not found: ${params['id']}`,
        }
      }
    }

    items.splice(index, 1);

    return {
      body: {
        message: `deleted ${params['id']}`,
      }
    };
  }
};

// 
export default {
  index,
  create,
  read,
  update,
  del,
};
