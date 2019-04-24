import { RESTDataSource } from 'apollo-datasource-rest'

const parseData = ({program_id, ...data}) => ({id: program_id, ...data})

export default class ProgramsDatasource extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:8080/'
  }

  getProgramById(programId) {
    return this.get(`/programs/${programId}`)
               .then(parseData)
               .catch(() => {throw new Error(`Error while fetching the program ${programId}`)})
  }
}