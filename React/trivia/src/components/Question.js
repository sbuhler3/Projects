import {useEffect, useState} from "react"

export default function Game(props){
    const [selected, setSelected] = useState(false)
    const [randomArray, setRandomArray] = useState([])
    const styles= {
        backgroundColor: selected ? "red":"white"
    }
    let selectClick= (e) => {
        e.value==="correct" ? console.log('correct'):console.log()
    }
    // to get json into html
    function htmlDecode(input) {
        let decode = new DOMParser().parseFromString(input, "text/html")
        return decode.documentElement.textContent
    }
    // creating array with all answers
    let correct =<button 
        className="button-answer"
        onClick={selectClick}
        value="correct"
        selected={false}>
        {htmlDecode(props.correct_answer)}</button>
    let incorrect = props.incorrect_answers
    let allAnswers = incorrect.map(answer => {
        return(
            <button 
            className="button-answer"
            onClick={selectClick}
            value="incorrect">
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
            <div className="answers">{randomArray}
            </div>
            <hr/>
        </div>)
   }
