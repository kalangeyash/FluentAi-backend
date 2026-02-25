const articleModel = require('../models/article.model');

// Find similar articles by tags
async function findSimilar({ tags, excludeId, limit }) {
  return articleModel.findSimilarArticles({ tags, excludeId, limit });
}

async function list({
  search,
  category,
  page,
  limit,
}) {
  const pageNumber = page && page > 0 ? page : 1;
  const pageSize = limit && limit > 0 && limit <= 100 ? limit : 10;
  const offset = (pageNumber - 1) * pageSize;

  return articleModel.listArticles({
    search,
    category,
    limit: pageSize,
    offset,
  });
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

async function create({
  title,
  summary,
  content,
  category,
  tags,
  authorId,
}) {
  return articleModel.createArticle({
    title,
    summary,
    content,
    category,
    tags,
    authorId,
  });
}

async function update(id, {
  title,
  summary,
  content,
  category,
  tags,
  userId,
}) {
  const existing = await articleModel.getArticleById(id);
  if (!existing) {
    const error = new Error('Article not found');
    error.statusCode = 404;
    throw error;
  }

  // Only the author can update
  if (existing.author_id !== userId) {
    const error = new Error('You are not allowed to modify this article');
    error.statusCode = 403;
    throw error;
  }

  return articleModel.updateArticle(id, {
    title: title ?? existing.title,
    summary: summary ?? existing.summary,
    content: content ?? existing.content,
    category: category ?? existing.category,
    tags: tags ?? existing.tags,
  });
}

async function remove(id, { userId }) {
  const existing = await articleModel.getArticleById(id);
  if (!existing) {
    const error = new Error('Article not found');
    error.statusCode = 404;
    throw error;
  }

  // Only the author can delete
  if (existing.author_id !== userId) {
    const error = new Error('You are not allowed to delete this article');
    error.statusCode = 403;
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
  findSimilar,
};
