import React, { useEffect } from 'react';
import { IonSelect, IonItem, IonSelectOption, IonTextarea, IonRow, IonCol, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonLabel, IonInput, IonGrid } from '@ionic/react';
import SelectSchoolSubjects from './SelectSchoolSubjects';
import { CREATE_QUIZ } from '../../utils/MutationApi';
import { useMutation } from '@apollo/react-hooks';

const NewQuizFormCreate = ({ setQuiz, quiz }) => {
  const [createQuiz, { data: dataForCreateQuiz }] = useMutation(CREATE_QUIZ);
  useEffect(() => {
    if (dataForCreateQuiz !== undefined) {
      setQuiz({ ...quiz, id: dataForCreateQuiz.createQuiz.id })
    }
  }, [dataForCreateQuiz])

  return (
    <>
      <SelectSchoolSubjects setQuiz={setQuiz} quiz={quiz} />
      <IonItem >
        <IonLabel position="floating" color="primary">Veuillez renseigner le nom de votre quiz</IonLabel>
        <IonInput minlength={1} className={'ion-text-center'} value={quiz.name} onIonChange={e => setQuiz({ ...quiz, name: e.target.value })} />
      </IonItem>
      <IonItem>
        <IonButton expand="block" onClick={() => createQuiz({ variables: quiz })} >Créer le quiz</IonButton>
      </IonItem>
    </>
  )
}

export default NewQuizFormCreate;