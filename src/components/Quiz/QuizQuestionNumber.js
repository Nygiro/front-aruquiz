import React from 'react';
const QuizQuestionNumber = ({ quiz, nbCurrentQuestion, answersByQuestion, students, setShowResultsByQuestion, setNbCurrentQuestion, showResultsByQuestion }) => {
  return (
    <div className="d-flex jc-s-a question-number">
      {answersByQuestion.length === students.length ? (
        <>
          {!showResultsByQuestion ? (
            <p className={'result-question'} onClick={() => setShowResultsByQuestion(!showResultsByQuestion)}>
              Résultats
            </p>
          ) : (
              <p></p>
            )
          }
          <p>Question {nbCurrentQuestion + 1}/{quiz.questions.length}</p>
          <p className={'next-question'} onClick={() => setNbCurrentQuestion(nbCurrentQuestion + 1)}>
            {
              nbCurrentQuestion + 1 !== quiz.questions.length
                ? 'Suivante'
                : 'Terminer'
            }
          </p>
        </>
      ) : (
          <p>Question {nbCurrentQuestion + 1}/{quiz.questions.length}</p>
        )
      }
    </div>
  )
}

export default QuizQuestionNumber;