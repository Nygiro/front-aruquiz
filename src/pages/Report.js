import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton} from '@ionic/react';
import SelectReportType from '../components/Report/SelectReportType';
import { GET_STUDENTS_BY_TEACHER } from '../utils/UserApi';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Utils/Loading';
import  StudentsList from '../components/Report/StudentsList';
const Report = () => {
  const [filterReport, setFilterReport] = useState('student');
  const { data: dataForStudents, loading: loadingForStudents } = useQuery(GET_STUDENTS_BY_TEACHER)
  if (loadingForStudents) return <Loading />;
  const students = dataForStudents.currentUser.schoolClasses.map(schoolClasses => schoolClasses.students)
  return (
    <>
      <IonPage id="quizzes-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <SelectReportType setFilterReport={setFilterReport}/>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <StudentsList studentList={students.flat()}/>
        </IonContent>
      </IonPage >
    </>
  )
}

export default Report;