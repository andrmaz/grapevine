import {QueryResolvers, Scalars} from '../generated/graphql'

import {RESTDataSource} from 'apollo-datasource-rest'

class SpecialistAPI extends RESTDataSource {
  constructor() {
    super()
    // Sets the base URL for the REST API
    this.baseURL = 'https://jsonplaceholder.typicode.com/'
  }
  async getSpecialistsForDashboard(): Promise<
    QueryResolvers['specialistsForDashboard']
  > {
    return this.get('users')
  }
  async getSpecialistForAbout(
    id: Scalars['ID']
  ): Promise<QueryResolvers['specialistForAbout']> {
    return this.get(`users/${encodeURIComponent(id)}`)
  }
}

export default SpecialistAPI
