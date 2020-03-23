import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCHOOL_SUBJECTS } from '../../utils/SchoolSubject';
import Loading from '../Utils/Loading';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

const SelectSchoolSubjects = ({ setQuiz, quiz }) => {
  const { data: dataForSchoolSubject, loading: loadingForSchoolSubject, error: errorForSchoolSubject } = useQuery(GET_SCHOOL_SUBJECTS);
  if (loadingForSchoolSubject) return <Loading />;
  if (errorForSchoolSubject) return `Error!`;
  
  return (
    <IonItem>
      <IonLabel>Matière scolaire</IonLabel>
      <IonSelect placeholder="Select one" onIonChange={(e) => setQuiz({ ...quiz, schoolSubjectId: e.target.value })}>
        {dataForSchoolSubject.schoolSubjects.map(({ id, name }) => (
          <IonSelectOption key={name} value={id}>
            {name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  )
}

export default SelectSchoolSubjects;