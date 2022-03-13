import 'dotenv/config'

import {getRole, getUser} from './utils/auth'

import {ApolloServer} from 'apollo-server'
import {CustomerModel} from './models/customer'
import Customers from './datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
/* import SpecialistAPI from './datasources/specialist-api' */
import {SpecialistModel} from './models/specialist'
import Specialists from './datasources/specialist'
import authDirectiveTransformer from './directives/auth'
import {connector} from './mongo'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from './resolvers'
import typeDefs from './schema'

// Connect to MongoDB
connector()

let schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
})

schema = authDirectiveTransformer(schema, 'auth', getRole)

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      /* specialistAPI: new SpecialistAPI(), */
      customers: new Customers(new CustomerModel()),
      specialists: new Specialists(new SpecialistModel()),
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
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `)
})
