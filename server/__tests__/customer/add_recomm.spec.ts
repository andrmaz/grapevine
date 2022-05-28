import {creator, email, id, name, user, uuid} from '../../mocks/constants'

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
  'mutation AddRecommendation($id: ID!) {addRecommendation(id: $id) {code success message customer {id name email specialists}}}'

describe('add recommendation mutation', () => {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)

  it("adds the specialist to the customer's list", async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    customers.addRecommendation = jest.fn(async () => ({
      id,
      name,
      email,
      role: user,
      specialists: [uuid],
    }))
    const result = await testServer.executeOperation({
      query,
      variables: {id: uuid},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.addRecommendation.success).toBeTruthy()
    expect(result.data?.addRecommendation.customer.specialists).toContain(uuid)
  })

  it('returns an authentication error', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: creator}}),
    })
    const result = await testServer.executeOperation({
      query,
      variables: {id: uuid},
    })
    expect(result.data).toBeNull()
    expect(result.errors?.[0]).toHaveProperty('message', 'Not authorized')
  })
})
