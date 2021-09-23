import type {QueryResolvers, Specialist} from '../generated/graphql'

const mocks = {
  Query: (): QueryResolvers => ({
    specialistsForDashboard: () => [...new Array(6)],
  }),
  Specialist: (): Specialist => ({
    id: '_01',
    name: 'Karen Dawson',
    email: 'address@example.com',
    company: 'General Medical Hospital',
    industry: 'Paediatric Surgeon',
    location: 'North Houston, Texas, USA',
  }),
}

export default mocks
