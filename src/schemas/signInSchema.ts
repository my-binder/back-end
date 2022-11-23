import joi, { Schema } from 'joi';

export const signInSchema: Schema = joi.object({
  username: joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Username must be a text',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 50 characters long',
      'any.required': 'Username field is required'
    }),
  password: joi.string()
    .min(6)
    .max(24)
    .required()
    .messages({
      'string.base': 'Password must be a text',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be at most 24 characters long',
      'any.required': 'Password field is required'
    })
});