import React from "react";
import { BiSave } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
export default function EditCardioRow({
  record,
  handleEditRecord,
  handleCancelEdit,
}) {
  return (
    <>
      <td className="edit-row">
        <input
          type="date"
          required
          name="date"
          defaultValue={record.date}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="text"
          required
          name="exercise"
          defaultValue={record.exercise}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="text"
          required
          name="time"
          defaultValue={record.time}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="table-icon edit-row">
        <button className="save-button">
          <BiSave className="save-icon" type="submit" />
        </button>
      </td>
      <td className="table-icon edit-row">
        <FcCancel onClick={handleCancelEdit} />
      </td>
    </>
  );
}
