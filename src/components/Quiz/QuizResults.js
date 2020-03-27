import React from 'react';
import QuizQuestionNumber from './QuizQuestionNumber';
import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react'
const QuizResults = ({ quiz, nbCurrentQuestion, answersByQuestion }) => {
  const renderAnswerByQuestion = answersByQuestion.map(({ markerId, studentName, isRight, answerLabel }) => {
    return (
      <IonItem key={markerId} color={isRight ? 'success' : 'danger'}>
        <IonLabel>{studentName}</IonLabel>
        <IonNote slot="end">{answerLabel}</IonNote>
      </IonItem>
    )
  })
  return (
    <>
      <QuizQuestionNumber quiz={quiz} nbCurrentQuestion={nbCurrentQuestion} />
      <IonListHeader>
        Résultats :
      </IonListHeader>
      <IonList>
        {renderAnswerByQuestion}
      </IonList>
    </>
  )
}

export default QuizResults;