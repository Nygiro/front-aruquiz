import React, { useState } from 'react';
import { IonTextarea, IonButton, IonAlert } from '@ionic/react';
import NewQuizBtnExitQuiz from './NewQuizBtnExitQuiz';
const NewAnswersForm = ({ quiz, question, setQuestion, setLastAnswerIndexUpdate, selectRightAnswer, setSelectRightAnswer }) => {
  const [rightIndexQuestion, setRightIndexQuestion] = useState(0)
  const [showAlert1, setShowAlert1] = useState(false);

  const handleSetAnswersLabel = (value, i) => {
    let newQuestion = { ...question }
    newQuestion.answers[i] = { ...newQuestion.answers[i], label: value };
    setQuestion(newQuestion)
    setLastAnswerIndexUpdate(i)
  }
  const handleSetAnswersIsRight = (value, i) => {
    question.answers = question.answers.map(answer => {
      return { ...answer, isRight: false }
    })
    let newQuestion = { ...question }
    newQuestion.answers[i] = { ...question.answers[i], isRight: value };
    setQuestion(question)
    setLastAnswerIndexUpdate(i)
    setRightIndexQuestion(i)
  }

  let hasQuestionName = (question.name !== '');

  return (
    <>
      {!hasQuestionName &&
        <div className={'backdrop-answer-form'} onClick={() => setShowAlert1(true)}></div>
      }
      <div>
        <p className={'explain'}>Cliquer dans les carrés pour enregister vos réponses</p>
      </div>
      <div className={'answers-proposition'}>
        <div
          className={`answer answer-A ${question.answers[0].isRight ? 'good' : 'bad'}-answer`}
          onClick={() => selectRightAnswer ? handleSetAnswersIsRight(true, 0) : ''}>
          <IonTextarea
            disabled={selectRightAnswer}
            minlength={1}
            value={question.answers[0].label}
            onIonChange={e => handleSetAnswersLabel(e.target.value, 0)}
          />
        </div>
        <div
          className={`answer answer-B ${question.answers[1].isRight ? 'good' : 'bad'}-answer`}
          onClick={() => selectRightAnswer ? handleSetAnswersIsRight(true, 1) : ''}>
          <IonTextarea
            disabled={selectRightAnswer}
            minlength={1}
            value={question.answers[1].label}
            onIonChange={e => handleSetAnswersLabel(e.target.value, 1)}
          />
        </div>
        <div
          className={`answer answer-C ${question.answers[2].isRight ? 'good' : 'bad'}-answer`}
          onClick={() => selectRightAnswer ? handleSetAnswersIsRight(true, 2) : ''}>
          <IonTextarea
            disabled={selectRightAnswer}
            minlength={1}
            value={question.answers[2].label}
            onIonChange={e => handleSetAnswersLabel(e.target.value, 2)}
          />
        </div>
        <div
          className={`answer answer-D ${question.answers[3].isRight ? 'good' : 'bad'}-answer`}
          onClick={() => selectRightAnswer ? handleSetAnswersIsRight(true, 3) : ''}>
          <IonTextarea
            disabled={selectRightAnswer}
            minlength={1}
            value={question.answers[3].label}
            onIonChange={e => handleSetAnswersLabel(e.target.value, 3)}
          />
        </div>
      </div>
      {question.answers.find(answer => answer.label === '') === undefined &&
        <div style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}>
          <IonButton className="btn-for-new-quiz" onClick={() => setSelectRightAnswer(true)}>
            Sélectionner votre réponse
          </IonButton>
          <NewQuizBtnExitQuiz quiz={quiz} />
        </div>
      }
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header={'Il y a un problème !'}
        message={'Veuillez dans un premier temps renseigner l\'intitulé de votre question.'}
        buttons={[
          {
            text: 'Continuer',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]}
      />
    </>
  )
}

export default NewAnswersForm;