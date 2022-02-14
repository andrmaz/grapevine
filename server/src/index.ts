import 'dotenv/config'

import {ApolloServer} from 'apollo-server'
import {CustomerModel} from './models/customer'
import Customers from './datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
/* import SpecialistAPI from './datasources/specialist-api' */
import {SpecialistModel} from './models/specialist'
import Specialists from './datasources/specialist'
import {connector} from './mongo'
import resolvers from './resolvers'
import typeDefs from './schema'

// Connect to MongoDB
connector()

const server = new ApolloServer({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
  dataSources: () => {
    return {
      /* specialistAPI: new SpecialistAPI(), */
      customers: new Customers(new CustomerModel()),
      specialists: new Specialists(new SpecialistModel()),
    }
  },
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `)
})
