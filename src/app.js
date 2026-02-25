const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');
const { initDb } = require('./config/db');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

async function createApp() {
  // Ensure DB is ready before handling any requests
  await initDb();

  const app = express();

  // Basic hardening & cross-origin support
  app.use(helmet());
  app.use(cors());

  // Parse JSON request bodies
  app.use(express.json());

  if (env.nodeEnv !== 'production') {
    app.use(morgan('dev'));
  }

  // Mount API routes
  app.use('/api', routes);

  // 404 + centralized error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
