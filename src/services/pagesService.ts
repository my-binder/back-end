import { pagesRepository } from '@/repositories';
import { notFound, conflict, unauthorized } from '@/errors';
import { Page, NewPageData, User } from '@/types';

export async function getUserPages(
  user: User
): Promise<Page[]> {
  return pagesRepository.getUserPages(user.id);
}

export async function getPageById(
  pageId: number
): Promise<Page> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound();
  return page.page;
}

export async function insertPage(
  user: User,
  data: NewPageData
): Promise<void> {
  const urlCheck = await pagesRepository.getPageByUrl(data.urlName, user.id);
  if (urlCheck) throw conflict('URL name already in use');
  return pagesRepository.insertPage(user.id, data);
}

export async function updatePage(
  user: User,
  pageId: number,
  data: Partial<Page>
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound();
  if (page.owner.id !== user.id) throw unauthorized();
  if (data.urlName) {
    const urlCheck = await pagesRepository.getPageByUrl(data.urlName, user.id);
    if (urlCheck) throw conflict('URL name already in use');
  }
  await pagesRepository.updatePage(pageId, data);
}

export async function deletePage(
  user: User,
  pageId: number
): Promise<void> {
  const page = await pagesRepository.getPageById(pageId);
  if (!page) throw notFound();
  if (page.owner.id !== user.id) throw unauthorized();
  await pagesRepository.deletePage(pageId);
}
