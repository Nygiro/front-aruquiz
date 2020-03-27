import React, { useEffect, useState } from 'react';
import { IonGrid, IonRadioGroup, IonRow, IonCol, IonItem, IonLabel, IonRadio, IonInput } from '@ionic/react';
const NewQuizAnswersForm = ({ question, setQuestion, setLastAnswerIndexUpdate }) => {
  const [rightIndexQuestion, setRightIndexQuestion] = useState(0)
  const handleSetAnswersLabel = (value, i) => {
    let newQuestion = { ...question }
    newQuestion.answers[i] = { ...newQuestion.answers[i], label: value };
    setQuestion(newQuestion)
    setLastAnswerIndexUpdate(i)
  }
  const handleSetAnswersIsRight = (value, i) => {
    question.answers = question.answers.map(answer => {
      return { ...answer, isRight: false }
    })
    let newQuestion = { ...question }
    newQuestion.answers[i] = { ...question.answers[i], isRight: value };
    setQuestion(question)
    setLastAnswerIndexUpdate(i)
    setRightIndexQuestion(i)
  }

  return (
    <>
      <IonGrid >
        <IonRadioGroup value={rightIndexQuestion.toString()}>
          <IonRow>
            <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
              <IonRadio value="0" onClick={() => handleSetAnswersIsRight(true, 0)} />
            </IonCol>
            <IonCol size="8" >
              <IonLabel position="floating" color="primary">Response A</IonLabel>
              <IonInput
                minlength={1}
                value={question.answers[0].label}
                onIonChange={e => handleSetAnswersLabel(e.target.value, 0)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
              <IonRadio value="1" onClick={() => handleSetAnswersIsRight(true, 1)} />
            </IonCol>
            <IonCol size="8">
              <IonLabel position="floating" color="primary">Response B</IonLabel>
              <IonInput
                minlength={1}
                value={question.answers[1].label}
                onIonChange={e => handleSetAnswersLabel(e.target.value, 1)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
              <IonRadio value="2" onClick={() => handleSetAnswersIsRight(true, 2)} />
            </IonCol>
            <IonCol size="8">
              <IonLabel position="floating" color="primary">Response C</IonLabel>
              <IonInput
                minlength={1}
                value={question.answers[2].label}
                onIonChange={e => handleSetAnswersLabel(e.target.value, 2)}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
              <IonRadio value="3" onClick={() => handleSetAnswersIsRight(true, 3)} />
            </IonCol>
            <IonCol size="8">
              <IonLabel position="floating" color="primary">Response D</IonLabel>
              <IonInput
                minlength={1}
                value={question.answers[3].label}
                onIonChange={e => handleSetAnswersLabel(e.target.value, 3)}
              />
            </IonCol>
          </IonRow>
        </IonRadioGroup>
      </IonGrid>
    </>
  )
}

export default NewQuizAnswersForm;