import React, { useState } from "react";
import Nav from "../NavBar/Nav";
import data from "../../mock-strength-data.json";
import { nanoid } from "nanoid";
import Sidebar from "../NavBar/Sidebar";
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
    let fieldValue = e.target.value;
    //switch format of date from year-month-date to month-date-year
    if (fieldName === "date") {
      const year = fieldValue.slice(0, 4);
      fieldValue = `${fieldValue.slice(5)}-${year}`;
    }
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

  const handleClickMonth = (e) => {
    setMonth(e.currentTarget.innerText);
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="page">
        <aside>
          <Sidebar handleClick={handleClickMonth} />
        </aside>
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
