import {ApolloServer, UserInputError} from 'apollo-server-express'
import {EmailRequiredError, GenericServerError} from '~/utils/errors'
import {city, email, expiresAt, name, token, userInfo} from 'mocks/constants'

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
  'mutation RegisterCustomer($input: CustomerInput!) {registerCustomer(input: $input) {code success message user {userInfo {name id email role} token expiresAt}}}'

describe('register customer mutation', () => {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  let schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })
  schema = authDirectiveTransformer(schema, 'auth', getRole)
  const testServer = new ApolloServer({
    schema,
    dataSources: () => ({customers, specialists}),
  })

  it('successfully register a new customer', async () => {
    const response = {
      token,
      userInfo,
      expiresAt,
    }
    customers.insertCustomer = jest.fn(async () => response)
    const input = {name, email, address: {city}}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.registerCustomer.success).toBeTruthy()
    expect(result.data?.registerCustomer.user).toEqual(response)
  })

  it('returns an user input error', async () => {
    customers.insertCustomer = jest.fn(async () => {
      throw new GenericServerError()
    })
    const input = {name, address: {city}}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.data).toBeUndefined()
    expect(result.errors?.[0]).toBeInstanceOf(UserInputError)
  })

  it('returns an email required error', async () => {
    customers.insertCustomer = jest.fn(async () => {
      throw new EmailRequiredError()
    })
    const input = {name, email: '', address: {city}}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.data?.registerCustomer.user).toBeNull()
    expect(result.data?.registerCustomer.success).toBeFalsy()
    expect(result.data?.registerCustomer.message).toMatch(
      /email address is required/i
    )
  })
})
