import { validateToken } from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { unauthorized } from '@/errors';

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) throw unauthorized();
  const auth: string = req.headers.authorization;
  if (auth.slice(0, 7) != 'Bearer ') throw unauthorized();
  res.locals.user = await validateToken(auth.replace('Bearer ', ''));
  next();
}