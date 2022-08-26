
// path でゲット
export function getByPath(obj, key = '') {
  return key.split('.').reduce(function (t, v) {
    return t && t[v];
  }, obj);
};

// path でセット
export function setByPath(obj, key, value) {
  key.split('.').reduce(function (t, v, i, arr) {
    if (i === (arr.length - 1)) {
      t[v] = value;
    }
    else {
      if (!t[v]) t[v] = {};
      return t[v];
    }
  }, obj);
};

export function pathToContent(contents, path) {
  // path 自体にマッチした場合はそれを返す
  if (contents[path]) return contents[path];

  let paths = path.split('/');

  // 偶数だけ残す
  let content_paths = paths.filter((p, i) => {
    return i % 2 === 0;
  });

  let content_id = content_paths.join('.');

  return getByPath(contents, content_id);
};