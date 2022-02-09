import {gql} from 'apollo-server'

const typeDefs = gql`
  "the coordinates at geographic coordinate system"
  type Geo @entity {
    "the latitude of a certain point on the surface of the Earth"
    lat: String! @column
    "the longitude of a certain point on the surface of the Earth"
    lng: String! @column
  }
  "the name and address of the person or business"
  type Address @entity {
    street: String @column
    "the location of a business within a shopping mall or office building"
    suite: String @column
    city: String! @column
    zipcode: String @column
    "the coordinates at geographic coordinate system"
    geo: Geo @embedded
  }
  "a business organization that makes, buys, or sells goods or provides services in exchange for money"
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
    "the latitude of a certain point on the surface of the Earth"
    lat: String!
    "the longitude of a certain point on the surface of the Earth"
    lng: String!
  }
  input AddressInput {
    "the name of the street to which the address is located"
    street: String
    " the location of a business within a shopping mall or office building"
    suite: String
    "the name of the city to which the address is located"
    city: String!
    "the postal code to which the address is located"
    zipcode: String
    "the coordinates at geographic coordinate system"
    geo: GeoInput
  }
  input CompanyInput {
    "the name by which people know the business of the specialist"
    name: String!
    "an expression consisting of one or more words slogan a favorite saying of a sector"
    catchPhrase: String
    "the sector of the economy the specialist operates in"
    bs: String!
  }
  input SpecialistInput {
    "the first and last name of the specialist"
    name: String!
    "the business email address of the specialist"
    email: String!
    "the place where the specialist works"
    address: AddressInput!
    "the business phone number of the specialist"
    phone: String
    "a central location of web pages that are related and accessed using a browser"
    website: String
    "the company where the specialist works"
    company: CompanyInput!
    "an icon, graphic, or other image by which the specialist represents himself or herself"
    avatar: String
  }
  input CustomerInput {
    "the first and last name of the customer"
    name: String!
    "the email address of the customer"
    email: String!
    "the place where the customer lives"
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
    "Query to get the information about a specific specialist"
    specialistForProfile(id: ID!): Specialist!
  }
  type Mutation {
    # Mutations go here
    "Mutation to create a new customer"
    registerCustomer(input: CustomerInput): CustomerResponse!
    "Mutation to create a new specialist"
    registerSpecialist(input: SpecialistInput): SpecialistResponse!
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
    "Newly updated customer after a successful mutation"
    customer: Customer
  }
  type SpecialistResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated specialist after a successful mutation"
    specialist: Specialist
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
