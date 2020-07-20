const fetch = require('node-fetch')

const { FINNHUB_KEY } = require('../../config')

module.exports = {
  Query: {
    getStockSymbols: async (
      _,
      { getStockSymbolsInput: { exchange = 'US' } }
    ) => {
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/symbol?exchange=${exchange}&token=${FINNHUB_KEY}`
      )
      if (response) {
        return response.json()
      } else {
        throw Error()
      }
    },
    getStockQuote: async (_, { getStockQuoteInput: { symbol } }) => {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
      )
      if (response) {
        return response.json()
      } else {
        throw Error()
      }
    },
    getCompanyProfile: async (_, { input: { symbol } }) => {
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`
      )
      if (response) {
        return response.json()
      } else {
        throw Error()
      }
    },
  },
}
