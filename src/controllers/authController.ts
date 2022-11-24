import { Request, Response } from 'express';
import { authService } from '@/services';
import { User } from '@/types';

export async function signIn(req: Request, res: Response) {
  const user: User = await authService.validateCredentials(req.body);
  const token: string = authService.generateToken(user.id);
  return res.status(200).send({
    id: user.id,
    email: user.email,
    urlName: user.urlName,
    displayName: user.displayName,
    token
  });
}

export async function signInFromToken(_req: Request, res: Response) {
  const user: User = res.locals.user;
  return res.status(200).send({
    id: user.id,
    email: user.email,
    urlName: user.urlName,
    displayName: user.displayName,
  });
}