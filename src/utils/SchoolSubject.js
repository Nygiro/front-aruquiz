import { gql } from "apollo-boost";

export const GET_SCHOOL_SUBJECTS = gql`
query {
  schoolSubjects {
    id,
    name
  }
}`;

