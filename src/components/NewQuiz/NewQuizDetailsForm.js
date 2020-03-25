import React, { useState, useEffect } from 'react';
import NewQuizAnswersForm from './NewQuizAnswersForm';
import NewQuizQuestionForm from './NewQuizQuestionForm';
import { useMutation } from '@apollo/react-hooks';
import { UPSERT_QUESTION, UPSERT_ANSWER, UPDATE_ANSWER_IS_RIGHT_FIELD } from '../../utils/MutationApi';
import NewQuizQuestionNumber from './NewQuizQuestionNumber';
import Loading from '../Utils/Loading';
import { usePrevious } from '../../utils/Hook';

const NewQuizDetailsForm = ({ quiz }) => {
  const [upsertQuestion, { data: dataForUpsertQuestion, loading: loadingForUpsertQuestion }] = useMutation(UPSERT_QUESTION);
  const [upsetAnswer, { data: dataForUpsertAnswer, loading: loadingForUpsertAnswer }] = useMutation(UPSERT_ANSWER);
  const [updateAnswerIsRightField, {
    data: dataForupdateAnswerIsRightField,
    loading: loadingForupdateAnswerIsRightField
  }] = useMutation(UPDATE_ANSWER_IS_RIGHT_FIELD);
  const defaultQuestionState = {
    number: 1,
    name: '',
    id: null,
    answers: [
      { label: '', isRight: false, id: null },
      { label: '', isRight: false, id: null },
      { label: '', isRight: false, id: null },
      { label: '', isRight: false, id: null }
    ]
  };


  const [nbCurrentQuestion, setNbCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState(defaultQuestionState)


  const [lastAnswerIndexUpdate, setLastAnswerIndexUpdate] = useState(null)

  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    if (question.name !== '') {
      let questionId = (question.id === null) ? '' : question.id;
      upsertQuestion({ variables: { label: question.name, quizId: quiz.id, questionId: questionId } })
    }
  }, [question])


  useEffect(() => {
    if (dataForUpsertQuestion !== undefined && question.id === null) {
      setQuestion({ ...question, id: dataForUpsertQuestion.upsertQuestion.id })
    }
  }, [dataForUpsertQuestion])


  useEffect(() => {

    let questionAtNumber = questions.filter(({ number }) => number === nbCurrentQuestion)
    if (questionAtNumber.length > 0) {
      setQuestion(questionAtNumber[0])
    } else if (question.id !== null && questions.find(questionArray => questionArray.id === question.id) === undefined) {
      let hasAllAnswerLabel = question.answers.filter(({ label }) => label !== '');
      let hasOneAnswerIsRight = question.answers.filter(({ isRight }) => isRight === true);
      if (hasAllAnswerLabel && hasOneAnswerIsRight) {
        setQuestions([...questions, { ...question }])
        setQuestion({ ...defaultQuestionState, number: nbCurrentQuestion })

      }
    } else {
      setQuestion({ ...defaultQuestionState })
    }

  }, [nbCurrentQuestion])




  useEffect(() => {
    let questionAtNumber = questions.filter(({ number }) => number === nbCurrentQuestion)
    if (question.id !== null && questionAtNumber.length === 0) {
      setQuestions([...questions, { ...question, number: nbCurrentQuestion }])
    } else if (questionAtNumber.length === 1) {
      let newQuestions = [...questions];
      newQuestions[nbCurrentQuestion - 1] = { ...question, number: nbCurrentQuestion };
      console.log(newQuestions)
      setQuestions(newQuestions)
    }

  }, [question])




  useEffect(() => {
    if (lastAnswerIndexUpdate !== null && question.id !== null) {
      let answersToUpdate = question.answers[lastAnswerIndexUpdate]
      let answerId = (answersToUpdate.id === null) ? 'null' : answersToUpdate.id;
      upsetAnswer({
        variables: {
          label: answersToUpdate.label,
          isRight: answersToUpdate.isRight,
          questionId: question.id,
          answerId: answerId
        }
      })

      let answerToUpdateRight = question.answers.filter(answer => {
        return answer.id !== null && answer.id !== question.answers[lastAnswerIndexUpdate].id
      })

      if (answerToUpdateRight.length > 0) {
        answerToUpdateRight.forEach(answer => {
          updateAnswerIsRightField({
            variables: {
              isRight: false,
              answerId: answer.id
            }
          })
        })
      }
    }
  }, [lastAnswerIndexUpdate])




  useEffect(() => {
    if (dataForUpsertAnswer !== undefined) {
      let newQuestion = { ...question }
      newQuestion.answers[lastAnswerIndexUpdate] = { ...newQuestion.answers[lastAnswerIndexUpdate], id: dataForUpsertAnswer.upsertAnswer.id };
      setQuestion(newQuestion)
      setLastAnswerIndexUpdate(null)
    }
  }, [dataForUpsertAnswer])





  if (loadingForUpsertQuestion && question.id === null || loadingForUpsertAnswer && setLastAnswerIndexUpdate === null) {
    return <Loading />
  }

  return (
    <>
      <NewQuizQuestionNumber nbCurrentQuestion={nbCurrentQuestion} setNbCurrentQuestion={setNbCurrentQuestion} questions={questions} />
      <NewQuizQuestionForm question={question} setQuestion={setQuestion} />
      <NewQuizAnswersForm question={question} setQuestion={setQuestion} setLastAnswerIndexUpdate={setLastAnswerIndexUpdate} />
    </>
  )
}

export default NewQuizDetailsForm;