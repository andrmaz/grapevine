import {ApolloServer, UserInputError} from 'apollo-server'
import {email, id, message, name, user} from 'mocks/constants'

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
  'mutation CreateMessage($input: MessageInput!) {createMessage(input: $input) {code success message output {from to content}}}'

describe('create message mutation', () => {
  const customers = new Customers(new CustomerModel() as any)
  const specialists = new Specialists(new SpecialistModel() as any)
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)
  const testServer = new ApolloServer({
    schema,
    dataSources: () => ({customers, specialists}),
    context: () => ({user: {id, name, email, role: user}}),
  })

  it('creates a new message', async () => {
    customers.createMessage = jest.fn(async () => message)
    const {id, ...rest} = message
    const input = {...rest}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.createMessage.code).toBeTruthy()
    expect(result.data?.createMessage.output).toEqual(input)
  })

  it('returns an user input error', async () => {
    const result = await testServer.executeOperation({
      query,
      variables: {},
    })
    expect(result.data).toBeUndefined()
    expect(result.errors?.[0]).toBeInstanceOf(UserInputError)
    expect(result.errors?.[0].extensions?.code).toMatch(/bad_user_input/i)
  })
})
