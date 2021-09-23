import {ApolloServer} from 'apollo-server'
import mocks from './mocks/mocks'
import typeDefs from './schema'

const server = new ApolloServer({
  typeDefs,
  mocks,
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `)
})
