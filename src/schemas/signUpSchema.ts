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
      'any.required': 'Email field is required'
    }),
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'URL name must be a text',
      'string.pattern.base': 'URL name must contain only letters without accents, numbers, underscores and dashes.',
      'string.min': 'URL name must be at least 3 characters long',
      'string.max': 'URL name must be at most 50 characters long',
      'any.required': 'URL name field is required'
    }),
  displayName: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _/'\-\.]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Display name must be a text',
      'string.pattern.base': 'Display name must contain only letters, numbers, underscores, apostrophes, spaces, slashes, dashes and dots.',
      'string.min': 'Display name must be at least 3 characters long',
      'string.max': 'Display name must be at most 50 characters long',
      'any.required': 'Display name field is required'
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