const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

module.exports.tokenGenerator = (user, expiration = '1d' ) => jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: expiration }
);
