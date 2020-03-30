import React, { useState, useEffect } from "react";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import QuizDetails from "./QuizDetails";
import QuizResults from "./QuizResults";
import { ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ } from "../../utils/Constants";

const QuizCurrentQuestion = ({ quiz, nbCurrentQuestion, setAnswersByQuestion, answersByQuestion, setMediaStream, setStudents, students, showResultsByQuestion, openCamera, setOpenCamera, setShowResultsByQuestion, setNbCurrentQuestion }) => {
  return (
    <>
      {
        !showResultsByQuestion && nbCurrentQuestion !== quiz.questions.length
          ? <QuizDetails quiz={quiz}
            nbCurrentQuestion={nbCurrentQuestion}
            setMediaStream={setMediaStream}
            setStudents={setStudents}
            students={students}
            schoolClassId={localStorage.getItem(ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ)}
            setAnswersByQuestion={setAnswersByQuestion}
            answersByQuestion={answersByQuestion}
            openCamera={openCamera}
            setOpenCamera={setOpenCamera}
            displayAnswer={answersByQuestion.length === students.length}
            setNbCurrentQuestion={setNbCurrentQuestion}
            setShowResultsByQuestion={setShowResultsByQuestion}


          />
          : (nbCurrentQuestion !== quiz.questions.length) ? (
            <QuizResults
              quiz={quiz}
              nbCurrentQuestion={nbCurrentQuestion}
              answersByQuestion={answersByQuestion}
              students={students}
              setNbCurrentQuestion={setNbCurrentQuestion}
              showResultsByQuestion={showResultsByQuestion}
            />
          ) : ''
      }
    </>
  )

}

export default QuizCurrentQuestion;