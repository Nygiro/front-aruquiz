import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const NewQuizQuestionNumber = ({ nbCurrentQuestion, setNbCurrentQuestion, questions }) => {

  const handleSetNbCurrentQuestion = (newValue) => {
      if (newValue !== 0 && newValue <= questions.length + 2) {
        setNbCurrentQuestion(newValue)
      } 
  }

  console.log(questions)
  let NbTotalQuestion = nbCurrentQuestion > questions.length ? nbCurrentQuestion : questions.length

  return (
    <div className="d-flex jc-s-a">
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        onClick={() => handleSetNbCurrentQuestion((nbCurrentQuestion) - 1)}
        className={nbCurrentQuestion === 1 ? 'opacity-disabled' : ''}
      />
      <p>Question {nbCurrentQuestion}/{NbTotalQuestion}</p>
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        onClick={() => handleSetNbCurrentQuestion((nbCurrentQuestion) + 1)}

      />
    </div>
  )
}

export default NewQuizQuestionNumber;