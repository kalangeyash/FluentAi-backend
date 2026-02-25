const { getDb } = require('../config/db');

// Data-access layer for users. Only raw SQL + mapping should live here.
// Note: DB column is `username`, but the rest of the app uses `name`.
async function createUser({ name, email, passwordHash }) {
  const db = getDb();
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash],
  );

  return { id: result.insertId, name, email, passwordHash };
}

async function findUserByEmail(email) {
  const db = getDb();
  const [rows] = await db.execute(
    'SELECT id, username AS name, email, password_hash FROM users WHERE email = ? LIMIT 1',
    [email],
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const db = getDb();
  const [rows] = await db.execute(
    'SELECT id, username AS name, email FROM users WHERE id = ? LIMIT 1',
    [id],
  );
  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
