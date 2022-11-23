import { Router } from 'express';
import { authRouter } from './authRouter';
import { entriesRouter } from './entriesRouter';
import { pagesRouter } from './pagesRouter';
import { userRouter } from './usersRouter';
import { testRouter } from './testRouter';

export const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(pagesRouter);
router.use(entriesRouter);

if (process.env.NODE_ENV === 'test') {
  router.use(testRouter);
}