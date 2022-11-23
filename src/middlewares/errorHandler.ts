import { Request, Response, NextFunction } from 'express';

export async function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Error || !err.code) {
    console.log(err);
    return res.sendStatus(500);
  }

  if (err.message) return res.status(err.code).send(err.message);
  else return res.sendStatus(err.code);
}