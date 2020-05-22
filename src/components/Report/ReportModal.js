import React from 'react';
import { IonModal, IonAvatar, IonBackButton, IonNote, IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { GET_REPORT_BY_STUDENT } from '../../utils/QueryApi';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';

const ReportModal = ({ showModal, setShowModal, studentId, studentName }) => {
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
      console.log(report.createdAt);
      const index = quiz.findIndex((e) => e.id === report.quiz.id);
      if (index === -1) {
        quiz.push({
          ...report.quiz,
          questions: [report.question],
          answers: [report.answer]
        });
      } else {
        const questionIndex = quiz[index].questions.findIndex(e => e.id === report.question.id);
        if (questionIndex === -1) {
          quiz[index].questions =  [... quiz[index].questions, report.question]
        }
        const answerIndex = quiz[index].answers.findIndex(e => e.id === report.answer.id);
        if (answerIndex === -1) {
          quiz[index].answers =  [... quiz[index].answers, report.answer]
        }
      }
    })
  }

  console.log(quiz)

  const renderQuiz = quiz.map(quiz => {
    const nbRightAnswer = quiz.answers.filter(answer => answer.isRight === true);
    return (
      <IonItem key={quiz.id}>
        <IonLabel>{quiz.name}</IonLabel>
        <IonNote slot="end">{nbRightAnswer.length}/{quiz.questions.length}</IonNote>
      </IonItem>
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