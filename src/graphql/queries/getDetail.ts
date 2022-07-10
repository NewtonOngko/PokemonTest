import { gql } from "@apollo/react-hooks";

const GET_DETAILS = gql`
query pokemon($name: String, $id: String) {
    pokemon(name: $name, id: $id) {
      name
      image
      maxHP
      maxCP
      types
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      fleeRate
      attacks {
        special {
          name
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

export default GET_DETAILS;

