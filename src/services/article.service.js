const articleModel = require('../models/article.model');

async function list() {
  return articleModel.listArticles();
}

async function getById(id) {
  const article = await articleModel.getArticleById(id);
  if (!article) {
    const error = new Error('Article not found');
    error.statusCode = 404;
    throw error;
  }
  return article;
}

async function create({ title, content, authorId }) {
  return articleModel.createArticle({ title, content, authorId });
}

async function update(id, { title, content }) {
  const existing = await articleModel.getArticleById(id);
  if (!existing) {
    const error = new Error('Article not found');
    error.statusCode = 404;
    throw error;
  }
  return articleModel.updateArticle(id, { title, content });
}

async function remove(id) {
  const existing = await articleModel.getArticleById(id);
  if (!existing) {
    const error = new Error('Article not found');
    error.statusCode = 404;
    throw error;
  }
  await articleModel.deleteArticle(id);
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
