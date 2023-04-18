import useragent from 'express-useragent';

export async function load({ request }) {
  return {
    useragent: useragent.parse(request.headers.get('user-agent') || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'),
  };
};
