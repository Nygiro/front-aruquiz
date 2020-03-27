import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../components/Utils/Loading";
import { GET_QUIZ } from "../utils/QuizApi";
import { ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ, ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ } from "../utils/Constants";
import { GET_STUDENTS_BY_STUDENTS_ID } from "../utils/QueryApi";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import QuizHeader from "../components/Quiz/QuizHeader";
import QuizDetails from "../components/Quiz/QuizDetails";
import QuizResults from "../components/Quiz/QuizResults";
import QuizCurrentQuestion from "../components/Quiz/QuizCurrentQuestion";
import QuizFinalResults from "../components/Quiz/QuizFinalResults";
import CameraDetector from "../components/Quiz/CameraDetector";

const Quiz = () => {
  const { quizId } = useParams();
  const [students, setStudents] = useState([null]);
  const [openCamera, setOpenCamera] = useState(false);
  const [mediaStream, setMediaStream] = useState(null)
  const [nbCurrentQuestion, setNbCurrentQuestion] = useState(0);
  const [answersByQuestion, setAnswersByQuestion] = useState([]);
  const [showResultsByQuestion, setShowResultsByQuestion] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);

  const [allResultsByQuestion, setAllResultsByQuestion] = useState([]);
  const [unmountCamera, setUnmountCamera] = useState(false);

  const { loading, error, data: dataForQuiz, loading: loadingForDataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  const { data: dataForStudents } = useQuery(GET_STUDENTS_BY_STUDENTS_ID, {
    variables: { studentsId: JSON.parse(localStorage.getItem(ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ)) }
  })

  useEffect(() => {
    if (dataForStudents !== undefined) {
      setStudents(dataForStudents.students);
    }
  }, [dataForStudents]);


  useEffect(() => {
    localStorage.setItem('answersByQuestion', JSON.stringify(answersByQuestion))
    if (students !== null && answersByQuestion.length === students.length) {
      setOpenCamera(false);
    }
  }, [answersByQuestion])

  useEffect(() => {
    if (openCamera === false && mediaStream !== null) {
      const tracks = mediaStream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
    }
    localStorage.setItem('openCamera', openCamera)
  }, [openCamera])

  useEffect(() => {
    let newAllResultsByQuestion = [...allResultsByQuestion]
    newAllResultsByQuestion[nbCurrentQuestion - 1] = answersByQuestion;
    setAllResultsByQuestion(newAllResultsByQuestion);
    setAnswersByQuestion([]);
    setShowResultsByQuestion(false);
    if (dataForQuiz !== undefined && dataForQuiz.quiz.questions.length === nbCurrentQuestion && mediaStream !== null) {
      const tracks = mediaStream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      setShowFinalResults(true)
    }
    localStorage.setItem('answersByQuestion', JSON.stringify([]))
  }, [nbCurrentQuestion])




  if (loadingForDataForQuiz) return <Loading />;
  // if (error) return `Error! ${error.message}`;


  return (
    <>
      <IonPage id="quizzes-page">
        <QuizHeader />
        <IonContent>
          {
            showFinalResults
              ? <QuizFinalResults allResultsByQuestion={allResultsByQuestion} />
              : <QuizCurrentQuestion
                quiz={dataForQuiz.quiz}
                setMediaStream={setMediaStream}
                setStudents={setStudents}
                students={students}
                nbCurrentQuestion={nbCurrentQuestion}
                schoolClassId={localStorage.getItem(ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ)}
                setAnswersByQuestion={setAnswersByQuestion}
                answersByQuestion={answersByQuestion}
                openCamera={openCamera}
                setOpenCamera={setOpenCamera}
                setShowResultsByQuestion={setShowResultsByQuestion}
                showResultsByQuestion={showResultsByQuestion}
                setNbCurrentQuestion={setNbCurrentQuestion}
              />
          }
        </IonContent>
      </IonPage >
    </>
  )
};

export default Quiz;