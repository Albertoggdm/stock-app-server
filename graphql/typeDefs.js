const { gql } = require('apollo-server')

module.exports = gql`
  # --------------------------------------------
  # TYPES
  # --------------------------------------------
  type Candles {
    c: [Float]
    h: [Float]
    l: [Float]
    o: [Float]
    pc: [Float]
    t: [Float]
  }

  type Operation {
    id: ID!
    description: String!
    createdAt: String!
    pricePerAction: Float!
    numberOfActions: Int!
    companySymbol: String!
    username: String!
    candles(candlesInput: CandlesInput): Candles!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type StockSymbol {
    id: ID!
    description: String!
    displaySymbol: String!
    symbol: String!
  }

  type StockQuote {
    id: ID!
    c: Float!
    h: Float!
    l: Float!
    o: Float!
    pc: Float!
    t: String!
  }

  type CompanyProfile {
    country: String!
    currency: String!
    exchange: String!
    ipo: String!
    marketCapitalization: Float!
    name: String!
    phone: String!
    shareOutstanding: Float!
    ticker: String!
    weburl: String!
    logo: String!
    finnhubIndustry: String!
  }
  type Company {
    id: ID!
    description: String!
    symbol: String!
    displaySymbol: String!
  }

  # --------------------------------------------
  # INPUTS
  # --------------------------------------------
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CandlesInput {
    companySymbol: String!
    resolution: String!
    from: String!
    to: String!
  }

  input CreateOperationInput {
    description: String!
    pricePerAction: Float!
    numberOfActions: Int!
    companySymbol: String!
  }

  input GetStockSymbolsInput {
    exchange: String!
  }

  input GetStockQuoteInput {
    symbol: String!
  }

  input GetCompanyProfileInput {
    symbol: String!
  }

  input GetCompanyBySymbolInput {
    symbol: String!
  }

  input GetCompaniesByTextInput {
    text: String!
  }

  # --------------------------------------------
  # QUERIES
  # --------------------------------------------
  type Query {
    getOperations: [Operation]
    getMyOperations: [Operation]
    getOperation(operationId: ID!): Operation
    getCandles(
      symbol: String!
      resolution: String!
      from: String!
      to: String!
    ): Candles
    getStockSymbols(getStockSymbolsInput: GetStockSymbolsInput!): [StockSymbol]!
    getStockQuote(getStockQuoteInput: GetStockQuoteInput!): StockQuote!
    getCompanyProfile(input: GetCompanyProfileInput!): CompanyProfile!
    getCompanyBySymbol(input: GetCompanyBySymbolInput!): Company!
    getCompaniesByText(input: GetCompaniesByTextInput!): [Company]!
  }

  # --------------------------------------------
  # MUTATIONS
  # --------------------------------------------
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createOperation(createOperationInput: CreateOperationInput): Operation
    deleteOperation(operationId: ID!): Operation
  }
`
