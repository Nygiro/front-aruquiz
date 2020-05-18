import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import OptionsStudents from './OptionsStudents';

const SelectStudents = ({ selectedClassId, setSelectedStudentsId }) => {
  return (
    <IonItem>
      <IonLabel>Vos élèves</IonLabel>
      <IonSelect cancelText="Annuler" placeholder="Choisir" multiple={true} onIonChange={(e) => setSelectedStudentsId(e.target.value)} disabled={selectedClassId === null}>
        {selectedClassId !== null && <OptionsStudents selectedClassId={selectedClassId} />}
      </IonSelect>
    </IonItem>
  )
}

export default SelectStudents;