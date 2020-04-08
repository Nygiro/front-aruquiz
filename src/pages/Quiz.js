import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../components/Utils/Loading";
import { GET_QUIZ } from "../utils/QuizApi";
import { ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ, ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ, ARUQUIZ_USER_TOKEN } from "../utils/Constants";
import { GET_STUDENTS_BY_STUDENTS_ID } from "../utils/QueryApi";
import { IonHeader, IonItem, IonToolbar, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import QuizHeader from "../components/Quiz/QuizHeader";
import QuizCurrentQuestion from "../components/Quiz/QuizCurrentQuestion";
import QuizFinalResults from "../components/Quiz/QuizFinalResults";
import './../css/Quiz.scss';
import { databaseRef } from '../firebase'

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
  const usersRef = databaseRef.child(`users/${localStorage.getItem(ARUQUIZ_USER_TOKEN).replace(/[^a-zA-Z ]/g, "")}`)

  const { loading, error, data: dataForQuiz, loading: loadingForDataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });

  const { data: dataForStudents } = useQuery(GET_STUDENTS_BY_STUDENTS_ID, {
    variables: { studentsId: JSON.parse(localStorage.getItem(ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ)) }
  })
  localStorage.setItem('nbCurrentQuestion', nbCurrentQuestion)

  useEffect(() => {
    if (dataForStudents !== undefined) {
      setStudents(dataForStudents.students);
    }
  }, [dataForStudents]);


  useEffect(() => {
    localStorage.setItem('answersByQuestion', JSON.stringify(answersByQuestion))
    if (students !== null && answersByQuestion.length === students.length) {
      setOpenCamera(false);
      usersRef.child('current').update({
        'displayAnswer': true
      });
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
    if (dataForQuiz !== undefined && dataForQuiz.quiz.questions.length !== nbCurrentQuestion) {
      console.log(nbCurrentQuestion)
      usersRef.child('current').update({
        'questionNumber': nbCurrentQuestion + 1,
        'answers': dataForQuiz.quiz.questions[nbCurrentQuestion].answers,
        'questionName': dataForQuiz.quiz.questions[nbCurrentQuestion].label,
        'displayAnswer': false,
      });
    }
  }, [nbCurrentQuestion])

  useEffect(() => {
    if (students.find(student => student === null) === undefined && dataForQuiz !== undefined) {
      usersRef.child('current').set({
        'quizName': dataForQuiz.quiz.name,
        'nbQuestion': dataForQuiz.quiz.questions.length,
        'questionName': dataForQuiz.quiz.questions[nbCurrentQuestion].label,
        'questionNumber': nbCurrentQuestion + 1,
        'answers': dataForQuiz.quiz.questions[nbCurrentQuestion].answers,
        'students': students,
        'displayAnswer': false
      });
    }
  }, [dataForQuiz])
  if (loadingForDataForQuiz) return <Loading />;
  // if (error) return `Error! ${error.message}`;



  return (
    <>
      <IonPage id="quizzes-page">
        <QuizHeader quiz={dataForQuiz.quiz} />
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