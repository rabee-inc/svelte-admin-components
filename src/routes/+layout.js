export const ssr = false;

export async function load({ data }) {
  return {
    useragent: data.useragent
  };
};
