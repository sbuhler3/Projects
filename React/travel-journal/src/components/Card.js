import React from "react"
import icon from "../images/icon.png"
export default function Card(props) {
    return(
       <div className="card-container">
        <img className="image"src={require(`../images/${props.item.img}`)}/>
        <div className="card-text">
            <div className="country">
                <img src={icon}/>{props.item.country}
                <a href={props.item.googlelink} target="_blank"
                className="googlelink">View on Google Maps</a>
                </div>
                <h2 classname="location">{props.item.location}</h2>
                <div className="dates">{props.item.dates}</div>
                <div className="description">{props.item.description}</div>

        </div>
       </div>
    )
}