import React from 'react';
import QuizQuestionNumber from './QuizQuestionNumber';
import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react'
const QuizResults = ({ quiz, nbCurrentQuestion, answersByQuestion, students, setNbCurrentQuestion, showResultsByQuestion }) => {
  const renderAnswerByQuestion = answersByQuestion.map(({ markerId, studentName, isRight, answerLabel }) => {
    return (
      <IonItem key={markerId} color={isRight ? 'success' : 'danger'}>
        <IonLabel className="white">{studentName}</IonLabel>
        <IonNote slot="end" className="white">{answerLabel}</IonNote>
      </IonItem>
    )
  })
  return (
    <>
      <QuizQuestionNumber
        quiz={quiz}
        nbCurrentQuestion={nbCurrentQuestion}
        answersByQuestion={answersByQuestion}
        students={students}
        setNbCurrentQuestion={setNbCurrentQuestion}
        showResultsByQuestion={showResultsByQuestion}
      />
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