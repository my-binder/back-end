import db from '@/database';
import { Entry, EntryData } from '@/types';

export async function getPageEntries(
  pageId: number
): Promise<Entry[]> {
  return await db.entry.findMany({
    where: { pageId },
    orderBy: { index: 'asc' }
  });
}

export async function getEntryById(
  entryId: number
): Promise<Entry | null> {
  return await db.entry.findUnique({
    where: { id: entryId }
  });
}

export async function createEntry(
  data: Omit<Entry, 'id'>
): Promise<void> {
  await db.entry.create({ data });
}

export async function updateEntry(
  entryId: number,
  data: EntryData
): Promise<void> {
  await db.entry.update({
    data,
    where: { id: entryId }
  });
}

export async function deleteEntry(
  entryId: number
): Promise<void> {
  await db.entry.delete({
    where: { id: entryId }
  });
}

export async function moveUpEntry(
  entryId: number
): Promise<void> {
  await db.entry.update({
    data: { index: { decrement: 1 } },
    where: { id: entryId }
  });
}

export async function moveDownEntry(
  entryId: number
): Promise<void> {
  await db.entry.update({
    data: { index: { increment: 1 } },
    where: { id: entryId }
  });
}
