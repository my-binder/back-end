import { Request, NextFunction } from 'express';
import { Schema } from 'joi';
import { unprocessable } from '@/errors';

export function schemaValidation(schema: Schema) {
  return (req: Request, __: any, next: NextFunction) => {
    const validate = schema.validate(req.body, { abortEarly: false })
    if (validate.error) {
      const message: string =
        validate.error.details.map(value => value.message).join('\n');
      throw unprocessable(message);
    }
    next();
  }
}