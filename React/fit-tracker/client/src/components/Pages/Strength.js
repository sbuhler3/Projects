import React, { useContext, useState } from "react";
import Nav from "../NavBar/Nav";
import data from "../../mock-strength-data.json";
import { nanoid } from "nanoid";
import Sidebar from "../NavBar/Sidebar";
import ReadStrengthRow from "../ReadStrengthRow";
import EditStrengthRow from "../EditStrengthRow";
import { AuthContext } from "../../context/authContext";
export default function Strength() {
  //end users id to set as foreign key in table
  const { currentUser } = useContext(AuthContext);
  const { userid } = currentUser;
  const today = new Date();
  const [month, setMonth] = useState(
    today.toLocaleString("default", { month: "short" })
  );

  //code for adding new record to the table

  const [records, setRecords] = useState(data);
  const [addRecord, setAddRecord] = useState({
    date: "",
    exercise: "",
    sets: "",
    reps: "",
    resistance: "",
    user_id: "",
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

  const handleRecordSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: nanoid(),
      date: addRecord.date,
      exercise: addRecord.exercise,
      sets: addRecord.sets,
      reps: addRecord.reps,
      resistance: addRecord.resistance,
      user_id: userid,
    };
    const newRecords = [...records, newRecord];
    setRecords(newRecords);
  };

  //code for doing inline edit row
  const [editRecord, setEditRecord] = useState({
    date: "",
    exercise: "",
    sets: "",
    reps: "",
    resistance: "",
  });

  const [editRowID, setEditRowID] = useState(null);

  const handleEditRecord = (e) => {
    const fieldName = e.target.getAttribute("name");
    let fieldValue = e.target.value;
    //switch format of date from year-month-date to month-date-year
    if (fieldName === "date") {
      const year = fieldValue.slice(0, 4);
      fieldValue = `${fieldValue.slice(5)}-${year}`;
    }
    setEditRecord({ ...editRecord, [fieldName]: fieldValue });
  };

  const handleClickEdit = (record) => {
    setEditRowID(record.id);

    const editValues = {
      id: record.id,
      date: record.date,
      exercise: record.exercise,
      sets: record.sets,
      reps: record.reps,
      resistance: record.resistance,
      user_id: record.userid,
    };
    setEditRecord(editValues);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const editedRecord = {
      id: editRowID,
      date: editRecord.date,
      exercise: editRecord.exercise,
      sets: editRecord.sets,
      reps: editRecord.reps,
      resistance: editRecord.resistance,
      user_id: userid,
    };

    const newRecord = [...records];

    const index = records.findIndex((record) => record.id === editRowID);

    newRecord[index] = editedRecord;
    setRecords(newRecord);
    setEditRowID(null);
  };

  //handle click to cancel edit
  const handleCancelEdit = () => {
    setEditRowID(null);
  };

  //deleting a row
  const handleDeleteClick = (recordId) => {
    const updatedRecords = [...records];
    const index = records.findIndex((record) => record.id === recordId);
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
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
          <form onSubmit={handleEditSubmit}>
            <table>
              <caption className="table-heading">{month} Strength Page</caption>
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
                  <tr key={record.id}>
                    {editRowID === record.id ? (
                      <EditStrengthRow
                        record={editRecord}
                        handleEditRecord={handleEditRecord}
                        handleCancelEdit={handleCancelEdit}
                      />
                    ) : (
                      <ReadStrengthRow
                        record={record}
                        handleClickEdit={handleClickEdit}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
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
