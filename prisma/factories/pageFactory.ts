import { faker } from '@faker-js/faker';
import { NewPageData } from '../../src/types/pageTypes';

function pageFactory(): NewPageData {
  return {
    title: faker.lorem.words(2),
    urlName: faker.lorem.words(2).replace(' ', '-')
  };
}

export default pageFactory;