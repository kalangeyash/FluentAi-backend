const articleService = require('../services/article.service');

// Suggest similar articles by tags
async function suggestSimilar(req, res, next) {
  try {
    const { id } = req.params;
    const article = await articleService.getById(id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    const similar = await articleService.findSimilar({ tags: article.tags, excludeId: id, limit: 5 });
    res.json({ items: similar });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const {
      search,
      category,
      page,
      limit,
    } = req.query;

    const pageNumber = page ? Number(page) : undefined;
    const pageSize = limit ? Number(limit) : undefined;

    const { items, total } = await articleService.list({
      search,
      category,
      page: pageNumber,
      limit: pageSize,
    });

    res.json({
      items,
      total,
      page: pageNumber || 1,
      limit: pageSize || 10,
    });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const article = await articleService.getById(req.params.id);
    res.json(article);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const article = await articleService.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      category: req.body.category,
      tags: req.body.tags,
      authorId: req.user.id,
    });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const article = await articleService.update(req.params.id, {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      category: req.body.category,
      tags: req.body.tags,
      userId: req.user.id,
    });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await articleService.remove(req.params.id, { userId: req.user.id });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  suggestSimilar,
};
