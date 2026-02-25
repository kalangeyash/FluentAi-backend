// Called when no route matches
function notFoundHandler(req, res, next) {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
}

// Centralized error handler: all thrown or forwarded errors end up here
// This keeps error formatting / logging consistent and avoids try/catch duplication
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Avoid leaking internal details in production
  const response = {
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  if (err.details) {
    response.details = err.details;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
