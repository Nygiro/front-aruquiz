import React from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react'
const QuizFinalResults = ({ allResultsByQuestion }) => {
  console.log(allResultsByQuestion);
  const renderFinalResultsByStudent = allResultsByQuestion.map((question) => {
    console.log(question);
  })
  return (
    <>
      'hello'
    </>
  )
}

export default QuizFinalResults;