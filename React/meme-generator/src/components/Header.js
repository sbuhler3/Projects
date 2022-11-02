import React from "react"
import troll from "../images/TrollFace.png"

export default function Header() {
    return (
        <header className="header">
            <img className="header-image"src={troll} alt="troll"/>
            <h2 className="header-title">Meme Generator</h2>
        </header>
    )
}