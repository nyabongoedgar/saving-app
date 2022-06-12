const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: '172800s', // 2 days
});
const generateHashedPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  generateAccessToken,
  generateHashedPassword,
};
