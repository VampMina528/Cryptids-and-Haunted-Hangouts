import { gql } from "@apollo/client";

export const GET_ALL_FORUM_POSTS = gql`
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
            content
            createdAt
        }
    }
`;

export const DELETE_FORUM_POST = gql`
    mutation DeleteForumPost($id: ID!) {
        deleteForumPost(id: $id)
    }
`;