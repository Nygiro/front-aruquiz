import {gql} from "apollo-boost";

export const GET_COLOR_BACKGROUND = gql`
  {
    colorBackground @client
  }
`;


