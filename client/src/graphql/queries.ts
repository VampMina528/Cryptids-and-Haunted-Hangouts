// GraphQL queries
import { gql } from '@apollo/client';

export const GET_CRYPTID_BY_ID = gql`
  query GetCryptidById($id: ID!) {
    getCryptidById(id: $id) {
      id
      name
      description
      location
      image
      soundUrl
      hauntedPlace {
        name
        description
      }
    }
  }
`;
