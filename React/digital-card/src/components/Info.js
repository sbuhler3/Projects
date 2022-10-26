import React from "react"
import pic from "../images/Spencer.png"
import email from "../images/email-icon.png"
import linked from "../images/linked.png"
export default function Info() {
    return(
        <div className="info-row">
        <img className="pic" alt="personal pic"src={pic}/>
        <h3 className="name">Spencer Buhler</h3>
        <div className="stack">Full Stack Developer</div>
        <div className="website"><a href="https://buhler-portfolio.herokuapp.com/" 
        target="_blank">buhler-portfolio.herokuapp.com</a></div>
        <div className="button-group">
        <a href="mailto:buhler.spencer33@gmail.com">
            <button className="email-but"><img alt="email icon" src={email}/><span className="but-text">Email</span></button></a>
            <a href="https://www.linkedin.com/in/spencer-buhler-331623118/" target="_blank" >
            <button className="linked-but"><img alt="linkedin icon"src={linked}/><span className="but-text">LinkedIn</span></button></a>
        </div>
        </div>
    )
}