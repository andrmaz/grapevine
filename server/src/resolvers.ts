import {GraphQLError} from 'graphql'
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
  Mutation: {
    // increment specialist's recommendations property
    incrementRecommendations: async (_, {id}, {dataSources}) => {
      try {
        const specialist =
          await dataSources.specialistAPI.incrementRecommendations(id)
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for specialist ${id}`,
          specialist,
        }
      } catch (err: unknown) {
        if (err instanceof GraphQLError) {
          return {
            code: err.extensions?.response.status,
            success: false,
            message: err.extensions?.response.body,
            specialist: null,
          }
        } else {
          return {
            code: 500,
            success: false,
            message: 'Something went wrong while processing the request',
            specialist: null,
          }
        }
      }
    },
  },
}

export default resolvers
