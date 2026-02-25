const { getDb } = require('../config/db');

async function listArticles() {
  const db = getDb();
  const [rows] = await db.execute(
    'SELECT id, title, content, author_id, created_at, updated_at FROM articles ORDER BY created_at DESC',
  );
  return rows;
}

async function getArticleById(id) {
  const db = getDb();
  const [rows] = await db.execute(
    'SELECT id, title, content, author_id, created_at, updated_at FROM articles WHERE id = ? LIMIT 1',
    [id],
  );
  return rows[0] || null;
}

async function createArticle({ title, content, authorId }) {
  const db = getDb();
  const [result] = await db.execute(
    'INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, authorId],
  );

  return getArticleById(result.insertId);
}

async function updateArticle(id, { title, content }) {
  const db = getDb();
  await db.execute('UPDATE articles SET title = ?, content = ? WHERE id = ?', [title, content, id]);
  return getArticleById(id);
}

async function deleteArticle(id) {
  const db = getDb();
  await db.execute('DELETE FROM articles WHERE id = ?', [id]);
}

module.exports = {
  listArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
