// Route for similar article suggestions

const express = require('express');
const articleController = require('../controllers/article.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createArticleSchema,
  updateArticleSchema,
  listArticleSchema,
  getArticleSchema,
} = require('../validators/article.validators');

const router = express.Router();

// Knowledge articles endpoints with auth + validation
router.get('/', validate(listArticleSchema), articleController.list);
router.post('/', auth, validate(createArticleSchema), articleController.create);
router.get('/:id/similar', articleController.suggestSimilar);
router.get('/:id', validate(getArticleSchema), articleController.getById);
router.put('/:id', auth, validate(updateArticleSchema), articleController.update);
router.delete('/:id', auth, articleController.remove);

module.exports = router;
