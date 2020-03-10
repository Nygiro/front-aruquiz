import { gql } from "apollo-boost";

export const GET_SCHOOL_CLASS = gql`
query quiz($quizId: ID!){
  quiz(quizId: $quizId){
    id,
    name,
    schoolSubject {
      name
    },
    createdBy {
      userName
    }
  }
}`;