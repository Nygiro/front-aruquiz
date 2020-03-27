import { gql } from "apollo-boost";

export const GET_STUDENTS_BY_SCHOOL_CLASS = gql`
query schoolClass($schoolClassId: ID!){
  schoolClass(schoolClassId: $schoolClassId){
    students {
      id,
      name,
      markerId
    }
  }
}`;


export const GET_SCHOOL_CLASSES_BY_CURRENT_USER = gql`
query schoolClassesByCurrentUser($search: String = "") {
  schoolClassesByCurrentUser(search: $search) {
    id,
    name,
    students {
      id,
      name,
      markerId
    }
  }
}`;


export const GET_STUDENTS_BY_STUDENTS_ID = gql`
  query students($studentsId: [ID!]!) {
    students(studentsId: $studentsId) {
        id,
        name,
        markerId
    }
  }
`



