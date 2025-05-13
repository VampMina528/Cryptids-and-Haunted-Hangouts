// TypeDefs for cyrptids and sightings
import { gql } from 'apollo-server-express';

const cryptidTypeDefs = gql`
  type Cryptid {
    id: ID!
    name: String!
    description: String
    location: String
    image: String
    soundUrl: String
    hauntedPlace: HauntedPlace
  }

  type HauntedPlace {
    name: String
    description: String
  }

  type Query {
    getCryptidById(id: ID!): Cryptid
    getAllCryptids: [Cryptid]
  }
`;

export default cryptidTypeDefs;
