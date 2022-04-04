// https://www.npmjs.com/package/@faker-js/faker
import {faker} from '@faker-js/faker';

faker.seed(0);

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

export function post() {
  return {
    id: faker.datatype.uuid(),
    slug: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.lines(),
    image: image(),
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    created_user: user(),
    created_at: faker.datatype.datetime().getTime(),
    updated_at: faker.datatype.datetime().getTime(),
  };
};

let dummy = {
  users: Array(32).fill().map(() => user()),
  posts: Array(32).fill().map(() => post()),
};

export default dummy;