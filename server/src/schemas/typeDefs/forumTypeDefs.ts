import { gql } from "graphql-tag";

const forumTypeDefs = gql`
    type ForumPost {
        id: ID!
        codename: String!
        content: String!
        createdAt: String!
    }
    
    type Query {
        getAllForumPosts: [ForumPost]
    }
    
    type Mutation {
        addForumPost(codename: String!, content: String!): ForumPost
    }
`;

export default forumTypeDefs;