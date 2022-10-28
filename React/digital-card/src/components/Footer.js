import React from "react"
import fb from "../images/Facebook Icon.png"
import gh from "../images/GitHub Icon.png"

 export default function Footer() {
    return (
        <div className="footer">
            <div className="icon-cont">
                <a href="https://www.facebook.com/spencer.buhler" target="_blank">
            <img className="facebook" alt="facebook icon"src={fb}></img></a>
            <a href="https://github.com/sbuhler3/Projects" target="_blank">
            <img className="github" alt="github icon" src={gh}></img></a>
            </div>
        </div>
    )
}