import './App.css';
import {useState, useEffect} from "react"
import blob from './images/blob-5.png'
import Start from './components/Start'
import Question from './components/Question'
function App() {
  const [gameOn, setGameOn]=useState(false)
  const [questions, setQuestions]=useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [checkAnswers, setCheckAnswers] = useState(false)

  function beginGame(){
    setGameOn(true)
  }
  //function to update correct answers
  function updateAnswers(value){
      setAnsweredQuestions(prevValue => prevValue +1)
      value === 'correct' && setCorrectAnswers(prevValue => prevValue+1)
  }
  //check answers button to appear
  function handleClick(){
    setCheckAnswers(true)
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
    updateAnswers= {updateAnswers}
    />)
  })

  return (
    <div className="background-container">
      <div className='game-container'>
        {gameOn ? allQuestions: <Start beginGame={beginGame}/> }
        {answeredQuestions===5 && !checkAnswers ? 
        <button
        onClick={handleClick}>Check Answers</button>:null}
        {checkAnswers ? <h2>You got {correctAnswers}/{questions.length} correct</h2>
        :null}
      </div>
    </div>
  );
}

export default App;
