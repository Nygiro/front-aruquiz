import React, { useState, Fragment } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonList, IonBackButton
} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';
import SelectSchoolClasses from './SelectSchoolClasses';
import SelectStudents from './SelectStudents';
import { GET_QUIZ } from '../../utils/QuizApi';
import { GET_CURRENT_SCHOOL_CLASS_FOR_QUIZ } from '../../utils/Store';
import { ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ, ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ } from '../../utils/Constants';


const QuizInformationModal = ({ showModal, setShowModal, quizId }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedStudentsId, setSelectedStudentsId] = useState(null);
  const { data, client } = useQuery(GET_CURRENT_SCHOOL_CLASS_FOR_QUIZ);


  const { loading: loadingForQuiz, error: errorForQuiz, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  const handleStartQuiz = (quizId) => {
    localStorage.setItem(ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ, selectedClassId)
    localStorage.setItem(ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ, JSON.stringify(selectedStudentsId))
    window.location = `/quizzes/${quizId}`
  }


  if (loadingForQuiz) return <Loading />;
  if (errorForQuiz) return `Error!`;


  return (
    <IonModal isOpen={showModal.display && showModal.quizId === quizId}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{dataForQuiz.quiz.name}</IonTitle>
          <IonBackButton></IonBackButton>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal({ quizId: '', display: false })}>Fermer</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <SelectSchoolClasses setSelectedClassId={setSelectedClassId} />
          <SelectStudents selectedClassId={selectedClassId} setSelectedStudentsId={setSelectedStudentsId} />
        </IonList>
        <div class="btn-start-quiz">
        <IonButton expand="block" onClick={() => handleStartQuiz(dataForQuiz.quiz.id)}>Démarrer le quiz</IonButton>
        </div>
      </IonContent>
    </IonModal >
  );
};

export default QuizInformationModal;