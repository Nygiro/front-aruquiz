import React, { useState, Fragment } from 'react';
import { IonModal, IonItemGroup, IonItemDivider, IonBackButton, IonNote, IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { GET_REPORT_BY_STUDENT } from '../../utils/QueryApi';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';

const ReportModal = ({ showModal, setShowModal, studentId, studentName }) => {
  const [sessionToDisplay, setSessionToDisplay] = useState(null);
  const { data: dataForStudents, loading: loadingForStudents } = useQuery(GET_REPORT_BY_STUDENT, {
    variables: { studentId: studentId }
  })

  if (loadingForStudents === undefined) return <Loading />
  //1 Regrouper par quiz est afficher le résultat

  // quiz.questions
  //2 on clique sur un quiz, on a le detail réponse eleève + bonne réponse 

  let quiz = [];
  if (dataForStudents && dataForStudents.reports !== undefined) {
    dataForStudents.reports.forEach(report => {
      const index = quiz.findIndex((e) => e.sessionId === report.sessionId);
      if (index === -1) {
        quiz.push({
          ...report.quiz,
          questions: [report.question],
          answers: [report.answer],
          sessionId: report.sessionId
        });
      } else {
        const questionIndex = quiz[index].questions.findIndex(e => e.id === report.question.id);
        if (questionIndex === -1) {
          quiz[index].questions = [...quiz[index].questions, report.question]
        }
        const answerIndex = quiz[index].answers.findIndex(e => e.id === report.answer.id);
        if (answerIndex === -1) {
          quiz[index].answers = [...quiz[index].answers, report.answer]
        }
      }
    })
  }

  const renderQuiz = quiz.map((quiz, index) => {
    const nbRightAnswer = quiz.answers.filter(answer => answer.isRight === true);
    return (
      <div key={index}>
        <IonItemGroup>
          <IonItemDivider onClick={() => setSessionToDisplay(quiz.sessionId)}>
            <IonLabel>{quiz.name}</IonLabel>
            <IonNote slot="end" style={{ padding: 15 }}>{nbRightAnswer.length}/{quiz.questions.length}</IonNote>
          </IonItemDivider>
          <div className={quiz.sessionId === sessionToDisplay ? 'animate-report-state' : 'default-report-state'}>
            {quiz.questions.map((question, i) => {
              return (
                <IonItem 
                key={question.id} 
                color={quiz.answers[i].isRight ? 'success' : 'danger'}
                style={{paddingTop: 0, marginLeft: 5}}>
                  <IonLabel className="white">{question.label}</IonLabel>
                  <IonNote slot="end" className="white">{quiz.answers[i].label}</IonNote>
                </IonItem>
              )
            })}
          </div>
        </IonItemGroup>
      </div>
    )
  })
  return (
    <IonModal isOpen={showModal.display && studentId === showModal.studentId} onDidDismiss={() => setShowModal({ display: false, studentId })}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{studentName}</IonTitle>
          <IonBackButton></IonBackButton>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal({
              display: false, studentId
            })}>Fermer</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderQuiz}
        </IonList>
      </IonContent>
    </IonModal>
  )
}



export default ReportModal;