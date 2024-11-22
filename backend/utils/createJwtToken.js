const jwt = require('jsonwebtoken');
const config = require('../config');

const createToken = (id) => {
  return jwt.sign({ id }, config.get('signInJwtSecret'));
};
module.exports = createToken;
