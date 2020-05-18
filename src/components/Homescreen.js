import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';
import smartphone from './../assets/img/smartphone.png';
import homescreenAruquiz from './../assets/img/aruquiz_home.png';

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
          <div className="left-home">
            <p>
              <span>Sonder rapidement vos élèves avec une webcam ou un smartphone.</span>
              Créer votre compte, télécharger le pack de forme et participer à des centaines de quiz.
            </p>
            <p className={"btn-home"}>
              Commencer
            </p>
          </div>
          <div className="right-home">
            <img src={homescreenAruquiz}></img>
          </div>
        </div>
      </IonContent>

    </IonPage>
  );
}
export default Homescreen;