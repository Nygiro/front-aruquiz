import React, { useEffect, useState } from 'react';
import { databaseRef } from '../firebase'
import { ARUQUIZ_USER_TOKEN } from '../utils/Constants';
import QuizHeader from '../components/Quiz/QuizHeader';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonItem } from '@ionic/react'
const LiveQuiz = () => {
  const usersRef = databaseRef.child(`users/${localStorage.getItem(ARUQUIZ_USER_TOKEN).replace(/[^a-zA-Z ]/g, "")}`)
  const [nbCurrentQuestion, setNbCurrentQuestion] = useState(0)
  const [quizName, setQuizName] = useState('')
  const [questionName, setQuestionName] = useState('')
  const [nbQuestions, setNbQuestions] = useState(0)
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const propositionIndex = ['A', 'B', 'C', 'D'];

  const renderAnswersPropositions = answers.map(({ id, label, isRight }, index) => {
    return (
      <div className={`answer answer-${propositionIndex[index]} ${displayAnswer ? isRight ? "good-answer" : 'bad-answer' : ''}`}
        key={id}>{label}
      </div>
    );
  })


  // 'quizName': dataForQuiz.quiz.name,
  // 'nbQuestion': dataForQuiz.quiz.questions.length,
  // 'questionName': dataForQuiz.quiz.questions[nbCurrentQuestion].label,
  // 'questionNumber': nbCurrentQuestion + 1,
  // 'answers':  dataForQuiz.quiz.questions[nbCurrentQuestion].answers,
  // 'students': students

  useEffect(() => {

    usersRef.on('child_changed', function (data) {
      if (data.val().questionNumber !== undefined) {
        setNbCurrentQuestion(data.val().questionNumber)
      }
      if (data.val().quizName !== undefined) {
        setQuizName(data.val().quizName)
      }
      if (data.val().nbQuestion !== undefined) {
        setNbQuestions(data.val().nbQuestion)
      }
      if (data.val().questionName !== undefined) {
        setQuestionName(data.val().questionName)
      }
      if (data.val().answers !== undefined) {
        setAnswers(data.val().answers)
      }
      if (data.val().displayAnswer !== undefined) {
        console.log('tototo')
        setDisplayAnswer(data.val().displayAnswer)
      }
    })

    usersRef.on('child_added', function (data) {
      if (data.val().questionNumber !== undefined) {
        setNbCurrentQuestion(data.val().questionNumber)
      }
      if (data.val().quizName !== undefined) {
        setQuizName(data.val().quizName)
      }
      if (data.val().nbQuestion !== undefined) {
        setNbQuestions(data.val().nbQuestion)
      }
      if (data.val().questionName !== undefined) {
        setQuestionName(data.val().questionName)
      }
      if (data.val().answers !== undefined) {
        setAnswers(data.val().answers)
      }
      if (data.val().displayAnswer !== undefined) {
        console.log('tototo')
        setDisplayAnswer(data.val().displayAnswer)
      }
    });
  }, [])

  return (
    <>
      <IonPage id="quizzes-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonItem className={'ion-text-center'} lines="none">{quizName}</IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="d-flex jc-s-a question-number">
            <p>Question {nbCurrentQuestion} / {nbQuestions}</p>
          </div>
          <>
            <div className={'question-label'}>
              {questionName}
            </div>
            <div className={'answers-proposition answer-live'}>
              {renderAnswersPropositions}
            </div>
          </>
        </IonContent>
      </IonPage >
    </>
  )
}

export default LiveQuiz;