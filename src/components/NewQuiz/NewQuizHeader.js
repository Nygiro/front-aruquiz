import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonItem, IonIcon } from '@ionic/react';
import { options } from 'ionicons/icons';

const NewQuizHeader = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonItem className={'ion-text-center'}> Création d'un nouveau quiz</IonItem>
        <IonButtons slot="end">
          <IonButton onClick={() => console.log('hello')}>
            <IonButton icon-only onClick={() => console.log('helo')}>
              <IonIcon icon={options} slot="icon-only" color="primary" />
            </IonButton>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default NewQuizHeader;