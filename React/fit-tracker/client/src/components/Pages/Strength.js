import React from "react";
import Nav from "../NavBar/Nav";
export default function Strength() {
  return (
    <>
      <Nav />
      <div className="page">
        <nav className="monthNav">
          <ul className="months">
            <li className="month" onClick={() => console.log("clicked month")}>
              Jan
            </li>
            <li className="month">Feb</li>
            <li className="month">Mar</li>
            <li className="month">Apr</li>
            <li className="month">May</li>
            <li className="month">Jun</li>
            <li className="month">Jul</li>
            <li className="month">Aug</li>
            <li className="month">Sep</li>
            <li className="month">Oct</li>
            <li className="month">Nov</li>
            <li className="month">Dec</li>
          </ul>
        </nav>
        <h1>Strength page</h1>
      </div>
    </>
  );
}
