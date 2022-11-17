import {useEffect, useState} from "react"
import {nanoid} from 'nanoid'

export default function Game(props){

    const [randomArray, setRandomArray] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    
    function handleClick() {
        setIsDisabled(true)
        setIsSelected(true)
    }

    // to get json into html
    function htmlDecode(input) {
        let decode = new DOMParser().parseFromString(input, "text/html")
        return decode.documentElement.textContent
    }
    // creating array with all answers
    const correctID=nanoid()
    const incorrectID=[nanoid(), nanoid(), nanoid()]
    let counter=0
    let correct =<button 
        id= {correctID}
        className={isSelected ? "selected":"button-answer"}
        value="correct"
        onClick={() => {
            handleClick()
            document.getElementById(correctID).className="selected"
            }}>
        {htmlDecode(props.correct_answer)}</button>
    let incorrect = props.incorrect_answers
    let allAnswers = incorrect.map(answer => {
        let id= incorrectID[counter]
        counter++
        return(
            <button 
            id={id}
            className={isSelected ? "selected":"button-answer"}
            value="incorrect"
            onClick={() => {
                handleClick()
                document.getElementById(id).className="selected"
            }}
            >
            {htmlDecode(answer)}</button>
        )
    })
    allAnswers.push(correct)
    console.log(randomArray)
    

    //randomize array and keep it from populating correct answer repeatedly
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
         array[randomIndex], array[currentIndex]];
        }
    return array;
    }

    useEffect(() => {
        setRandomArray(shuffle(allAnswers))
     }, [props.result])

    return (
        <div>
            <h3>{htmlDecode(props.question)}</h3>
            <div className={isDisabled ? "disabled":"answers"} >{randomArray}
            </div>
            <hr/>
        </div>)
   }
