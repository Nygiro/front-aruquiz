import React, { useState } from "react";
import { IonHeader, IonModal, IonToolbar, IonSearchbar, IonTitle, IonSegment, IonSegmentButton, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel } from '@ionic/react';
import { options } from 'ionicons/icons';
import QuizzesListFilter from "../components/Quizzes/QuizzesListFilter";
import QuizzesContent from "../components/Quizzes/QuizzesContent";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCHOOL_SUBJECTS } from "../utils/SchoolSubject";
import Loading from "../components/Utils/Loading";

const Quizzes = () => {
  const [segment, setSegment] = useState('all');
  const [filterQuizzes, setFilterQuizzes] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuizInput, setSearchQuizInput] = useState('');
  const { loading, error, data: dataForSchoolSubjects } = useQuery(GET_SCHOOL_SUBJECTS);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  let filter = (filterQuizzes.length > 0) ? filterQuizzes : dataForSchoolSubjects.schoolSubjects.map(schoolSubject => schoolSubject.name)

  return (
    <IonPage id="quizzes-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Quizzes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton value="all" checked={segment === 'all'} onClick={() => setSegment('all')}>
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="own" checked={segment === 'own'} onClick={(e) => setSegment('own')}>
              <IonLabel>Own</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonSearchbar placeholder="Search" onIonChange={(e) => setSearchQuizInput(e.detail.value)} value={searchQuizInput} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QuizzesContent filter={filter} searchQuizInput={searchQuizInput} segment={segment} />
      </IonContent>
      <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
        <QuizzesListFilter
          onDismissModal={() => setShowFilterModal(false)}
          setFilterQuizzes={setFilterQuizzes}
          filterQuizzes={filterQuizzes}
        />
      </IonModal>
    </IonPage >
  )
};

export default Quizzes;