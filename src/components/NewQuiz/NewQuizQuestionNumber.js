import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const NewQuizQuestionNumber = ({ nbCurrentQuestion, setNbCurrentQuestion, questions }) => {
  return (
    <IonGrid >
      <IonRow>
        <IonCol size="4" className={'ion-text-center'}>
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            onClick={() => setNbCurrentQuestion(questions.length - 1)}
            className={nbCurrentQuestion === 1 ? 'ion-hide' : ''}
          />
        </IonCol>
        <IonCol size="4" className={'ion-text-center'}>
          Question {nbCurrentQuestion}/{questions.length}
        </IonCol>
        <IonCol size="4" className={'ion-text-center'}>
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            onClick={() => setNbCurrentQuestion(questions.length + 1)}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default NewQuizQuestionNumber;