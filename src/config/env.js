const dotenv = require('dotenv');

// Load environment variables from .env file into process.env
dotenv.config();

// Centralized config object to avoid sprinkling process.env across the codebase
const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
};

module.exports = env;
