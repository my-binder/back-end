import db from '@/database';
import { Page, FullPage, NewPageData } from '@/types';

export async function getUserPages(userId: number): Promise<Page[]> {
  return await db.page.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPageById(pageId: number): Promise<FullPage | null> {
  return await db.page.findUnique({
    where: { id: pageId },
    include: { entries: { orderBy: { index: 'asc' } } }
  });
}

export async function getPageByUrl(urlName: string, userId: number): Promise<FullPage | null> {
  return await db.page.findUnique({
    where: { userId_urlName: { userId, urlName } },
    include: { entries: { orderBy: { index: 'asc' } } }
  });
}

export async function insertPage(userId: number, data: NewPageData): Promise<void> {
  await db.page.create({
    data: { userId, title: data.title, urlName: data.urlName }
  });
}

export async function updatePage(pageId: number, data: Partial<Page>): Promise<void> {
  await db.page.update({
    data,
    where: { id: pageId }
  });
}

export async function deletePage(pageId: number): Promise<void> {
  await db.page.delete({
    where: { id: pageId }
  });
}