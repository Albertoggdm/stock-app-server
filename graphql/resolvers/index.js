const operationResolvers = require('./operationResolvers')
const userResolvers = require('./userResolvers')
const apiFinnhubResolvers = require('./apiFinnhubResolvers')

module.exports = {
  Query: {
    ...operationResolvers.Query,
    ...apiFinnhubResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...operationResolvers.Mutation,
  },
  Operation: {
    ...operationResolvers.Operation,
  },
}
