import React from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';

const NewQuizQuestionForm = ({ quiz }) => {
  return (
    <>
      <IonItem >
        <IonLabel position="floating" color="primary">Veuillez renseigner l'intitulé de la question</IonLabel>
        <IonTextarea minlength={1} value={'question.name'} onIonChange={e => console.log('setQuestion')} />
      </IonItem>
    </>
  )
}

export default NewQuizQuestionForm;