import joi, { Schema } from 'joi';

export const updatePageSchema: Schema = joi.object({
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .messages({
      'string.base': 'URL Name must be text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.'
    }),
  title: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'/\-\.]+$/)
    .messages({
      'string.base': 'Title must be text',
      'string.pattern.base': 'Title must contain only letters, numbers, underscores, apostrophes, spaces, slashes, dashes and dots.'
    })
});