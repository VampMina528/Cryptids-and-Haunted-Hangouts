// GraphQL mutations
import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($input: AddUserInput!) {
        addUser(input: $input) {
            token
            user {
                _id
                codename
                email
                forumPosts
                
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($codename: String!, $password: String!) {
        loginUser(codename: $codename, password: $password) {
            token
            user {
                _id
                codename
                email
                }
            }   
        }
   `

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