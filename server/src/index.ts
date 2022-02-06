import 'dotenv/config'

import {ApolloServer} from 'apollo-server-express'
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {DocumentNode} from 'graphql'
import {Resolvers} from './generated/graphql'
import SpecialistAPI from './datasources/specialist-api'
import {connector} from './mongo'
import express from 'express'
import http from 'http'
import resolvers from './resolvers'
import typeDefs from './schema'

;

(async function startApolloServer(
  typeSource: DocumentNode,
  resolvers: Resolvers
): Promise<void> {
  // Connect MondoDB
  connector()
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs: [DIRECTIVES, typeSource],
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    dataSources: () => {
      return {
        specialistAPI: new SpecialistAPI(),
      }
    },
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

  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({port: 4000}, resolve))
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `)
})(typeDefs, resolvers)
