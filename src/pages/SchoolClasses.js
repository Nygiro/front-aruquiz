import React, {useState} from 'react';
import { IonHeader, IonModal, IonToolbar, IonSearchbar, IonTitle, IonSegment, IonSegmentButton, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel } from '@ionic/react';
import SchoolClassesList from '../components/SchoolClasses/SchoolClassesList';
import { useQuery } from '@apollo/react-hooks';
import { options } from 'ionicons/icons';
import SchoolClassesCreate from '../components/SchoolClasses/SchoolClassesForm';

const SchoolClasses = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchQuizInput, setSearchQuizInput] = useState('');
return (
    <IonPage id="schoolClasses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>School classes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar placeholder="Search" onIonChange={(e) => setSearchQuizInput(e.detail.value)} value={searchQuizInput} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SchoolClassesList searchQuizInput={searchQuizInput}/>
      </IonContent>
      <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
        <SchoolClassesCreate
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>
    </IonPage >
)
}

export default SchoolClasses;