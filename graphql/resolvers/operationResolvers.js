const { AuthenticationError } = require('apollo-server')
const fetch = require('node-fetch')

const Operation = require('../../db/models/Operation')
const Company = require('../../db/models/Company')
const { authenticated } = require('../../utils/authUtils')
const { FINNHUB_KEY } = require('../../config')

module.exports = {
  Query: {
    async getOperation(_, { operationId }) {
      try {
        const operation = await Operation.findById(operationId)
        if (operation) {
          return operation
        } else {
          throw Error('Operation not found')
        }
      } catch (err) {
        throw Error(err)
      }
    },
    async getOperations() {
      try {
        const operations = await Operation.find().sort({ createdAt: -1 })
        return operations
      } catch (err) {
        throw Error(err)
      }
    },
    async getMyOperations(_, __, context) {
      try {
        const authUser = authenticated(context)

        const operations = await Operation.find({ user: authUser.id }).sort({
          createdAt: -1,
        })
        return operations
      } catch (err) {
        throw Error(err)
      }
    },
    getCandles: async (_, { symbol, resolution, from, to }) => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_KEY}`
        )
        return response.json()
      } catch (err) {
        throw Error(err)
      }
    },
    async getCompanyBySymbol(_, { input }) {
      try {
        const companies = await Company.findOne({
          symbol: input.symbol.toUpperCase(),
        })

        if (companies) {
          return companies
        } else {
          throw Error('Companies not found')
        }
      } catch (err) {
        throw Error(err)
      }
    },
    async getCompaniesByText(_, { input }) {
      try {
        if (input.text === '') {
          return []
        }
        const companies = await Company.find({
          $or: [
            { description: { $regex: input.text.toUpperCase() } },
            { symbol: { $regex: input.text.toUpperCase() } },
          ],
        })
        if (companies) {
          return companies
        } else {
          throw Error('Companies not found')
        }
      } catch (err) {
        throw Error(err)
      }
    },
  },
  Mutation: {
    async createOperation(
      _,
      {
        createOperationInput: {
          description,
          pricePerAction,
          numberOfActions,
          companySymbol,
        },
      },
      context
    ) {
      try {
        const user = authenticated(context)

        const newOperation = new Operation({
          description,
          user: user.id,
          username: user.username,
          pricePerAction,
          numberOfActions,
          companySymbol,
          createdAt: new Date().toISOString(),
        })

        const dbNewOperation = await newOperation.save()

        return dbNewOperation
      } catch (err) {
        throw Error(err)
      }
    },

    async deleteOperation(_, { operationId }, context) {
      try {
        const user = authenticated(context)

        const operationToDelete = await Operation.findById(operationId)
        if (user.username === operationToDelete.username) {
          await operationToDelete.delete()
          return operationToDelete
        } else {
          throw new AuthenticationError('Wrong credentials.')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Operation: {
    async candles(
      operation,
      { candlesInput: { resolution, from = 1577836800, to = 1591837871 } }
    ) {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${operation.companySymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_KEY}`
        )
        return response.json()
      } catch (err) {
        throw Error(err)
      }
    },
  },
}
