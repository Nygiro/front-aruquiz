import React from 'react';
import { IonToggle, IonList, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';

const QuizzesListFilter = ({ onDismissModal, setFilterQuizzes, filterQuizzes }) => {
  const schoolSubjects = ["Mathématique", "Anglais"];

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
    setFilterQuizzes(schoolSubjects)
  };

  const renderFilterListItem = schoolSubjects.map((schoolSubject, index) => {
    return (
      <IonItem key={index}>
        <IonLabel>{schoolSubject}</IonLabel>
        <IonToggle slot="start"
          value={schoolSubject}
          onClick={() => { handleToggleChange(schoolSubject) }}
          checked={filterQuizzes.indexOf(schoolSubject) > -1}
        />
      </IonItem>
    )
  })

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Filter Sessions
        </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Filter</IonListHeader>
          <IonList>
            {renderFilterListItem}
          </IonList>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleDeselectAll}>Deselect All</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleSelectAll}>Select All</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default QuizzesListFilter;