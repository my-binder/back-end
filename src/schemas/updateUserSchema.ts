import joi, { Schema } from 'joi';

export const updateUserSchema: Schema = joi.object({
  email: joi.string()
    .email()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Email must be a text',
      'string.email': 'Email must be a valid email',
      'string.min': 'Email must be at least 3 characters long',
      'string.max': 'Email must be at most 50 characters long',
    }),
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .min(3)
    .max(50)
    .messages({
      'string.base': 'URL Name must be a text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
      'string.min': 'URL Name must be at least 3 characters long',
      'string.max': 'URL Name must be at most 50 characters long',
    }),
  displayName: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'\-\.]+$/)
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Display Name must be a text',
      'string.pattern.base': 'Display Name must contain only letters, numbers, underscores, apostrophes, spaces, dashes and dots.',
      'string.min': 'Display Name must be at least 3 characters long',
      'string.max': 'Display Name must be at most 50 characters long',
    }),
  newPassword: joi.string()
    .min(6)
    .max(24)
    .messages({
      'string.base': 'New Password must be a text',
      'string.min': 'New Password must be at least 6 characters long',
      'string.max': 'New Password must be at most 24 characters long',
    }),
  oldPassword: joi.string()
    .min(6)
    .max(24)
    .required()
    .messages({
      'string.base': 'Old Password must be a text',
      'string.min': 'Old Password must be at least 6 characters long',
      'string.max': 'Old Password must be at most 24 characters long',
      'string.empty': 'Old Password field is required',
      'any.required': 'Old Password field is required'
    }),
});
