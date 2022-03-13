import type {QueryResolvers, Specialist} from '../generated/graphql'

import { Role } from '../generated/graphql'

const mocks = {
  Query: (): QueryResolvers => ({
    specialistsForDashboard: () => [...new Array(6)],
  }),
  Specialist: (): Specialist => ({
    id: '_01',
    name: 'Karen Dawson',
    email: 'address@example.com',
    address: {city: 'North Houston, Texas, USA'},
    company: {name: 'General Medical Hospital', bs: 'Paediatric Surgeon'},
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    role: Role.Creator,
  }),
}

export default mocks
