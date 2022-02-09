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
    // returns an object of customer that will be used to populate
    // the profile card of our web client
    customerForProfile: async (_, {id}, {dataSources}) => {
      return dataSources.customers.getCustomer(id)
    },
    // returns an object of specialist that will be used to populate
    // the profile card of our web client
    specialistForProfile: async (_, {id}, {dataSources}) => {
      return dataSources.specialists.getSpecialist(id)
    },
  },
  Mutation: {
    // insert a new customer in the database
    registerCustomer: async (_, {input}, {dataSources}) => {
      try {
        const customer = await dataSources.customers.insertCustomer(input)
        return {
          code: 200,
          success: true,
          message: `Successfully registered as a customer`,
          customer,
        }
      } catch (err: unknown) {
        if (err instanceof GraphQLError) {
          return {
            code: err.extensions?.response.status,
            success: false,
            message: err.extensions?.response.body,
            customer: null,
          }
        } else {
          return {
            code: 500,
            success: false,
            message: `Something went wrong while processing the request: ${err}`,
            customer: null,
          }
        }
      }
    },
    // insert a new specialist in the database
    registerSpecialist: async (_, {input}, {dataSources}) => {
      try {
        const specialist = await dataSources.specialists.insertSpecialist(input)
        return {
          code: 200,
          success: true,
          message: `Successfully registered as a specialist`,
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
            message: `Something went wrong while processing the request: ${err}`,
            specialist: null,
          }
        }
      }
    },
    // increment specialist's recommendations property
    incrementRecommendations: async (_, {id}, {dataSources}) => {
      try {
        const specialist =
          await dataSources.specialists.incrementRecommendations(id)
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of recommendations for specialist ${id}`,
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
