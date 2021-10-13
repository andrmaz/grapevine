import type {QueryResolvers, Specialist} from '../generated/graphql'

const mocks = {
  Query: (): QueryResolvers => ({
    specialistsForDashboard: () => [...new Array(6)],
    specialistForAbout: () => Object.create({}),
  }),
  Specialist: (): Specialist => ({
    id: '_01',
    name: 'Karen Dawson',
    email: 'address@example.com',
    company: 'General Medical Hospital',
    industry: 'Paediatric Surgeon',
    location: 'North Houston, Texas, USA',
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
  }),
}

export default mocks
