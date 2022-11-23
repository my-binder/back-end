import joi, { Schema } from 'joi';

export const updateUserSchema: Schema = joi.object({
  displayname: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'\-\.]+$/)
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Display name must be a text',
      'string.pattern.base': 'Display name must contain only letters, numbers, underscores, apostrophes, spaces, dashes and dots.',
      'string.min': 'Display name must be at least 3 characters long',
      'string.max': 'Display name must be at most 50 characters long',
      'any.required': 'Display name field is required'
    }),
  oldPassword: joi.string()
    .min(6)
    .max(24)
    .messages({
      'string.base': 'Old password must be a text',
      'string.min': 'Old password must be at least 6 characters long',
      'string.max': 'Old password must be at most 24 characters long',
      'any.required': 'Old password field is required'
    }),
  newPassword: joi.string()
    .min(6)
    .max(24)
    .messages({
      'string.base': 'New password must be a text',
      'string.min': 'New password must be at least 6 characters long',
      'string.max': 'New password must be at most 24 characters long',
      'any.required': 'New password field is required'
    })
});