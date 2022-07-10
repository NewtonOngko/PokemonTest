import { gql } from "@apollo/react-hooks";

const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
    }
  }
`;

export default GET_POKEMONS;
