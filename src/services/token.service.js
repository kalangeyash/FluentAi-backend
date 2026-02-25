const jwt = require('jsonwebtoken');
const env = require('../config/env');

// Token service keeps JWT specifics isolated from the auth middleware / controllers
function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret);
}

module.exports = {
  generateToken,
  verifyToken,
};
