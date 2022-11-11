import './App.css';
import React from "react"
import blob from './images/blob-5.png'
import Start from './components/Start'
function App() {
  const [gameOn, setGameOn]=React.useState(false)
  function beginGame(){
    setGameOn(true)
  }
  return (
    <div className="background-container">
      <img src={blob} className="blob-bot"/>
      <img src={blob} className="blob-top"/>
      <div className='game-container'>
        {gameOn ? <h1>test</h1>: <Start beginGame={beginGame}/> }
      </div>
    </div>
  );
}

export default App;
