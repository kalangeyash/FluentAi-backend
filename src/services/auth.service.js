const userModel = require('../models/user.model');
const passwordUtils = require('../utils/password');
const tokenService = require('./token.service');

// Business rules for auth: controllers stay thin and call into this service
async function register({ name, email, password }) {
  const existing = await userModel.findUserByEmail(email);
  if (existing) {
    const error = new Error('Email already in use');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await passwordUtils.hashPassword(password);
  const user = await userModel.createUser({ name, email, passwordHash });

  const token = tokenService.generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

async function login({ email, password }) {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isValid = await passwordUtils.comparePassword(password, user.password_hash);
  if (!isValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = tokenService.generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

module.exports = {
  register,
  login,
};
