import React from 'react';
import { IonHeader, IonItem, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

const QuizHeader = ({ quiz }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonItem className={'ion-text-center'} lines="none"> {quiz !== undefined && quiz.name !== null && quiz.name}</IonItem>
      </IonToolbar>
    </IonHeader>
  )
};

export default QuizHeader;
