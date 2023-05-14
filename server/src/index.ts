/* eslint-disable react-hooks/rules-of-hooks */
import 'dotenv/config'

import {getRole, getUser} from './utils/auth'

import {ApolloServer} from 'apollo-server-express'
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import {CustomerModel} from './models/customer'
import Customers from './datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
/* import SpecialistAPI from './datasources/specialist-api' */
import {SpecialistModel} from './models/specialist'
import Specialists from './datasources/specialist'
import {WebSocketServer} from 'ws'
import authDirectiveTransformer from './directives/auth'
import {connector} from './mongo'
import {createServer} from 'http'
import express from 'express'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from './resolvers'
import typeDefs from './schema'
import {useServer} from 'graphql-ws/lib/use/ws'
;(async function startApolloServer(typeDefs, resolvers) {
  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express()
  const httpServer = createServer(app)

  // Connect to MongoDB
  connector()

  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })

  // Using schema directives
  schema = authDirectiveTransformer(schema, 'auth', getRole)

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  })

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({schema}, wsServer)

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        /* specialistAPI: new SpecialistAPI(), */
        customers: new Customers(new CustomerModel() as any),
        specialists: new Specialists(new SpecialistModel() as any),
      }
    },
    context: ({req}) => {
      // Get the user token from the headers.
      const token = req.headers.authorization
      if (!token) return {user: null}
      // Try to retrieve a user with the token
      const user = getUser(token)
      // optionally block the user
      // we could also check user roles/permissions here
      // Add the user to the context
      return {user}
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({httpServer}),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  })

  const PORT = 4000
  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>(resolve => httpServer.listen(PORT, resolve))
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at https://studio.apollographql.com/dev
  `)
})(typeDefs, resolvers)
