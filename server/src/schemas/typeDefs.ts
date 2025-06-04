const typeDefs = `
    type ForumPost {
        id: ID!
        codename: String!
        content: String!
        createdAt: String!
        user: User
    }

    type User {
        id: ID!
        codename: String!
        email: String!
    }
    
    type Cryptid {
        id: ID!
        name: String!
        description: String
        location: String
        image: String
        soundUrl: String
        hauntedPlace: HauntedPlace
    }
    
    type Auth {
        token: String
        user: User!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type HauntedPlace {
        name: String
        description: String
    }

    input AddUserInput {
        codename: String!
        email: String!
        password: String!
    }

    input AddForumPostInput {
        content: String!
    }

    type Query {
        getCryptidById(id: ID!): Cryptid
        getAllCryptids: [Cryptid]
        getAllForumPosts: [ForumPost]
    } 

    type Mutation {
        addUser(input: AddUserInput!): Auth
        loginUser(codename: String!, password: String!): AuthPayload
        addForumPost(input: AddForumPostInput!): ForumPost
        updateForumPost(id: ID!, content: String!): ForumPost
        deleteForumPost(id: ID!): Boolean
    }    
`
export default typeDefs