import { error } from '@sveltejs/kit';
import admin from "$admin/index.js"

export async function load({fetch, params}) {
  let path = params.path;
  let paths = params.path.split('/');
  let mode;

  // mode の判定
  if (paths.length % 2 === 1) {
    mode = 'list';
  }
  else {
    if (paths[paths.length-1] === '_schema') {
      mode = 'schema';
    }
    else {
      mode = 'edit';
    }
  }

  let id;

  if (mode !== 'list') {
    id = admin.actions.pathToId(path);
  }

  let content = admin.actions.pathToContent(path);
  if (!content) {
    throw error(404, 'content not found!');
  }

  return {
    path,
    mode,
    content,
    id,
  };
};
