// this create the structure of the data
const {gql} = require('graphql-tag');

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    category: String!
    description: String
    price: Float!
    instock: Boolean!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
    id: ID,
      title: String!,
      category: String!,
      description: String,
      price: Float!,
      instock: Boolean!
    ): Product!

    deleteProduct(id: ID!): Product!

    updateProduct(
      id: ID!,
      title: String,
      category: String,
      description: String,
      price: Float,
      instock: Boolean
    ): Product!
  }
`;

module.exports = typeDefs;