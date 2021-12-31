import {ApolloServer} from 'apollo-server'
import SpecialistAPI from './datasources/specialist-api'
import resolvers from './resolvers'
import typeDefs from './schema'
import {conn} from './mongo'

conn()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      specialistAPI: new SpecialistAPI(),
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
