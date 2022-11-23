import { Router } from 'express';
import { authController } from '@/controllers';
import { tokenValidation, schemaValidation } from '@/middlewares';
import { signInSchema } from '@/schemas';

export const authRouter = Router();
authRouter.post(
  '/sign-in', 
  schemaValidation(signInSchema), 
  authController.signIn
);
authRouter.get(
  '/sign-in-from-token',
  tokenValidation,
  authController.signInFromToken
);