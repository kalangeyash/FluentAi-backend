const articleService = require('../services/article.service');

async function list(req, res, next) {
  try {
    const articles = await articleService.list();
    res.json({ items: articles });
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
      content: req.body.content,
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
      content: req.body.content,
    });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await articleService.remove(req.params.id);
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
};
