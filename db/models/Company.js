const { model, Schema } = require('mongoose')

const companySchema = new Schema({
  description: String,
  symbol: String,
  displaySymbol: String,
})

module.exports = model('Company', companySchema)
