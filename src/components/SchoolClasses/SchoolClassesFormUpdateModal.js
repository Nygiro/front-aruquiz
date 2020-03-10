import React, { useState, Fragment, useEffect } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonList, IonItem, IonLabel, IonBackButton, IonInput, IonRow, IonCol
} from '@ionic/react';
import { DELETE_SCHOOL_CLASS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from '../../utils/MutationApi';
import { useMutation } from '@apollo/react-hooks';
import Cross from '../../assets/img/cross.png';
import Validate from '../../assets/img/validate.png';


import { empty } from 'apollo-boost';


const SchoolClassesFormUpdateModal = ({ showModal, setShowModal, schoolClass }) => {
  const [students, setStudents] = useState([]);
  const [studentIndexToUpdate, setStudentIndexToUpdate] = useState(null);
  const [, forceUpdate] = React.useState(0);

  const [deleteSchoolClass] = useMutation(DELETE_SCHOOL_CLASS);
  const [createStudent, { data: dataForCreateStudent }] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const [deleteStudent] = useMutation(DELETE_STUDENT);

  useEffect(() => {
    const studentslist = schoolClass.students.map(student => {
      return {
        id: student.id,
        name: student.name
      }
    })
    setStudents(studentslist)
  }, [])

  useEffect(() => {
    if (studentIndexToUpdate !== null && dataForCreateStudent !== undefined) {
      students[studentIndexToUpdate].id = dataForCreateStudent.createStudent.id
      students[studentIndexToUpdate].name = dataForCreateStudent.createStudent.name
      setStudents(students);
      forceUpdate(n => !n)
    }
  }, [dataForCreateStudent])

  const handleSetStudent = (value, id, index) => {
    students[index] = {
      name: value,
      id
    };
    setStudents(students)
  }

  const handleDeleteSchoolClass = () => {
    deleteSchoolClass({ variables: { schoolClassId: schoolClass.id } })
    setShowModal({ schoolClassId: '', display: false })
  }

  const handleCreateStudent = (student, i) => {
    createStudent({ variables: { name: student.name, schoolClassId: schoolClass.id } })
    setStudentIndexToUpdate(i);
  }

  const handleUpdateStudent = (student, i) => {
    updateStudent({ variables: { name: student.name, studentId: student.id } })
    setStudentIndexToUpdate(i);
  }

  const handleDeleteStudent = (id, i) => {
    deleteStudent({ variables: { studentId: id } })
    delete students[i]
    setStudents(students.filter(student => student !== empty))
  }


  const renderStudentsInput = (students.length > 0) ? students.map(({ name, id }, i) => {
    return (
      <Fragment key={i}>
        <IonItem >
          <IonLabel position="floating" color="primary">Enter student name</IonLabel>
          <IonInput minlength={1} value={name} onIonChange={e => handleSetStudent(e.target.value, id, i)} />
          {id === '' ? (
            <img src={Validate}
              className={'icon-validate'}
              onClick={(e) => handleCreateStudent(students[i], i)} />
          ) :
            <>
              <img src={Validate}
                className={'icon-validate-2'}
                onClick={(e) => handleUpdateStudent(students[i], i)} />
              <img src={Cross}
                className={'icon-cross'}
                onClick={() => handleDeleteStudent(id, i)} />
            </>
          }
        </IonItem>
      </Fragment>

    )
  }) : (
      ''
    )

  return (
    <IonModal isOpen={showModal.display && schoolClass.id === showModal.schoolClassId} onDidDismiss={() => setShowModal(false)}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{schoolClass.name}</IonTitle>
          <IonBackButton></IonBackButton>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal({ schoolClassId: '', display: false })}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderStudentsInput}
        </IonList>
        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={() => setStudents([...students, { id: '', name: '' }])} >Add new student</IonButton>
            <IonButton expand="block" onClick={() => handleDeleteSchoolClass()} >Delete class</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonModal >
  );
};

export default SchoolClassesFormUpdateModal;