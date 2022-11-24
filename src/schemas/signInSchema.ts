import joi, { Schema } from 'joi';

export const signInSchema: Schema = joi.object({
  email: joi.string()
    .email()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Email must be a text',
      'string.email': 'Email must be a valid email',
      'string.min': 'Email must be at least 3 characters long',
      'string.max': 'Email must be at most 50 characters long',
      'any.required': 'Email field is required'
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