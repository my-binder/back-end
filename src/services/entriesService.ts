import {
  usersRepository,
  pagesRepository,
  entriesRepository
} from '@/repositories';
import { FullPage, Entry, EntryData, User } from '@/types';
import { notFound, unauthorized, notAllowed } from '@/errors';

export async function getPageEntries(
  pagename: string,
  username: string
): Promise<FullPage> {
  const user = await usersRepository.findUserByUsername(username);
  if (!user) throw notFound();
  const page = await pagesRepository.getPageByUrl(pagename, user.id);
  if (!page) throw notFound();
  return page;
}

export async function insertEntry(
  user: User,
  pageId: number
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound();
  if (page.userId !== user.id) throw unauthorized();
  const data: Omit<Entry, 'id'> = {
    pageId: page.id,
    type: 'title',
    index: page.entries.length,
    title: '',
    description: '',
    imageUrl: '',
    text: '',
    sourceUrl: '',
    space: 0
  };
  await entriesRepository.createEntry(data);
}

export async function updateEntry(
  user: User,
  pageId: number,
  entryId: number,
  data: Partial<EntryData>
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound('Page not found');
  if (page.userId !== user.id) throw unauthorized();
  const entry = await entriesRepository.getEntryById(entryId);
  if (!entry) throw notFound('Entry not found');
  if (entry.pageId !== page.id) throw unauthorized();
  const newData: EntryData = { ...entry, ...data };
  await entriesRepository.updateEntry(entryId, newData);
}

export async function deleteEntry(
  user: User,
  pageId: number,
  entryId: number,
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound('Page not found');
  if (page.userId !== user.id) throw unauthorized();
  const entry = await entriesRepository.getEntryById(entryId);
  if (!entry) throw notFound('Entry not found');
  if (entry.pageId !== page.id) throw unauthorized();
  const entryIndex: number = entry.index;
  await entriesRepository.deleteEntry(entryId);
  for (const element of page.entries) {
    if (element.index > entryIndex) entriesRepository.moveUpEntry(element.id);
  }
}

export async function moveUpEntry(
  user: User,
  pageId: number,
  entryId: number
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound('Page not found');
  if (page.userId !== user.id) throw unauthorized();
  const entry = await entriesRepository.getEntryById(entryId);
  if (!entry) throw notFound('Entry not found');
  if (entry.pageId !== page.id) throw unauthorized();
  if (entry.index === 0) throw notAllowed('Already at the top');
  const entryIndex = entry.index;
  await entriesRepository.moveUpEntry(entryId);
  await entriesRepository.moveDownEntry(page.entries[entryIndex - 1].id);
}

export async function moveDownEntry(
  user: User,
  pageId: number,
  entryId: number
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound('Page not found');
  if (page.userId !== user.id) throw unauthorized();
  const entry = await entriesRepository.getEntryById(entryId);
  if (!entry) throw notFound('Entry not found');
  if (entry.pageId !== page.id) throw unauthorized();
  if (entry.index === page.entries.length - 1) throw notAllowed('Already at the bottom');
  const entryIndex = entry.index;
  await entriesRepository.moveDownEntry(entryId);
  await entriesRepository.moveUpEntry(page.entries[entryIndex + 1].id);
}