const { getDb } = require('../config/db');

// Find similar articles by tags (simple version: SQL LIKE, advanced: AI)
async function findSimilarArticles({ tags, excludeId, limit = 5 }) {
  const db = getDb();
  if (!tags) return [];
  // Simple SQL: find articles with overlapping tags, exclude current article
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
  if (!tagList.length) return [];
  const likeConditions = tagList.map(() => 'tags LIKE ?').join(' OR ');
  const likeParams = tagList.map(tag => `%${tag}%`);
  
  // Sanitize numeric values
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 5;
  const safeExcludeId = Number.isFinite(excludeId) ? excludeId : null;
  
  let sql = `SELECT a.id, a.title, a.summary, a.category, a.tags, a.created_at, a.updated_at,
                    u.username AS author_name
             FROM articles a
             LEFT JOIN users u ON a.author_id = u.id
             WHERE (${likeConditions})`;
  if (safeExcludeId) {
    sql += ` AND a.id != ${safeExcludeId}`;
  }
  sql += ` ORDER BY a.created_at DESC LIMIT ${safeLimit}`;
  
  const [rows] = await db.execute(sql, likeParams);
  return rows;
}

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

  // Debug: log SQL and params to diagnose mysqld_stmt_execute argument errors
  // Sanitize limit/offset and inline them to avoid driver prepared-statement issues
  const safeLimit = Number.isFinite(limit) ? limit : 10;
  const safeOffset = Number.isFinite(offset) ? offset : 0;

  const listSql = `
    SELECT a.id, a.title, a.summary, a.content, a.category, a.tags, a.author_id, a.created_at, a.updated_at,
           u.username AS author_name
    FROM articles a
    LEFT JOIN users u ON a.author_id = u.id
    ${whereClause}
    ORDER BY a.created_at DESC
    LIMIT ${safeLimit} OFFSET ${safeOffset}
  `;
  const listParams = params;
  console.debug('article.listArticles SQL:', listSql.replace(/\s+/g, ' ').trim());
  console.debug('article.listArticles params:', listParams);

  const [rows] = await db.execute(listSql, listParams);


  const countSql = `
    SELECT COUNT(*) AS total
    FROM articles a
    ${whereClause}
  `;
  console.debug('article.countArticles SQL:', countSql.replace(/\s+/g, ' ').trim());
  console.debug('article.countArticles params:', params);
  const [[countRow]] = await db.execute(countSql, params);

  return { items: rows, total: countRow.total };
}

async function getArticleById(id) {
  const db = getDb();
  const [rows] = await db.execute(
    `SELECT a.id, a.title, a.summary, a.content, a.category, a.tags, a.author_id, a.created_at, a.updated_at,
            u.username AS author_name
     FROM articles a
     LEFT JOIN users u ON a.author_id = u.id
     WHERE a.id = ? LIMIT 1`,
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
    [
      title,
      summary ?? null,
      content,
      category ?? null,
      tags ?? null,
      authorId,
    ],
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
    [
      title,
      summary ?? null,
      content,
      category ?? null,
      tags ?? null,
      id,
    ],
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
  findSimilarArticles,
};
