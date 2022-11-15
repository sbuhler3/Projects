import React from "react"

export default function Start(props){
    return(
        <div className="start-page">
        <h1 className="title">Quizzical</h1>
        <div className="description">Welcome to Quizzical. 
        Press start to play a trivia game of 5 random questions.</div>
        <button className="start-game"
        onClick={props.beginGame}
        >Start</button>
        </div>
        
    )
}