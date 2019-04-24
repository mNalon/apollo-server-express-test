import { ApolloServer, gql } from 'apollo-server'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Video {
    id: ID!
    title: String!
    description: String
    thumbnail(size: String): String
    duration: Int
    program: String @deprecated
    relatedProgram: Program
  }

  type Query {
    video(id: ID!): Video
  }
`;

const resolvers = {
  Query: {
    video: () => ({})
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })