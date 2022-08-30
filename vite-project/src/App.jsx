import React from 'react'
import Question from './components/Question'
import { nanoid } from "nanoid"
import './dist/css/index.css'



const numberOfQuestions = 5
let questionsArray


function App() {
  const [start, setStart] = React.useState(false)
  const [ansersSubmitted] = React.useState([])
  const [question, setQuestion] = React.useState()

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
      .then((response) => response.json())
      .then((data) => setQuestion(() => {
        return (
          {
            ...data,
            id: nanoid()
          }
        )
      }))
  }, [start])
  console.log(question)
  function handleChange(id) {
    console.log(id)
  }

  function startEndQuiz() {
    setStart(prevState => !prevState)
  }

  function getQuestions() {
    if (question != undefined) {
      questionsArray = question.results.map(data => {
        return (
          <Question
            key={data.id}
            id={data.id}
            data={data.results}
            select={handleChange}
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
          <p className="description">Some description if needed</p>
          <button className="start-quiz" onClick={startEndQuiz}>Start quiz</button>
        </div>
      }
      {!start &&
        <main>
          <div className="q-wrapper">
            {getQuestions()}
          </div>
          <button className='check--answers'>Check answers</button>
          {/* <div className="wrapper--again">
            <div className="result">You scored 3/5 correct answers</div>
            <button className="again">Play again</button>
          </div> */}
        </main>
      }
    </div>
  )
}

export default App
