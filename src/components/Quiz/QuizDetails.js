import React from 'react';
import QuizQuestionNumber from './QuizQuestionNumber';
import QuizQuestion from './QuizQuestion';
const QuizDetails = ({ quiz, nbCurrentQuestion }) => {
  return (
    <>
      <QuizQuestionNumber quiz={quiz} nbCurrentQuestion={nbCurrentQuestion} />
      <QuizQuestion quiz={quiz} nbCurrentQuestion={nbCurrentQuestion}/>
    </>
  )
}

export default QuizDetails;