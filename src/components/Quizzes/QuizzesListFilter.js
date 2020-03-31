import React from 'react';
import { IonToggle, IonList, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { GET_SCHOOL_SUBJECTS } from '../../utils/SchoolSubject';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';

const QuizzesListFilter = ({ onDismissModal, setFilterQuizzes, filterQuizzes }) => {

  const {data: dataForSchoolSubject, loading: loadingForSchoolSubject, error: errorForSchoolSubject} = useQuery(GET_SCHOOL_SUBJECTS);

  if (loadingForSchoolSubject) return <Loading />;
  if (errorForSchoolSubject) return `Error!`;
  
  const handleToggleChange = (schoolSubject) => {
    if (filterQuizzes.indexOf(schoolSubject) > -1) {
      setFilterQuizzes(filterQuizzes.filter(subject => subject !== schoolSubject));
    } else {
      setFilterQuizzes([...filterQuizzes, schoolSubject]);
    }
  };

  const handleDeselectAll = () => {
    setFilterQuizzes([])
  };

  const handleSelectAll = () => {
    setFilterQuizzes(dataForSchoolSubject.schoolSubjects.map(schoolSubject => schoolSubject.name))
  };

  const renderFilterListItem = dataForSchoolSubject.schoolSubjects.map((schoolSubject, index) => {
    return (
      <IonItem key={index}>
        <IonLabel>{schoolSubject.name}</IonLabel>
        <IonToggle slot="start"
          value={schoolSubject.name}
          onClick={() => { handleToggleChange(schoolSubject.name) }}
          checked={filterQuizzes.indexOf(schoolSubject.name) > -1}
        />
      </IonItem>
    )
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Choisir des matières
        </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>Terminer</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Filtre par matière :</IonListHeader>
          <IonList>
            {renderFilterListItem}
          </IonList>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleDeselectAll}>Aucun filtre</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleSelectAll}>Tous les filtres</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default QuizzesListFilter;