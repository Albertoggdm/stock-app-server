const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

module.exports.authenticated = (context) => {
  const authHeader = context.req.headers.authorization

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET)
        return user
      } catch (err) {
        throw new AuthenticationError('Invalid token 1')
      }
    }
    throw new AuthenticationError('Invalid token 2')
  }
  throw new AuthenticationError('Invalid token 3')
}
