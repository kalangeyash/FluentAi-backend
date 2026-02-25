const Joi = require('joi');

// Validation is defined close to the domain but separate from controllers/services
const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  params: Joi.object().unknown(true),
  query: Joi.object().unknown(true),
});

module.exports = {
  registerSchema,
  loginSchema,
};
