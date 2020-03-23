import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const HeaderQuestions = () => {
  return (
    <IonGrid >
      <IonRow>
        <IonCol size="4" className={'ion-text-center'}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </IonCol>
        <IonCol size="4" className={'ion-text-center'}>Question 1/?</IonCol>
        <IonCol size="4" className={'ion-text-center'}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default HeaderQuestions;