import { Router, Request, Response } from 'express';
import db from '../database';

export const testRouter = Router();
testRouter.post('/ready-db-test', async (_req: Request, res: Response) => {
  await db.$queryRaw`TRUNCATE TABLE entries RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE pages RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  return res.sendStatus(200);
});