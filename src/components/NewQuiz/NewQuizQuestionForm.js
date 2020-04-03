import React, { useState } from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';
const NewQuizQuestionForm = ({ question, setQuestion }) => {
  return (
    <IonItem className={'form-create-question-name'} >
      <IonLabel position="floating" >Veuillez renseigner l'intitulé de la question</IonLabel>
      <IonTextarea minlength={1} value={question.name} onIonChange={e => setQuestion({ ...question, name: e.target.value })} />
    </IonItem>
  )
}

export default NewQuizQuestionForm;