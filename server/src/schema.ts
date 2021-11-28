import {gql} from 'apollo-server'

const typeDefs = gql`
  "the coordinates at geographic coordinate system"
  type Geo {
    lat: String!
    lng: String!
  }
  "the name and address of the person or business"
  type Address {
    street: String
    suite: String
    city: String!
    zipcode: String
    geo: Geo
  }
  type Company {
    "the name by which people know the business of the specialist"
    name: String!
    "an expression consisting of one or more words slogan a favorite saying of a sector"
    catchPhrase: String
    "the sector of the economy the specialist operates in"
    bs: String!
  }
  "a member of a profession or any person who earns a living from a specified professional activity"
  type Specialist {
    # properties go here
    "the unique identifier of the specialist"
    id: ID!
    "the first and last name of the specialist"
    name: String!
    "the business email address of the specialist"
    email: String!
    "the place where the specialist works"
    address: Address!
    "the business phone number of the specialist"
    phone: String
    "a central location of web pages that are related and accessed using a browser"
    website: String
    "a business organization that makes, buys, or sells goods or provides services in exchange for money"
    company: Company!
    "an icon, graphic, or other image by which the specialist represents himself or herself"
    avatar: String
    "number of times the specialist has been recommended by customers"
    recommendations: Int
  }
  type Query {
    # Queries go here
    "Query to get a list of specialists for the dashboard page"
    specialistsForDashboard: [Specialist!]!
    "Query to get the information about a specific specialist"
    specialistForAbout(id: ID!): Specialist!
  }
  type Mutation {
    # Mutations go here
    "Mutation to increment the specialist's recommendations property"
    incrementRecommendations(id: ID!): incrementRecommendationsResponse!
  }
  type incrementRecommendationsResponse {
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
