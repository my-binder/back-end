import { Router } from 'express';
import { entriesController } from '@/controllers';
import { tokenValidation, schemaValidation } from '@/middlewares';
import { entrySchema } from '@/schemas';

export const entriesRouter = Router();
entriesRouter.get(
  '/entries/:username/:pagename',
  entriesController.getEntries
);
entriesRouter.post(
  '/entries/:pageId',
  tokenValidation,
  entriesController.postEntry
);
entriesRouter.put(
  '/entries/:pageId/:entryId',
  tokenValidation,
  schemaValidation(entrySchema),
  entriesController.putEntry
);
entriesRouter.delete(
  '/entries/:pageId/:entryId',
  tokenValidation,
  entriesController.deleteEntry
);
entriesRouter.patch(
  '/entries/move-up/:pageId/:entryId',
  tokenValidation,
  entriesController.moveUpEntry
);
entriesRouter.patch(
  '/entries/move-down/:pageId/:entryId',
  tokenValidation,
  entriesController.moveDownEntry
);