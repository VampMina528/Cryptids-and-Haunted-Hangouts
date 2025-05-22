const typeDefs = `
    type ForumPost {
        id: ID!
        codename: String!
        content: String!
        createdAt: String!
    }

    type User {
        _id: ID!
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

    type HauntedPlace {
        name: String
        description: String
    }

    input AddUser {
        codename: String!
        email: String!
        password: String!
    }

    type Query {
        getCryptidById(id: ID!): Cryptid
        getAllCryptids: [Cryptid]
        getAllForumPosts: [ForumPost]
    } 

    type Mutation {
        addForumPost(codename: String!, content: String!): ForumPost

    }    
`
export default typeDefs