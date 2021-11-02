import type {Resolvers} from './generated/graphql'

const resolvers: Resolvers = {
  Query: {
    // returns an array of specialist that will be used to populate
    // the dashboard grid of our web client
    specialistsForDashboard: async (_, __, {dataSources}) => {
      return dataSources.specialistAPI.getSpecialistsForDashboard()
    },
    // returns an object of specialist that will be used to populate
    // the about card of our web client
    specialistForAbout: async (_, {id}, {dataSources}) => {
      return dataSources.specialistAPI.getSpecialistForAbout(id)
    },
  },
}

export default resolvers
