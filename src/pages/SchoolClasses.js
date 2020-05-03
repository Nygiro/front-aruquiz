import React, { useState } from 'react';
import { IonHeader, IonModal, IonToolbar, IonSearchbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon } from '@ionic/react';
import SchoolClassesList from '../components/SchoolClasses/SchoolClassesList';
import { addCircle } from 'ionicons/icons';
import SchoolClassesFormCreateModal from '../components/SchoolClasses/SchoolClassesFormCreateModal';
import './../css/SchoolClasses.scss';

const SchoolClasses = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuizInput, setSearchQuizInput] = useState('');
  return (
    <IonPage id="schoolClasses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Mes classes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)}>
              <IonIcon icon={addCircle} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar placeholder="Recherche" onIonChange={(e) => setSearchQuizInput(e.detail.value)} value={searchQuizInput} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SchoolClassesList searchQuizInput={searchQuizInput} showModalFormCreate={showModal}/>
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <SchoolClassesFormCreateModal setShowModal={setShowModal}
        />
      </IonModal>
    </IonPage >
  )
}

export default SchoolClasses;