import { Router } from 'express';
import { usersController } from '@/controllers';
import { schemaValidation, tokenValidation } from '@/middlewares';
import { signUpSchema, updateUserSchema } from '@/schemas';

export const userRouter = Router();
userRouter.post(
  '/sign-up', 
  schemaValidation(signUpSchema), 
  usersController.signUp
);
userRouter.put(
  '/users/update',
  tokenValidation,
  schemaValidation(updateUserSchema),
  usersController.updateUser
);