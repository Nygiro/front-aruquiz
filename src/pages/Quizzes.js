import React, { useState, useEffect, Fragment } from "react";
import { IonHeader, IonBackButton, IonModal, IonToolbar, IonSearchbar, IonTitle, IonSegment, IonSegmentButton, IonContent, IonPage, IonButtons, IonMenuButton, IonListHeader, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonAvatar } from '@ionic/react';
import { options } from 'ionicons/icons';
import QuizzesListFilter from "../components/QuizzesListFilter";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUIZZES } from "../utils/QuizApi";
import Loading from "../components/Loading";
import { usePrevious } from "../utils/Hook";
import QuizInformation from "../components/QuizInformationModal";

const Quizzes = () => {
  const { loading, error, data: dataForQuizzes } = useQuery(GET_QUIZZES);
  const [filterQuizzes, setFilterQuizzes] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    if (showFilterModal === false && filterQuizzes.length > 0) {
      dataForQuizzes.quizzes = []
      console.log(dataForQuizzes)
    }
  }, [showFilterModal])

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const renderQuizzesListItems = dataForQuizzes.quizzes.map(({ id, name }) => (
    <Fragment key={id}>
      <IonItem onClick={() => setShowQuizModal(true)}>
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel>{name}</IonLabel>
      </IonItem>
      <QuizInformation showModal={showQuizModal} setShowModal={setShowQuizModal} quizId={id} />
    </Fragment>
  ));


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
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
            <IonSegmentButton value="all" checked={true}>
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="enemies">
              <IonLabel>Own</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderQuizzesListItems}
        </IonList>
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