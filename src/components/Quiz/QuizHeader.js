import React from 'react';
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';

const QuizHeader = () => {

    return (
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonItem className={'ion-text-center'}> 'toto</IonItem>
        </IonToolbar>
      </IonHeader>
    )
};

export default QuizHeader;
