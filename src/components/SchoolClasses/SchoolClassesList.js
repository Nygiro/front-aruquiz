import React from 'react';
import { IonAvatar, IonList, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import {schoolSubjects} from '../../utils/Constants';
import { useQuery } from '@apollo/react-hooks';
import { GET_SCHOOL_SUBJECTS } from '../../utils/SchoolSubject';

const SchoolClassesList = () => {

const {data} = useQuery(GET_SCHOOL_SUBJECTS);
return (
  <IonList>
          <IonItem >
        <IonAvatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonLabel>toto</IonLabel>
      </IonItem>
  </IonList>
)
}

export default SchoolClassesList;