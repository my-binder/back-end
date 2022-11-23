import * as services from '../services/pagesService';
import { Request, Response } from 'express';

export async function getUserPages(_req: Request, res: Response) {
  const pages = await services.getUserPages(res.locals.user);
  return res.status(200).send(pages);
}

export async function getPage(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  const page = await services.getPageById(pageId);
  return res.status(200).send(page);
}

export async function postPage(req: Request, res: Response) {
  await services.insertPage(res.locals.user, req.body)
  return res.sendStatus(201);
}

export async function patchPage(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  await services.updatePage(res.locals.user, pageId, req.body);
  return res.sendStatus(200);
}

export async function deletePage(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  await services.deletePage(res.locals.user, pageId);
  return res.sendStatus(200);
}