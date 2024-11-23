const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming User model is set up
const ApiError = require('../utils/ApiError'); // Custom error handling utility
const config = require('../config');
const auth = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId, 'userId');

    let token = req.headers['authorization'];

    if (!userId || !token) {
      return next(new ApiError(400, 'User ID and token are required'));
    }

    if (token.split(' ')[0].toLowerCase() === 'bearer') {
      token = token.split(' ')[1];
    }

    const decoded = jwt.verify(token, config.get('signInJwtSecret'));

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (decoded.id.toString() !== userId) {
      return next(new ApiError(403, 'User ID does not match token'));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(500, 'Authentication failed'));
  }
};

module.exports = auth;
