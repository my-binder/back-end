import { Router } from 'express';
import { pagesController } from '@/controllers';
import { tokenValidation, schemaValidation } from '@/middlewares';
import { createPageSchema, updatePageSchema } from '@/schemas';

export const pagesRouter = Router();
pagesRouter.get(
  '/pages/:pageId',
  pagesController.getPage
);
pagesRouter.get(
  '/pages',
  tokenValidation,
  pagesController.getUserPages
);
pagesRouter.post(
  '/pages',
  tokenValidation,
  schemaValidation(createPageSchema),
  pagesController.postPage
);
pagesRouter.patch(
  '/pages/:pageId',
  tokenValidation,
  schemaValidation(updatePageSchema),
  pagesController.patchPage
);
pagesRouter.delete(
  '/pages/:pageId',
  tokenValidation,
  pagesController.deletePage
);