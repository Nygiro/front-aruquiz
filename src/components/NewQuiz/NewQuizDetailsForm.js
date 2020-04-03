import React, { useState, useEffect, useCallback } from 'react';
import NewQuizQuestionForm from './NewQuizQuestionForm';
import { useMutation } from '@apollo/react-hooks';
import { UPSERT_QUESTION, UPSERT_ANSWER, UPDATE_ANSWER_IS_RIGHT_FIELD } from '../../utils/MutationApi';
import NewQuizQuestionNumber from './NewQuizQuestionNumber';
import NewQuizBtnExitQuiz from './NewQuizBtnExitQuiz';
import { useDebounce } from 'use-debounce';
import NewAnswersForm from './NewAnswersForm';

const NewQuizDetailsForm = ({ quiz }) => {
  const [upsertQuestion, { data: dataForUpsertQuestion }] = useMutation(UPSERT_QUESTION);
  const [upsetAnswer, { data: dataForUpsertAnswer }] = useMutation(UPSERT_ANSWER, {
    onCompleted: (data) => {
      let indexToUpdate = question.answers.findIndex(answer => answer.label === data.upsertAnswer.label)
      let newQuestion = { ...question }
      newQuestion.answers[indexToUpdate] = { ...newQuestion.answers[indexToUpdate], id: data.upsertAnswer.id };
      setQuestion(newQuestion)
    }
  });
  const [selectRightAnswer, setSelectRightAnswer] = useState(false)

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
  const [debounceQuestion] = useDebounce(question, 500);
  const [debounceAnswer] = useDebounce(question.answers, 500);


  const [lastAnswerIndexUpdate, setLastAnswerIndexUpdate] = useState(null)

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (debounceQuestion.name !== '') {
      let questionId = (debounceQuestion.id === null) ? '' : debounceQuestion.id;
      upsertQuestion({ variables: { label: debounceQuestion.name, quizId: quiz.id, questionId: questionId } })
    }
  }, [debounceQuestion.name])

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
      setQuestions(newQuestions)
    }

  }, [question])

  useEffect(() => {
    console.log('fail')
    if (debounceAnswer.find(answer => answer.label === '') === undefined && selectRightAnswer) {
      debounceAnswer.forEach((answer, i) => {
        let answerId = (answer.id === null) ? 'null' : answer.id;
        upsetAnswer({
          variables: {
            label: answer.label,
            isRight: answer.isRight,
            questionId: question.id,
            answerId: answerId
          },
        })
      })
    }
    setSelectRightAnswer(false)
  }, [debounceAnswer])

  useEffect(() => {
    console.log('update')
    if (debounceAnswer.find(answer => answer.id === null) === undefined &&
      lastAnswerIndexUpdate !== null
      && question.id !== null) {
      upsetAnswer({
        variables: {
          label: debounceQuestion.answers[lastAnswerIndexUpdate].label,
          isRight: debounceQuestion.answers[lastAnswerIndexUpdate].isRight,
          questionId: question.id,
          answerId: debounceQuestion.answers[lastAnswerIndexUpdate].id
        },
      })
    }
    setLastAnswerIndexUpdate(null)
  }, [lastAnswerIndexUpdate])


  return (
    <>
      <NewQuizQuestionNumber nbCurrentQuestion={nbCurrentQuestion} setNbCurrentQuestion={setNbCurrentQuestion} questions={questions} />
      <NewQuizQuestionForm question={question} setQuestion={setQuestion} />
      <NewAnswersForm
        question={question}
        setQuestion={setQuestion}
        setLastAnswerIndexUpdate={setLastAnswerIndexUpdate}
        selectRightAnswer={selectRightAnswer}
        setSelectRightAnswer={setSelectRightAnswer}
      />
      <div>
        <NewQuizBtnExitQuiz quiz={quiz} />
      </div>
    </>
  )
}

export default NewQuizDetailsForm;