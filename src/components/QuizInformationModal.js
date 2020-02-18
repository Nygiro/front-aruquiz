import React, { useState } from 'react';
import { IonImg, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonListHeader, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonAvatar, IonBackButton } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUIZ } from '../utils/QuizApi';
import Loading from './Loading';

const QuizInformationModal = ({ showModal, setShowModal, quizId }) => {
  const { loading, error, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;
  return (
    <IonModal isOpen={showModal.display && showModal.quizId === quizId}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{dataForQuiz.quiz.name}</IonTitle>
          <IonBackButton></IonBackButton>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal({ quizId: '', display: false })}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={() => window.location = `/quizzes/${dataForQuiz.quiz.id}`}>Start quiz</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default QuizInformationModal;