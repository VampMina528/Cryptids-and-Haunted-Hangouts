// GraphQL queries
import { gql } from '@apollo/client';

export const GET_CRYPTID_BY_ID = gql`
  query GetCryptidById($id: ID!) {
    getCryptidById(id: $id) {
      id
      name
      location
      description
      image
      soundUrl
      hauntedPlace {
        name
        description
      }
    }
  }
`;

export const GET_ALL_CRYPTIDS = gql`
  query GetAllCryptids {
    getAllCryptids {
      id
      name
      location
      description
      image
      soundUrl
      hauntedPlace {
        name
        description
      }
    } 
  }
`;

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
