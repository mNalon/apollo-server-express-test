// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Program {
    id: ID!
    title: String
  }

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
    program(id: ID!): Program
  }
`;

export default typeDefs