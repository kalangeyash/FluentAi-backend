const Joi = require('joi');

const createArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    summary: Joi.string().max(500).allow('', null),
    content: Joi.string().min(10).required(),
    category: Joi.string().max(100).allow('', null),
    tags: Joi.string().max(500).allow('', null),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

const updateArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200).optional(),
    summary: Joi.string().max(500).allow('', null),
    content: Joi.string().min(10).optional(),
    category: Joi.string().max(100).allow('', null),
    tags: Joi.string().max(500).allow('', null),
  }).min(1),
  params: Joi.object({
    id: Joi.number().integer().positive().required(),
  }).unknown(true),
  query: Joi.object().unknown(true),
});

const listArticleSchema = Joi.object({
  body: Joi.object().unknown(true),
  params: Joi.object().unknown(true),
  query: Joi.object({
    search: Joi.string().max(255).optional(),
    category: Joi.string().max(100).optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
  }).unknown(true),
});

const getArticleSchema = Joi.object({
  body: Joi.object().unknown(true),
  params: Joi.object({
    id: Joi.number().integer().positive().required(),
  }).unknown(true),
  query: Joi.object().unknown(true),
});

module.exports = {
  createArticleSchema,
  updateArticleSchema,
  listArticleSchema,
  getArticleSchema,
};
