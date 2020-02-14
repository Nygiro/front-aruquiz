import React, { useState } from "react";
import { IonHeader, IonModal, IonToolbar, IonSearchbar, IonTitle, IonSegment, IonSegmentButton, IonContent, IonPage, IonButtons, IonMenuButton, IonListHeader, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonAvatar } from '@ionic/react';
import { options } from 'ionicons/icons';
import QuizzesListFilter from "../components/QuizzesListFilter";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUIZZES_WITH_FILTER } from "../utils/QuizApi";
import Loading from "../components/Loading";
import { schoolSubjects } from './../utils/Constants';
import QuizzesList from "../components/QuizzesList";

const Quizzes = () => {
  const [segment, setSegment] = useState('all');

  const [filterQuizzes, setFilterQuizzes] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  let filter = (filterQuizzes.length > 0) ? filterQuizzes : schoolSubjects
  let forCurrentUser = (segment === 'own') ? true : false;

  const { loading, error, data: dataForQuizzes } = useQuery(GET_QUIZZES_WITH_FILTER, {
    variables: {
      filter,
      forCurrentUser
    }
  });


  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;


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
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QuizzesList
          quizzesList={dataForQuizzes.quizzesBySchoolClass}
          setShowQuizModal={setShowQuizModal}
          showQuizModal={showQuizModal}
          listType={segment}
          hide={segment === 'own'}
        />
        <QuizzesList
          quizzesList={dataForQuizzes.quizzesBySchoolClass}
          setShowQuizModal={setShowQuizModal}
          showQuizModal={showQuizModal}
          listType={segment}
          hide={segment === 'all'}
        />
      </IonContent>
      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <QuizzesListFilter
          onDismissModal={() => setShowFilterModal(false)}
          setFilterQuizzes={setFilterQuizzes}
          filterQuizzes={filterQuizzes}
        />
      </IonModal>
    </IonPage>
  )
};

export default Quizzes;