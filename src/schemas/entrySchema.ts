import joi, { Schema } from 'joi';

export const entrySchema: Schema = joi.object({
  type: joi.string()
    .valid('title', 'project', 'text', 'image', 'space')
    .required()
    .messages({
      'string.base': 'Type must be text',
      'any.only': 'Invalid type',
      'any.required': 'Type field is required'
    }),
  title: joi.string()
    .messages({
      'string.base': 'Title must be text'
    }),
  description: joi.string()
    .messages({
      'string.base': 'Description must be text'
    }),
  text: joi.string()
    .messages({
      'string.base': 'Text must be text'
    }),
  imageUrl: joi.string()
  .messages({
    'string.base': 'Image URL must be text'
  }),
  sourceUrl: joi.string()
    .messages({
      'string.base': 'Source URL must be text'
    }),
  space: joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'Space must be numeric',
      'number.integer': 'Space must be an integer',
      'number.positive': 'Space must be positive'
    })
});