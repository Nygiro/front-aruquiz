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
mutation createStudent($name: String!, $schoolClassId: ID!) {
  createStudent(name: $name, schoolClassId: $schoolClassId) {
    id,
    name
  }
}`;


export const UPDATE_STUDENT = gql`
mutation updateStudent($name: String!, $studentId: ID!) {
  updateStudent(name: $name, studentId: $studentId) {
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



