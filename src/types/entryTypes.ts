import pkg from '@prisma/client';

export type EntryType = pkg.EntryType;
export type Entry = pkg.Entry;
export type EntryData = Omit<Entry, 'id' | 'pageId' | 'index'>;