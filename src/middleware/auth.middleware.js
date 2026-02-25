const tokenService = require('../services/token.service');

// Auth middleware reads JWT from Authorization header and attaches user to req
module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = tokenService.verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
