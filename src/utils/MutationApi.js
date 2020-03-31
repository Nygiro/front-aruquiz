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

export const UPSERT_QUESTION = gql`
mutation upsertQuestion($label: String!, $quizId: ID!, $questionId: ID) {
  upsertQuestion(label: $label, quizId: $quizId, questionId: $questionId) {
    id,
    label
  }
}`;

export const UPSERT_ANSWER = gql`
mutation upsertAnswer($label: String!, $isRight: Boolean, $questionId: ID!, $answerId: ID) {
  upsertAnswer(label: $label, isRight: $isRight, questionId: $questionId, answerId: $answerId) {
    id,
    label,
    isRight
  }
}`;

export const UPDATE_ANSWER_IS_RIGHT_FIELD = gql`
mutation updateAnswerIsRightField($answerId: ID!, $isRight: Boolean) {
  updateAnswerIsRightField(answerId: $answerId, isRight: $isRight) {
    id,
    label,
    isRight
  }
}`;


export const DELETE_QUIZ = gql`
mutation deleteQuiz($quizId: ID!) {
  deleteQuiz(quizId: $quizId) {
    id
  }
}
`;


export const CREATE_REPORT = gql`
mutation createReport($schoolClassId: ID!, $studentId: ID!, $quizId: ID!, $questionId: ID!, $answerId: ID!) {
  createReport(schoolClassId: $schoolClassId, studentId: $studentId, quizId: $quizId, questionId: $questionId, answerId: $answerId) {
    id,
  }
}`;

export const UPSERT_STUDENT = gql`
mutation upsertStudent($name: String!, $schoolClassId: ID!, $markerId: String!, $studentId: ID) {
  upsertStudent(name: $name, schoolClassId: $schoolClassId, markerId: $markerId, studentId: $studentId) {
    id,
    name
  }
}`;
