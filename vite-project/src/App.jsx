import React from 'react'
import Question from './components/Question'
import { nanoid } from "nanoid"
import './dist/css/index.css'
import { set } from 'mongoose'



const numberOfQuestions = 5
let questionsArray


function App() {
  const [start, setStart] = React.useState(true)
  const [correctAns, setCorrectAns] = React.useState(0)
  const [again, setAgain] = React.useState(true)
  const [checkAnswers, setCheckAnswers] = React.useState(false)
  const [question, setQuestion] = React.useState()

  React.useEffect(() => {

    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
      .then((response) => response.json())
      .then((data) => !start && setQuestion(() => {
        let idData = []
        data.results.forEach(element => {
          let correct = element.correct_answer
          const allAnswers = element.incorrect_answers
          allAnswers.push(element.correct_answer)

          let shuffledAnswers = allAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

          idData.push({
            ...element,
            selected: '',
            correct_answer: correct,
            allAnswers: shuffledAnswers,
            id: nanoid()
          })
        });

        return idData
      }));
  }, [start, again])


  function handleChange(event) {
    const { name, value} = event.target
    let newQuestions = question.map(element => {
      return (element.id === name ? { ...element, selected: value, correct_answer: element.correct_answer } : element)
    })
    setQuestion(newQuestions)
  }

  function startEndQuiz() {
    setStart(prevState => !prevState)
  }

  function checkAns() {
    let numberCor = 0
    question.forEach(q => {
      q.correct_answer === q.selected ? numberCor += 1 : null
    });
    setCheckAnswers(prevState => !prevState)
    setCorrectAns(numberCor)
  }

  function newGame() {
    setAgain(prevState => !prevState)
    setCheckAnswers(prevState => !prevState)
    setQuestion(null)
  }

  function getQuestions() {
    if (question != undefined) {
      questionsArray = question.map(data => {
        return (
          <Question
            key={nanoid()}
            id={data.id}
            data={data}
            select={handleChange}
            checking={checkAnswers}
          />
        )
      })
    }
    return questionsArray
  }


  return (
    <div className="container">
      {start &&
        <div className="start">
          <h1 className='title'>Quizzical</h1>
          <p className="description">Random questions about everything!</p>
          <button className="start-quiz" onClick={startEndQuiz}>Start quiz</button>
        </div>
      }
      {!start &&
        <main>
          <div className="q-wrapper">
            {getQuestions()}
          </div>
          {!checkAnswers && <button className='check--answers' onClick={checkAns}>Check answers</button>}
          {checkAnswers && <div className="wrapper--again">
            <div className="result">You scored {correctAns}/{numberOfQuestions} correct answers</div>
            <button className="again" onClick={newGame}>Play again</button>
          </div>}
        </main>
      }
    </div>
  )
}

export default App
