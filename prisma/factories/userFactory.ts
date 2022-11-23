import { faker } from '@faker-js/faker';
import { User } from '../../src/types/userTypes';

function userFactory(): Omit<User, 'id'> {
  return {
    username: faker.name.fullName().replace(' ', '-'),
    displayname: faker.name.fullName(),
    password: faker.internet.password()
  };
}

export default userFactory;