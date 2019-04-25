import { ApolloServer, gql } from 'apollo-server'
const { RedisCache } = require('apollo-server-cache-redis');
import { createComplexityLimitRule } from 'graphql-validation-complexity'

import typeDefs from './type-defs'
import resolvers from './resolvers'
import { ProgramsDatasource, VideosDatasource } from '../data-sources'

const MAX_QUERY_COMPLEXITY = 450

const costs = {
  scalarCost: 1,
  objectCost: 0,
  listFactor: 10,
  introspectionListFactor: 1
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  cache: new RedisCache({
    host: 'localhost',
    port: 6379
  }),
  validationRules: [createComplexityLimitRule(MAX_QUERY_COMPLEXITY, costs)], 
  dataSources: () => ({ 
    programs: new ProgramsDatasource(),
    videos: new VideosDatasource() 
  }), 
})

server.listen().then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })