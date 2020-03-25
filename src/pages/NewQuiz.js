import React, { useState, Fragment } from "react";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import { options } from 'ionicons/icons';
import NewQuizFormCreate from "../components/NewQuiz/NewQuizFormCreate";
import NewQuizAnswersForm from "../components/NewQuiz/NewQuizAnswersForm";
import NewQuizDetailsForm from "../components/NewQuiz/NewQuizDetailsForm";
import NewQuizQuestionNumber from "../components/NewQuiz/NewQuizQuestionNumber";
import NewQuizHeader from "../components/NewQuiz/NewQuizHeader";
import './../css/NewQuiz.scss';

const NewQuiz = () => {
  const [quiz, setQuiz] = useState({ id: '', name: '', schoolSubjectId: '' });
  return (
    <IonPage id="quizzes-page">
      <NewQuizHeader />
      <IonContent>
        {quiz.id === '' ? (
          <NewQuizFormCreate setQuiz={setQuiz} quiz={quiz} />
        ) : (
            <NewQuizDetailsForm quiz={quiz} />
          )}
      </IonContent>
    </IonPage >
  )
};

export default NewQuiz;