const express = require('express');
const articleController = require('../controllers/article.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createArticleSchema, updateArticleSchema } = require('../validators/article.validators');

const router = express.Router();

// Knowledge articles endpoints kept intentionally small but realistic
router.get('/', articleController.list);
router.get('/:id', articleController.getById);
router.post('/', auth, validate(createArticleSchema), articleController.create);
router.put('/:id', auth, validate(updateArticleSchema), articleController.update);
router.delete('/:id', auth, articleController.remove);

module.exports = router;
