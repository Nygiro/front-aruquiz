import React, { useState, useEffect } from 'react';
import { IonInput, IonList, IonText, IonRow, IonCol, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';

const SchoolClassesCreate = ({ onDismissModal }) => {
  const [className, setClassName] = useState(null);
  const [students, setStudents] = useState([]);

  const handleSetStudent = (value, index) => {
    students[index] = value;
    setStudents(students)
  }

  let title = className !== null ? className : 'Enter a class name';

  let renderStudentsInput = students.map((studentValue, i) => {
    return (
      <IonItem key={i}>
        <IonLabel position="floating" color="primary">Enter student name</IonLabel>
        <IonInput value={studentValue} onIonChange={e => handleSetStudent(e.target.value, i)}>
        </IonInput>
      </IonItem>
    )
  })
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {title}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          {students.length === 0 ? (
            <IonItem>
              <IonLabel position="floating" color="primary">Enter a class name</IonLabel>
              <IonInput name="userName" type="text" value={className} spellCheck={false} autocapitalize="off" onIonChange={(e) => setClassName(e.target.value)}
                required>
              </IonInput>
            </IonItem>
          ) : (
              <>
                {renderStudentsInput}
              </>
            )}
        </IonList>
        <IonRow>
          {className !== null &&
            <IonCol>
              <IonButton expand="block" onClick={() => setStudents([...students, ''])} >Add new student</IonButton>
            </IonCol>
          }
        </IonRow>
      </IonContent>
    </>
  );
}

export default SchoolClassesCreate;