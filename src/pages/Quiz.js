import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../components/Utils/Loading";
import { GET_QUIZ } from "../utils/QuizApi";
import CameraDetector from "../components/Quiz/CameraDetector";
import { ARUQUIZ_CURRENT_LIST_STUDENTS_FOR_QUIZ } from "../utils/Constants";
import { GET_STUDENTS_BY_STUDENTS_ID } from "../utils/QueryApi";

const Quiz = () => {
  const { quizId } = useParams();
  const [schoolClass, setSchoolClass] = useState(null)
  const [students, setStudents] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);

  const { loading, error, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });



  useEffect(() => {
    // setStudents())
    // setOpenCamera(false);
  }, []);


  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;


  let btnCameraText = openCamera ? 'Close' : 'Open';
  const btnCamera = (
    <div className="text-center">
      <button className="btn btn-success"
        onClick={() => setOpenCamera(!openCamera)}>{btnCameraText} camera
          </button>
    </div>
  );

  return (
    <>
      <div>
        {/* <CameraDetector/> */}
      </div>
    </>
  )
};

export default Quiz;