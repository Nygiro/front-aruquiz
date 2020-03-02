import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import OptionsStudents from './OptionsStudents';

const SelectStudents = ({ selectedClassId }) => {
  return (
    <IonItem>
      <IonLabel>Students</IonLabel>
      <IonSelect placeholder="Select one" multiple={true} onIonChange={(e) => console.log(e.target.value)} disabled={selectedClassId === null}>
        {selectedClassId !== null && <OptionsStudents selectedClassId={selectedClassId} />}
      </IonSelect>
    </IonItem>
  )
}

export default SelectStudents;