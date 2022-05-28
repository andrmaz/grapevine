import {
  creator,
  email,
  name,
  specialist,
  user,
  uuid,
} from '../../mocks/constants'

import {ApolloServer} from 'apollo-server-express'
import {CustomerModel} from '../../src/models/customer'
import Customers from '../../src/datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {SpecialistModel} from '../../src/models/specialist'
import Specialists from '../../src/datasources/specialist'
import authDirectiveTransformer from '../../src/directives/auth'
import {getRole} from '../../src/utils/auth'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from '../../src/resolvers'
import typeDefs from '../../src/schema'

const query =
  'query RecommendationsForDashboard {recommendationsForDashboard {id name}}'

describe('recommendations for dashboard query', () => {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)

  it("fetches the customer's recommendations list", async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id: uuid, name, email, role: user}}),
    })
    customers.getRecommendations = jest.fn(async () => [specialist])
    const result = await testServer.executeOperation({
      query,
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.recommendationsForDashboard[0]).toHaveProperty(
      'id',
      specialist.id
    )
  })

  it('returns an authentication error', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id: uuid, name, email, role: creator}}),
    })
    const result = await testServer.executeOperation({
      query,
      variables: {id: uuid},
    })
    expect(result.data).toBeNull()
    expect(result.errors?.[0]).toHaveProperty('message', 'Not authorized')
  })
})
