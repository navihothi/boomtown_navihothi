const { gql } = require('apollo-server-express');

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  # scalar Upload

  # scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    owner: User
    borrower: User
    tags: [Tag!]!
  }

  type User {
    id: ID!
    username: String!
    items: [Item]
    borrowed: [Item]
    password: String!
    email: String!
    bio: String
  }

  # skip 
  type Tag {
    id: ID!
    title: String!
  }

  input NewItemInput {
    title: String!
    imageurl: String
    description: String!
    borrowerID: ID
    tagids: [ID!] 
  }

  input NewUserInput {
    username: String!
    password: String!
    email: String!
    bio: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }


  type Query {
    user(id: ID!): User
    viewer: User!
    items(idToOmit: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(input: NewItemInput!): Item!
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!):  LoginResponse!

  }
`;
