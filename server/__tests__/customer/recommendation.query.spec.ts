import {creator, email, name, specialist, user, uuid} from 'mocks/constants'

import {ApolloServer} from 'apollo-server-express'
import {CustomerModel} from '~/models/customer'
import Customers from '~/datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {SpecialistModel} from '~/models/specialist'
import Specialists from '~/datasources/specialist'
import authDirectiveTransformer from '~/directives/auth'
import {getRole} from '~/utils/auth'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from '~/resolvers'
import typeDefs from '~/schema'

const query =
  'query RecommendationsForDashboard {recommendationsForDashboard {id name}}'

describe('recommendations for dashboard query', () => {
  const customers = new Customers(new CustomerModel() as any)
  const specialists = new Specialists(new SpecialistModel() as any)
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
