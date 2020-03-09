const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');

const { schema } = require('./api/schema');
const { resolvers } = require('./api/resolvers');

const PORT = process.env.PORT || 8080
const app = express();

module.exports = app

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }));
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

async function bootApp() {
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
