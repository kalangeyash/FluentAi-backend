const mysql = require('mysql2/promise');
const env = require('./env');

let pool;

// Initialize a single shared connection pool for the whole app
async function initDb() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Simple connectivity check at startup
  await pool.query('SELECT 1');

  return pool;
}

function getDb() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDb() during app startup.');
  }
  return pool;
}

module.exports = {
  initDb,
  getDb,
};
