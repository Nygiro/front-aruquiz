import React from 'react';
const QuizQuestionNumber = ({quiz, nbCurrentQuestion}) => {
  return (
    <div className="d-flex jc-s-a">
      <p>Question {nbCurrentQuestion + 1}/{quiz.questions.length}</p>
    </div>
  )
}

export default QuizQuestionNumber;