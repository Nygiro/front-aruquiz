import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

const AboutPopover  = ({dismiss}) => {

  const close = (url) => {
    window.open(url, '_blank');
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={() => close('https://ionicframework.com/getting-started')}>
        <IonLabel>Learn Ionic</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://ionicframework.com/docs/react')}>
        <IonLabel>Documentation</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://showcase.ionicframework.com')}>
        <IonLabel>Showcase</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://github.com/ionic-team/ionic')}>
        <IonLabel>GitHub Repo</IonLabel>
      </IonItem>
      <IonItem button onClick={dismiss}>
        <IonLabel>Support</IonLabel>
      </IonItem>
    </IonList >
  )
}

export default AboutPopover;