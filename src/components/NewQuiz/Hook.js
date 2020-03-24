export const useQuestionManager = () => {
  const [questionName, setQuestionName] = useState('');
  useEffect(() => {
    if (questionName !== '') {
      let questionId = (currentQuestionId === null) ? "" : currentQuestionId;
      upsertQuestion({ variables: { label: questionName, quizId: quiz.id, questionId: questionId } })
    }
  }, [questionName])

  useEffect(() => {
    if (dataForUpsertQuestion !== undefined && currentQuestionId === null) {
      setCurrentQuestionId(dataForUpsertQuestion.upsertQuestion.id)
    }
  }, [dataForUpsertQuestion])
}