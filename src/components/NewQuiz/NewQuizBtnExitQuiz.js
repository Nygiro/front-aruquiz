import React from 'react';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
const NewQuizBtnExitQuiz = ({ quiz }) => {
  let history = useHistory()
  return (
    <IonButton expand="block" className={'btn-for-new-quiz'} onClick={() => history.push(`/quizzes`)}>Retourner à la liste des quiz</IonButton>
  )
}

export default NewQuizBtnExitQuiz;

