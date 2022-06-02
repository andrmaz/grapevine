import {email, expiresAt, token, userInfo} from 'mocks/constants'

import {ApolloServer} from 'apollo-server'
import {CustomerModel} from '~/models/customer'
import Customers from '~/datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {EmailRequiredError} from '~/utils/errors'
import {SpecialistModel} from '~/models/specialist'
import Specialists from '~/datasources/specialist'
import authDirectiveTransformer from '~/directives/auth'
import {getRole} from '~/utils/auth'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from '~/resolvers'
import typeDefs from '~/schema'

const query =
  'mutation AuthorizeCustomer($input: UserInput!) { authorizeCustomer(input: $input) {code success message user {userInfo {name id email role}token expiresAt}}}'

describe('authorize customer mutation', () => {
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

  it('successfully authenticate a customer', async () => {
    const response = {
      token,
      userInfo,
      expiresAt,
    }
    customers.authorizeCustomer = jest.fn(async () => response)
    const input = {email}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.authorizeCustomer.success).toBeTruthy()
    expect(result.data?.authorizeCustomer.user).toEqual(response)
  })

  it('returns an email required error', async () => {
    customers.authorizeCustomer = jest.fn(async () => {
      throw new EmailRequiredError()
    })
    const input = {email: ''}
    const result = await testServer.executeOperation({
      query,
      variables: {input},
    })
    expect(result.data?.authorizeCustomer.user).toBeNull()
    expect(result.data?.authorizeCustomer.success).toBeFalsy()
    expect(result.data?.authorizeCustomer.message).toMatch(
      /email address is required/i
    )
  })
})
