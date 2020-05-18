import React, { Fragment, useState } from 'react';
import { IonListHeader, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import QuizInformationModal from '../QuizInformationModal/QuizInformationModal';

const QuizzesList = ({ quizzesList, hide }) => {
  const [showQuizModal, setShowQuizModal] = useState({ quizId: '', display: false });

  if (quizzesList.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          Aucun quiz de disponible
        </IonListHeader>
      </IonList>
    );
  }

  const renderQuizzesListItems = quizzesList.map(({ id, name }, i) => {
    let color = (i % 2 === 0) ? 'D46EFF' : '8580E8';
    return (
      <Fragment key={id}>
        <IonItem onClick={() => setShowQuizModal({ quizId: id, display: true })}>
          <IonAvatar slot="start">
            <img src={`https://eu.ui-avatars.com/api/?name=${name[0]}&background=${color}&color=fff`} />
          </IonAvatar>
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <QuizInformationModal showModal={showQuizModal} setShowModal={setShowQuizModal} quizId={id} />
      </Fragment>
    )
  });

  return (
    <IonList style={hide ? { display: 'none' } : {}}>
      {renderQuizzesListItems}
    </IonList>
  )
};

export default QuizzesList;