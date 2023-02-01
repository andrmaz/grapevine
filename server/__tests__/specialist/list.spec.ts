import {creator, email, id, name, specialist, user} from 'mocks/constants'

import {ApolloServer} from 'apollo-server'
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
  'query GetSpecialists {specialistsForDashboard {id name address {city} company{bs}}}'

describe('get specialists query', () => {
  const customers = new Customers(CustomerModel as any)
  const specialists = new Specialists(SpecialistModel as any)
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)

  it('fetches a list of  specialists', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    specialists.getSpecialists = jest.fn(async () => [specialist])
    const result = await testServer.executeOperation({
      query,
      variables: {},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.specialistsForDashboard[0]).toHaveProperty(
      'id',
      specialist.id
    )
    expect(result.data?.specialistsForDashboard[0]).toHaveProperty(
      'name',
      specialist.name
    )
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
    expect(result.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED')
  })
})
