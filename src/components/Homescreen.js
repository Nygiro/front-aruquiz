import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import smartphone from './../assets/img/smartphone.png';

import  './../css/Homescreen.scss';
const Homescreen = () => {
  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Aruquiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="homescreen-background">
        <img src={smartphone} alt="Aruquiz homescreen" />
        </div>
      </IonContent>

    </IonPage>
  );
}
export default Homescreen;