import React, { useState, useEffect } from 'react';
import QuizzesList from './QuizzesList';
import Loading from './Loading';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUIZZES_WITH_FILTER } from '../utils/QuizApi';

const QuizzesContent = ({ filter, searchQuizInput, segment }) => {
  let forCurrentUser = (segment === 'own') ? true : false;
  const { loading, error, data: dataForQuizzes } = useQuery(GET_QUIZZES_WITH_FILTER, {
    variables: {
      filter,
      forCurrentUser,
      search: searchQuizInput
    },
  });


  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;


  return (
    <>
      <QuizzesList
        quizzesList={dataForQuizzes.quizzesBySchoolClass}
        listType={segment}
        hide={segment === 'own'}
      />
      <QuizzesList
        quizzesList={dataForQuizzes.quizzesBySchoolClass}
        listType={segment}
        hide={segment === 'all'}
      />
    </>
  )
};

export default QuizzesContent;