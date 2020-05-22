import React, { Fragment, useState } from 'react';
import { IonModal, IonAvatar, IonList, IonItem, IonLabel} from '@ionic/react';
import ReportModal from './ReportModal';

const StudentsList = ({ studentList }) => {
  const [showModal, setShowModal] = useState({studentId: '', display: false});

  const renderStudents = studentList.map(({ id, name }, i) => {
    let color = (i % 2 === 0) ? 'D46EFF' : '8580E8';
    return (
      <Fragment key={id}>
        <IonItem onClick={() => setShowModal({display: true, studentId: id})}>
          <IonAvatar slot="start">
            <img src={`https://eu.ui-avatars.com/api/?name=${name[0]}&background=${color}&color=fff`} />
          </IonAvatar>
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <ReportModal setShowModal={setShowModal} showModal={showModal} studentId={id} studentName={name}/>
      </Fragment>
    )
  });
  return (
    <IonList>
      {renderStudents}
    </IonList>
  )
}

export default StudentsList;