import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonButton, IonItem, IonIcon, IonAlert } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_QUIZ } from '../../utils/MutationApi';
import { Redirect, useHistory } from 'react-router-dom';

const NewQuizHeader = ({ quiz }) => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [deleteQuiz, { data: dataForDeleteQuiz }] = useMutation(DELETE_QUIZ);
  let history = useHistory();

  const handleDeleteQuiz = () => {
    deleteQuiz({ variables: { quizId: quiz.id } })
    history.push("/quizzes");
    document.location.reload()
  }
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonItem className={'ion-text-center'} lines="none"> Création d'un nouveau quiz</IonItem>
        <IonButtons slot="end" className={quiz.id === '' ? 'ion-hide' : ''}>
          <IonButton icon-only onClick={() => setShowAlert1(true)}>
            <IonIcon icon={trash} slot="icon-only" color="primary" />
          </IonButton>
        </IonButtons>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Êtes vous sur de vouloir supprimer ce quiz ?'}
          message={'Ce quiz ne sera plus disponible dans votre espace et pour les autres utilisateurs'}
          buttons={[
            {
              text: 'Supprimer',
              cssClass: 'secondary',
              handler: () => {
                handleDeleteQuiz()
              }
            },
            {
              text: 'Continuer',
              handler: () => {
                console.log('Confirm Ok');
              }
            }
          ]}
        />
      </IonToolbar>
    </IonHeader>
  )
}

export default NewQuizHeader;