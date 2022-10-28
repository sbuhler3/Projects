import React from "react"
import icon from "../images/icon.png"
export default function Card(props) {
    return(
       <div className="card-container">
        <img src="#"/>
        <div className="card-column">
            <div className="country"> filler
                <img src={icon}/>
                <span className="googlelink">View on Google Maps</span>
                </div>
                <h2 classname="location">anywhere</h2>
                <div className="dates">all the time</div>
                <div className="description">lorem ipsum</div>
        </div>
       </div>
    )
}