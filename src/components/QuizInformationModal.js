import React, { useState } from 'react';
import { IonImg, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonListHeader, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonAvatar, IonBackButton } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUIZ } from '../utils/QuizApi';
import Loading from './Loading';

const QuizInformation = ({ showModal, setShowModal, quizId }) => {
  const { loading, error, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;
  return (
    <IonModal isOpen={showModal}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Modal Content</IonTitle>
          <IonBackButton></IonBackButton>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          NEED TO WRITE QUIZ INFORMATION
      </IonContent>
    </IonModal>
  );
};

export default QuizInformation;