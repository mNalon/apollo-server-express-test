import { ApolloServer, gql } from 'apollo-server'
import { ProgramsDatasource, VideosDatasource } from '../data-sources'

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

const resolvers = {
  Query: {
    video: (root, { id }, { dataSources }) => dataSources.videos.getVideoById(id),
    program: (root, { id }, { dataSources }) => dataSources.programs.getProgramById(id)
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => ({ 
    programs: new ProgramsDatasource(),
    videos: new VideosDatasource() 
  }), 
})

server.listen().then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })