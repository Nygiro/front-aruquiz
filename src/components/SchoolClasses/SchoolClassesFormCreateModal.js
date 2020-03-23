import React, { useState, useEffect, Fragment } from 'react';
import { IonInput, IonList, IonText, IonRow, IonCol, IonItem, IonLabel, IonContent, IonListHeader, IonHeader, IonTitle, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { CREATE_SCHOOL_CLASS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, DELETE_SCHOOL_CLASS } from '../../utils/MutationApi';
import { useMutation } from '@apollo/react-hooks';
import { empty } from 'apollo-boost';
import Cross from '../../assets/img/cross.png';
import Validate from '../../assets/img/validate.png';

const SchoolClassesFormCreateModal = ({ setShowModal }) => {
  const [className, setClassName] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentIndexToUpdate, setStudentIndexToUpdate] = useState(null);
  const [, forceUpdate] = React.useState(0);

  const [createSchoolClass, { data: dataForSchoolClass }] = useMutation(CREATE_SCHOOL_CLASS);
  const [deleteSchoolClass] = useMutation(DELETE_SCHOOL_CLASS);
  const [createStudent, { data: dataForCreateStudent }] = useMutation(CREATE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const [deleteStudent] = useMutation(DELETE_STUDENT);


  useEffect(() => {
    if (studentIndexToUpdate !== null && dataForCreateStudent !== undefined) {
      students[studentIndexToUpdate].id = dataForCreateStudent.createStudent.id
      setStudents(students);
      forceUpdate(n => !n)
    }
  }, [dataForCreateStudent])


  const handleSetStudent = (value, id, index) => {
    students[index] = {
      ...students[index],
      name: value,
      id
    };
    setStudents(students)
  }

  const handleSetStudentMarkerId = (markerId, id, index) => {
    students[index] = {
      ...students[index],
      markerId
    };
    setStudents(students)
  }

  const handleDeleteSchoolClass = () => {
    deleteSchoolClass({ variables: { schoolClassId: dataForSchoolClass.createSchoolClass.id } })
  }

  const handleCreateStudent = (student, i) => {
    createStudent({ variables: { name: student.name, schoolClassId: dataForSchoolClass.createSchoolClass.id, markerId: student.markerId } })
    setStudentIndexToUpdate(i);
  }

  const handleUpdateStudent = (student, i) => {
    updateStudent({ variables: { name: student.name, studentId: student.id, markerId: student.markerId } })
    setStudentIndexToUpdate(i);
  }

  const handleDeleteStudent = (id, i) => {
    deleteStudent({ variables: { studentId: id } })
    delete students[i]
    setStudents(students.filter(student => student !== empty))
  }


  let title = className !== null ? className : 'Enter a class name';

  const renderStudentsInput = (dataForSchoolClass !== undefined) ? students.map(({ name, id, markerId }, i) => {
    return (
      <Fragment key={i}>
        <IonRow>
          <IonCol size="2">
            <IonItem class="ion-text-center">
              <IonLabel position="floating" color="primary">Id</IonLabel>
              <IonInput value={markerId} type="number" min={1} max={50} placeholder="Id" onIonChange={e => handleSetStudentMarkerId(e.target.value, id, i)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="10">
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
          </IonCol>
        </IonRow>
      </Fragment>

    )
  }) : (
      <IonItem>
        <IonLabel position="floating" color="primary">Enter a class name</IonLabel>
        <IonInput minlength={1} name="className" type="text" value={className} spellCheck={false} autocapitalize="off" onIonChange={(e) => setClassName(e.target.value)}
          required>
        </IonInput>
      </IonItem>
    )
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {title}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)} strong>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {renderStudentsInput}
        </IonList>
        <IonRow>
          <IonCol>
            {(className !== null && dataForSchoolClass !== undefined) ? (
              <>
                <IonButton expand="block" onClick={() => setStudents([...students, { id: '', name: "" }])} >Add new student</IonButton>
                <IonButton expand="block" onClick={() => handleDeleteSchoolClass()} >Delete class</IonButton>
              </>
            ) : (
                <IonButton disabled={className === null} expand="block" onClick={() => createSchoolClass({ variables: { name: className } })} >Create new class</IonButton>
              )
            }
          </IonCol>
        </IonRow>
      </IonContent>
    </>
  );
}

export default SchoolClassesFormCreateModal;



