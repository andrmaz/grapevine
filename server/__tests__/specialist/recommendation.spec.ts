import {ApolloServer, UserInputError} from 'apollo-server'
import {
  creator,
  email,
  id,
  name,
  recommendations,
  specialist,
  user,
  uuid,
} from 'mocks/constants'

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
  'mutation IncrementRecommendations($id: ID!) {incrementRecommendations(id: $id) {code success message specialist {id recommendations}}}'

describe('increment recommendation mutation', () => {
  const customers = new Customers(new CustomerModel() as any)
  const specialists = new Specialists(new SpecialistModel() as any)
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)

  it('increases the specialist recommendations', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    specialists.incrementRecommendations = jest.fn(async () => ({
      ...specialist,
      recommendations,
    }))
    const result = await testServer.executeOperation({
      query,
      variables: {id: uuid},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.incrementRecommendations.success).toBeTruthy()
    expect(
      result.data?.incrementRecommendations.specialist.recommendations
    ).toBe(recommendations)
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

  it('returns an user input error', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    const result = await testServer.executeOperation({
      query,
      variables: {},
    })
    expect(result.data).toBeUndefined()
    expect(result.errors?.[0]).toBeInstanceOf(UserInputError)
    expect(result.errors?.[0].extensions?.code).toMatch(/bad_user_input/i)
  })
})
