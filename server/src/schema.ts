import {gql} from 'apollo-server'

const typeDefs = gql`
  "A specialist is a member of a profession or any person who earns a living from a specified professional activity."
  type Specialist {
    # properties go here
    "the unique identifier of the specialist"
    id: ID!
    "the first and last name of the specialist"
    name: String!
    "the business email address of the specialist"
    email: String!
    "the name by which people know the business of the specialist"
    company: String!
    "the sector of the economy the specialist operates in"
    industry: String!
    "the place where the specialist works"
    location: String!
  }
  type Query {
    # Queries go here
    "Query to get a list of specialists for the dashboard page"
    specialistsForDashboard: [Specialist!]!
  }
`
export default typeDefs
