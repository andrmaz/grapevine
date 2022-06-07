import {ApolloServer, UserInputError} from 'apollo-server'
import {
  email,
  id,
  name,
  specialist,
  specialistForAbout,
  user,
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
  'query GetSpecialist($id: ID!) {specialistForAbout(id: $id) {id name email address { street suite city zipcode geo {lat lng}} phone website company {name catchPhrase bs}}}'

describe('get specialist query', () => {
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
    context: () => ({user: {id, name, email, role: user}}),
  })

  it('fetches the specialist profile', async () => {
    specialists.getSpecialist = jest.fn(async () => specialist)
    const result = await testServer.executeOperation({
      query,
      variables: {id},
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.specialistForAbout).toEqual(specialistForAbout)
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
