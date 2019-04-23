const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const getVideoById = (id) => ({
	id, title: 'test', 
	title: 'test',
	description: 'test', 
	thumbnail: 'http://foo.bar.br/description.jpeg',
	duration: 123
})

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Video {
    id: ID!
    title: String!
    description: String
    thumbnail(size: String): String
    duration: Int
    program: String
  }

  type Query {
    video(id: ID!): Video
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    video: (root, {id}) => getVideoById(id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);