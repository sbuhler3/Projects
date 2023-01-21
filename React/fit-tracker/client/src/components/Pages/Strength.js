import React, { useState } from "react";
import Nav from "../NavBar/Nav";
export default function Strength() {
  const today = new Date();
  const [month, setMonth] = useState(
    today.toLocaleString("default", { month: "short" })
  );

  const handleClick = (e) => {
    setMonth(e.currentTarget.innerText);
  };
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="page">
        <nav>
          <ul className="months">
            <li className="month" onClick={handleClick}>
              Jan
            </li>
            <li className="month" onClick={handleClick}>
              Feb
            </li>
            <li className="month" onClick={handleClick}>
              Mar
            </li>
            <li className="month" onClick={handleClick}>
              Apr
            </li>
            <li className="month" onClick={handleClick}>
              May
            </li>
            <li className="month" onClick={handleClick}>
              Jun
            </li>
            <li className="month" onClick={handleClick}>
              Jul
            </li>
            <li className="month" onClick={handleClick}>
              Aug
            </li>
            <li className="month" onClick={handleClick}>
              Sep
            </li>
            <li className="month" onClick={handleClick}>
              Oct
            </li>
            <li className="month" onClick={handleClick}>
              Nov
            </li>
            <li className="month" onClick={handleClick}>
              Dec
            </li>
          </ul>
        </nav>
        <h1>{month} Strength page</h1>
      </main>
    </>
  );
}
