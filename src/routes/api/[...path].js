import crud from "$admin/curd.js";
import dummy from "$admin/dummy";

// path to content_id
let pathsToContentId = (paths) => {
  // 偶数だけ残す
  let content_paths = paths.filter((p, i) => {
    return i % 2 === 0;
  });

  return content_paths.join('/');
};

let pathsToId = (paths) => {
  return paths[paths.length-1];
};


/*
 * index/get
 */
export async function get({params}) {
  let paths = params.path.split('/');
  let content_id = pathsToContentId(paths);
  let items = dummy[content_id];

  if (paths.length % 2 === 1) {
    // 一覧
    return {
      body: {
        content_id,
        items,
      }
    };
  }
  else {
    // 単体取得
    let id = pathsToId(paths);
    let item = items.find(item => item['id'] === id);

    if (!item) {
      return {
        status: '404',
        body: {
          message: `Not found: ${params['id']}`,
        }
      }
    }

    // 一覧
    return {
      body: {
        content_id,
        item,
      }
    };
  }
};


/*
 * post
 */
export async function post({params, request}) {
  let paths = params.path.split('/');
  let content_id = pathsToContentId(paths);
  let items = dummy[content_id];

  let generator = dummy.generator[content_id];

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


/*
 * put
 */
export async function put({params, request}) {
  let paths = params.path.split('/');
  let content_id = pathsToContentId(paths);
  let items = dummy[content_id];

  // 単体取得
  let id = pathsToId(paths);
  let item = items.find(item => item['id'] === id);

  if (!item) {
    return {
      status: '404',
      body: {
        message: `Not found: ${id}`,
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


/*
 * del
 */
export async function del({params, request}) {
  let paths = params.path.split('/');
  let content_id = pathsToContentId(paths);
  let items = dummy[content_id];

  // 単体取得
  let id = pathsToId(paths);
  let index = items.findIndex(item => item['id'] === id);

  if (index === -1) {
    return {
      status: '404',
      body: {
        message: `Not found: ${id}`,
      }
    }
  }

  items.splice(index, 1);

  return {
    body: {
      message: `deleted ${params['id']}`,
    }
  };
};
