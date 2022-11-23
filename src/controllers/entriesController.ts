import { Request, Response } from 'express';
import { entriesService } from '@/services';
import { notFound } from '@/errors';

export async function getEntries(req: Request, res: Response) {
  const { username, pagename } = req.params;
  const page = await entriesService.getPageEntries(pagename, username);
  return res.status(200).send(page);
}

export async function postEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw notFound();
  await entriesService.insertEntry(res.locals.user, pageId);
  return res.sendStatus(201);
}

export async function putEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw notFound();
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw notFound();
  await entriesService.updateEntry(res.locals.user, pageId, entryId, req.body);
  return res.sendStatus(200);
}

export async function deleteEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw notFound();
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw notFound();
  await entriesService.deleteEntry(res.locals.user, pageId, entryId);
  return res.sendStatus(200);
}

export async function moveUpEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw notFound();
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw notFound();
  await entriesService.moveUpEntry(res.locals.user, pageId, entryId);
  return res.sendStatus(200);
}

export async function moveDownEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw notFound();
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw notFound();
  await entriesService.moveDownEntry(res.locals.user, pageId, entryId);
  return res.sendStatus(200);
}