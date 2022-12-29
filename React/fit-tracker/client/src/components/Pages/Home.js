import React from "react";
import Nav from "../NavBar/Nav";
export default function Home() {
  return (
    <>
      <Nav />
      <div className="page-container">
        <div className="welcome-text">Welcome Spencer!</div>
        <div className="heart-rate">
          Based on your age your target heart rate zones are:
          <div style={{ color: "rgb(127, 183, 103)" }}>
            <strong> low target zone 90-110 bpm</strong>
          </div>
          <div style={{ color: "rgb(246 171 34 / 80%)" }}>
            {" "}
            <strong>moderate target zone 109-149 bpm </strong>
          </div>
          <div>
            <strong style={{ color: "rgb(188 10 10 / 80%)" }}>
              {" "}
              high target zone 150-190 bpm
            </strong>
          </div>
        </div>
        <div className="recommended">
          ACSM recommends getting 150 mins of exercise at your moderate target
          zone a week. Or 75 mins of vigorous exercise at your high target zone
          a week. Exercise should then be followed up by 2-5 mins of cool down
          at your low target zone.
        </div>
      </div>
    </>
  );
}
