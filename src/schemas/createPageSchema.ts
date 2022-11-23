import joi, { Schema } from 'joi';

export const createPageSchema: Schema = joi.object({
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .required()
    .messages({
      'string.base': 'URL Name must be text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
      'any.required': 'URL Name field is required'
    }),
  title: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'/\-\.]+$/)
    .required()
    .messages({
      'string.base': 'Title must be text',
      'string.pattern.base': 'Title must contain only letters, numbers, underscores, apostrophes, spaces, slashes, dashes and dots.',
      'any.required': 'Title field is required'
    })
});