import pkg from '@prisma/client';

export type Page = pkg.Page
export type FullPage = { page: pkg.Page, owner: pkg.User, entries: pkg.Entry[] };
export type NewPageData = Omit<Page, 'id' | 'userId' | 'createdAt'>;