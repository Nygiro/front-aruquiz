import {gql} from "apollo-boost";

export const GET_IS_DARK_MODE = gql`
  {
    darkMode @client
  }
`;

export const GET_IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const GET_USERNAME = gql`
  {
    userName @client
  }
`;
