import {email, expiresAt, token, userInfo} from '../../mocks/constants'

import {ApolloServer} from 'apollo-server'
import {CustomerModel} from '../../src/models/customer'
import Customers from '../../src/datasources/customer'
import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {EmailRequiredError} from '../../src/utils/errors'
import {SpecialistModel} from '../../src/models/specialist'
import Specialists from '../../src/datasources/specialist'
import authDirectiveTransformer from '../../src/directives/auth'
import {getRole} from '../../src/utils/auth'
import {makeExecutableSchema} from '@graphql-tools/schema'
import resolvers from '../../src/resolvers'
import typeDefs from '../../src/schema'

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
