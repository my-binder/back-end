import { faker } from '@faker-js/faker';
import { User } from '@/types';

export function userFactory(): Omit<User, 'id'> {
  return {
    email: faker.internet.email(),
    urlName: faker.lorem.word(5),
    displayName: faker.lorem.word(5),
    password: faker.internet.password()
  };
}