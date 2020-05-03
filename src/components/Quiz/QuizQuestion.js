import React from 'react';
const QuizQuestion = ({ quiz, nbCurrentQuestion, displayAnswer }) => {
  const propositionIndex = ['A', 'B', 'C', 'D'];
  const renderAnswersPropositions = quiz.questions[nbCurrentQuestion].answers.map(({ id, label, isRight }, index) => {
    return (
      <div className={`answer answer-${propositionIndex[index]} ${displayAnswer ? isRight ? "good-answer" : 'bad-answer' : ''}`}
        key={id}>{label}
      </div>
    );
  })
  return (
    <>
      <div className={'question-label'}>
        {quiz.questions[nbCurrentQuestion].label}
      </div>
      <div className={'answers-proposition'}>
        {renderAnswersPropositions}
      </div>
    </>
  )
};

export default QuizQuestion;
