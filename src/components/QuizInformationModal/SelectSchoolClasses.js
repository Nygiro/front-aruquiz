import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import Loading from '../Utils/Loading';
import { OWN_SCHOOLCLASSES } from './../../utils/UserApi';

const SelectSchoolClasses = ({ setSelectedClassId }) => {
  const { loading: loadingForSchoolClasses, error: errorForSchoolClasses, data: dataForSchoolClasses } = useQuery(OWN_SCHOOLCLASSES)

  if (loadingForSchoolClasses) return <Loading />;
  if (errorForSchoolClasses) return `Error!`;
  return (
    <IonItem>
      <IonLabel>School Classes</IonLabel>
      <IonSelect placeholder="Select one" onIonChange={(e) => setSelectedClassId(e.target.value)}>
        {dataForSchoolClasses.currentUser.schoolClasses.map(({ id, name }) => (
          <IonSelectOption key={name} value={id}>
            {name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}

export default SelectSchoolClasses;