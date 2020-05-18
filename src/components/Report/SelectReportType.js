import React from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';


const SelectReportType = ({setFilterReport}) => {
  return (
    <IonItem>
      <IonLabel>Rapport par :</IonLabel>
      <IonSelect placeholder="Choisir" onIonChange={(e) => setFilterReport(e.target.value)} value="students" cancelText="Annuler">
        <IonSelectOption value="students">
          Elèves
          </IonSelectOption>
        <IonSelectOption value="quiz">
          Quiz
          </IonSelectOption>
      </IonSelect>
    </IonItem>
  )
}

export default SelectReportType;