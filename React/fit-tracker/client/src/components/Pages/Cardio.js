import React, { useContext, useEffect, useState } from "react";
import Nav from "../NavBar/Nav";
import { nanoid } from "nanoid";
import Sidebar from "../NavBar/Sidebar";
import ReadCardioRow from "../ReadCardioRow";
import EditCardioRow from "../EditCardioRow";
import { AuthContext } from "../../context/authContext";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";
import axios from "axios";
export default function Cardio() {
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
  //for ordering columns
  const [orderDate, setOrderDate] = useState(true);
  const [orderExercise, setOrderExcercise] = useState(true);
  const [orderTime, setOrderTime] = useState(true);
  //end of ordering columns state
  const [records, setRecords] = useState([]);
  const [addRecord, setAddRecord] = useState({
    id: "",
    date: "",
    exercise: "",
    time: "",
    user_id: "",
  });

  const [editRecord, setEditRecord] = useState({
    date: "",
    exercise: "",
    time: "",
  });

  const [editRowID, setEditRowID] = useState(null);

  //code for adding new record to the table

  const handleRecordChange = (e, record) => {
    e.preventDefault();
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

  const handleRecordSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/cardio", {
        id: nanoid(),
        date: addRecord.date,
        month: parseInt(addRecord.date.slice(5, 7)),
        exercise: addRecord.exercise,
        time: addRecord.time,
        user_id: userid,
      });
      loadData();
    } catch (err) {
      alert("Added record failed");
    }
    //setRecords(newRecords);
    setAddRecord({
      id: "",
      date: "",
      exercise: "",
      time: "",
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
      month: record.month,
      exercise: record.exercise,
      time: record.time,
      user_id: userid,
    };
    setEditRecord(editValues);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const editedRecord = {
      id: editRecord.id,
      date: editRecord.date,
      month: editRecord.month,
      exercise: editRecord.exercise,
      time: editRecord.time,
      user_id: editRecord.user_id,
    };
    try {
      await axios.put(
        `http://localhost:3001/cardio/update/${editedRecord.id}`,
        editedRecord
      );
    } catch (err) {
      alert("Updating exercise failed, try again.");
    }

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
  const handleDeleteClick = async (recordId) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      try {
        await axios.delete(`http://localhost:3001/cardio/delete/${recordId}`);
        loadData();
      } catch (err) {
        alert("Error deleting exercise.");
      }
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

  //start pulling data from mysql
  async function loadData() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  //SORTING FUNCTIONS
  async function orderByDate() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}/desc`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  async function orderByExerciseAsc() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}/exercise-a`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  async function orderByExerciseDesc() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}/exercise-d`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  async function orderByTimeAsc() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}/time-a`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  async function orderByTimeDesc() {
    const res = await axios.get(
      `http://localhost:3001/cardio/${month.monthNum}/${userid}/time-d`
    );
    //get rid of times on the date
    const formatData = res.data.data.map((prev) => {
      return { ...prev, date: prev.date.slice(0, 10) };
    });
    //
    setRecords(formatData);
  }

  //Handling Clicks for sorting columns
  const handleChangeOrderDate = async () => {
    orderDate ? loadData() : orderByDate();
    setOrderDate(!orderDate);
  };

  const handleChangeOrderExercise = async () => {
    orderExercise ? orderByExerciseAsc() : orderByExerciseDesc();
    setOrderExcercise(!orderExercise);
  };

  const handleChangeOrderTime = async () => {
    orderTime ? orderByTimeAsc() : orderByTimeDesc();
    setOrderTime(!orderTime);
  };

  useEffect(() => {
    loadData();
  }, [month]);

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
              <table className="cardio-table">
                <caption className="table-heading">
                  {month.name} Cardio Page
                </caption>
                <thead>
                  <tr>
                    <th
                      className="heading-click"
                      onClick={handleChangeOrderDate}
                    >
                      Date <br /> <BsArrowDownUp />
                    </th>
                    <th
                      className="heading-click"
                      onClick={handleChangeOrderExercise}
                    >
                      Exercise <br /> <BsArrowDownUp />
                    </th>
                    <th
                      className="heading-click"
                      onClick={handleChangeOrderTime}
                    >
                      Time(Mins) <br />
                      <BsArrowDownUp />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="table-row">
                      {editRowID === record.id ? (
                        <EditCardioRow
                          record={editRecord}
                          handleEditRecord={handleEditRecord}
                          handleCancelEdit={handleCancelEdit}
                        />
                      ) : (
                        <ReadCardioRow
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

          <form className="add-row cardio-row" onSubmit={handleRecordSubmit}>
            <input
              className="add-item cardio-item"
              type="date"
              required
              name="date"
              value={addRecord.date}
              placeholder="Enter a date"
              onChange={handleRecordChange}
            />
            <input
              className="add-item cardio-item"
              type="text"
              required
              name="exercise"
              value={addRecord.exercise}
              placeholder="Enter a exercise"
              onChange={handleRecordChange}
            />
            <input
              className="add-item cardio-item"
              required
              type="number"
              name="time"
              value={addRecord.time}
              placeholder="Enter time(mins)"
              onChange={handleRecordChange}
            />
            <button className="add-item-button">Add row</button>
          </form>
        </div>
      </main>
    </>
  );
}
