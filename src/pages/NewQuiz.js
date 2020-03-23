import React, { useState, Fragment } from "react";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import { options } from 'ionicons/icons';
import NewQuizFormCreate from "../components/NewQuiz/NewQuizFormCreate";
import NewQuizAnswersForm from "../components/NewQuiz/NewQuizAnswersForm";
import NewQuizQuestionForm from "../components/NewQuiz/NewQuizQuestionForm";
import HeaderQuestions from "../components/NewQuiz/HeaderQuestions";

const NewQuiz = () => {
  const [quiz, setQuiz] = useState({ id: '', name: '', schoolSubjectId: '' });
  const [answers, setAnswers] = useState([]);


  return (
    <IonPage id="quizzes-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonItem className={'ion-text-center'}> Création d'un nouveau quiz</IonItem>
          <IonButtons slot="end">
            <IonButton onClick={() => console.log('hello')}>
              <IonButton icon-only onClick={() => console.log('helo')}>
                <IonIcon icon={options} slot="icon-only" color="primary" />
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {quiz.id === '' ? (
          <NewQuizFormCreate setQuiz={setQuiz} quiz={quiz} />
        ) :
          <>
            <HeaderQuestions />
            <NewQuizQuestionForm />
            <NewQuizAnswersForm />
          </>
        }
      </IonContent>
    </IonPage >
  )
};

export default NewQuiz;