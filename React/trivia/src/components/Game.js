import {useEffect, useState} from "react"
import axios from "axios"
export default function Game(){
    const [trivia, setTrivia]=useState([])
    const [answers,setAnswers]=useState([])
   useEffect(() => {
    async function fetchTrivia() {
        try {
            const res = await axios.get('https://opentdb.com/api.php?amount=5')
            setTrivia(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTrivia()
    }, [])
    console.log(trivia)
    return (
        !trivia.length ? <h1>Loading...</h1>: <div>
        {trivia.map((trivia) => {
            //replaceAll calls because JSON did not convert code away from html special character codes
            return (<div>
                <h4 className="question">{trivia.question.replaceAll("&quot;",'"').replaceAll("&#039;","'")
            .replaceAll("&amp;","&").replaceAll("&rsquo;","'").replaceAll('&Uuml;', 'Ü')
            .replaceAll('&aacute;','á').replaceAll('&aacute;','Á').replaceAll('&eacute','é').replaceAll('&Eacute','É')
            .replaceAll('&ntilde','ñ').replaceAll('&Ntilde;','Ñ')}
                </h4>
                <div className="answers">
                    <button>{trivia.correct_answer}</button>
                    {trivia.incorrect_answers.map(ans => <button>{ans}</button>)}
                </div>
            <hr/>
            </div>)
        })}
        
    </div>
    )
   }

