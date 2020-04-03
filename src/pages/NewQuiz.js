import React, { useState } from "react";
import { IonContent, IonPage } from '@ionic/react';
import NewQuizFormCreate from "../components/NewQuiz/NewQuizFormCreate";
import NewQuizDetailsForm from "../components/NewQuiz/NewQuizDetailsForm";
import NewQuizHeader from "../components/NewQuiz/NewQuizHeader";
import './../css/NewQuiz.scss';

const NewQuiz = () => {
  const [quiz, setQuiz] = useState({ id: '', name: '', schoolSubjectId: '' });
  return (
    <IonPage id="quizzes-page">
      <NewQuizHeader quiz={quiz} />
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