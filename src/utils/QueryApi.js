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


export const GET_STUDENTS_BY_TEACHER = gql`
query studentsByTeacher($userId: [ID!]!) {
  user(userId: $userId) {
    schoolClasses {
      students {
        id,
        name
      }
    }
  }
}
`

export const GET_REPORT_BY_STUDENT = gql`
query reports($studentId: ID!) {
  reports(studentId: $studentId) {
    quiz {
      id
      name
    }
    question {
      id
      label
    }
    answer {
      id
      label
      isRight
    }
  }
}
`

export const GET_REPORT_BY_STUDEN_BY_QUIZ = gql`
query reportsByQuiz($studentId: ID!, $quizId: ID!) {
  reportsByQuiz(studentId: $studentId, quizId: $quizId) {
    quiz {
      id
      name
    }
    question {
      id
      label
    }
    answer {
      id
      label
      isRight
    }
  }
}
`



