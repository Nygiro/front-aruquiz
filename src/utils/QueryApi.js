import { gql } from "apollo-boost";

export const GET_STUDENTS_BY_SCHOOL_CLASS = gql`
query schoolClass($schoolClassId: ID!){
  schoolClass(schoolClassId: $schoolClassId){
    students {
      id,
      firstName
      lastName
    }
  }
}`;