import React from 'react';
import { IonContent, IonSpinner } from '@ionic/react';
import './../../css/Loading.scss'

const Loading = () => {
  return (
    <IonContent>
      <IonSpinner name="crescent" />
    </IonContent>
  )
}

export default Loading;