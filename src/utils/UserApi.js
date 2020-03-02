import { gql } from "apollo-boost";

export const SIGNUP = gql`
mutation($email: String!, $userName: String!, $password: String!) {
  signup(
    email: $email
    userName: $userName
    password: $password
  ) {
    token
    user {
      userName
    }
  }
}
`;

export const SIGNIN = gql`
mutation($email: String!, $password: String!) {
  login(
    email: $email
    password: $password
  ) {
    token
    user {
      userName
    }
  }
}
`;

export const OWN_SCHOOLCLASSES = gql`
  query {
    currentUser {
    schoolClasses {
      id,
      name
    }
  }}
`;