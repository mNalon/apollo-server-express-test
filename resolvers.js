const resolvers = {
  Query: {
    video: (root, { id }) => ({ id })
  },

  Video: {
    duration: ({ id }, variables, { dataSources }) =>
      dataSources.videos.getVideoById(id).then(({ duration }) => duration),
    thumbnail: ({ id }, variables, { dataSources }) => 
      dataSources.videos.getVideoById(id).then(({ thumbnail }) => thumbnail)
  },

  User: {
    lastWatchedVideos: (videos, variables, context, { cacheControl }) => {
      if('something happens...') cacheControl.setCacheHint({ maxAge: 300 })
      return videos
    }
  }
}

export default resolvers
