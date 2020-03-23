import { gql } from "apollo-boost";

export const CREATE_SCHOOL_CLASS = gql`
mutation createSchoolClass($name: String!) {
  createSchoolClass(name: $name) {
    id,
    name
  }
}`;

export const DELETE_SCHOOL_CLASS = gql`
mutation deleteClass($schoolClassId: ID!) {
  deleteSchoolClass(schoolClassId: $schoolClassId) {
    id
  }
}
`;


export const CREATE_STUDENT = gql`
mutation createStudent($name: String!, $schoolClassId: ID!, $markerId: String!) {
  createStudent(name: $name, schoolClassId: $schoolClassId, markerId: $markerId) {
    id,
    name
  }
}`;


export const UPDATE_STUDENT = gql`
mutation updateStudent($name: String!, $studentId: ID!, $markerId: String!) {
  updateStudent(name: $name, studentId: $studentId, markerId: $markerId) {
    id
  }
}
`;


export const DELETE_STUDENT = gql`
mutation deleteStudent($studentId: ID!) {
  deleteStudent(studentId: $studentId) {
    id
  }
}
`;


export const CREATE_QUIZ = gql`
mutation createQuiz($name: String!, $schoolSubjectId: ID!) {
  createQuiz(name: $name, schoolSubjectId: $schoolSubjectId) {
    id,
    name
  }
}
`;


