import joi, { Schema } from 'joi';

export const signUpSchema: Schema = joi.object({
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
      'string.empty': 'Email field is required',
      'any.required': 'Email field is required'
    }),
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'URL Name must be a text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
      'string.min': 'URL Name must be at least 3 characters long',
      'string.max': 'URL Name must be at most 50 characters long',
      'string.empty': 'URL Name field is required',
      'any.required': 'URL Name field is required'
    }),
  displayName: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _/'\-\.]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Display Name must be a text',
      'string.pattern.base': 'Display Name must contain only letters, numbers, underscores, apostrophes, spaces, slashes, dashes and dots.',
      'string.min': 'Display Name must be at least 3 characters long',
      'string.max': 'Display Name must be at most 50 characters long',
      'string.empty': 'Display Name field is required',
      'any.required': 'Display Name field is required'
    }),
  password: joi.string()
    .min(6)
    .max(24)
    .required()
    .messages({
      'string.base': 'Password must be a text',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be at most 24 characters long',
      'string.empty': 'Password field is required',
      'any.required': 'Password field is required'
    })
});