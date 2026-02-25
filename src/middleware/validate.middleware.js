// Lightweight validator middleware that delegates schema definitions to the validators layer
module.exports = function validate(schema) {
  return (req, res, next) => {
    const target = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const { error, value } = schema.validate(target, { abortEarly: false, allowUnknown: true, stripUnknown: true });

    if (error) {
      const details = error.details.map((d) => d.message);
      const err = new Error('Validation error');
      err.statusCode = 400;
      err.details = details;
      return next(err);
    }

    // Replace with sanitized values
    req.body = value.body || req.body;
    req.params = value.params || req.params;
    req.query = value.query || req.query;

    return next();
  };
};
