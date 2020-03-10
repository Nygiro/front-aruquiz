import React, { Fragment, useState, useEffect } from 'react';
import { IonModal, IonAvatar, IonList, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';
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


  const renderSchoolClassesItems = dataForSchoolClasses.schoolClassesByCurrentUser.map(schoolClass => (
    <Fragment key={schoolClass.id}>
      <IonItem onClick={() => setShowSchoolClassModal({ schoolClassId: schoolClass.id, display: true })}>
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel>{schoolClass.name}</IonLabel>
      </IonItem>
      <SchoolClassesFormUpdateModal showModal={showSchoolClassModal} setShowModal={setShowSchoolClassModal} schoolClass={schoolClass} />
    </Fragment>
  ));
  return (
    <IonList>
      {renderSchoolClassesItems}
    </IonList>
  )
}

export default SchoolClassesList;