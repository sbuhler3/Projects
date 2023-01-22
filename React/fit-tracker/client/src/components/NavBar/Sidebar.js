import React from "react";

export default function Sidebar({ handleClick }) {
  // for the month number that will be used to retrieve from DB
  //const monthDict = {
  //  Jan: 1,
  //  Feb: 2,
  //  Mar: 3,
  //  Apr: 4,
  //  May: 5,
  //  Jun: 6,
  //  Jul: 7,
  //  Aug: 8,
  //  Sep: 9,
  //  Oct: 10,
  //  Nov: 11,
  //  Dec: 12,
  //};
  return (
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
  );
}
