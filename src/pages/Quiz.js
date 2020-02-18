import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../components/Loading";
import { GET_QUIZ } from "../utils/QuizApi";
import CameraDetector from "../components/CameraDetector";

const Quiz = () => {
  const { quizId } = useParams();
  console.log(quizId);
  const { loading, error, data: dataForQuiz } = useQuery(GET_QUIZ, {
    variables: { quizId },
  });


  const [openCamera, setOpenCamera] = useState(false);
  useEffect(() => {
    setOpenCamera(false);
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
        <CameraDetector/>
      </div>
    </>
  )
};

export default Quiz;