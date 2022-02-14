import {GraphQLError} from 'graphql'
import type {Resolvers} from './generated/graphql'

const resolvers: Resolvers = {
  Query: {
    // returns an array of specialist that will be used to populate
    // the dashboard grid of our web client
    specialistsForDashboard: async (_, __, {dataSources}) => {
      return dataSources.specialists.getSpecialists()
    },
    // returns an object of specialist that will be used to populate
    // the about card of our web client
    specialistForAbout: async (_, {id}, {dataSources}) => {
      return dataSources.specialists.getSpecialist(id)
    },
    // returns an object of customer that will be used to populate
    // the profile card of our web client
    customerForProfile: async (_, {id}, {dataSources}) => {
      return dataSources.customers.getCustomer(id)
    },
    // return a list of specialists that will be used to populate
    // the customer's recommendation list of our web client
    recommendationsForDashboard: async (_, {id}, {dataSources}) => {
      return dataSources.customers.getRecommendations(id)
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
    // add a specialist to the customer recommendations list
    /* addRecommendation: async (_, {id}, {dataSources}) => {
      try {
        const customer = await dataSources.customers.addRecommendation(id)
        return {
          code: 200,
          success: true,
          message: `Successfully add specialist ${id} to customer's list`,
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
    }, */
    /* editSpecialist: async (_, {input}, {dataSources}) => {
      try {
        const specialist = await dataSources.specialists.editSpecialist(input)
        return {
          code: 200,
          success: true,
          message: `Successfully edited specialist`,
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
    }, */
    /* editCustomer: async (_, {input}, {dataSources}) => {
      try {
        const customer = await dataSources.customers.editCustomer(input)
        return {
          code: 200,
          success: true,
          message: `Successfully edited customer`,
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
            message: 'Something went wrong while processing the request',
            customer: null,
          }
        }
      }
    }, */
    removeSpecialist: async (_, {id}, {dataSources}) => {
      try {
        const specialist = await dataSources.specialists.removeSpecialist(id)
        return {
          code: 200,
          success: true,
          message: `Successfully removed specialist ${id}`,
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
    removeCustomer: async (_, {id}, {dataSources}) => {
      try {
        const customer = await dataSources.customers.removeCustomer(id)
        return {
          code: 200,
          success: true,
          message: `Successfully removed customer ${id}`,
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
            message: 'Something went wrong while processing the request',
            customer: null,
          }
        }
      }
    },
  },
}

export default resolvers
