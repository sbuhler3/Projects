import './App.css';
import {useState, useEffect} from "react"
import blob from './images/blob-5.png'
import Start from './components/Start'
import Question from './components/Question'
function App() {
  const [gameOn, setGameOn]=useState(false)
  const [questions, setQuestions]=useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)

  function beginGame(){
    setGameOn(true)
  }

  //call API
useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
},[])

const allQuestions= questions.map(results => {
  return(<Question
  result={results}
  question={results.question}
  correct_answer={results.correct_answer}
  incorrect_answers={results.incorrect_answers}
  answerCorrect= {() => setCorrectAnswers(prevValue => prevValue+1)}
  />)
})
  return (
    <div className="background-container">
      <div className='game-container'>
        {gameOn ? allQuestions: <Start beginGame={beginGame}/> }
        {correctAnswers}
      </div>
    </div>
  );
}

export default App;
