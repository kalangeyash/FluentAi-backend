const { getDb } = require('../config/db');

// Supports optional full-text-ish search, category filter, and pagination
async function listArticles({ search, category, limit, offset }) {
  const db = getDb();

  const conditions = [];
  const params = [];

  if (search) {
    // Use LIKE with parameters to avoid injection and allow simple search
    conditions.push('(title LIKE ? OR summary LIKE ? OR content LIKE ? OR tags LIKE ?)');
    const pattern = `%${search}%`;
    params.push(pattern, pattern, pattern, pattern);
  }

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await db.execute(
    `
    SELECT id, title, summary, content, category, tags, author_id, created_at, updated_at
    FROM articles
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `,
    [...params, limit, offset],
  );

  const [[countRow]] = await db.execute(
    `
    SELECT COUNT(*) AS total
    FROM articles
    ${whereClause}
  `,
    params,
  );

  return { items: rows, total: countRow.total };
}

async function getArticleById(id) {
  const db = getDb();
  const [rows] = await db.execute(
    'SELECT id, title, content, author_id, created_at, updated_at FROM articles WHERE id = ? LIMIT 1',
    [id],
  );
  return rows[0] || null;
}

async function createArticle({
  title,
  summary,
  content,
  category,
  tags,
  authorId,
}) {
  const db = getDb();
  const [result] = await db.execute(
    'INSERT INTO articles (title, summary, content, category, tags, author_id) VALUES (?, ?, ?, ?, ?, ?)',
    [title, summary, content, category, tags, authorId],
  );

  return getArticleById(result.insertId);
}

async function updateArticle(id, {
  title,
  summary,
  content,
  category,
  tags,
}) {
  const db = getDb();
  await db.execute(
    'UPDATE articles SET title = ?, summary = ?, content = ?, category = ?, tags = ? WHERE id = ?',
    [title, summary, content, category, tags, id],
  );
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
