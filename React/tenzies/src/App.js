import './App.css';
import React from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice]=React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)
    //winning condition
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

  //random number generated for dice
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
        id: Math.ceil(Math.random() *1000) })
    }
    return newDice
}
//create holddice function to stop that number from rolling
function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
}))
}
//map over random array and assign a number to each die
const DiceElement=dice.map(die => <Die 
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld} 
  holdDice={() => holdDice(die.id)}/>)

function rollDice(){
  if (!tenzies) {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die : 
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      id: Math.ceil(Math.random() *1000000) }
    }))
  } else {
    setCount(0)
    setTenzies(false)
    setDice(allNewDice())
  }
  
}
  return (
      <main>
        {tenzies && <div><h1 className='win'>
          It took you {count} rolls to win the game! Try and beat your score by playing again.
          </h1> <Confetti/></div>}
         <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
             Click each die to freeze it at its current value between rolls.</p>
        <div className='die-container'>
            {DiceElement}
        </div>
        <button
        onClick={() => {
          setCount(count+1);
          rollDice()
        }}
        className="diceRoll">
          <div className='rollText'>
            {tenzies ? "Play again?":"Roll"}</div></button>
      </main>
  );
}

export default App;