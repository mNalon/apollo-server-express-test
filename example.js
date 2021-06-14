import { gql } from 'apollo-server-express'

const schema = gql`
  type Query {
    me: User
  }

  type User {
    id: ID
    name: String
  }

  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  enum AllowedColor {
    RED
    GREEN
    BLUE
  }

  type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER, decimalPlaces: Int = 2): Float
  }

  input StarShipLengthMeasureUnit {
    unit: LengthUnit = METER, 
    decimalPlaces: Int = 2
  }

  type Starship {
    id: ID!
    name: String!
    length(measureUnit: StarShipLengthMeasureUnit): Float
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  type Character {
    name: String!
    appearsIn: [Episode]!
  }

  interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }

  type Human implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    starships: [Starship]
    totalCredits: Int
  }
 
  type Droid implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    primaryFunction: String
  }

  union SearchResult = Human | Droid | Starship


  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  enum MyEnum {
    OLD_VALUE @deprecated(reason: "Use NEW_VALUE.")
    NEW_VALUE
  }
`

const USERS = {
  '1': { id: '1', name: 'Jessie' },
  '2': { id: '2', name: 'James' }
}

const getUser = (id) => USERS[id]

const resolvers = {
  Query: {
    me: (request) => getUser(request.headers.userId)
  }
}

const query = gql`
  {
    me {
      name
    }
  }
`
const response = {
  "me": {
    "name": "Jessie"
  }
}
