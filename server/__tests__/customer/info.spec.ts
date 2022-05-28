import {creator, email, id, name, user} from '../../mocks/constants'

import {ApolloServer} from 'apollo-server'
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
  'query CustomerForProfile($id: ID!){customerForProfile(id: $id){id name}}'

describe('customer for profile query', () => {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)
  it('fetches the customer profile', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    customers.getCustomer = jest.fn(async () => ({
      id,
      name,
      email,
      role: user,
      specialists: [],
    }))
    const result = await testServer.executeOperation({
      query,
      variables: {id},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.customerForProfile).toEqual({id, name})
  })
  it('returns an authentication error', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: creator}}),
    })
    const result = await testServer.executeOperation({
      query,
      variables: {id},
    })
    expect(result.data).toBeNull()
    expect(result.errors?.[0]).toHaveProperty('message', 'Not authorized')
  })
})
