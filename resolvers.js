const resolvers = {
  Query: {
    video: (root, { id }) => ({ id })
  },

  Video: {
    duration: ({ id }, _, { dataSources }) =>
      dataSources.videos.getVideoById(id).then(({ duration }) => duration),
    thumbnail: ({ id }, _, { dataSources }) => 
      dataSources.videos.getVideoById(id).then(({ thumbnail }) => thumbnail)
  }
}

export default resolvers