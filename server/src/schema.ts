import {gql} from 'apollo-server'

const typeDefs = gql`
  "the coordinates at geographic coordinate system"
  type Geo @entity {
    lat: String! @column
    lng: String! @column
  }
  "the name and address of the person or business"
  type Address @entity {
    street: String @column
    suite: String @column
    city: String! @column
    zipcode: String @column
    geo: Geo @embedded
  }
  type Company @entity {
    "the name by which people know the business of the specialist"
    name: String! @column
    "an expression consisting of one or more words slogan a favorite saying of a sector"
    catchPhrase: String @column
    "the sector of the economy the specialist operates in"
    bs: String! @column
  }
  "a member of a profession or any person who earns a living from a specified professional activity"
  type Specialist @entity {
    # properties go here
    "the unique identifier of the specialist"
    id: ID! @id
    "the first and last name of the specialist"
    name: String! @column
    "the business email address of the specialist"
    email: String! @column
    "the place where the specialist works"
    address: Address! @embedded
    "the business phone number of the specialist"
    phone: String @column
    "a central location of web pages that are related and accessed using a browser"
    website: String @column
    "a business organization that makes, buys, or sells goods or provides services in exchange for money"
    company: Company! @embedded
    "an icon, graphic, or other image by which the specialist represents himself or herself"
    avatar: String @column
    "number of times the specialist has been recommended by customers"
    recommendations: Int # this field won't get a generated MongoDB field
  }
  "individuals and businesses that purchase goods and services from another business"
  type Customer @entity {
    "the unique identifier of the customer"
    id: ID! @id
    "the first and last name of the customer"
    name: String! @column
    "the email address of the customer"
    email: String! @column
    "the place where the customer lives"
    address: Address @embedded
    "a list of specialists who have been recommended by the customer"
    specialists: [Specialist] @link
  }
  # Inputs go here
  input GeoInput {
    lat: String!
    lng: String!
  }
  input AddressInput {
    street: String
    suite: String
    city: String!
    zipcode: String
    geo: GeoInput
  }
  input CustomerInput {
    name: String!
    email: String!
    address: AddressInput
  }
  type Query {
    # Queries go here
    "Query to get a list of specialists for the dashboard page"
    specialistsForDashboard: [Specialist!]!
    "Query to get the information about a specific specialist"
    specialistForAbout(id: ID!): Specialist!
    "Query to get the information about a specific customer"
    customerForProfile(id: ID!): Customer!
  }
  type Mutation {
    # Mutations go here
    "Mutation to create a new customer"
    registerCustomer(data: CustomerInput): CustomerResponse!
    "Mutation to increment the specialist's recommendations property"
    incrementRecommendations(id: ID!): IncrementRecommendationsResponse!
  }
  type CustomerResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated specialist after a successful mutation"
    customer: Customer
  }
  type IncrementRecommendationsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated specialist after a successful mutation"
    specialist: Specialist
  }
`
export default typeDefs
