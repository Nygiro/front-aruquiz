import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import Loading from '../Utils/Loading';
import { GET_SCHOOL_CLASSES_BY_CURRENT_USER } from '../../utils/QueryApi';

const SelectSchoolClasses = ({ setSelectedClassId }) => {
  const { loading: loadingForSchoolClasses, error: errorForSchoolClasses, data: dataForSchoolClasses } = useQuery(GET_SCHOOL_CLASSES_BY_CURRENT_USER)
  if (loadingForSchoolClasses) return <Loading />;
  if (errorForSchoolClasses) return `Error!`;
  return (
    <IonItem>
      <IonLabel>School Classes</IonLabel>
      <IonSelect placeholder="Select one" onIonChange={(e) => setSelectedClassId(e.target.value)}>
        {dataForSchoolClasses.schoolClassesByCurrentUser.map(({ id, name }) => (
          <IonSelectOption key={name} value={id}>
            {name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}

export default SelectSchoolClasses;