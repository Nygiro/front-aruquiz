import React, { useState, useEffect } from "react";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import CameraDetector from "./CameraDetector";
import QuizDetails from "./QuizDetails";
import QuizResults from "./QuizResults";
import { ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ } from "../../utils/Constants";

const QuizCurrentQuestion = ({ quiz, nbCurrentQuestion, setAnswersByQuestion, answersByQuestion, setMediaStream, setStudents, students, showResultsByQuestion, openCamera, setOpenCamera, setShowResultsByQuestion, setNbCurrentQuestion }) => {

  let btnCameraText = openCamera ? 'Arreter le scan' : 'Commencer le scan';
  const btnCamera = (
    <IonButton expand="block" onClick={() => setOpenCamera(!openCamera)}>
      {btnCameraText}
    </IonButton>
  );

  return (
    <>
      {
        !showResultsByQuestion && nbCurrentQuestion !== quiz.questions.length
          ? <QuizDetails quiz={quiz} nbCurrentQuestion={nbCurrentQuestion} />
          : (nbCurrentQuestion !== quiz.questions.length) ? (
            <QuizResults quiz={quiz} nbCurrentQuestion={nbCurrentQuestion} answersByQuestion={answersByQuestion} />
          ) : ''
      }

      {
        openCamera && <CameraDetector
          quiz={quiz}
          setMediaStream={setMediaStream}
          setStudents={setStudents}
          students={students}
          schoolClassId={localStorage.getItem(ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ)}
          setAnswersByQuestion={setAnswersByQuestion}
          answersByQuestion={answersByQuestion}
        />
      }
      {answersByQuestion.length !== students.length && btnCamera}
      <>
        {!showResultsByQuestion && <>{answersByQuestion.length} / {students.length}</>}
        {answersByQuestion.length === students.length &&
          <>
            {!showResultsByQuestion &&
              <IonButton expand="block" onClick={() => setShowResultsByQuestion(!showResultsByQuestion)}>
                Voir les résultats
              </IonButton>
            }
            <IonButton expand="block" onClick={() => setNbCurrentQuestion(nbCurrentQuestion + 1)}>
              {
                nbCurrentQuestion + 1 !== quiz.questions.length
                  ? 'Question suivante'
                  : 'Voir le résultat final'
              }
            </IonButton>
          </>
        }
      </>
    </>
  )

}

export default QuizCurrentQuestion;