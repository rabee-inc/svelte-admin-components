
import fs from 'fs';

export async function post({request, params, url}) {
  let body = await request.json();

  fs.writeFileSync('src/admin/contents.json', JSON.stringify(body.contents, null, '  '));

  return {
    body: {
    }
  };
};
