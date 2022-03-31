
// path でゲット
export function getByPath(obj, key) {
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