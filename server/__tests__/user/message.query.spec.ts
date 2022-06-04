import {creator, email, id, message, name, user} from 'mocks/constants'

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
  'query MessagesForChat($from: String!, $to: String!) {messagesForChat(from: $from, to: $to) { id from to content}}'

describe('message for chat query', () => {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)
  const {to, from} = message

  it('fetches the chat messages', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    specialists.getMessages = jest.fn(async () => [message])
    const result = await testServer.executeOperation({
      query,
      variables: {from, to},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.messagesForChat[0]).toEqual(message)
  })

  it('returns an empty messages list', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: user}}),
    })
    specialists.getMessages = jest.fn(async () => [])
    const result = await testServer.executeOperation({
      query,
      variables: {from, to},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.messagesForChat.length).toBe(0)
  })

  it('returns an authentication error', async () => {
    const testServer = new ApolloServer({
      schema,
      dataSources: () => ({customers, specialists}),
      context: () => ({user: {id, name, email, role: creator}}),
    })
    const result = await testServer.executeOperation({
      query,
      variables: {from, to},
    })
    expect(result.data).toBeNull()
    expect(result.errors?.[0]).toHaveProperty('message', 'Not authorized')
    expect(result.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED')
  })
})
