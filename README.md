# Stock App Web Server
This project is a simple porfolio/open source app that providers a Apollo GraphQL API for a simulated trading site. Providing live stock information and ability to buy and sell stocks, keeping track of all the stock operations performed by the user.

## Related repos:
This server project works in conjunction with this repo

(Web Client) https://github.com/Albertoggdm/stock-app-web-client

## Description
This project has the following functionalities:

- Autentication functionality (login and register)
- Centralised GraphQL API for managing trade logic
- Conection to Trid-party API for live finnantial data (Finnhub)
- Company search by name and ticker
- Fetching company candles data (multi period)
- Fetching company meta information for the company (logo, website, capitalization, market...)
- Storing data on MongoDB Cloud Atlas (stocks operations and users)
- Fetching trading operations performed by logged users in detail

## Tech stack:
SERVER
- Apollo Server
- GraphQL
- MongoDB (Atlas)
- Mongoose
- Bcrypt
- JsonWebToken

## Live sites:
Live App on (Netlify): https://sad-rosalind-bc9990.netlify.app/

Live GraphQL API on (Heroku): https://immense-hamlet-51418.herokuapp.com/

## Additional Notes:
- All the queries and mutations are accesible via GraphiQL, Insomnia, Apollo chrome extension or similar GraphQl inspectors
- Authentication based on JWT token and localstorage (1 day expiration token)
- (Finnhub) For live stock data https://finnhub.io/ (in order to proper fork repo create a new API Key)
- (MongDB Atlas) For cloud data base storing https://www.mongodb.com/ (in order to proper fork repo create a new account)
- Config file has API key exposed for easy quick initial review of the project. In order to not exceed free account limits and better stability please, create your own API keys.

## Potential next steps:
- Improve schema and resolvers
- Improve fetching logic
- Improving caching strategy
- Improve auth strategy
- Add extra functionality
- Add Typescript
- Add tests

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run start`
For running on production (Heroku)

For running locally, launch on dev mode the aside client project (start:dev) https://github.com/Albertoggdm/stock-app-web-client
On client, changing ApolloProvider httpLink uri to localhost:5000
Cloud MongoDB and FinnhubAPI key still needs to be modified on server project for complete ownership of local forked project
