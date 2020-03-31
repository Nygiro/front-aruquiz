import React from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react'
const QuizFinalResults = ({ allResultsByQuestion }) => {
  let answersByStudents = [];

  allResultsByQuestion.forEach(element => {
    element.forEach(el => {
      if (answersByStudents[el.studentName] === undefined) {
        answersByStudents[el.studentName] = 0;
        if (el.isRight) {
          answersByStudents[el.studentName] = 1;
        }
      } else {
        if (el.isRight) {
          answersByStudents[el.studentName] = answersByStudents[el.studentName] + 1;
        }
      }
    })
  });

  const renderAnswersByStudents = [];
  for (let [studentName, value] of Object.entries(answersByStudents)) {
    renderAnswersByStudents.push(
      <IonItem key={studentName}>
        <IonLabel className="white">{studentName}</IonLabel>
        <IonNote slot="end" className="white">{value}/{allResultsByQuestion.length}</IonNote>
      </IonItem>
    )
  }

  return (
    <>
      <IonListHeader>
        Résultats :
      </IonListHeader>
      <IonList>
        {renderAnswersByStudents}
      </IonList>
    </>
  )
}

export default QuizFinalResults;