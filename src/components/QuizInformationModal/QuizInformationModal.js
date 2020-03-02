import React, { useState, Fragment } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonList, IonItem, IonLabel, IonBackButton
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';
import SelectSchoolClasses from './SelectSchoolClasses';
import SelectStudents from './SelectStudents';
import { GET_QUIZ } from '../../utils/QuizApi';


const QuizInformationModal = ({ showModal, setShowModal, quizId }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  const { loading: loadingForQuiz, error: errorForQuiz, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });


  if (loadingForQuiz) return <Loading />;
  if (errorForQuiz) return `Error!`;


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
        <IonList>
          <SelectSchoolClasses setSelectedClassId={setSelectedClassId} />
          <SelectStudents selectedClassId={selectedClassId}/>
        </IonList>
        <IonButton expand="block" onClick={() => window.location = `/quizzes/${dataForQuiz.quiz.id}`}>Start quiz</IonButton>
      </IonContent>
    </IonModal >
  );
};

export default QuizInformationModal;