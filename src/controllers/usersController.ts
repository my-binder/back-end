import * as service from '../services/usersService';
import { Request, Response } from 'express';

export async function signUp(req: Request, res: Response) {
  await service.signUp(req.body);
  return res.sendStatus(201);
}

export async function updateUser(req: Request, res: Response) {
  await service.updateUser(req.body, res.locals.user);
  return res.sendStatus(200);
}