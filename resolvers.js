const resolvers = {
  Query: {
    video: (root, { id }, { dataSources }) => dataSources.videos.getVideoById(id),
    program: (root, { id }, { dataSources }) => dataSources.programs.getProgramById(id)
  }
}

export default resolvers