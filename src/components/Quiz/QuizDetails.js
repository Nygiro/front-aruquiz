import React from 'react';
import QuizQuestionNumber from './QuizQuestionNumber';
import QuizQuestion from './QuizQuestion';
import CameraDetector from './CameraDetector';
import { ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ } from '../../utils/Constants';
const QuizDetails = ({ quiz, nbCurrentQuestion, setAnswersByQuestion, displayAnswer, answersByQuestion, setMediaStream, setStudents, students, showResultsByQuestion, openCamera, setOpenCamera, setShowResultsByQuestion, setNbCurrentQuestion }) => {
  return (
    <>
      <QuizQuestionNumber
        quiz={quiz}
        nbCurrentQuestion={nbCurrentQuestion}
        answersByQuestion={answersByQuestion}
        students={students}
        setShowResultsByQuestion={setShowResultsByQuestion}
        setNbCurrentQuestion={setNbCurrentQuestion}
        showResultsByQuestion={showResultsByQuestion}
        nbCurrentQuestion={nbCurrentQuestion}
      />
      {
        openCamera ? <CameraDetector
          quiz={quiz}
          setMediaStream={setMediaStream}
          setStudents={setStudents}
          students={students}
          schoolClassId={localStorage.getItem(ARUQUIZ_CURRENT_SCHOOL_CLASS_FOR_QUIZ)}
          setAnswersByQuestion={setAnswersByQuestion}
          answersByQuestion={answersByQuestion}
          showResultsByQuestion={showResultsByQuestion}
          answersByQuestion={answersByQuestion}
        /> : (
            <div className="CameraDetector" onClick={() => setOpenCamera(!openCamera)}>
              Commencer le scan
            </div>
          )
      }
      <QuizQuestion quiz={quiz} nbCurrentQuestion={nbCurrentQuestion} displayAnswer={displayAnswer} />
    </>
  )
}
export default QuizDetails;