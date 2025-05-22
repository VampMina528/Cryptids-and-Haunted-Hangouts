import { gql } from "@apollo/client";

export const GET_ALL_FORUMS_POSTS = gql`
    query GetAllForumPosts {
        getAllForumPosts {
            id
            codename
            content
            createdAt
        }
    }
`;

export const ADD_FORUM_POST = gql`
    mutation AddForumPost($codename: String!, $content: String!) {
        addForumPost(codename: $codename, content: $content) {
            id
            codename
            conent
            createdAt
        }
    }
`;