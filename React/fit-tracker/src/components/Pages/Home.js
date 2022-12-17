import React from "react";
import Nav from "../NavBar/Nav";
export default function Home() {
  return (
    <>
      <Nav />
      <div className="page-container">
        <div className="welcome-text">Welcome Spencer!</div>
        <div className="heart-container">
          <div className="heart-zone" style={{ backgroundColor: "green" }}>
            Low HR: 90 bpm
          </div>
          <div className="heart-zone" style={{ backgroundColor: "orange" }}>
            Medium HR: 120 bpm
          </div>
          <div className="heart-zone" style={{ backgroundColor: "red" }}>
            High HR: 167 bpm
          </div>
        </div>
      </div>
    </>
  );
}
