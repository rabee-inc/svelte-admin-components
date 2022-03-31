// https://www.npmjs.com/package/@faker-js/faker
import {faker} from '@faker-js/faker';

export function image() {
  return {
    // url: faker.image.avatar(), // こっちだと 429 error 出る
    url: `https://picsum.photos/id/${faker.datatype.number()%50}/512/512`,
  }
};

export function user() {
  let name = faker.name.firstName();
  return {
    id: faker.datatype.uuid(),
    // id: '1',
    screen_name: name.toLowerCase(),
    display_name: name,
    bio: faker.lorem.lines(),
    icon_image: image(),
    followers_count: faker.datatype.number() % 1000,
    following_count: faker.datatype.number() % 1000,
  };
};

let dummy = {
  users: Array(32).fill().map(() => user()),
};

export default dummy;