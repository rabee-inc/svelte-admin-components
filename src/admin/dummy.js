// https://www.npmjs.com/package/@faker-js/faker
import {faker} from '@faker-js/faker';

faker.seed(0);

export function image() {
  return {
    id: faker.datatype.uuid(),
    // url: faker.image.avatar(), // こっちだと 429 error 出る
    url: `https://picsum.photos/id/${faker.datatype.number()%50}/512/512`,
    name: faker.lorem.word(),
    created_at: faker.datatype.datetime().getTime(),
  }
};

export function user() {
  const GENDERS = ['male', 'female', 'other'];
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
    created_at: faker.datatype.datetime().getTime(),
    age: faker.datatype.number({min: 18, max: 64}),
    gender: GENDERS[faker.datatype.number() % 3],
    roles: ['member'],
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

export function postComment() {
  return {
    id: faker.datatype.uuid(),
    content: faker.lorem.lines(),
    created_user: user(),
    created_at: faker.datatype.datetime().getTime(),
    updated_at: faker.datatype.datetime().getTime(),
  };
};

let dummy = {
  images: Array(32).fill().map(() => image()),
  users: Array(32).fill().map(() => user()),
  posts: Array(32).fill().map(() => post()),
  'posts/comments': Array(32).fill().map(() => postComment()),

  generator: {
    images: image,
    users: user,
    posts: post,
    'posts/comments': postComment,
  },
  
  settings: [
    {
      id: 'config',
      name: 'svelte-admin-components demo',
      image: image(),
    },
  ]
};

export default dummy;