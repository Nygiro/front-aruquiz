import {gql} from "apollo-boost";

export const GET_QUIZZES = gql`
query quizzes {
  quizzes {
    id, 
    name, 
    schoolSubject {
      name
    }
    createdBy {
      id
    }
  }
}
`;

export const GET_QUIZ = gql`
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
}
`;

export const SEARCH_QUERY_QUIZZES = gql`
  query quizzes($filter: String!) {
    quizzes(filter: $filter) {
        id,
        name
    }
  }
`