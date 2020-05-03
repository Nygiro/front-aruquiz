import React, { Fragment, useState, useEffect } from 'react';
import {IonAvatar, IonList, IonItem, IonLabel} from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCHOOL_CLASSES_BY_CURRENT_USER } from '../../utils/QueryApi';
import Loading from '../Utils/Loading';
import SchoolClassesFormUpdateModal from './SchoolClassesFormUpdateModal'

const SchoolClassesList = ({ showModalFormCreate, searchQuizInput }) => {
  const [showSchoolClassModal, setShowSchoolClassModal] = useState({ schoolClassId: '', display: false });
  const { loading: loadingForSchoolClasses, error: errorForSchoolClasses, data: dataForSchoolClasses, refetch: refetchForSchoolClass } = useQuery(GET_SCHOOL_CLASSES_BY_CURRENT_USER, {
    variables: {
      search: searchQuizInput
    }
  });

  useEffect(() => {
    refetchForSchoolClass();
  }, [showSchoolClassModal, showModalFormCreate])

  if (loadingForSchoolClasses) return <Loading />;
  if (errorForSchoolClasses) return `Error! ${errorForSchoolClasses.message}`;

  const renderSchoolClassesItems = dataForSchoolClasses.schoolClassesByCurrentUser.map((schoolClass, i) => {
   let color = (i % 2 === 0) ? 'D46EFF' : '8580E8';
    return (
      <Fragment key={schoolClass.id}>
        <IonItem onClick={() => setShowSchoolClassModal({ schoolClassId: schoolClass.id, display: true })}>
          <IonAvatar slot="start">
            <img src={`https://eu.ui-avatars.com/api/?name=${schoolClass.name[0]}&background=${color}&color=fff`} />
          </IonAvatar>
          <IonLabel>{schoolClass.name}</IonLabel>
        </IonItem>
        <SchoolClassesFormUpdateModal showModal={showSchoolClassModal} setShowModal={setShowSchoolClassModal} schoolClass={schoolClass} />
      </Fragment>
    )
  });
  return (
    <IonList>
      {renderSchoolClassesItems}
    </IonList>
  )
}

export default SchoolClassesList;