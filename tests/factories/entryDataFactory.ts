import { faker } from '@faker-js/faker';
import { EntryData, EntryType } from '@/types';

const table: EntryType[] = [ 'title', 'project', 'text', 'image', 'space' ];

export function entryDataFactory(): EntryData {
  const rand = Math.floor(Math.random() * 5);
  return {
    type: table[rand],
    title: faker.lorem.words(2),
    description: faker.lorem.sentences(2),
    text: faker.lorem.sentences(),
    imageUrl: faker.internet.url(),
    sourceUrl: faker.internet.url(),
    space: rand
  };
}