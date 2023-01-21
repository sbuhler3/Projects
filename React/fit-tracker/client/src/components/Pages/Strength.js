import React, { useState } from "react";
import Nav from "../NavBar/Nav";
import data from "../../mock-strength-data.json";
import { nanoid } from "nanoid";
export default function Strength() {
  const today = new Date();
  const [month, setMonth] = useState(
    today.toLocaleString("default", { month: "short" })
  );
  const [records, setRecords] = useState(data);
  const [addRecord, setAddRecord] = useState({
    date: "",
    exercise: "",
    sets: "",
    reps: "",
    resistance: "",
  });

  const handleRecordChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newRecordData = { ...addRecord, [fieldName]: fieldValue };

    setAddRecord(newRecordData);
  };
  console.log(records);
  const handleRecordSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: nanoid(),
      date: addRecord.date,
      exercise: addRecord.exercise,
      sets: addRecord.sets,
      reps: addRecord.reps,
      resistance: addRecord.resistance,
    };
    const newRecords = [...records, newRecord];
    setRecords(newRecords);
  };
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
        <div className="table-container">
          <h1>{month} Strength page</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Resistance</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr>
                  <td>{record.date}</td>
                  <td>{record.exercise}</td>
                  <td>{record.sets}</td>
                  <td>{record.reps}</td>
                  <td>{record.resistance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={handleRecordSubmit}>
            <input
              type="date"
              required
              name="date"
              placeholder="Enter a date"
              onChange={handleRecordChange}
            />
            <input
              type="text"
              required
              name="exercise"
              placeholder="Enter a exercise"
              onChange={handleRecordChange}
            />
            <input
              type="number"
              name="sets"
              placeholder="Enter sets"
              onChange={handleRecordChange}
            />
            <input
              type="number"
              name="reps"
              placeholder="Enter reps"
              onChange={handleRecordChange}
            />
            <input
              type="text"
              name="resistance"
              placeholder="Enter resistance"
              onChange={handleRecordChange}
            />
            <button>Add row</button>
          </form>
        </div>
      </main>
    </>
  );
}
