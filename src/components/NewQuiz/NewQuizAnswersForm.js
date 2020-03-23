import React from 'react';
import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const NewQuizAnswersForm = () => {
  let answers = [];

  return (
    <>
      <IonGrid >
        <IonRow>
          <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
            <FontAwesomeIcon icon={faSquare} />
          </IonCol>
          <IonCol size="8" >
            <IonItem>
              <IonLabel position="floating" color="primary">Response A</IonLabel>
              <IonInput minlength={1} value={'name'} onIonChange={e => console.log('toto')} />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
            <FontAwesomeIcon icon={faSquare} />
          </IonCol>
          <IonCol size="8">
            <IonItem>
              <IonLabel position="floating" color="primary">Response B</IonLabel>
              <IonInput minlength={1} value={'name'} onIonChange={e => console.log('toto')} />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
            <FontAwesomeIcon icon={faSquare} />
          </IonCol>
          <IonCol size="8">
            <IonItem>
              <IonLabel position="floating" color="primary">Response C</IonLabel>
              <IonInput minlength={1} value={'name'} onIonChange={e => console.log('toto')} />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2" className={'ion-align-self-center ion-text-center'}>
            <FontAwesomeIcon icon={faSquare} />
          </IonCol>
          <IonCol size="8">
            <IonItem>
              <IonLabel position="floating" color="primary">Response D</IonLabel>
              <IonInput minlength={1} value={'name'} onIonChange={e => console.log('toto')} />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  )
}

export default NewQuizAnswersForm;