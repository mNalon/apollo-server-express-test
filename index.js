import { ApolloServer, gql } from 'apollo-server'
const { RedisCache } = require('apollo-server-cache-redis');

import typeDefs from './type-defs'
import resolvers from './resolvers'
import { ProgramsDatasource, VideosDatasource } from '../data-sources'

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  cache: new RedisCache({
    host: 'localhost',
    port: 6379
  }),
  dataSources: () => ({ 
    programs: new ProgramsDatasource(),
    videos: new VideosDatasource() 
  }), 
})

server.listen().then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })