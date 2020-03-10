import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Utils/Loading';
import { IonSelectOption } from '@ionic/react';
import { GET_STUDENTS_BY_SCHOOL_CLASS } from '../../utils/QueryApi';

const OptionsStudents = ({ selectedClassId }) => {
  const {
    loading: loadingForStudentsBySchoolClass,
    error: errorForStudentsBySchoolClass,
    data: dataForStudentsBySchoolClass } = useQuery(GET_STUDENTS_BY_SCHOOL_CLASS, {
      variables: { schoolClassId: selectedClassId },
    })

  console.log(dataForStudentsBySchoolClass);

  if (loadingForStudentsBySchoolClass) return <Loading />;
  if (errorForStudentsBySchoolClass) return 'Error!';

  const renderOptionsStudents = dataForStudentsBySchoolClass.schoolClass.students.map(({ id, name }) => (
    <IonSelectOption key={id} value={id}>
      {name}
    </IonSelectOption>
  ))

  return (
    <>
      {renderOptionsStudents}
    </>
  )
}

export default OptionsStudents;