const Joi = require('joi');

const aiTextSchema = Joi.object({
  body: Joi.object({
    text: Joi.string().min(10).required(),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

const aiPromptSchema = Joi.object({
  body: Joi.object({
    text: Joi.string().min(10).required(),
    prompt: Joi.string().min(5).required(),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

module.exports = {
  aiTextSchema,
  aiPromptSchema,
};

