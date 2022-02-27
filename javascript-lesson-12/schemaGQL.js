const { buildSchema } = require("graphql")

const schema = buildSchema(`
scalar Date
schema {
  query: Query
  mutation: Mutation
}
type Query {
  user(login: String, password: String): User
  items(filter: Filter, details: DetalizationLevel, startIndex: Int, itemCount: Int): [Item]
  categories(filter: Filter, details: DetalizationLevel): [Category]
}
type Mutation {
  createUser(user: InputUser!): User
  createOrder(order: InputOrder!): Order
}
enum Role {
  USER
  ADMIN
}
enum DetalizationLevel {
  LOW
  MEDIUM
  FULL
}
enum FeatureValueType {
  LIST
  INTERVAL
  COLORLIST
  RADIOLIST
  DATEINTERVAL
}
type Feature {
  name: String!
  valueString: String
  valueDate: Date
  valueNum: Float
}
input InputFeature {
  name: String!
  valueString: String
  valueDate: Date
  valueNum: Float
}
type Item {
  id: Int!
  name: String!
  description: String
  price: Float!
  discount: Float
  features: [Feature]
}
input InputItem {
  id: Int!
  name: String
  description: String
  price: Float
  discount: Float
  features: [InputFeature]
}
type ItemAmount {
  item: Item
  amount: Int
 }
 input OutputItemAmount {
  item: InputItem
  amount: Int
 }
type User {
  id: Int!
  username: String!
  password: String!
  email: String!
  role: Role!
}
input InputUser {
  id: Int
  username: String!
  password: String!
  email: String!
  role: Role!
}
type Order {
  id: Int!
  user: User!
  items: [ItemAmount]!
  cupon: String
  totalPrice: Float
}
input InputOrder {
  id: Int
  user: InputUser!
  items: [OutputItemAmount]!
  cupon: String
  totalPrice: Float
}
type Category {
  name: String!
  valueType: FeatureValueType!
  features: [Feature]!
}
input Filter {
  features: [InputFeature]
  searchText: String
}
`)

module.exports = schema