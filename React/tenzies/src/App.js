import './App.css';
import React from "react"
import Die from "./components/Die"

function App() {
  const [dice, setDice]=React.useState(allNewDice())

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
  setDice(oldDice => oldDice.map(die => {
    return die.isHeld ? 
    die : 
    {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    id: Math.ceil(Math.random() *1000000) }
  }))
}
  return (
      <main>
         <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
             Click each die to freeze it at its current value between rolls.</p>
        <div className='die-container'>
            {DiceElement}
        </div>
        <button
        onClick={rollDice}
        className="diceRoll">
          <div className='rollText'>Roll</div></button>
      </main>
  );
}

export default App;