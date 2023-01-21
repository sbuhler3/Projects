import React, { useContext } from "react";
import Nav from "../NavBar/Nav";
import { AuthContext } from "../../context/authContext";
export default function Home() {
  const { currentUser } = useContext(AuthContext);

  const { userName, age } = currentUser;
  const ageAdjustedHR = 220 - age;
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="page-container">
        <div className="welcome-text">Welcome {userName}!</div>
        <div className="heart-rate">
          Based on your age your target heart rate zones are:
          <div style={{ color: "rgb(127, 183, 103)" }}>
            <strong>
              {" "}
              low target zone {Math.ceil(ageAdjustedHR * 0.57)}-
              {Math.ceil(ageAdjustedHR * 0.63)} bpm
            </strong>
          </div>
          <div style={{ color: "rgb(246 171 34 / 80%)" }}>
            {" "}
            <strong>
              moderate target zone {Math.ceil(ageAdjustedHR * 0.64)}-
              {Math.ceil(ageAdjustedHR * 0.76)} bpm{" "}
            </strong>
          </div>
          <div>
            <strong style={{ color: "rgb(188 10 10 / 80%)" }}>
              {" "}
              high target zone {Math.ceil(ageAdjustedHR * 0.77)}-
              {Math.ceil(ageAdjustedHR * 0.95)} bpm
            </strong>
          </div>
        </div>
        <div className="recommended">
          ACSM recommends getting 150 mins of exercise at your moderate target
          zone a week. Or 75 mins of vigorous exercise at your high target zone
          a week. Exercise should then be followed up by 2-5 mins of cool down
          at your low target zone.
        </div>
      </main>
    </>
  );
}
