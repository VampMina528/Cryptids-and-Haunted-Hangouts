// GraphQL mutations
import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($input: AddUserInput!) {
        addUser(input: $input) {
            token
            user {
                id
                codename
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($codename: String!, $password: String!) {
        loginUser(codename: $codename, password: $password) {
            token
            user {
                id
                codename
                email
            }
        }   
    }
`

export const ADD_FORUM_POST = gql`
    mutation addForumPost($input: AddForumPostInput!) {
        addForumPost(input: $input) {
            id
            codename
            content
            createdAt
        }
    }
`;

export const UPDATE_FORUM_POST = gql `
    mutation updateForumPost ($id: ID!, $content: String!) {
        updateForumPost(id: $id, content: $content) {
            id
            codename
            content
            createdAt
        }
    }
`

export const DELETE_FORUM_POST = gql`
    mutation deleteForumPost($id: ID!) {
        deleteForumPost(id: $id)
    }
`;