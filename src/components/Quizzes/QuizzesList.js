import React, { Fragment, useState } from 'react';
import { IonHeader, IonBackButton, IonModal, IonToolbar, IonSearchbar, IonTitle, IonSegment, IonSegmentButton, IonContent, IonPage, IonButtons, IonMenuButton, IonListHeader, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonAvatar } from '@ionic/react';
import QuizInformationModal from '../QuizInformationModal/QuizInformationModal';

const QuizzesList = ({ quizzesList, hide }) => {
  const [showQuizModal, setShowQuizModal] = useState({ quizId: '', display: false });

  if (quizzesList.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Found
        </IonListHeader>
      </IonList>
    );
  }

  const renderQuizzesListItems = quizzesList.map(({ id, name }) => (
    <Fragment key={id}>
      <IonItem onClick={() => setShowQuizModal({ quizId: id, display: true })}>
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel>{name}</IonLabel>
      </IonItem>
      <QuizInformationModal showModal={showQuizModal} setShowModal={setShowQuizModal} quizId={id} />
    </Fragment>
  ));

  return (
    <IonList style={hide ? { display: 'none' } : {}}>
      {renderQuizzesListItems}
    </IonList>
  )
};

export default QuizzesList;