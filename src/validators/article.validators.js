const Joi = require('joi');

const createArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

const updateArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200).optional(),
    content: Joi.string().min(10).optional(),
  }).min(1),
  params: Joi.object({
    id: Joi.number().integer().positive().required(),
  }).unknown(true),
  query: Joi.object().unknown(true),
});

module.exports = {
  createArticleSchema,
  updateArticleSchema,
};
