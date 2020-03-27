import React from 'react';
import { IonItem, IonList, IonLabel } from '@ionic/react'

const QuizQuestion = ({ quiz, nbCurrentQuestion }) => {
  const propositionIndex = ['A', 'B', 'C', 'D'];
  const renderAnswersPropositions = quiz.questions[nbCurrentQuestion].answers.map(({ id, label, isRight }, index) => {
    return (
      <IonItem key={id}>
        <IonLabel>{propositionIndex[index]} : {label}</IonLabel>
      </IonItem>
    );
  })
  return (
    <>
      <IonItem>
        <IonLabel className="ion-text-wrap">
          {quiz.questions[nbCurrentQuestion].label}
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonList>
          {renderAnswersPropositions}
        </IonList>
      </IonItem>
    </>
  )
};

export default QuizQuestion;
