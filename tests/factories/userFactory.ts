import { faker } from '@faker-js/faker';
import { User } from '@/types';

export function userFactory(): Omit<User, 'id'> {
  return {
    username: faker.name.fullName().replace(' ', '-'),
    displayname: faker.name.firstName(),
    password: faker.internet.password()
  };
}