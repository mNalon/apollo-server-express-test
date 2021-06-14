import { gql } from 'apollo-server-express'

const schema = gql`
  type Query {
    me: User
  }

  type User {
    id: ID
    name: String
    grades: [String]
  }
`

const USERS = {
  '1': { id: '1', name: 'Jessie' },
  '2': { id: '2', name: 'James' }
}

const getUser = (id) => USERS[id]

function Query_me(request) {
  return getUser(request.user.id)
}
