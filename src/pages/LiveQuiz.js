import React, { useEffect, useState } from 'react';
import { databaseRef } from '../firebase'
import { ARUQUIZ_USER_TOKEN } from '../utils/Constants';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonItem, IonList, IonLabel, IonIcon, IonListHeader, IonModal, IonTitle, IonToggle } from '@ionic/react'
import { options, checkmarkCircle } from 'ionicons/icons';


const LiveQuiz = () => {
  const usersRef = databaseRef.child(`users/${localStorage.getItem(ARUQUIZ_USER_TOKEN).replace(/[^a-zA-Z ]/g, "")}`)
  const [nbCurrentQuestion, setNbCurrentQuestion] = useState(0)
  const [quizName, setQuizName] = useState('')
  const [questionName, setQuestionName] = useState('')
  const [nbQuestions, setNbQuestions] = useState(0)
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [students, setStudents] = useState([]);
  const [answersByQuestion, setAnswersByQuestion] = useState([]);
  const propositionIndex = ['A', 'B', 'C', 'D'];
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [displayAnswerOption, setDisplayAnswerOption] = useState(false)

  const renderAnswersPropositions = answers.map(({ id, label, isRight }, index) => {
    return (
      <div className={`answer answer-${propositionIndex[index]} ${displayAnswer ? isRight ? "good-answer" : 'bad-answer' : ''}`}
        key={id}>{label}
      </div>
    );
  })

  const renderStudents = students.map(({ id, name, markerId }) => {
    let answer = answersByQuestion.find(answer => answer.markerId == markerId);
    return (
      <IonItem key={id}>
        <IonLabel>{name}</IonLabel>
        {answer !== undefined ? (
          <IonIcon color={displayAnswerOption ?
            answer.isRight ? 'success' : 'danger' :
            'primary'
          }
            slot="start" icon={checkmarkCircle} />
        ) : (
            <IonIcon slot="start" color={'medium'} icon={checkmarkCircle} />
          )
        }
      </IonItem>
    )
  })

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
        setDisplayAnswer(data.val().displayAnswer)
      }
      if (data.val().students !== undefined) {
        setStudents(data.val().students);
      }
      if (data.val().answersByQuestion !== undefined) {
        setAnswersByQuestion(data.val().answersByQuestion);
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
        setDisplayAnswer(data.val().displayAnswer)
      }

      if (data.val().students !== undefined) {
        setStudents(data.val().students);
      }

      if (data.val().answersByQuestion !== undefined) {
        setAnswersByQuestion(data.val().answersByQuestion);
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
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterModal(true)}>
                <IonIcon icon={options} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className={'d-flex'} style={{ height: '100%' }}>
            <div style={{ flex: 1 }}>
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
            </div>
            <div style={{ flex: 0.3 }}>
              <IonList>
                <IonListHeader>
                  <IonLabel>
                    Liste des étudiants
                  </IonLabel>
                </IonListHeader>
                {renderStudents}
              </IonList>
            </div>
          </div>
        </IonContent>
        <IonModal isOpen={showFilterModal} onDidDismiss={() => setShowFilterModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Configuration du live quiz
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowFilterModal(false)} strong>Terminer</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="outer-content">
            <IonList>
              <IonListHeader>Activer vos options : </IonListHeader>
              <IonList>
                <IonItem>
                  <IonLabel>Afficher la réponse des étudiants</IonLabel>
                  <IonToggle slot="start"
                    value={displayAnswerOption}
                    onClick={() => { setDisplayAnswerOption(!displayAnswerOption) }}
                    checked={displayAnswerOption}
                  />
                </IonItem>
              </IonList>
            </IonList>
          </IonContent>

        </IonModal>
      </IonPage >
    </>
  )
}

export default LiveQuiz;