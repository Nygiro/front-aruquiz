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

export const GET_CURRENT_SCHOOL_CLASS_FOR_QUIZ = gql`
  {
    currentSchoolClassesForQuiz @client
  }
`;

export const GET_CURRENT_LIST_STUDENTS_FOR_QUIZ = gql`
  {
    currentListStudentsForQuiz @client
  }
`;
