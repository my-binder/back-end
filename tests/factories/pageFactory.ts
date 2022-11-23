import { faker } from '@faker-js/faker';
import { NewPageData } from '@/types';

export function pageFactory(): NewPageData {
  return {
    title: faker.lorem.words(2),
    urlName: faker.lorem.words(2).replace(' ', '-')
  };
}