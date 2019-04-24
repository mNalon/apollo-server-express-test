import { RESTDataSource } from 'apollo-datasource-rest'

const parseProgramData = ({program_id, ...data}) => ({id: program_id, ...data})

export default class ProgramsDatasource extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:8080/'
  }

  getProgramById(programId) {
    return this.get(`/programs/${programId}`)
               .then(parseProgramData)
               .catch(() => {throw new Error(`Error while fetching the program ${programId}`)})
  }
}

export default class VideosDatasource extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:8080/'
  }

  getVideoById(videoId) {
    return this.get(`/videos/${videoId}`)
               .catch(() => {throw new Error(`Error while fetching the video ${programId}`)})
  }
}