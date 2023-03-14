import React, { useContext, useEffect, useState } from "react";
import Nav from "../NavBar/Nav";
import data from "../../mock-strength-data.json";
import { nanoid } from "nanoid";
import Sidebar from "../NavBar/Sidebar";
import ReadStrengthRow from "../ReadStrengthRow";
import EditStrengthRow from "../EditStrengthRow";
import { AuthContext } from "../../context/authContext";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
export default function Strength() {
  //end users id to set as foreign key in table
  const { currentUser } = useContext(AuthContext);
  const { userid } = currentUser;

  //setting date so it puts you in the current months page
  const today = new Date();
  const [month, setMonth] = useState({
    name: today.toLocaleString("default", { month: "short" }),
    monthNum: today.getMonth() + 1,
  });

  const [displayMonths, setDisplayMonths] = useState(false);

  const [records, setRecords] = useState(data);
  const [addRecord, setAddRecord] = useState({
    id: "",
    date: "",
    exercise: "",
    sets: "",
    reps: "",
    resistance: "",
    user_id: "",
  });

  const [editRecord, setEditRecord] = useState({
    date: "",
    exercise: "",
    sets: "",
    reps: "",
    resistance: "",
  });

  const [editRowID, setEditRowID] = useState(null);

  //code for adding new record to the table

  const handleRecordChange = (e, record) => {
    const fieldName = e.target.getAttribute("name");
    let fieldValue = e.target.value;
    //switch format of date from year-month-date to month-date-year
    //if (fieldName === "date") {
    //const year = fieldValue.slice(0, 4);
    //fieldValue = `${fieldValue.slice(5)}-${year}`;
    //}
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
    setAddRecord({
      id: "",
      date: "",
      exercise: "",
      sets: "",
      reps: "",
      resistance: "",
      user_id: "",
    });
  };

  //code for doing inline edit row

  const handleEditRecord = (e) => {
    const fieldName = e.target.getAttribute("name");
    let fieldValue = e.target.value;
    //switch format of date from year-month-date to month-date-year
    // if (fieldName === "date") {
    // const year = fieldValue.slice(0, 4);
    //fieldValue = `${fieldValue.slice(5)}-${year}`;
    //}
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
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updatedRecords = [...records];
      const index = records.findIndex((record) => record.id === recordId);
      updatedRecords.splice(index, 1);
      setRecords(updatedRecords);
    }
  };

  //code to change month page
  const handleClickMonth = (e) => {
    // setting number for lookup in table
    const monthDict = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    setMonth({
      name: e.currentTarget.innerText,
      monthNum: monthDict[e.currentTarget.innerText],
    });
    setDisplayMonths(!displayMonths);
  };

  //code to display months
  const handleClickDisplayMonths = (e) => {
    e.preventDefault();
    setDisplayMonths(!displayMonths);
  };
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="page">
        <button className="button-display" onClick={handleClickDisplayMonths}>
          Months {displayMonths ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </button>
        {displayMonths ? (
          <aside className="display-months">
            <Sidebar handleClick={handleClickMonth} />
          </aside>
        ) : (
          <aside className="hide">
            <Sidebar handleClick={handleClickMonth} />
          </aside>
        )}
        <div className="table-container">
          {/*Display no records if array is empty*/}
          {records.length > 0 ? (
            <form onSubmit={handleEditSubmit}>
              <table>
                <caption className="table-heading">
                  {month.name} Strength Page
                </caption>
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
                    <tr key={record.id} className="table-row">
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
          ) : (
            <h2 className="notExist">
              No records exist for this month. Add your first workout!
            </h2>
          )}

          <form className="add-row" onSubmit={handleRecordSubmit}>
            <input
              className="add-item"
              type="date"
              required
              name="date"
              value={addRecord.date}
              placeholder="Enter a date"
              onChange={handleRecordChange}
            />
            <input
              className="add-item"
              type="text"
              required
              name="exercise"
              value={addRecord.exercise}
              placeholder="Enter a exercise"
              onChange={handleRecordChange}
            />
            <input
              className="add-item"
              type="number"
              name="sets"
              value={addRecord.sets}
              placeholder="Enter sets"
              onChange={handleRecordChange}
            />
            <input
              className="add-item"
              type="number"
              name="reps"
              value={addRecord.reps}
              placeholder="Enter reps"
              onChange={handleRecordChange}
            />
            <input
              className="add-item"
              type="text"
              name="resistance"
              value={addRecord.resistance}
              placeholder="Enter resistance"
              onChange={handleRecordChange}
            />
            <button className="add-item-button">Add row</button>
          </form>
        </div>
      </main>
    </>
  );
}
